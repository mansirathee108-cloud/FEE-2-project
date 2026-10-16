import { store } from '../store/store.js';
import { activityAdded, panicModeSet } from '../store/citySlice.js';

export function saveActivity(source, text, type = 'submission') {
  const submissionText = text.trim();

  if (!submissionText) {
    return false;
  }

  store.dispatch(
    activityAdded({
      id: `${Date.now()}-${Math.random()}`,
      source,
      text: submissionText,
      type,
      submittedAt: new Date().toISOString(),
    }),
  );
  return true;
}

export function saveComplaint(source, text) {
  return saveActivity(source, text, 'complaint');
}

export function getSubmissions() {
  return store.getState().city.submissions;
}

export function setPanicAlert(active) {
  store.dispatch(panicModeSet(active));
}

export function isPanicAlertActive() {
  return store.getState().city.panicActive;
}
