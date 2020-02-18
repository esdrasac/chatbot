module.exports = {
  dialect: 'mysql',
  host: process.env.MYSQL_HOST,
  port: 41890,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
