module.exports = {
    url: 'mongodb://localhost:27017/ems',
    'secret': 'hemil',
    HOST: "localhost",
    USER: "root",
    PASSWORD: "root",
    DB: "ems",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
}