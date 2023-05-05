let chatName = document.querySelector("#chat-form-name")
let chatMessage = document.querySelector("#chat-form-message")

//connect socket.io
const socket = io('http://localhost:3000')

socket.on('chatMessage', (msg)=>{
    console.log(msg);
})

let chatForm = document.querySelector('.chat-form');

console.log('line 13');

console.log(chatForm);

chatForm.addEventListener('submit', (e) => {
    console.log('chatForm EL');
    e.preventDefault();

    socket.emit('postMessage', {
        name: chatName.value,
        message: chatMessage.value
    })

    chatMessage.value = '';

    chatMessage.focus()
});

socket.on('updateMessages', (data)=>{
    console.log(data);
    showMessage(data);
})

const showMessage = (data) => {

    console.log('New Message');

    let chatDisplay = document.querySelector('.chat-data')
    let newMessage = document.createElement('div')

    // if(chatName.value == data.name){
    //     //color
    // } else {
    //     //other color
    // }
    
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
    });
    const timestamp = formatter.format(now);

    newMessage.innerHTML = `
    <div class="messages-from-chat">
        <div class="name-and-title">
            <div class="name-from-data">
                ${data.name}
            </div>
            <div class="time-from-data">${timestamp}</div>
        </div>
        <div class="message-from-data">
            ${data.message}
        </div>
    </div>`

    chatDisplay.insertBefore(newMessage, chatDisplay.firstChild)

    // chatForm.reset()
}
