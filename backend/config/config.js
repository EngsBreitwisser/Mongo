const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  mongoURI: process.env.MONGODB_URI || 'mongodb://localhost:27017/Agendalunos',
  port: process.env.PORT || 5000,
};
