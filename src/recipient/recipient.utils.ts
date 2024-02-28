import { randomBytes } from 'crypto';

export function generateUnsubscribeToken() {
  return randomBytes(48).toString('hex'); // Generates a secure random token
}

export const TEMPLATE_MESSAGE =
  'If you prefer not to receive further emails of this nature, please click the link below to unsubscribe.';
