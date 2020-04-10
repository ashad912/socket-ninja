import express from 'express'
import socket from 'socket.io'


const app = express()
const server = app.listen(4000, ()=> {
    console.log('listetnin reqs to 4000 port')
})

app.use(express.static('public'))

//Socket
//server side
var io = socket(server) //param is a server, defined upper

io.on('connection', (socket) => { //each client has own socket
    console.log('made socket connection', socket.id)

    socket.on('chat', (data)=>{ //data is an object sent by client side
        io.sockets.emit('chat', data) // 'sockets' - all sockets connected ll see it
    })

    socket.on('typing', (data)=> {
        socket.broadcast.emit('typing', data) //sending to others client, except the sender! === broadcasting
    })
})


