const express = require('express');

const app = express()

/*Lista de usuarios registrados*/
let users = [
    {
        id: 1,
        email: 'tukachero@yopmail.com',
        password: 'tukachero',
        name: 'tukachero'
    },
    {
        id: 2,
        email: 'manuel@yopmail.com',
        password: 'manuel',
        name: 'manuel'
    }
]
/*
const app = http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'application/json'})
    response.end(JSON.stringify(users))
})
*/

app.get('/', (request, response) => {
    response.send('<h1>Hello world</h1>')
})

app.get('/api/users', (request, response) => {
    response.json(users)
})

app.get('/api/users/:id', (request, response) => {
    const id = Number(request.params.id)
    const user = users.find(user => user.id === id)
    response.json(user)
})

const PORT = 3001

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})