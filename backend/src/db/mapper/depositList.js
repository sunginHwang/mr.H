module.exports = function(sequelize, DataTypes) {
    return sequelize.define('depositList', {
        depositIdx: {
            type: DataTypes.INTEGER(11),primaryKey: true, autoIncrement: true,allowNull : false
        },
        targetIdx: {type: DataTypes.INTEGER(11), allowNull : false, defaultValue:0},
        targetType: {type: DataTypes.INTEGER(11), allowNull : false, defaultValue:0},
        depositDate: {type: DataTypes.DATE, defaultValue:sequelize.literal('CURRENT_TIMESTAMP')},
        depositAmount: {type: DataTypes.INTEGER(50), allowNull : false, defaultValue: 0},
        userIdx : {type : DataTypes.INTEGER(11), allowNull : false, defaultValue:0},
        delFlag: {type: DataTypes.STRING(11), allowNull : false, defaultValue:'N'}
    },{
        tableName: 'depositList',
        timestamps: false
    });
};