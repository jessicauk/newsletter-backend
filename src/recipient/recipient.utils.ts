import { randomBytes } from 'crypto';

export function generateUnsubscribeToken() {
  return randomBytes(48).toString('hex'); // Generates a secure random token
}
