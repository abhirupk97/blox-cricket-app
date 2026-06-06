import ScrollLogo from './ScrollLogo';
import Head from 'next/head';
import { client } from '../sanity/lib/client';
import imageUrlBuilder from '@sanity/image-url';
import InlineExpand from './InlineExpand';
export const revalidate = 0; 
import RevealOnScroll from './RevealOnScroll';
import HeroTypewriter from './HeroTypewriter';
import FeaturesPopup from './FeaturesPopup';
import MediaGalleryPopup from './MediaGalleryPopup';
import FireflyBackground from './FireflyBackground';
import Preloader from './Preloader';
import MagneticButton from './MagneticButton';
import CursorTrail from './CursorTrail';
import TiltWrapper from './TiltWrapper';     
import ScrambleText from './ScrambleText';   
import DynamicBackground from './DynamicBackground'; // <-- NEW!
import DevProfilePopup from './DevProfilePopup';
import LagCursor from './LagCursor';
const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}

export default async function Home() {
  
  const updates = await client.fetch(`*[_type == "gameUpdate"] | order(date desc)`);
  // Dummy Database for the Free Fire Media Layout
  const MEDIA_DATABASE = [
    { id: 1, type: 'video', duration: '01:52', thumb: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop', date: '03/06/2026', category: 'OFFICIAL TRAILER', title: 'Season 1 Gameplay Reveal' },
    { id: 2, type: 'video', duration: '00:48', thumb: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop', date: '13/06/2026', category: 'EVENTS', title: 'Rampage Events Throwback' },
    { id: 3, type: 'image', duration: 'GALLERY', thumb: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop', date: '16/06/2026', category: 'DEV LOG', title: 'New Stadium Architecture Setup' },
    { id: 4, type: 'video', duration: '02:15', thumb: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=2165&auto=format&fit=crop', date: '21/06/2026', category: 'ESPORTS', title: 'World Series 2026 Highlights' },
  ];

  
  const homepage = await client.fetch(`*[_type == "homepage"][0]{
    ..., 
    "bgVideoUrl": bgVideo.asset->url 
  }`);

  return (
    <>
      <CursorTrail /> 
      <LagCursor />

      <Preloader />
      {/* The Cinematic Cut transition */}
      <div className="cinematic-cut"></div> 
      
      <Head>
        <title>Cricket Game Website</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </Head>

      {homepage?.bgVideoUrl ? (
        <video 
          autoPlay muted loop playsInline 
          style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', objectFit: 'cover', zIndex: -2, background: '#0a0a0a' }}
        >
          <source src={homepage.bgVideoUrl} type="video/mp4" />
        </video>
      ) : (
        homepage?.bgImage && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', backgroundImage: `url(${urlFor(homepage.bgImage).url()})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', zIndex: -2, background: '#0a0a0a' }}></div>
        )
      )}

      {/* --- INJECTED DYNAMIC SCROLL BACKGROUND --- */}
      <DynamicBackground />

      <nav className="navbar">
        {/* 1. Added the glitch-hover wrapper to the Logo */}
        <div className="glitch-hover" style={{ display: 'inline-block', cursor: 'pointer' }}>
          <ScrollLogo whiteText={homepage?.navLogoWhite} neonText={homepage?.navLogoNeon} />
        </div>
        
        <ul className="nav-links">
          {/* 2. Removed Media & Dev Logs. 3. Removed glitch-hover from these two. */}
          <li className="nav-drop">
            <MagneticButton href="#about-game" className="scroll-link" style={{border: 'none', padding: '8px 15px'}}>
              OVERVIEW
            </MagneticButton>
          </li>
          <li className="nav-drop">
            {/* Changed href from #game-updates to /latest */}
            <MagneticButton href="/latest" className="scroll-link" style={{border: 'none', padding: '8px 15px'}}>
              GAME LATEST <span className="live-dot"></span>
            </MagneticButton>
          </li>
        </ul>
        
        {/* 4. Removed MagneticButton, kept glitch-hover, changed text to LOGIN */}
        <div className="profile-menu">
          <a href="#login" className="glitch-hover" style={{ textDecoration: 'none', color: 'var(--text-main)', padding: '8px 15px', fontWeight: 'bold', letterSpacing: '1px' }}>
            LOGIN
          </a>
        </div>
      </nav>

      <main className="dashboard-container">
        
        <FireflyBackground />

        <section className="hero-section">
          <div className="main-content">
            <HeroTypewriter title={homepage?.heroTitle} />
            <p className="hero-lines glitch-hover">
              <ScrambleText text={homepage?.heroText || 'Step onto the pitch and experience the ultimate T20 multiplayer cricket showdown.'} />
            </p>
          </div>
          
          <div className="info-box">
            <p className="box-lines glitch-hover">
              "<ScrambleText text={homepage?.infoQuote || 'The most immersive cricket experience on the platform.'} />"
            </p>
          </div>
        </section>

        {/* 1. THE DEVs SECTION */}
        <RevealOnScroll id="about-dev" className="content-section" animationType="slide-up">
          <div className="devs-cyber-container">
            
            {/* Left Panel: Text & Orange Line */}
            <div className="devs-left-panel">
              
              {/* Swapped Order: "LINE" is now on top */}
              <p style={{ fontFamily: 'monospace', color: '#888', marginBottom: '5px', fontSize: '1rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
                "<ScrambleText text={homepage?.aboutDevText || 'LINE'} />"
              </p>
              
              {/* Title is now below the line */}
              <h2 style={{ fontSize: '4.5rem', marginBottom: '1.5rem', textTransform: 'uppercase', textShadow: 'none', color: '#fff', lineHeight: '1' }}>
                <ScrambleText text="THE DEVs" />
              </h2>
              
              <p style={{ color: '#aaa', lineHeight: '1.6', fontSize: '1.1rem', maxWidth: '400px' }}>
                Crafting clean, performant and impactful web experiences for the ultimate competitive arena.
              </p>
            </div>

            {/* Right Panel: Replaced Popup with Inline Expand */}
            <div className="devs-right-panel">
              <InlineExpand 
                buttonTextOpen="SEE DEVs &rarr;" 
                buttonTextClose="&larr; HIDE DEVs"
                buttonStyle={{ 
                  background: 'transparent', border: '1px solid var(--text-main)', 
                  color: 'var(--text-main)', padding: '12px 30px', fontSize: '1rem',
                  fontWeight: 'bold', letterSpacing: '1px', borderRadius: '4px', cursor: 'pointer'
                }}
              >
                {/* The Hacker Profile Card now renders inline directly below! */}
                <div className="hacker-profile-card" style={{ marginTop: '2rem', marginLeft: 'auto' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
                    <i className="fa-regular fa-user" style={{ color: '#39FF14', fontSize: '1.5rem' }}></i>
                    <h3 style={{ margin: 0, fontSize: '1.2rem', letterSpacing: '1px', fontFamily: 'Inter, sans-serif' }}>ABOUT DEV</h3>
                  </div>
                  <p style={{ color: '#aaa', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                    Passionate developer who loves turning ideas into real world products. Focused on clean code, performance and great user experiences.
                  </p>
                  <div className="dev-skills-row">
                    <div className="skill-tag"><i className="fa-solid fa-code"></i> Code</div>
                    <div className="skill-tag"><i className="fa-solid fa-cube"></i> Build</div>
                    <div className="skill-tag"><i className="fa-solid fa-cloud-arrow-up"></i> Deploy</div>
                    <div className="skill-tag"><i className="fa-solid fa-rocket"></i> Innovate</div>
                  </div>
                  <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.05)', margin: '2.5rem 0' }} />
                  <div className="dev-avatar-ring"><i className="fa-solid fa-code"></i></div>
                  <div style={{ textAlign: 'center' }}>
                    <h2 style={{ fontSize: '2.2rem', margin: '0', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'Teko, sans-serif', letterSpacing: '2px' }}>
                      ABHIRUP <i className="fa-solid fa-certificate verified-badge"></i>
                    </h2>
                    <p style={{ color: '#888', margin: '5px 0 20px 0', fontSize: '0.95rem' }}>Full Stack Developer</p>
                  </div>
                </div>
              </InlineExpand>
            </div>

          </div>
        </RevealOnScroll>
       {/* 2. ABOUT GAME SECTION (GTA STYLE) */}
        <RevealOnScroll id="about-game" className="content-section">
          <div className="gta-split-section">
            
            {/* Left Column: The Large Game Image */}
            <div className="gta-split-media">
              {homepage?.aboutGameMedia ? (
                <img src={urlFor(homepage.aboutGameMedia).url()} alt="About Game Content" />
              ) : (
                <div className="media-box" style={{ height: '500px', background: '#0a0a0a', border: 'none' }}>
                  GAME HERO ART
                </div>
              )}
            </div>

            {/* Right Column: Title, Text, and the Features Button */}
            <div className="gta-split-text">
              <h2 style={{ fontSize: '4.5rem', marginBottom: '1rem', textShadow: 'none', lineHeight: '1.1' }}>
                <ScrambleText text="About Game" />
              </h2>
              
              <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#ccc', marginBottom: '2.5rem' }}>
                {homepage?.aboutGameText || 'When a young street hustler, a retired bank robber, and a terrifying psychopath find themselves entangled with the criminal underworld, they must pull off a series of dangerous heists to survive in a ruthless city.'}
              </p>
              
              <div style={{ alignSelf: 'flex-start' }}>
                <FeaturesPopup buttonText="SEE FEATURES &rarr;" />
              </div>
            </div>

          </div>
        </RevealOnScroll>

        
        {/* 4. MEDIA SECTION (FREE FIRE STYLE) */}
        <RevealOnScroll id="media" className="content-section">
          <TiltWrapper className="glass-container" style={{ padding: '3rem' }}>
            <h2 style={{ fontSize: '4rem', textTransform: 'uppercase', marginBottom: '10px' }}>
              <ScrambleText text="Game Pic's / Video" />
            </h2>
            <p className="section-lines" style={{ marginBottom: '2rem' }}>
              "Check out the latest gameplay highlights and visual intel."
            </p>
            
            {/* The Main Page 3-Item Grid */}
            <div className="ff-media-grid">
              {MEDIA_DATABASE.slice(0, 3).map((item) => (
                <div key={item.id} className="ff-media-card">
                  {/* Clicking a main page item just opens the Full Gallery to keep server components clean */}
                  <div className="ff-media-thumb">
                    <img src={item.thumb} alt={item.title} />
                    <div className="ff-play-badge">
                      <i className={item.type === 'video' ? 'fa-solid fa-play' : 'fa-solid fa-camera'}></i>
                      {item.duration || 'IMAGE'}
                    </div>
                  </div>
                  <div className="ff-media-meta">
                    {item.date} <span className="ff-meta-divider">|</span> {item.category}
                  </div>
                  <div className="ff-media-title">{item.title}</div>
                </div>
              ))}
            </div>

            {/* Passes the whole database into the popup */}
            <MediaGalleryPopup 
              title="ALL MEDIA & VIDEOS" 
              buttonText="VIEW FULL GALLERY &rarr;" 
              mediaItems={MEDIA_DATABASE} 
            />
          </TiltWrapper>
        </RevealOnScroll>
        
       
        
      </main>
    </>
  );
}