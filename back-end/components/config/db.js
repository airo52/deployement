const mysql = require('mysql');
const {databaseConfig} = require('./config');

const con =  mysql.createConnection(databaseConfig);

module.exports = con;