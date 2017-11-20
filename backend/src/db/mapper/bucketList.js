module.exports = function(sequelize, DataTypes) {
    return sequelize.define('bucketList', {
        bckIdx: {
            type: DataTypes.INTEGER(11),primaryKey: true, autoIncrement: true,allowNull : false
        },
        bckTitle: {type: DataTypes.STRING(50), allowNull : false, defaultValue:''},
        bckDetail: {type: DataTypes.TEXT, allowNull : false, defaultValue:''},
        targetAmount: {type: DataTypes.INTEGER(11), allowNull : false, defaultValue: 0},
        typeIdx: {type: DataTypes.INTEGER(50), allowNull : false, defaultValue:0},
        startDate: {type: DataTypes.DATE, defaultValue:sequelize.literal('CURRENT_TIMESTAMP')},
        completeDate : {type: DataTypes.DATE, defaultValue:sequelize.literal('CURRENT_TIMESTAMP')},
        userIdx : {type : DataTypes.INTEGER(11), allowNull : false, defaultValue:0},
        delFlag: {type: DataTypes.STRING(11), allowNull : false, defaultValue:'N'}
    },{
        tableName: 'bucketList',
        timestamps: false
    });
};