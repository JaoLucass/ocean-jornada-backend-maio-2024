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
    res.send(itens.filter[Boolean])
})

// Endpoint de Read By ID [GET]/item/:id
app.get('/item/:id', function(req, res) {
    const id = req.params.id

    // acessado o item da lista usando ID - 1
    const item = itens[id-1]

    res.send(item)
})

// Sinalizando que todo o corpo de requisição
// virá como JSON
app.use(express.json())

// Endpoint de Create [POST] /item
app.post('/item', function(req,res) {
    // Acessando o corpo da requisição
    const body = req.body

    // Acessar o item no corpo da requisição
    const novoItem = body.nome

    // Adicionar novo item na lista
    itens.push(novoItem)

    res.send('Item adicionado com sucesso: ' + novoItem)
})

// Endpoint de Update [PUT] /item/:id
app.put('/item/:id', function (req, res) {
    // Acessar o ID do parametro de rota
    const id = req.params.id

    // Acessar o item a ser atualizado, a partir do
    // corpo da requisição
    const body = req.body
    const atualizarItem = body.nome

    // Atualizar na lista o item recebido
    itens[id-1] = atualizarItem

    res.send('Item atualizado com sucesso: ' + id + ', ' + atualizarItem)
})

// Endpoint de Delete [DELETE] /item/:id
app.delete('/item/:id', function (req, res) {
    // Acessar o parametro de rota ID
    const id = req.params.id

    // Executa a operação de exclusão desse item pelo índice
    delete itens[id - 1]

    //Enviamos uma mensagem de sucesso
    res.send('Item removido com sucesso: ' + id)
})

app.listen(3000)