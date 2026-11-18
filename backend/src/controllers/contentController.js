const pool = require('../config/db');
const allowedTables = {
  education: ['institution','major','degree','start_year','end_year','description','status'],
  journeys: ['title','period','category','description','image','year','status'],
  achievements: ['title','competition_name','organizer','award','level','category','year','description','certificate_image','status'],
  experiences: ['organization_name','position','start_date','end_date','category','description','contribution','image','status'],
  projects: ['title','category','year','description','problem','solution','technologies','role','result','image','repository_url','status']
};
const requiredFields = {
  education: ['institution'],
  journeys: ['title'],
  achievements: ['title'],
  experiences: ['organization_name'],
  projects: ['title']
};
const tableFor = (type) => {
  if (!allowedTables[type]) throw Object.assign(new Error('Kategori konten tidak dikenal.'), { status: 404 });
  return type;
};
exports.list = async (req, res, next) => {
  try {
    const type = tableFor(req.params.type);
    const admin = req.path.startsWith('/admin/');
    const [rows] = await pool.query(
      `SELECT * FROM ${type} ${admin ? '' : "WHERE status = 'published'"} ORDER BY created_at DESC`
    );
    res.json(rows);
  } catch (err) { next(err); }
};
exports.getOne = async (req, res, next) => {
  try {
    const type = tableFor(req.params.type);
    const [rows] = await pool.execute(
      `SELECT * FROM ${type} WHERE id = ? ${req.path.startsWith('/admin/') ? '' : "AND status = 'published'"} LIMIT 1`,
      [req.params.id]
    );
    if (!rows[0]) return res.status(404).json({ message: 'Konten tidak ditemukan.' });
    res.json(rows[0]);
  } catch (err) { next(err); }
};
exports.create = async (req, res, next) => {
  try {
    const type = tableFor(req.params.type);
    const data = { ...(req.body || {}) };
    if (req.file) {
      const field = type === 'achievements' ? 'certificate_image' : 'image';
      data[field] = `/uploads/${req.file.filename}`;
    }
    const missing = requiredFields[type].filter(k => !String(data[k] || '').trim());
    if (missing.length) return res.status(400).json({ message: `Field wajib: ${missing.join(', ')}` });
    const fields = Object.keys(data).filter(k => allowedTables[type].includes(k));
    if (!fields.length) return res.status(400).json({ message: 'Tidak ada data yang valid.' });
    const values = fields.map(k => data[k] === '' ? null : data[k]);
    const placeholders = fields.map(() => '?').join(',');
    const [result] = await pool.execute(
      `INSERT INTO ${type} (${fields.join(',')}) VALUES (${placeholders})`,
      values
    );
    const [rows] = await pool.execute(`SELECT * FROM ${type} WHERE id = ?`, [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) { next(err); }
};
exports.update = async (req, res, next) => {
  try {
    const type = tableFor(req.params.type);
    const data = { ...(req.body || {}) };
    if (req.file) {
      const field = type === 'achievements' ? 'certificate_image' : 'image';
      data[field] = `/uploads/${req.file.filename}`;
    }
    const fields = Object.keys(data).filter(k => allowedTables[type].includes(k));
    if (!fields.length) return res.status(400).json({ message: 'Tidak ada perubahan yang valid.' });
    const assignments = fields.map(k => `${k} = ?`).join(', ');
    const values = fields.map(k => data[k] === '' ? null : data[k]);
    const [result] = await pool.execute(`UPDATE ${type} SET ${assignments} WHERE id = ?`, [...values, req.params.id]);
    if (!result.affectedRows) return res.status(404).json({ message: 'Konten tidak ditemukan.' });
    const [rows] = await pool.execute(`SELECT * FROM ${type} WHERE id = ?`, [req.params.id]);
    res.json(rows[0]);
  } catch (err) { next(err); }
};
exports.remove = async (req, res, next) => {
  try {
    const type = tableFor(req.params.type);
    const [result] = await pool.execute(`DELETE FROM ${type} WHERE id = ?`, [req.params.id]);
    if (!result.affectedRows) return res.status(404).json({ message: 'Konten tidak ditemukan.' });
    res.json({ message: 'Konten berhasil dihapus.' });
  } catch (err) { next(err); }
};
