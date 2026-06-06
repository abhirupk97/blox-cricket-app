import ScrollLogo from './ScrollLogo';
import MagneticButton from './MagneticButton';

export default function Navbar({ homepage }) {
  return (
    <nav className="navbar">
      <div className="glitch-hover" style={{ display: 'inline-block', cursor: 'pointer' }}>
        <ScrollLogo whiteText={homepage?.navLogoWhite} neonText={homepage?.navLogoNeon} />
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
        <a href="/login" className="glitch-hover" style={{ textDecoration: 'none', color: 'var(--text-main)', padding: '8px 15px', fontWeight: 'bold', letterSpacing: '1px' }}>
          LOGIN
        </a>
      </div>
    </nav>
  );
}