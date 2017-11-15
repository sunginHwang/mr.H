import fs from 'fs';
import path from 'path';
import Sequelize from 'Sequelize';

const env       = process.env.NODE_ENV || "development";
const sequelize = new Sequelize('ohjic', 'root', 'as455748', {host: 'localhost', port : '3306', dialect: 'mysql'});
/*var sequelizeNas = new Sequelize('ohjic', 'root', 'as455748', {host: 'localhost', port : '3306', dialect: 'mysql'});
var sequelizeOhjic = new Sequelize('ohjic', 'root', 'as455748', {host: 'localhost', port : '3306', dialect: 'mysql'});*/

const db   = {};

fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function(file) {
        var model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
