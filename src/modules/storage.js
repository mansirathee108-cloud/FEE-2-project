const STORAGE_KEY = 'cityData';

function readData() {
    try {
        const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
        return {
            submissions: Array.isArray(stored.submissions) ? stored.submissions : [],
            panicActive: Boolean(stored.panicActive)
        };
    } catch {
        return { submissions: [], panicActive: false };
    }
}

function writeData(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function saveActivity(source, text, type = 'submission') {
    const submissionText = text.trim();

    if (!submissionText) {
        return false;
    }

    const data = readData();
    data.submissions.unshift({
        id: `${Date.now()}-${Math.random()}`,
        source,
        text: submissionText,
        type,
        submittedAt: new Date().toISOString()
    });
    writeData(data);
    return true;
}

export function saveComplaint(source, text) {
    return saveActivity(source, text, 'complaint');
}

export function getSubmissions() {
    return readData().submissions;
}

export function setPanicAlert(active) {
    const data = readData();
    data.panicActive = active;
    writeData(data);
}

export function isPanicAlertActive() {
    return readData().panicActive;
}