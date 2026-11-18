require('dotenv').config();
const bcrypt = require('bcryptjs');
const pool = require('../config/db');
(async () => {
  try {
    const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
    if (!ADMIN_NAME || !ADMIN_EMAIL || !ADMIN_PASSWORD || ADMIN_PASSWORD.length < 12) {
      throw new Error('Set ADMIN_NAME, ADMIN_EMAIL, dan ADMIN_PASSWORD (minimal 12 karakter) di .env.');
    }
    const hash = await bcrypt.hash(ADMIN_PASSWORD, 12);
    await pool.execute(
      'INSERT INTO admins (name,email,password_hash) VALUES (?,?,?) ON DUPLICATE KEY UPDATE name=VALUES(name), password_hash=VALUES(password_hash)',
      [ADMIN_NAME, ADMIN_EMAIL.toLowerCase(), hash]
    );
    console.log(`Admin ready: ${ADMIN_EMAIL}`);
  } catch (err) { console.error(err.message); process.exitCode = 1; }
  finally { await pool.end(); }
})();
