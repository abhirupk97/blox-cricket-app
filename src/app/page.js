import ScrollLogo from './ScrollLogo';
import Head from 'next/head';
import { client } from '../sanity/lib/client';
import imageUrlBuilder from '@sanity/image-url';
import DevPopup from './DevPopup'; 
import UpdatePopup from './UpdatePopup';
export const revalidate = 0; 
import RevealOnScroll from './RevealOnScroll';
import HeroTypewriter from './HeroTypewriter';
import MediaGalleryPopup from './MediaGalleryPopup';
import FireflyBackground from './FireflyBackground';
import Preloader from './Preloader';
import MagneticButton from './MagneticButton';

const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}

export default async function Home() {
  
  const updates = await client.fetch(`*[_type == "gameUpdate"] | order(date desc)`);
  const homepage = await client.fetch(`*[_type == "homepage"][0]{
    ..., 
    "bgVideoUrl": bgVideo.asset->url 
  }`);

  return (
    <>
      <Preloader /> {/* BOOT SEQUENCE INITIALIZED */}
      <Head>
        <title>Cricket Game Website</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </Head>

      {/* --- DYNAMIC BACKGROUND CONTROLLER --- */}
      {homepage?.bgVideoUrl ? (
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            objectFit: 'cover',
            zIndex: -2,
            background: '#0a0a0a'
          }}
        >
          <source src={homepage.bgVideoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        homepage?.bgImage && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            backgroundImage: `url(${urlFor(homepage.bgImage).url()})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            zIndex: -2,
            background: '#0a0a0a'
          }}></div>
        )
      )}

      {/* Dark Overlay */}
      <div className="bg-overlay"></div>

      {/* Navigation Bar */}
      <nav className="navbar">
        {/* INTERACTIVE SCROLL-TO-TOP LOGO */}
        <ScrollLogo 
          whiteText={homepage?.navLogoWhite} 
          neonText={homepage?.navLogoNeon} 
        />
        
        {/* MAGNETIC NAVBAR LINKS */}
        <ul className="nav-links">
          <li><MagneticButton href="#about-dev" className="scroll-link" style={{border: 'none', padding: '8px 15px'}}><i className="fa-solid fa-user-gear"></i> Abt Dev</MagneticButton></li>
          <li><MagneticButton href="#about-game" className="scroll-link" style={{border: 'none', padding: '8px 15px'}}><i className="fa-solid fa-gamepad"></i> Abt Game</MagneticButton></li>
          <li><MagneticButton href="#game-updates" className="scroll-link" style={{border: 'none', padding: '8px 15px'}}><i className="fa-solid fa-bell"></i> Game Updates</MagneticButton></li>
          <li><MagneticButton href="#media" className="scroll-link" style={{border: 'none', padding: '8px 15px'}}><i className="fa-solid fa-video"></i> Media</MagneticButton></li>
        </ul>
        
        {/* MAGNETIC PROFILE LOGIN MENU */}
        <div className="profile-menu">
          <MagneticButton style={{border: 'none', padding: '8px 15px'}}>
            <span>{homepage?.playerName || 'BloxPlayer'} <i className="fa-solid fa-chevron-down"></i></span>
          </MagneticButton>
        </div>
      </nav>

      {/* Main Content Canvas */}
      <main className="dashboard-container">
        
        {/* --- THE NEON FIREFLIES --- */}
        <FireflyBackground />

        {/* HERO SECTION */}
        <section className="hero-section">
          <div className="main-content">
            <HeroTypewriter title={homepage?.heroTitle} />
            <p className="hero-lines">
              {homepage?.heroText || 'Step onto the pitch and experience the ultimate T20 multiplayer cricket showdown.'}
            </p>
          </div>
          
          <div className="info-box">
            <p className="box-lines">
              "{homepage?.infoQuote || 'The most immersive cricket experience on the platform.'}"
            </p>
          </div>
        </section>

        {/* 1. ABOUT DEV SECTION - Now uses 3D Rotate! */}
        <RevealOnScroll id="about-dev" className="content-section glass-container" animationType="rotate">
          <h2>About Dev</h2>
          <p className="section-lines">"{homepage?.aboutDevText || 'Meet the passionate developers behind Blox Cricket.'}"</p>
          <DevPopup developers={homepage?.devNames} />
        </RevealOnScroll>

        {/* 2. ABOUT GAME SECTION - Now uses Scale & Pop! */}
        <RevealOnScroll id="about-game" className="content-section glass-container" animationType="scale">
          <h2>About Game</h2>
          <p className="section-lines">"{homepage?.aboutGameText || 'Experience next-generation multiplayer action.'}"</p>
          
          {homepage?.aboutGameMedia ? (
            <img 
              src={urlFor(homepage.aboutGameMedia).url()} 
              alt="About Game Content" 
              style={{width: '100%', borderRadius: '8px', border: '1px dashed #444', marginTop: '1rem'}} 
            />
          ) : (
            <div className="media-box placeholder-box">PICTURE OR VIDEO</div>
          )}
          
          <MediaGalleryPopup title="Game Screenshots" buttonText="View Screenshots &rarr;" />
        </RevealOnScroll>

        {/* 3. GAME UPDATES SECTION - Uses classic Slide Up */}
        <RevealOnScroll id="game-updates" className="content-section glass-container" animationType="slide-up">
          <h2>Game Update</h2>
          <ul className="update-list-numbered">
            {updates.length === 0 && (
              <li><span>No updates available right now. Check back soon!</span></li>
            )}
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
          <UpdatePopup updates={updates} />
        </RevealOnScroll>

        {/* 4. MEDIA SECTION - Now uses 3D Rotate! */}
        <RevealOnScroll id="media" className="content-section glass-container" animationType="rotate">
          <h2>Game Pic's / Video</h2>
          <p className="section-lines">"{homepage?.mediaText || 'Check out the latest gameplay highlights.'}"</p>
          
          {homepage?.mediaMainImage ? (
            <img 
              src={urlFor(homepage.mediaMainImage).url()} 
              alt="Game Media Content" 
              style={{width: '100%', borderRadius: '8px', border: '1px dashed #444', marginTop: '1rem'}} 
            />
          ) : (
            <div className="media-box large-media-box">PICTURE / VIDEO</div>
          )}

          <MediaGalleryPopup title="Videos & Media" buttonText="View Full Gallery &rarr;" />
        </RevealOnScroll>
        
      </main>
    </>
  );
}