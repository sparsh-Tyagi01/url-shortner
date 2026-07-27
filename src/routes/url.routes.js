const db = require('../db');
const { toBase62 } = require('../shortener');
const { z } = require('zod');

const urlSchema = z.object({
  longUrl: z.string().url().refine(
    (url) => /^https?:\/\//i.test(url),
    { message: 'Only http/https URLs are allowed' }
  ),
  customAlias: z.string().min(3).max(20).regex(/^[a-zA-Z0-9_-]+$/).optional(),
  expiresInDays: z.number().int().positive().optional(),
});

function createShortUrl({ longUrl, customAlias, expiresInDays }, userId) {
  const expiresAt = expiresInDays
    ? new Date(Date.now() + expiresInDays * 86400000).toISOString()
    : null;

  if (customAlias) {
    const exists = db.prepare('SELECT id FROM urls WHERE short_code = ?').get(customAlias);
    if (exists) throw new Error('ALIAS_TAKEN');
    db.prepare(
      'INSERT INTO urls (short_code, long_url, user_id, expires_at) VALUES (?, ?, ?, ?)'
    ).run(customAlias, longUrl, userId, expiresAt);
    return customAlias;
  }

  const insert = db.prepare(
    'INSERT INTO urls (short_code, long_url, user_id, expires_at) VALUES (?, ?, ?, ?)'
  );
  const tx = db.transaction(() => {
    const info = insert.run('PENDING', longUrl, userId, expiresAt);
    const code = toBase62(info.lastInsertRowid);
    db.prepare('UPDATE urls SET short_code = ? WHERE id = ?').run(code, info.lastInsertRowid);
    return code;
  });

  return tx();
}

module.exports = { createShortUrl, urlSchema };