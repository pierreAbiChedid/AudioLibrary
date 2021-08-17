const env = process.env.NODE_ENV;

const config = {
  app: {
    port: parseInt(process.env.PORT) || 3000,
  },
  db: {
    connection: process.env.DB_CONNECTION,
  },
};

module.exports = config[env];
