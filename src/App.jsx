import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { lazy, Suspense, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '/src/modules/Header.jsx';
import Sidebar from './modules/Sidebar.jsx';
import Footer from './modules/Footer.jsx';
import './App.css';
import { getCurrentUser, login, logout } from './modules/auth.js';
import { resolveLocation } from './store/locationSlice.js';
import { WeatherProvider } from './context/WeatherContext.jsx';
import FormField from './components/FormField.jsx';

const Main = lazy(() => import('./pages/MainPage.jsx'));
const Health = lazy(() => import('./pages/HealthPage.jsx'));
const Food = lazy(() => import('./pages/FoodPage.jsx'));
const Education = lazy(() => import('./pages/EducationPage.jsx'));
const Security = lazy(() => import('./pages/SecurityPage.jsx'));
const Tourism = lazy(() => import('./pages/TourismPage.jsx'));
const Jobs = lazy(() => import('./pages/Jobs.jsx'));

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function submit(event) {
    event.preventDefault();
    const user = login(username, password);
    if (!user) {
      setError('Use the username as both username and password.');
      return;
    }
    onLogin(user);
  }

  return (
    <main style={{ maxWidth: '420px', margin: '10vh auto', padding: '32px', textAlign: 'center' }}>
      <h1>Oakridge Smart City</h1>
      <p>Sign in to access city services.</p>
      <form onSubmit={submit} style={{ display: 'grid', gap: '12px' }}>
        <FormField
          id="login-username"
          label="Username"
          autoComplete="username"
          placeholder="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />
        <FormField
          id="login-password"
          label="Password"
          type="password"
          autoComplete="current-password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        <button type="submit">Sign in</button>
      </form>
      {error && <p role="alert">{error}</p>}
      <small>Accounts: mayor, police, restaurant, citizen</small>
    </main>
  );
}

function App() {
  const [user, setUser] = useState(getCurrentUser);

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <>
      <BrowserRouter>
        <PageLayout
          user={user}
          onLogout={() => {
            logout();
            setUser(null);
          }}
        />
      </BrowserRouter>
    </>
  );
}

function PageLayout({ user, onLogout }) {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const locationStatus = useSelector((state) => state.location.status);

  useEffect(() => {
    if (locationStatus === 'idle') dispatch(resolveLocation());
  }, [dispatch, locationStatus]);

  useEffect(() => {
    const page =
      {
        '/': 'main',
        '/main': 'main',
        '/health': 'health',
        '/food': 'food',
        '/education': 'education',
        '/security': 'security',
        '/tourism': 'tourism',
        '/jobs': 'jobs',
      }[pathname] || 'main';

    document.body.dataset.page = page;

    return () => {
      delete document.body.dataset.page;
    };
  }, [pathname]);

  return (
    <WeatherProvider>
      <>
        <Header user={user} onLogout={onLogout} />
        <Suspense fallback={<main aria-busy="true" className="route-loading" />}>
          <Routes>
            <Route path="*" element={<Main />} />
            <Route path="/health" element={<Health />} />
            <Route path="/food" element={<Food />} />
            <Route path="/education" element={<Education />} />
            <Route path="/tourism" element={<Tourism />} />
            <Route path="/security" element={<Security />} />
            <Route path="/jobs" element={<Jobs />} />
          </Routes>
        </Suspense>
        <Footer />
        <Sidebar />
      </>
    </WeatherProvider>
  );
}

export default App;
