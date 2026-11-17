// API service for form validation backend
const API_BASE = 'http://localhost:8081/api';

export async function validateForm({ email, username, password }) {
  try {
    const response = await fetch(`${API_BASE}/validate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, username, password }),
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    // Fallback for demo if backend is unavailable
    console.warn('Backend unavailable, using client-side validation:', error.message);
    return clientSideValidation({ email, username, password });
  }
}

// Client-side fallback validation (same logic as backend)
function clientSideValidation({ email, username, password }) {
  const results = [];

  // Email format
  const emailValid = email && email.includes('@') && email.includes('.');
  results.push({
    field: 'email',
    valid: emailValid,
    message: emailValid ? 'Email: OK' : 'Email: Invalid format',
  });

  // Username length
  const usernameValid = username && username.length >= 3;
  results.push({
    field: 'username',
    valid: usernameValid,
    message: usernameValid ? 'Username: OK' : 'Username: Too short (min 3 chars)',
  });

  // Password strength
  let hasUpper = false, hasLower = false, hasDigit = false;
  if (password) {
    for (const c of password) {
      if (c >= 'A' && c <= 'Z') hasUpper = true;
      if (c >= 'a' && c <= 'z') hasLower = true;
      if (c >= '0' && c <= '9') hasDigit = true;
    }
  }
  const passwordValid = hasUpper && hasLower && hasDigit && password && password.length >= 8;
  results.push({
    field: 'password',
    valid: passwordValid,
    message: passwordValid ? 'Password: OK' : 'Password: Needs upper, lower, digit, 8+ chars',
  });

  const success = results.every(r => r.valid);
  return { success, results };
}

export async function checkHealth() {
  try {
    const response = await fetch(`${API_BASE}/health`);
    return response.ok;
  } catch {
    return false;
  }
}