const express = require('express');
const rateLimit = require('express-rate-limit');
const auth = require('../controllers/authController');
const content = require('../controllers/contentController');
const profile = require('../controllers/profileController');
const { requireAdmin } = require('../middleware/auth');
const upload = require('../middleware/upload');
const router = express.Router();

const loginLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 10, standardHeaders: true, legacyHeaders: false, message: { message: 'Terlalu banyak percobaan login. Coba lagi nanti.' } });
router.post('/auth/login', loginLimiter, auth.login);
router.post('/auth/logout', auth.logout);
router.get('/auth/me', requireAdmin, auth.me);

router.get('/profile', profile.get);
router.put('/admin/profile', requireAdmin, upload.single('profile_image'), profile.update);

const types = ['education','journeys','achievements','experiences','projects'];
for (const type of types) {
  router.get(`/${type}`, (req,res,next) => { req.params.type = type; content.list(req,res,next); });
  router.get(`/admin/${type}`, requireAdmin, (req,res,next) => { req.params.type = type; content.list(req,res,next); });
  router.get(`/${type}/:id`, (req,res,next) => { req.params.type = type; content.getOne(req,res,next); });
  router.post(`/admin/${type}`, requireAdmin, upload.single('image'), (req,res,next) => {
    req.params.type = type;
    if (req.file && type === 'achievements') req.body.certificate_image = `/uploads/${req.file.filename}`;
    content.create(req,res,next);
  });
  router.put(`/admin/${type}/:id`, requireAdmin, upload.single('image'), (req,res,next) => {
    req.params.type = type;
    if (req.file && type === 'achievements') req.body.certificate_image = `/uploads/${req.file.filename}`;
    content.update(req,res,next);
  });
  router.delete(`/admin/${type}/:id`, requireAdmin, (req,res,next) => { req.params.type = type; content.remove(req,res,next); });
}
router.post('/admin/upload', requireAdmin, upload.single('file'), async (req,res) => {
  if (!req.file) return res.status(400).json({ message: 'Pilih file terlebih dahulu.' });
  res.status(201).json({ url: `/uploads/${req.file.filename}`, filename: req.file.filename, size: req.file.size });
});
router.get('/admin/stats', requireAdmin, async (_req,res,next) => {
  try {
    const stats = {};
    for (const t of types) {
      const [rows] = await require('../config/db').query(`SELECT COUNT(*) AS total, SUM(status='published') AS published FROM ${t}`);
      stats[t] = { total: rows[0].total, published: Number(rows[0].published || 0) };
    }
    res.json(stats);
  } catch(err) { next(err); }
});
module.exports = router;
