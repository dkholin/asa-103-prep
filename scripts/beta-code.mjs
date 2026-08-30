import { createHash, randomBytes } from 'node:crypto';

const ALPHABET = '23456789ABCDEFGHJKMNPQRSTUVWXYZ';

function randomChunk(length) {
  let result = '';
  while (result.length < length) {
    for (const byte of randomBytes(length * 2)) {
      // Rejection sampling avoids modulo bias. 248 is the largest multiple of
      // the 31-character alphabet below 256.
      if (byte >= 248) continue;
      result += ALPHABET[byte % ALPHABET.length];
      if (result.length === length) break;
    }
  }
  return result;
}

function identifier(code) {
  return createHash('sha256').update(code).digest('base64url');
}

const code = `SAIL-${randomChunk(4)}-${randomChunk(4)}`;
console.log(`Beta access code: ${code}`);
console.log(`Allowed code ID:  ${identifier(code)}`);
console.log('\nStore the code outside the repository. Commit only the allowed code ID.');
