let commentEventHandler = async (event) => {
    event.preventDefault();

    let commentVal = document.querySelector('#dialogue').value.trim();


    const userId = document.getElementById('userComment').dataset.userid;
    const loggedUsername = document.getElementById('loggedInUser').dataset.loggeduser
    const loggedId = document.getElementById('loggedUserId').dataset.loggedid
    const data = {
        comment: commentVal,
        poster: loggedUsername,
        poster_id: loggedId,
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

