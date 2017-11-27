module.exports = function(sequelize, DataTypes) {
    return sequelize.define('user', {
        userIdx: {
            type: DataTypes.INTEGER(11),primaryKey: true, autoIncrement: true,allowNull : false
        },
        userId: {type: DataTypes.STRING(30), allowNull : false, defaultValue:''},
        userPassword: {type: DataTypes.STRING(200), allowNull : false, defaultValue:''},
        userName: {type: DataTypes.STRING(30), allowNull : false, defaultValue: ''},
        userEmail: {type: DataTypes.STRING(100), allowNull : false, defaultValue: ''},
        regiDate: {type: DataTypes.DATE, defaultValue:sequelize.literal('CURRENT_TIMESTAMP')},
        updateDate : {type: DataTypes.DATE, defaultValue:sequelize.literal('CURRENT_TIMESTAMP')},
    },{
        tableName: 'user',
        timestamps: false
    });
};