const express = require('express')
const { MongoClient } = require('mongodb')

const dbUrl = 'mongodb+srv://joaolucasidney:xl7ZnqHvGNkOzcdE@cluster0.afbpbpr.mongodb.net/'
const dbName = 'ocean-jornada-backend-maio-2024'

const client = new MongoClient(dbUrl)

async function main() {
    console.log('Conectando banco de dados...')
    await client.connect()
    console.log('Banco de dados conectado com sucesso!')

    const app = express()

    app.get('/', function (req, res) {
        res.send('Hello World')
    })

    app.get('/oi', function (req, res) {
        res.send('Olá mundo!')
    })

    // Lista de Itens
    const itens = ['carne', 'ovo', 'batata']

    const db = client.db(dbName)
    const collection = db.collection('item')

    // Endpoint de Read All [GET] /item
    app.get('/item', async function (req, res) {
        // Acesso a lista de documentos na collection
        const documentos = await collection.find().toArray()
        // Envio os documentos como resposta
        res.send(documentos)
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
}

main()
