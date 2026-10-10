import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
export function hashPassword(password) {
  const salt = randomBytes(16).toString('hex');
  return `scrypt:${salt}:${scryptSync(password, salt, 64).toString('hex')}`;
}
export function passwordMatches(password, hash) {
  if (typeof password !== 'string' || typeof hash !== 'string') return false;
  const [scheme,salt,digest] = hash.split(':');
  if (scheme !== 'scrypt' || !salt || !/^[a-f0-9]{128}$/.test(digest || '')) return false;
  const actual = scryptSync(password, salt, 64);
  return timingSafeEqual(actual, Buffer.from(digest,'hex'));
}
