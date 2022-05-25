const express = require('express');
const cors = require('cors');
const app = express();
const logger = require('./loggerMiddleware')

app.use(cors())
app.use(express.json());

app.use(logger);

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

    if (user) {
        response.json(user)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/users/:id', (request, response) => {
    const id = Number(request.params.id);
    users = users.filter(user => user.id !== id);
    response.status(204).end();
})

app.post('/api/users', (request, response) => {
    const user = request.body;
    const ids = users.map(user => user.id);
    const maxID = Math.max(...ids);

    /*
    if (!user || !user.content) {
        return response.status(400).json({
            error: 'user.content is missing'
        })
    }*/

    const newUser = {
        id: maxID + 1,
        email: user.email,
        password: user.password,
        name: user.email.substring(0, user.email.indexOf("@"))
    }

    users = [...users, newUser];
    response.json(newUser);
})

app.use((request, response) => {
    response.status(404).json({
        error: 'Not found'
    })
})

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})