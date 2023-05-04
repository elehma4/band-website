

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

        htmlBlock += '    <div class="messages-from-forums">';
        htmlBlock += '      <div class="name-and-title">';
        htmlBlock += '        <div class="name-from-data">' + item.name + '</div>';
        htmlBlock += '        <div class="separator"> - </div>';
        htmlBlock += '        <div class="title-from-data">' + item.title + '</div>';
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
    catch{

    }
}
displayMessages()