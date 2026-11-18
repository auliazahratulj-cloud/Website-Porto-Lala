const jwt = require('jsonwebtoken');

function requireAdmin(req, res, next) {
  const token = req.cookies?.portfolio_token;
  if (!token) return res.status(401).json({ message: 'Silakan login terlebih dahulu.' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = { id: payload.id, email: payload.email, name: payload.name };
    next();
  } catch {
    res.clearCookie('portfolio_token');
    return res.status(401).json({ message: 'Sesi tidak valid atau telah berakhir.' });
  }
}
module.exports = { requireAdmin };
