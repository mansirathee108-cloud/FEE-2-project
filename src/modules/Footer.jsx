export default function Footer(){
    return(
        <>
        <footer>
            <div className="container footer-grid moduleWhiteText">
                <div>
                    <h2>Oakridge Smart City</h2>
                    <p>
                        Building a Smarter, Safer and Greener Future through
                        Innovation and Technology.
                    </p>
                </div>
                <div>
                    <h3>Departments</h3>
                    <ul>
                        <li>Health</li>
                        <li>Food</li>
                        <li>Education</li>
                        <li>Security</li>
                        <li>Tourism</li>
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
            <p className="copyright">
                © 2026 Oakridge Smart City | Academic Project
            </p>
        </footer>
        </>
    )
}