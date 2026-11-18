const pool = require('../config/db');
exports.get = async (_req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM profiles WHERE id = 1 LIMIT 1');
    res.json(rows[0] || {});
  } catch (err) { next(err); }
};
exports.update = async (req, res, next) => {
  try {
    const fields = ['full_name','headline','biography','profile_image','email','linkedin_url','instagram_url','cv_file'];
    const data = { ...(req.body || {}) };
    if (req.file) data[req.file.fieldname === 'cv_file' ? 'cv_file' : 'profile_image'] = `/uploads/${req.file.filename}`;
    const keys = Object.keys(data).filter(k => fields.includes(k));
    if (!keys.length) return res.status(400).json({ message: 'Tidak ada data yang diperbarui.' });
    await pool.execute(`UPDATE profiles SET ${keys.map(k => `${k} = ?`).join(', ')} WHERE id = 1`, keys.map(k => data[k] === '' ? null : data[k]));
    const [rows] = await pool.query('SELECT * FROM profiles WHERE id = 1');
    res.json(rows[0]);
  } catch (err) { next(err); }
};
