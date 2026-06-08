import Head from 'next/head';
import { client } from '../../sanity/lib/client'; 
import LagCursor from '../LagCursor';
import CursorTrail from '../CursorTrail';
import MagneticButton from '../MagneticButton';
import ScrambleText from '../ScrambleText';
import RevealOnScroll from '../RevealOnScroll';
import TiltWrapper from '../TiltWrapper';
import GameFacts from '../GameFacts';
import ViewAllUpdatesPopup from '../ViewAllUpdatesPopup';
export const revalidate = 0; 
import GameLeaks from '../GameLeaks';
import ScrollBackgroundSequence from '../ScrollBackgroundSequence';

export default async function LatestUpdatesPage() {
  
  // FETCH ALL DATA INCLUDING HOMEPAGE AND BG SETTINGS (Fixed array and commas)
  const [updates, leaks, homepage, bgSettings] = await Promise.all([
    client.fetch(`*[_type == "gameUpdate"] | order(date desc) {
      _id, version, date, description, "imageUrl": image.asset->url
    }`),
    client.fetch(`*[_type == "gameLeak"] | order(date desc) {
      _id, title, description, "imageUrl": image.asset->url
    }`),
    client.fetch(`*[_type == "homepage"][0]{
      roadmapText,
      "roadmapImageUrl": roadmapImage.asset->url
    }`),
    client.fetch(`*[_type == "backgroundSettings"][0]{
      latestSequence[]{
        videoUrl,
        "imageUrl": image.asset->url
      }
    }`)
  ]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <CursorTrail />
      <LagCursor />
      
      <Head>
        <title>Game Updates | Blox Cricket</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </Head>

      {/* --- INJECT THE SCROLLING BACKGROUND ENGINE HERE --- */}
      <ScrollBackgroundSequence sequence={bgSettings?.latestSequence} />

      <nav className="navbar" style={{ borderBottom: '1px solid rgba(0,194,255,0.2)' }}>
        <div className="glitch-hover" style={{ display: 'inline-block', cursor: 'pointer' }}>
          <a href="/" style={{ textDecoration: 'none' }}>
            <h2 style={{ margin: 0, fontFamily: 'Teko, sans-serif', fontSize: '2rem', fontStyle: 'italic', color: 'var(--text-main)', textTransform: 'uppercase', letterSpacing: '1px' }}>
              BLOX<span style={{ color: 'var(--neon-green)' }}>CRICKET</span>
            </h2>
          </a>
        </div>

        <ul className="nav-links">
          <li className="nav-drop">
            <MagneticButton href="/" className="scroll-link" style={{border: 'none', padding: '8px 15px'}}>
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

      <main className="dashboard-container" style={{ maxWidth: '1200px', marginTop: '2rem', flex: 1 }}>
        
        <div style={{ marginBottom: '3rem', borderBottom: '2px solid #333', paddingBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <h1 className="mega-title" style={{ fontSize: '4rem', textShadow: 'none' }}>
              <ScrambleText text="GAME_UPDATES" />
            </h1>
            <div style={{ width: '60px', height: '4px', background: 'var(--accent-secondary)', marginTop: '10px' }}></div>
          </div>
          <ViewAllUpdatesPopup updates={updates} />
        </div>

        <div className="news-grid">
          {updates.length === 0 ? (
            <p className="glitch-hover" data-text="NO CLASSIFIED DATA FOUND.">NO CLASSIFIED DATA FOUND.</p>
          ) : (
            updates.slice(0, 3).map((update) => (
              <div key={update._id} className="news-card">
                <div className="news-image-container">
                  {update.imageUrl ? (
                    <img src={update.imageUrl} alt={`Build ${update.version}`} className="news-image" />
                  ) : (
                    <div style={{ color: '#444', fontFamily: 'Teko', fontSize: '2rem', letterSpacing: '3px' }}>NO VISUAL INTEL</div>
                  )}
                </div>
                <div className="news-content">
                  <div className="news-meta">
                    <span>{update.date || 'RECENT'}</span>
                    <span className="meta-divider">|</span>
                    <span style={{ color: 'var(--text-main)' }}>PATCH</span>
                  </div>
                  <h3 className="news-title">Build Update {update.version} Deployed</h3>
                  <p className="news-description">{update.description}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* --- DYNAMIC ROADMAP SECTION --- */}
        <RevealOnScroll id="roadmap" className="content-section">
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
            <h2 className="glitch-hover" data-text="PROJECT ROADMAP" style={{ color: 'var(--accent-secondary)' }}>PROJECT ROADMAP</h2>
            <div className="blinking-cursor-wrapper">
              <input 
                type="text" 
                className="live-input glitch-hover" 
                data-text={homepage?.roadmapText || "> SYSTEM_UPDATE: Q4_2026_TARGETS"}
                defaultValue={homepage?.roadmapText || "> SYSTEM_UPDATE: Q4_2026_TARGETS"} 
                readOnly
                spellCheck="false" 
              />
            </div>
             <div className="roadmap-wipe-container mt-4">
              <img 
                src={homepage?.roadmapImageUrl || "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=2070&auto=format&fit=crop"} 
                alt="Roadmap" 
                className="roadmap-image" 
              />
            </div>
          </TiltWrapper>
        </RevealOnScroll>

        <GameLeaks leaksData={leaks} />

      </main> 
    
      <div style={{ marginTop: 'auto' }}>
        <GameFacts />
      </div>
    </div>
  );
}