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
import { validateForm } from './api/validator.js';

const Main = lazy(() => import('./pages/MainPage.jsx'));
const Health = lazy(() => import('./pages/HealthPage.jsx'));
const Food = lazy(() => import('./pages/FoodPage.jsx'));
const Education = lazy(() => import('./pages/EducationPage.jsx'));
const Security = lazy(() => import('./pages/SecurityPage.jsx'));
const Tourism = lazy(() => import('./pages/TourismPage.jsx'));
const Jobs = lazy(() => import('./pages/Jobs.jsx'));

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setError('');
    setFieldErrors({});
    setLoading(true);

    try {
      const result = await validateForm({ email, username, password });

      if (!result.success) {
        // Collect field-specific errors
        const errors = {};
        result.results.forEach(r => {
          if (!r.valid) errors[r.field] = r.message;
        });
        setFieldErrors(errors);
        setError('Please fix the validation errors below.');
        return;
      }

      // If validation passes, proceed with existing login logic
      const user = login(username, password);
      if (!user) {
        setError('Use the username as both username and password.');
        return;
      }
      onLogin(user);
    } catch (err) {
      setError('Validation service unavailable. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ maxWidth: '420px', margin: '10vh auto', padding: '32px', textAlign: 'center' }}>
      <h1>Oakridge Smart City</h1>
      <p>Sign in to access city services.</p>
      <form onSubmit={submit} style={{ display: 'grid', gap: '12px' }}>
        <FormField
          id="login-email"
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          error={fieldErrors.email}
        />
        <FormField
          id="login-username"
          label="Username"
          autoComplete="username"
          placeholder="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
          error={fieldErrors.username}
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
          error={fieldErrors.password}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Validating...' : 'Sign in'}
        </button>
      </form>
      {error && <p role="alert" style={{ color: 'red' }}>{error}</p>}
      <small>Accounts: mayor, police, restaurant, citizen (password: WorldwidePersonality1)</small>
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
