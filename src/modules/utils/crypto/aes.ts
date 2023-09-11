import crypto from 'crypto';

function encrypt(plainString: string, AesKey: Buffer, AesIV: Buffer) {
  const cipher = crypto.createCipheriv('aes-256-cbc', AesKey, AesIV);
  const encrypted = Buffer.concat([cipher.update(Buffer.from(plainString, 'utf8')), cipher.final()]);
  return encrypted.toString('base64');
}

function decrypt(base64String: string, AesKey: Buffer, AesIV: Buffer) {
  const decipher = crypto.createDecipheriv('aes-256-cbc', AesKey, AesIV);
  const deciphered = Buffer.concat([decipher.update(Buffer.from(base64String, 'base64')), decipher.final()]);
  return deciphered.toString('utf8');
}

export { encrypt, decrypt };
