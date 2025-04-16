const STORAGE_KEY = 'chatMessages';

export function loadMessages() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      return [];
    }
  }
  return [];
}

export function saveMessages(messages) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  } catch (e) {
    // Optionally handle quota errors or private mode
    console.error('Failed to save messages:', e);
  }
}

export function clearMessages() {
  localStorage.removeItem(STORAGE_KEY);
}