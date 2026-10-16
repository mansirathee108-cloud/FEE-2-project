import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer>
      <div className="container footer-grid moduleWhiteText">
        <div>
          <h2>Oakridge Smart City</h2>
          <p>Building a Smarter, Safer and Greener Future through Innovation and Technology.</p>
        </div>
        <div>
          <h3>Departments</h3>
          <ul>
            <li>
              <Link to="/health">Health</Link>
            </li>
            <li>
              <Link to="/food">Food</Link>
            </li>
            <li>
              <Link to="/education">Education</Link>
            </li>
            <li>
              <Link to="/security">Security</Link>
            </li>
            <li>
              <Link to="/tourism">Tourism</Link>
            </li>
            <li>
              <Link to="/jobs">Jobs</Link>
            </li>
          </ul>
        </div>
        <div id="contact">
          <h3>Contact</h3>
          <p>Email : info@Oakridge.gov</p>
          <p>Phone : +91 9876543210</p>
          <p>Address : Oakridge City Center</p>
        </div>
      </div>
      <hr />
      <p className="copyright">© 2026 Oakridge Smart City | Academic Project</p>
    </footer>
  );
}
