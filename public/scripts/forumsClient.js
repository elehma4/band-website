

let form = document.querySelector('.forum-form')

form.addEventListener('submit', async (e) => {
    
    e.preventDefault()

    // make fetch call w/ payload
    let newMessage = {
        name: document.querySelector('#message-form-name').value,
        title: document.querySelector('#message-form-title').value,
        message: document.querySelector('#message-form-message').value
    }

    //reconfigure fetch to accept post request & a payload

    let results = await fetch('/api', {
        method: 'POST',
        headers: {'Content-type': 'application/json; charset=UTF-8'},
        body: JSON.stringify(newMessage)
    })

    let messages = await results.json()

    console.log(messages);

    //display messages on screen
    updateFeedback(messages)

})

const updateFeedback = (messagesArr) => {

    let htmlBlock = '';

    messagesArr.forEach((item, index) => {

        htmlBlock += `    <div class="messages-from-forums">`;
        htmlBlock += '      <div class="name-and-title">';
        htmlBlock += '        <div class="name-from-data">' + item.name + '</div>';
        htmlBlock += '        <div class="separator"> - </div>';
        htmlBlock += '        <div class="title-from-data">' + item.title + '</div>';
        htmlBlock += `      <div class="close-btn" id="${index}">&times;</div>`;
        htmlBlock += '      </div>';
        htmlBlock += '      <div class="message-from-data">' + item.message + '</div>';
        htmlBlock += '    </div>';

    })

    let feedbackMessages = document.querySelector('.messages-data')

    feedbackMessages.innerHTML = htmlBlock;
}

const displayMessages = async () => {
    try{
        let result = await fetch('/api');
        let messages = await result.json();
        updateFeedback(messages)
    }
    catch(error){
        console.error(error);
    }
}
displayMessages()

let deleteMessage = async (id) => {
    try{
        let indexObj = {index: id}
        let result = await fetch(`/api/${id}`, {
            method: 'delete',
            headers: {'Content-type': 'application/json; charset=UTF-8'},
            body: JSON.stringify(indexObj)
        })
        let messages = await result.json()
    }
    catch(error){
        console.error(error);
    }
}

let feedbackMessages = document.querySelector('.messages-data')
feedbackMessages.addEventListener('click', async (e) => {
    console.log(e)
    try{
        let closeButton = e.target
        console.log(e.target);
        let index = closeButton.getAttribute('id') //find target w/ id
        console.log(index);
        if(index !== null && index !== ''){
            deleteMessage(index);
            displayMessages()
        }
    }
    catch(error){
        console.error(error);
    }
})
