const { Sequelize } = require('sequelize');
require('dotenv').config();

console.log('🔍 Testing database connection...');
console.log('Configuration:');
console.log(`- Host: ${process.env.DB_HOST}`);
console.log(`- Port: ${process.env.DB_PORT}`);
console.log(`- Database: ${process.env.DB_NAME}`);
console.log(`- User: ${process.env.DB_USER}`);
console.log('- Password: [HIDDEN]');
console.log('');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false, // Set to true to see SQL queries
  }
);

async function testConnection() {
  try {
    console.log('🔄 Attempting to connect to PostgreSQL...');
    await sequelize.authenticate();
    console.log('✅ Database connection successful!');
    console.log('📊 Connection details:');
    console.log(`   - Database: ${sequelize.getDatabaseName()}`);
    console.log(`   - Dialect: ${sequelize.getDialect()}`);
    
    // Test a simple query
    const [results] = await sequelize.query('SELECT version()');
    console.log(`   - PostgreSQL Version: ${results[0].version}`);
    
  } catch (error) {
    console.error('❌ Database connection failed!');
    console.error('Error details:');
    console.error(`   - Code: ${error.original?.code || 'Unknown'}`);
    console.error(`   - Message: ${error.message}`);
    
    // Common error codes and solutions
    if (error.original?.code === 'ECONNREFUSED') {
      console.log('\n💡 Troubleshooting tips:');
      console.log('   - Make sure PostgreSQL is running');
      console.log('   - Check if the port 5432 is correct');
      console.log('   - Verify the host address');
    } else if (error.original?.code === '28P01') {
      console.log('\n💡 Troubleshooting tips:');
      console.log('   - Check your username and password');
      console.log('   - Verify user permissions');
    } else if (error.original?.code === '3D000') {
      console.log('\n💡 Troubleshooting tips:');
      console.log('   - The database does not exist');
      console.log('   - Create the database first or check the database name');
    }
  } finally {
    await sequelize.close();
    console.log('\n🔚 Connection test completed.');
    process.exit();
  }
}

testConnection();
