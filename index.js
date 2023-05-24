const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const conn = require('./db/conn')
const Produto = require('./models/Produto')

//------ abertura de porta
//TCP:
const PORT = 3000

//IP:
const hostname = 'localhost'

//------ config express
//decodificar - quando escrever locahost:3000, o que estiver aqui abre
app.use(express.urlencoded({extended:true}))
//
app.use(express.json())
//onde procurar estilizações, imagens e js
app.use(express.static('public'))

//------ handlebars
app.set('view engine', 'handlebars')
app.engine('handlebars', exphbs.engine())

//------ rotas
app.post('/cadastrar', async (req, res)=>{
    const nome = req.body.nome
    const qtd = Number(req.body.qtd)
    const preco = Number(req.body.preco)

    console.log(nome, qtd, preco)
    await Produto.create({nome, qtd, preco})
    res.redirect('/cadastrar')
})
app.get('/cadastrar', (req, res)=>{
    res.render('cadastra')
})
app.get('/consultar', async (req, res)=>{
    const dados = await Produto.findAll({raw:true})
    console.log(dados)
    res.render('consulta', {valores: dados})
})
app.get('/', (req, res)=>{
    res.render('home')
})

//------ 
conn.sync().then(()=>{
    app.listen(PORT, hostname, ()=>{
        console.log(`Está funcionando ${hostname}:${PORT}`)
    })
}).catch((error)=>{
    console.error('erro' + error)
})

