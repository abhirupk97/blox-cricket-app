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
import CursorTrail from './CursorTrail';
import TiltWrapper from './TiltWrapper';     
import ScrambleText from './ScrambleText';   

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
      <CursorTrail /> 
      <Preloader /> 
      
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

      <div className="bg-overlay"></div>

      <nav className="navbar">
        <ScrollLogo whiteText={homepage?.navLogoWhite} neonText={homepage?.navLogoNeon} />
        
        <ul className="nav-links">
          {/* ADDED GLITCH-HOVER TO ALL NAV LINKS */}
          <li><MagneticButton href="#about-dev" className="scroll-link glitch-hover" style={{border: 'none', padding: '8px 15px'}}><i className="fa-solid fa-user-gear"></i> Abt Dev</MagneticButton></li>
          <li><MagneticButton href="#about-game" className="scroll-link glitch-hover" style={{border: 'none', padding: '8px 15px'}}><i className="fa-solid fa-gamepad"></i> Abt Game</MagneticButton></li>
          <li><MagneticButton href="#game-updates" className="scroll-link glitch-hover" style={{border: 'none', padding: '8px 15px'}}><i className="fa-solid fa-bell"></i> Game Updates</MagneticButton></li>
          <li><MagneticButton href="#media" className="scroll-link glitch-hover" style={{border: 'none', padding: '8px 15px'}}><i className="fa-solid fa-video"></i> Media</MagneticButton></li>
        </ul>
        
        <div className="profile-menu">
          {/* ADDED GLITCH-HOVER TO THE PROFILE MENU */}
          <MagneticButton className="glitch-hover" style={{border: 'none', padding: '8px 15px'}}>
            <span>{homepage?.playerName || 'BloxPlayer'} <i className="fa-solid fa-chevron-down"></i></span>
          </MagneticButton>
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

        {/* 1. ABOUT DEV SECTION */}
        <RevealOnScroll id="about-dev" className="content-section" animationType="rotate">
          <TiltWrapper className="glass-container">
            <h2 className="glitch-hover">About Dev</h2>
            <p className="section-lines glitch-hover">
              "<ScrambleText text={homepage?.aboutDevText || 'Meet the passionate developers behind Blox Cricket.'} />"
            </p>
            <DevPopup developers={homepage?.devNames} />
          </TiltWrapper>
        </RevealOnScroll>

        {/* 2. ABOUT GAME SECTION */}
        <RevealOnScroll id="about-game" className="content-section" animationType="scale">
          <TiltWrapper className="glass-container">
            <h2 className="glitch-hover">About Game</h2>
            <p className="section-lines glitch-hover">
              "<ScrambleText text={homepage?.aboutGameText || 'Experience next-generation multiplayer action.'} />"
            </p>
            
            {homepage?.aboutGameMedia ? (
              <img src={urlFor(homepage.aboutGameMedia).url()} alt="About Game Content" style={{width: '100%', borderRadius: '8px', border: '1px dashed #444', marginTop: '1rem'}} />
            ) : (
              <div className="media-box placeholder-box glitch-hover">PICTURE OR VIDEO</div>
            )}
            
            <MediaGalleryPopup title="Game Screenshots" buttonText="View Screenshots &rarr;" />
          </TiltWrapper>
        </RevealOnScroll>

        {/* 3. GAME UPDATES SECTION */}
        <RevealOnScroll id="game-updates" className="content-section" animationType="slide-up">
          <TiltWrapper className="glass-container">
            <h2 className="glitch-hover">Game Update</h2>
            <ul className="update-list-numbered">
              {updates.length === 0 && (
                <li className="glitch-hover"><span>No updates available right now. Check back soon!</span></li>
              )}
              {updates.map((update) => (
                <li key={update._id} className="glitch-hover">
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
          </TiltWrapper>
        </RevealOnScroll>

        {/* 4. MEDIA SECTION */}
        <RevealOnScroll id="media" className="content-section" animationType="rotate">
          <TiltWrapper className="glass-container">
            <h2 className="glitch-hover">Game Pic's / Video</h2>
            <p className="section-lines glitch-hover">
              "<ScrambleText text={homepage?.mediaText || 'Check out the latest gameplay highlights.'} />"
            </p>
            
            {homepage?.mediaMainImage ? (
              <img src={urlFor(homepage.mediaMainImage).url()} alt="Game Media Content" style={{width: '100%', borderRadius: '8px', border: '1px dashed #444', marginTop: '1rem'}} />
            ) : (
              <div className="media-box large-media-box glitch-hover">PICTURE / VIDEO</div>
            )}

            <MediaGalleryPopup title="Videos & Media" buttonText="View Full Gallery &rarr;" />
          </TiltWrapper>
        </RevealOnScroll>
        
      </main>
    </>
  );
}