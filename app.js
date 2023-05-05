const express = require('express') 

const app = express() // invoke

const io = require('socket.io')();

const PORT = 3000;

app.use(express.static('public'))

app.set('view engine', 'ejs')

app.use(require('./routes/index'))
app.use(require('./routes/albums'))
app.use(require('./routes/forums'))
app.use(require('./routes/chat'))

const server = app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
})

io.attach(server)

io.on('connection', (socket) => {
    socket.emit('chatMessage', {msg: 'Hello from our backend server!'})

    socket.on('postMessage', (data) => { //what client sends to server

        io.emit('updateMessages', data) //broadcasting out to all listening clients

    })

    socket.on('disconnect', (user) => {
        io.emit('User has left the room.')
    })
})