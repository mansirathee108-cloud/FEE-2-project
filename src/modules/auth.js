const SESSION_KEY = 'oakridgeUser';

const USERS = {
    mayor: { password: 'mayor', role: 'Mayor' },
    police: { password: 'police', role: 'Police' },
    restaurant: { password: 'restaurant', role: 'Restaurant Staff' },
    citizen: { password: 'citizen', role: 'Citizen' }
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