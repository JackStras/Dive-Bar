let commentEventHandler = async (event) => {
    event.preventDefault();

    let commentVal = document.querySelector('#dialogue').value.trim();
    

    const userId = document.getElementById('userComment').dataset.userid;

    const data = {
        comment: commentVal,
        user_id: userId
    };
    const response = await fetch('/api/users/comments', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    console.log(data)
    if (response.ok) {
        console.log("RESPONSE OK");
        location.reload();
    }
};

document
    .querySelector('#commentForm')
    .addEventListener('submit', commentEventHandler)

// const reply = document.getElementsByTagName('button')

// const replyHandler = (comments) => {
// }

// for (let i = 0; i < buttons.length; i++) {
//     buttons[i].addEventListener('click', replyHandler)
// }
