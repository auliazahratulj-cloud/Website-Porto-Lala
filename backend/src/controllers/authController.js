const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function cookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 8 * 60 * 60 * 1000,
    path: '/'
  };
}
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ message: 'Email dan password wajib diisi.' });
    const [rows] = await pool.execute('SELECT id, name, email, password_hash FROM admins WHERE email = ? LIMIT 1', [email.trim().toLowerCase()]);
    const admin = rows[0];
    if (!admin || !(await bcrypt.compare(password, admin.password_hash))) {
      return res.status(401).json({ message: 'Email atau password salah.' });
    }
    const token = jwt.sign(
      { id: admin.id, email: admin.email, name: admin.name },
      process.env.JWT_SECRET,
      { expiresIn: '8h', issuer: 'aulia-portfolio' }
    );
    res.cookie('portfolio_token', token, cookieOptions());
    res.json({ message: 'Login berhasil.', admin: { id: admin.id, name: admin.name, email: admin.email } });
  } catch (err) { next(err); }
};
exports.me = (req, res) => res.json({ admin: req.admin });
exports.logout = (_req, res) => {
  res.clearCookie('portfolio_token', { httpOnly: true, sameSite: 'strict', secure: process.env.NODE_ENV === 'production', path: '/' });
  res.json({ message: 'Logout berhasil.' });
};
