const express = require('express')
const app = express()

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.get('/oi', function (req, res) {
    res.send('Olá mundo!')
})

// Lista de Itens
const itens = ['carne', 'ovo', 'batata']

// Endpoint de Read All [GET] /item
app.get('/item', function (req, res) {
    res.send('Read All Funcionando!')
})

// Endpoint de Read By ID [GET]/item/:id
app.get('/item/:id', function(req, res){
    const id = req.params.id

    // acessado o item da lista usando ID - 1
    const item = itens[id-1]

    res.send(item)
})

app.listen(3000)