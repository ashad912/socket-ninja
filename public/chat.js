//make connection
//client side!! frontend
var socket = io.connect('http://localhost:4000')

//query DOM

const message = document.getElementById('message')
const handle = document.getElementById('handle')
const btn = document.getElementById('send')
const output = document.getElementById('output')
const feedback = document.getElementById('feedback')

//Emit events

btn.addEventListener('click', ()=>{
    console.log('btn', socket.id)
    socket.emit('chat', { //called by dev - 'chat'
        message: message.value,
        handle: handle.value
    });

})

message.addEventListener('keydown', ()=>{
    socket.emit('typing', {
        messageLength: message.value.length,
        handle: handle.value
    })
})

//Listen for events

socket.on('chat', (data)=>{ //'chat' from server
    feedback.innerHTML = "";
    output.innerHTML += '<p><strong>' + data.handle + ':</strong> ' + data.message + "</p>"
})

socket.on('typing', (data)=>{

    feedback.innerHTML = data.messageLength > 1 ? (
         '<p><em>' + data.handle + ' is typing a message...</em></p>' 
    ) : (
         ''
    )
})