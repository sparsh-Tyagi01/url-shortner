const ALPHABET = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

function toBase62(num) {
  if (num === 0) return ALPHABET[0];
  let str = '';
  while (num > 0) {
    str = ALPHABET[num % 62] + str;
    num = Math.floor(num / 62);
  }
  return str;
}

module.exports = { toBase62 };