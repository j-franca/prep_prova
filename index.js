const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const conn = require('./db/conn')
const Verdura = require('./models/Verdura')

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

//------ rotas -------
app.post('/apagar', async (req, res)=>{
    const id = req.body.id
    // const verdura = req.body.verdura
    // const quantidade = req.body.quantidade
    // const preco = req.body.preco
    // console.log(id, verdura, quantidade, preco)
    const pesq = await Verdura.findOne({raw:true, where: {id:id}})
    console.log(pesq)
    Verdura.destroy({raw:true, where: {id:pesq.id}})
    res.redirect('/')
})
app.get('/apagar', (req, res)=>{
    res.render('apagar')
})

app.post('/cadastrar', async (req, res)=>{
    const verduras = req.body.verduras
    const quantidade = req.body.quantidade
    const preco = req.body.preco
    console.log(verduras, quantidade, preco)
    await Verdura.create({verduras, quantidade, preco})
    res.redirect('/')
})
app.get('/cadastrar', (req, res)=>{
    res.render('cadastrar')
})

app.post('/pesquisar', async (req, res)=>{
    const codigo = req.body.codigo 
    console.log(codigo)
    const pesq = await Verdura.findOne({raw:true, where: {id:codigo}})
    console.log('--------------')
    console.log(pesq)
    res.render('pesquisar', {valor: pesq})
})
app.get('/pesquisar', (req, res)=>{
    res.render('pesquisar')
})
app.get('/listar', async (req, res)=>{
    const dados = await Verdura.findAll({raw:true})
    console.log(dados)
    res.render('listar', {valores:dados})
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

