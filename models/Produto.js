const DataTypes = require('sequelize')
const db = require('../db/conn')
const Produto = db.define('produto', {
    nome: {
        type: DataTypes.STRING(30)
    },
    preco: {
        type: DataTypes.FLOAT
    },
    qtd: {
        type: DataTypes.INTEGER
    }
},{
    updatedAt: false,
    createdAt: false
})
// Produto.sync({force:true})
module.exports = Produto