const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const path = require('path');
const api = require('./routes/api');

const app = express();
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, '../uploads'), {
  dotfiles: 'deny',
  index: false,
  maxAge: process.env.NODE_ENV === 'production' ? '1d' : 0
}));
app.get('/api/health', (_req,res) => res.json({ status: 'ok' }));
app.use('/api', api);
app.use((err, _req, res, _next) => {
  console.error(err);
  const status = err.status || (err.name === 'MulterError' ? 400 : 500);
  res.status(status).json({ message: status === 500 ? 'Terjadi kesalahan pada server.' : err.message });
});
module.exports = app;
