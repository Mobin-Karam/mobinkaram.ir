export function createSessionId() {
  return `lead_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}