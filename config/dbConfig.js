const mysql = require('mysql2/promise');

let pool;

async function initDbConnection() {
  try {
    if (!pool) {
      pool = await mysql.createPool({
        host: 'nodejs-technical-test.cm30rlobuoic.ap-southeast-1.rds.amazonaws.com',
        user: 'candidate',
        password: 'NoTeDeSt^C10.6?SxwY882}',
        database: 'conqtvms_dev',
        port: 3306,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
      });
      console.log('DB is connected');
    }
    return pool;
  } catch (error) {
    console.error('Failed to connect to the DB:', error);
    process.exit(1);  // Exit the process if connection fails
  }
}

// Export a function to get the initialized pool
module.exports = {
  getPool: async () => {
    if (!pool) {
      await initDbConnection();
    }
    return pool;
  }
};
