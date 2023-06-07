const Sequelize = require('sequelize')
const sequelize = new Sequelize('c', 'root', 'senai', {
    //propriedades do banco
    host: 'localhost',
    dialect: 'mysql'
})

// sequelize.authenticate().then(()=>{
//     console.log('SIM')
// }).catch((error)=>{
//     console.error('NÃO' + error)
// })

module.exports = sequelize