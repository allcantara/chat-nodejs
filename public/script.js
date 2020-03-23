const socket = io('https://3000-b77a32aa-e351-40f6-af81-842e7b795d64.ws-us02.gitpod.io/')
const color = randomIdAndColor(6)
const idUser = randomIdAndColor(14)

const renderMessage = ({ author, message, color }) => {
    $('.messages').append(`
        <div class="message">
            <strong style="color:${color}">>> ${author.toUpperCase()}:  </strong> ${message}
        </div>`
    )
}

socket.on('previousMessages', messages => {
    messages.map(data => renderMessage(data))
})

socket.on('receivedMessage', message => {
    renderMessage(message)
})

$('#chat').submit(function(event) {
    event.preventDefault()
    var message = $('input[name=message]').val()

    if(message.length) {
        var messageObject = {
            author: idUser,
            message,
            color,
        }
        socket.emit('sendMessage', messageObject)
        renderMessage(messageObject)

        document.querySelector('#message').value = ""
    } else {
        alert('Mensagem vazia!')
    }
})

function randomIdAndColor(len) {
    var hexadecimais = '0123456789ABCDEF'
    var cor = '#'
    for (var i = 0; i < len; i++ ) {
        cor += hexadecimais[Math.floor(Math.random() * 16)]
    }
    return cor
}
