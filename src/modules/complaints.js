const COMPLAINTS_KEY = 'cityComplaints';
const PANIC_KEY = 'securityPanicActivated';

export function saveActivity(source, text, type = 'submission') {
    const complaint = text.trim();

    if (!complaint) {
        return false;
    }

    const complaints = getComplaints();
    complaints.unshift({
        id: `${Date.now()}-${Math.random()}`,
        source,
        text: complaint,
        type,
        submittedAt: new Date().toISOString()
    });

    localStorage.setItem(COMPLAINTS_KEY, JSON.stringify(complaints));
    return true;
}

export function saveComplaint(source, text) {
    return saveActivity(source, text, 'complaint');
}

export function getComplaints() {
    try {
        const stored = JSON.parse(localStorage.getItem(COMPLAINTS_KEY) || '[]');
        return Array.isArray(stored) ? stored : [];
    } catch {
        return [];
    }
}

export function setPanicAlert(active) {
    if (active) {
        localStorage.setItem(PANIC_KEY, new Date().toISOString());
    } else {
        localStorage.removeItem(PANIC_KEY);
    }
}

export function isPanicAlertActive() {
    return Boolean(localStorage.getItem(PANIC_KEY));
}
