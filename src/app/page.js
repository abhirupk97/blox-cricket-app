import ScrollLogo from './ScrollLogo';
import Head from 'next/head';
import { client } from '../sanity/lib/client';
import imageUrlBuilder from '@sanity/image-url';
import InlineExpand from './InlineExpand';
export const revalidate = 0; 
import RevealOnScroll from './RevealOnScroll';
import HeroTypewriter from './HeroTypewriter';
import MediaGalleryPopup from './MediaGalleryPopup';
import Preloader from './Preloader';
import MagneticButton from './MagneticButton';
import CursorTrail from './CursorTrail';
import TiltWrapper from './TiltWrapper';     
import ScrambleText from './ScrambleText';   
import LagCursor from './LagCursor';
import AboutGameClient from './AboutGameClient';
import ScrollBackgroundSequence from './ScrollBackgroundSequence';

const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}

export default async function Home() {
  
  // Clean, parallel data fetching (Fully Untangled)
  const [updates, homepage, mediaItems, gameFacts, bgSettings] = await Promise.all([
    client.fetch(`*[_type == "gameUpdate"] | order(date desc)`),
    client.fetch(`*[_type == "homepage"][0]{
      ..., 
      "bgVideoUrl": bgVideo.asset->url,
      "roadmapImageUrl": roadmapImage.asset->url,
      aboutDevLine,
      aboutDevText,
      developers,
      devName,
      devRole,
      devQuote,
      devSkills,
      gameFeatures,
      aboutGameSubline,
      aboutGameText
    }`),
    client.fetch(`*[_type == "mediaItem"] | order(_createdAt desc) {
      _id, title, category, type, duration, date,
      "thumbUrl": thumb.asset->url
    }`),
    client.fetch(`*[_type == "gameFact"] { factText }`),
    client.fetch(`*[_type == "backgroundSettings"][0]{
      homeSequence[]{
        videoUrl,
        "imageUrl": image.asset->url
      }
    }`)
  ]);

  return (
    <>
      <CursorTrail /> 
      <LagCursor />
      <Preloader />
      <div className="cinematic-cut"></div> 
      
      <Head>
        <title>Cricket Game Website</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </Head>

      {/* ── THE NEW SCROLLING SEQUENCE BACKGROUND ── */}
      <ScrollBackgroundSequence sequence={bgSettings?.homeSequence} />

      <nav className="navbar">
        <div className="glitch-hover" style={{ display: 'inline-block', cursor: 'pointer' }}>
          <ScrollLogo whiteText={homepage?.navLogoWhite} neonText={homepage?.navLogoNeon} />
        </div>
        
        <ul className="nav-links">
          <li className="nav-drop">
            <MagneticButton href="#about-game" className="scroll-link" style={{border: 'none', padding: '8px 15px'}}>
              OVERVIEW
            </MagneticButton>
          </li>
          <li className="nav-drop">
            <MagneticButton href="/latest" className="scroll-link" style={{border: 'none', padding: '8px 15px'}}>
              GAME LATEST <span className="live-dot"></span>
            </MagneticButton>
          </li>
        </ul>
        
        <div className="profile-menu">
          <a href="/login" className="glitch-hover" data-text="LOGIN" style={{ textDecoration: 'none', color: 'var(--text-main)', padding: '8px 15px', fontWeight: 'bold', letterSpacing: '1px' }}>
            LOGIN
          </a>
        </div>
      </nav>

      <main className="dashboard-container">
        
        {/* ── HERO ── */}
        <section className="hero-section">
          <div className="main-content">
            <HeroTypewriter title={homepage?.heroTitle} />
            <p className="hero-lines glitch-hover" data-text={homepage?.heroText || 'Step onto the pitch and experience the ultimate T20 multiplayer cricket showdown.'}>
              <ScrambleText text={homepage?.heroText || 'Step onto the pitch and experience the ultimate T20 multiplayer cricket showdown.'} />
            </p>
          </div>
          <div className="info-box">
            <p className="box-lines glitch-hover" data-text={`"${homepage?.infoQuote || 'The most immersive cricket experience on the platform.'}"`}>
              "<ScrambleText text={homepage?.infoQuote || 'The most immersive cricket experience on the platform.'} />"
            </p>
          </div>
        </section>

        {/* ── 1. THE DEVs SECTION ── */}
        <RevealOnScroll id="about-dev" className="content-section" animationType="slide-up">
          <div className="devs-cyber-container">
            
            <div className="devs-left-panel">
              <p style={{ fontFamily: 'monospace', color: '#888', marginBottom: '5px', fontSize: '1rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
                "<ScrambleText text={homepage?.aboutDevLine || 'LINE'} />"
              </p>
              <h2 style={{ fontSize: '4.5rem', marginBottom: '1.5rem', textTransform: 'uppercase', textShadow: 'none', color: '#fff', lineHeight: '1' }}>
                <ScrambleText text="THE DEVs" />
              </h2>
              <p style={{ color: '#aaa', lineHeight: '1.6', fontSize: '1.1rem', maxWidth: '400px' }}>
                {homepage?.aboutDevText || 'Crafting clean, performant and impactful web experiences.'}
              </p>
            </div>

            <div className="devs-right-panel">
              <div className="devs-right-panel" style={{ width: '100%' }}>
                <InlineExpand 
                  buttonTextOpen="SEE DEVs →" 
                  buttonTextClose="← HIDE DEVs"
                  className="glitch-hover"
                  data-text="SEE DEVs →"
                  buttonStyle={{ 
                    background: 'transparent', border: '1px solid var(--text-main)', 
                    color: 'var(--text-main)', padding: '12px 30px', fontSize: '1rem',
                    fontWeight: 'bold', letterSpacing: '1px', borderRadius: '4px', cursor: 'pointer' 
                  }}
                >
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                    gap: '2rem', 
                    marginTop: '2.5rem',
                    width: '100%'
                  }}>
                    
                    {homepage?.developers?.map((dev, index) => (
                      <div key={index} className="hacker-profile-card" style={{ maxWidth: '100%', margin: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
                          <i className="fa-regular fa-user" style={{ color: '#39FF14', fontSize: '1.5rem' }}></i>
                          <h3 style={{ margin: 0, fontSize: '1.2rem', letterSpacing: '1px', fontFamily: 'Inter, sans-serif' }}>ABOUT DEV</h3>
                        </div>
                        
                        <p style={{ color: '#aaa', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                          {dev.bio || 'No bio provided.'}
                        </p>
                        
                        <div className="dev-skills-row">
                          {dev.skills?.length > 0 ? (
                            dev.skills.map((skill, sIdx) => (
                              <div key={sIdx} className="skill-tag">
                                <i className="fa-solid fa-code"></i> {skill}
                              </div>
                            ))
                          ) : (
                            <div className="skill-tag"><i className="fa-solid fa-code"></i> Code</div>
                          )}
                        </div>
                        
                        <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.05)', margin: '2.5rem 0' }} />
                        <div className="dev-avatar-ring"><i className="fa-solid fa-code"></i></div>
                        
                        <div style={{ textAlign: 'center' }}>
                          <h2 style={{ fontSize: '2.2rem', margin: '0', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'Teko, sans-serif', letterSpacing: '2px' }}>
                            {dev.name || 'UNKNOWN'} <i className="fa-solid fa-certificate verified-badge"></i>
                          </h2>
                          <p style={{ color: '#888', margin: '5px 0 20px 0', fontSize: '0.95rem' }}>
                            {dev.role || 'Developer'}
                          </p>
                        </div>
                      </div>
                    ))}

                  </div>
                </InlineExpand>
              </div>
            </div>

          </div>
        </RevealOnScroll>

        {/* ── 2. ABOUT GAME SECTION ── */}
        <AboutGameClient 
          homepage={homepage} 
          mediaUrl={homepage?.aboutGameMedia ? urlFor(homepage.aboutGameMedia).url() : null} 
        />

        {/* ── 3. MEDIA SECTION ── */}
        <RevealOnScroll id="media" className="content-section">
          <TiltWrapper 
            className="glass-container" 
            style={{ 
              padding: '3rem',
              background: 'rgba(20, 24, 28, 0.45)',
              backdropFilter: 'blur(12px)',        
              WebkitBackdropFilter: 'blur(12px)',  
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '12px' 
            }}
          >
            <h2 style={{ fontSize: '4rem', textTransform: 'uppercase', marginBottom: '10px' }}>
              <ScrambleText text="Game Pic's / Video" />
            </h2>
            <p className="section-lines" style={{ marginBottom: '2rem' }}>
              {homepage?.mediaText || "Check out the latest gameplay highlights and visual intel."}
            </p>
            
            <div className="ff-media-grid">
              {mediaItems && mediaItems.slice(0, 3).map((item) => (
                <div key={item._id} className="ff-media-card">
                  <div className="ff-media-thumb">
                    <img src={item.thumbUrl} alt={item.title} />
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

            <MediaGalleryPopup 
              title="ALL MEDIA & VIDEOS" 
              buttonText="VIEW FULL GALLERY →" 
              mediaItems={mediaItems} 
            />
          </TiltWrapper>
        </RevealOnScroll>
        
      </main>
    </>
  );
}