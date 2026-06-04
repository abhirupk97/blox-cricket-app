import Head from 'next/head';
import { client } from '../sanity/lib/client'; // This connects to your Sanity database!

// Notice the word "async" here! This allows the page to wait for Sanity's data.
export default async function Home() {
  
  // THE MAGIC LINE: Fetching your Game Updates from Sanity, sorted by newest first!
  const updates = await client.fetch(`*[_type == "gameUpdate"] | order(date desc)`);

  return (
    <>
      <Head>
        <title>Cricket Game Website</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </Head>

      {/* Dynamic Background Overlay */}
      <div className="bg-overlay"></div>

      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="logo">
          <h2><span className="text-white">BLOX</span><span className="text-neon">CRICKET</span> <i className="fa-solid fa-cricket-bat-ball text-neon"></i></h2>
        </div>
        <ul className="nav-links">
          <li><a href="#about-dev" className="scroll-link"><i className="fa-solid fa-user-gear"></i> Abt Dev</a></li>
          <li><a href="#about-game" className="scroll-link"><i className="fa-solid fa-gamepad"></i> Abt Game</a></li>
          <li><a href="#game-updates" className="scroll-link"><i className="fa-solid fa-bell"></i> Game Updates</a></li>
          <li><a href="#media" className="scroll-link"><i className="fa-solid fa-video"></i> Game Pic's/Video</a></li>
        </ul>
        <div className="profile-menu">
          <img src="https://ui-avatars.com/api/?name=Blox+Player&background=222&color=7CFC00" alt="Profile" className="avatar" />
          <span>BloxPlayer <i className="fa-solid fa-chevron-down"></i></span>
        </div>
      </nav>

      {/* Main Content Canvas */}
      <main className="dashboard-container">
        
        <section className="hero-section">
          <div className="main-content">
            <h1 className="mega-title">BLOX CRICKET</h1>
            <p className="hero-lines">
              Step onto the pitch and experience the ultimate T20 multiplayer cricket showdown. 
              Dominate the leaderboards, upgrade your gear, and build your ultimate dream team.
            </p>
          </div>
          
          <div className="info-box">
            <p className="box-lines">
              "The most immersive cricket experience on the platform. Join thousands of players in real-time matches and become a legend on the field!"
            </p>
          </div>
        </section>

        <section id="about-dev" className="content-section glass-container">
          <h2>About Dev</h2>
          <p className="section-lines">"Meet the passionate developers behind Blox Cricket. We are dedicated to bringing you the most realistic and competitive sports gaming experience on the platform."</p>
          <div className="dev-cards">
            <div className="dev-card">Name 1</div>
            <div className="dev-card">Name 2</div>
            <div className="dev-card">Name 3</div>
          </div>
        </section>

        <section id="about-game" className="content-section glass-container">
          <h2>About Game</h2>
          <p className="section-lines">"Experience next-generation multiplayer action. Master your timing, build your dream squad, and compete in high-stakes T20 matches against players worldwide."</p>
          <div className="media-box placeholder-box">PICTURE OR VIDEO</div>
        </section>

        {/* --- DYNAMIC GAME UPDATES SECTION --- */}
        <section id="game-updates" className="content-section glass-container">
          <h2>Game Update</h2>
          <ul className="update-list-numbered">
            
            {/* If there are no updates yet, show a fallback message */}
            {updates.length === 0 && (
              <li><span>No updates available right now. Check back soon!</span></li>
            )}

            {/* Loop through the Sanity data and create a list item for each one */}
            {updates.map((update) => (
              <li key={update._id}>
                <span>
                  <strong>{update.version}:</strong> {update.description} 
                  <span style={{color: "var(--neon-green)", marginLeft: "10px", fontSize: "0.85rem"}}>
                    ({update.date})
                  </span>
                </span>
              </li>
            ))}

          </ul>
          <div className="click-more-container">
            <a href="#" className="click-more">Click More &rarr;</a>
          </div>
        </section>

        <section id="media" className="content-section glass-container">
          <h2>Game Pic's / Video</h2>
          <p className="section-lines">"Check out the latest gameplay highlights, massive sixes, and community screenshots right here."</p>
          <div className="media-box large-media-box">PICTURE / VIDEO</div>
        </section>
        
      </main>
    </>
  );
}