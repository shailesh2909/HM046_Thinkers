import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">SkillBridge</h2>

      <div className="nav-actions">
        <button className="btn">Login</button>
        <button className="btn primary">Get Started</button>
      </div>
    </nav>
  );
}
