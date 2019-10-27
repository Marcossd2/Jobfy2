const express = require('express')
const app = express()

const sqlite = require ('sqlite')
const dbConnection = sqlite.open('banco.sqlite', { Promise })

app.set('view engine','ejs')
app.use(express.static('public'))

app.get('/', async (request, response) => {
    const db = await dbConnection
    const categorias = await db.all('select * from categorias;')
    response.render('home',{
        categorias
    } )
})
app.get('/Vagas', (request, response) => {
    response.render('Vagas',)

})
const init = async() => {
    const db = await dbConnection
    await db.run('create table if not exists categorias(id INTEGER PRIMARY KEY, categoria TEXT);')
    //const categoria = 'Engineering team'
    //await db.run(`insert into categorias(categoria) values('${categoria}')`)
}
init()


app.listen(3000, (err) => {
    if(err){
        console.log('Nao foi possivel iniciar o servidor do Jobfy.')
    }else{
        console.log('Servidor do Jobfy  funcionando normalmente...')
        }
})
