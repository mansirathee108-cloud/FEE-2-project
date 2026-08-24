
import { Link } from 'react-router-dom';

export default function Sidebar(){
    return (
        <>
        <div id="side" className="side">
            <Link to="/">🏠 Home</Link>
            <Link to="/health">🏥 Health</Link>
            <Link to="/food">🍔 Food</Link>
            <Link to="/education">🎓 Education</Link>
            <Link to="/security">🛡 Security</Link>
            <Link to="/tourism">✈ Tourism</Link>
        </div>
        </>
    )
}