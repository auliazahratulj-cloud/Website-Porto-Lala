require('dotenv').config();
const app = require('./app');
const pool = require('./config/db');
const port = Number(process.env.PORT || 5000);
(async () => {
  try {
    await pool.query('SELECT 1');
    app.listen(port, () => console.log(`API ready at http://localhost:${port}`));
  } catch (err) {
    console.error('Database connection failed:', err.message);
    process.exit(1);
  }
})();
