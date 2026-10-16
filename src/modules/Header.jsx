import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useWeather from '../context/useWeather.js';
import './Header.css';

export default function Header({ user, onLogout }) {
  const { weather, status } = useWeather();

  useEffect(() => {
    const sidebarButton = document.querySelectorAll('.sidebarButton');
    const body = document.querySelector('body');
    const sideMenu = document.querySelector('#side');

    sidebarButton.forEach((btn) => {
      btn.addEventListener('click', (event) => {
        event.stopPropagation();
        sideMenu.classList.add('show');
        body.classList.add('dimmed');
      });
    });

    body.addEventListener('click', () => {
      sideMenu.classList.remove('show');
      body.classList.remove('dimmed');
    });

    updateClock();
    const clockInterval = setInterval(updateClock, 1000);

    return () => clearInterval(clockInterval);
  }, []);

  function updateClock() {
    const now = new Date();
    const dateOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    const timeOptions = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
    const date = now.toLocaleDateString('en-US', dateOptions);
    const time = now.toLocaleTimeString('en-US', timeOptions);
    const dateBox = document.querySelector('.status .date');
    const clockBox = document.querySelector('.status h2');
    if (dateBox) dateBox.innerHTML = date;
    if (clockBox) clockBox.innerHTML = time;
  }

  return (
    <>
      <header>
        <div className="container">
          <nav>
            <Link style={{ 'text-decoration': 'none' }} to="/" className="logo">
              <img src="/Navy_blue_circle_with_tree_202607301434.jpeg" alt="Logo" />
              <h1 className="moduleWhiteText">
                Oakridge <span>Smart City</span>
              </h1>
            </Link>
            <div className="menu">
              <Link to="/">Home</Link>
              <a className="sidebarButton">Departments</a>
              <a href="#contact">Contact</a>
            </div>
            <div className="account">
              <span>{user.username}</span>
              <button type="button" onClick={onLogout}>
                Log out
              </button>
            </div>
            <div className="status">
              <p className="date">Monday, 20 July 2026</p>
              <h2>09:45 AM</h2>
              <p className="flex">
                {weather && <img src={weather.iconUrl} alt={weather.condition} />}
                <span className="changeTemp">
                  {weather ? `${weather.temperatureC}°C` : status === 'loading' ? '...' : '--°C'}
                </span>
              </p>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
