import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from 'crypto';

const algorithm = 'aes-256-ctr';
const salt = process.env.ENCRYPTION_SALT || 'defaultSalt';

function getKey(secret: string): Buffer {
  return scryptSync(secret, salt, 32);
}

export async function encrypt(text: string): Promise<string> {
  const iv = randomBytes(16);
  const secret = process.env.ENCRYPTION_KEY || 'defaultSecretKey';
  const key = getKey(secret);
  const cipher = createCipheriv(algorithm, key, iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
}

export async function decrypt(hash: string): Promise<string> {
  const [ivHex, content] = hash.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const secret = process.env.ENCRYPTION_KEY || 'defaultSecretKey';
  const key = getKey(secret);
  const decipher = createDecipheriv(algorithm, key, iv);
  const decrypted = Buffer.concat([decipher.update(Buffer.from(content, 'hex')), decipher.final()]);
  return decrypted.toString();
}