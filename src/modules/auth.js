const SESSION_KEY = 'oakridgeUser';

const USERS = {
  mayor: { password: 'WorldwidePersonality1', role: 'Mayor' },
  police: { password: 'WorldwidePersonality1', role: 'Police' },
  restaurant: { password: 'WorldwidePersonality1', role: 'Restaurant Staff' },
  citizen: { password: 'WorldwidePersonality1', role: 'Citizen' },
};

export function login(username, password) {
  const user = USERS[username.toLowerCase()];

  if (!user || user.password !== password) {
    return null;
  }

  const session = { username: username.toLowerCase(), role: user.role };
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export function getCurrentUser() {
  try {
    return JSON.parse(sessionStorage.getItem(SESSION_KEY) || 'null');
  } catch {
    return null;
  }
}

export function logout() {
  sessionStorage.removeItem(SESSION_KEY);
}

export function canAccess(user, roles) {
  return Boolean(user && roles.includes(user.username));
}
