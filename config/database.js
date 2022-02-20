require('dotenv').config();

module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'mongoose',
      settings: {
        host: env('DATABASE_HOST', `${process.env.DBHOST}`),
        srv: env.bool('DATABASE_SRV', true),
        port: env.int('DATABASE_PORT', 27017),
        database: env('DATABASE_NAME',`${process.env.DBNAME}`),
        username: env('DATABASE_USERNAME', `${process.env.DBUSERNAME}`),
        password: env('DATABASE_PASSWORD', `${process.env.DBPASSWORD}`),
      },
      options: {
        authenticationDatabase: env('AUTHENTICATION_DATABASE', 'admin'),
        ssl: env.bool('DATABASE_SSL', true),
      },
    },
  },
});
