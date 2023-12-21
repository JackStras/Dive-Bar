const displayMatchingUsers = (users) => {
    const container = document.querySelector('#matching-users-container');

    container.innerHTML = '';

    // Iterate through the users and create elements to display the data
    users.forEach(user => {
        const userElement = document.createElement('div');

        // Convert boolean values to Yes/No
        const photographyValue = user.photography ? '✅' : '❌';
        const activeEfrValue = user.active_efr ? '✅' : '❌';
        const activeO2Value = user.active_O2 ? '✅' : '❌';
        const activeDmValue = user.active_dm ? '✅' : '❌';
        const activeInstructorValue = user.active_instructor ? '✅' : '❌';

        // Create separate divs for each value
        const usernameDiv = document.createElement('div');
        usernameDiv.textContent = `Username: ${user.username}`;
        usernameDiv.addEventListener('click', function() {
            document.location.replace(`user_profile/${user.id}`)
        })

        const certificationsDiv = document.createElement('div');
        certificationsDiv.textContent = `Certifications: ${user.certifications}`;

        const gasMixesDiv = document.createElement('div');
        gasMixesDiv.textContent = `Gas Mixes: ${user.gas_mixes}`;

        const photographyDiv = document.createElement('div');
        photographyDiv.textContent = `Photography: ${photographyValue}`;

        const activeEfrDiv = document.createElement('div');
        activeEfrDiv.textContent = `Active EFR: ${activeEfrValue}`;

        const activeO2Div = document.createElement('div');
        activeO2Div.textContent = `Active O2: ${activeO2Value}`;

        const activeDmDiv = document.createElement('div');
        activeDmDiv.textContent = `Active DM: ${activeDmValue}`;

        const activeInstructorDiv = document.createElement('div');
        activeInstructorDiv.textContent = `Active Instructor: ${activeInstructorValue}`;

        // Append each div to the userElement
        [usernameDiv, certificationsDiv, gasMixesDiv, photographyDiv, activeEfrDiv, activeO2Div, activeDmDiv, activeInstructorDiv].forEach(div => {
            userElement.appendChild(div);
        });

        // Append the userElement to the container
        container.appendChild(userElement);
    });

    if (users.length === 0) {
        const noUsersMessage = document.createElement('p');
        noUsersMessage.textContent = 'No matching users found.';
        container.appendChild(noUsersMessage);
    }
};

let matchingFormHandler = async (event) => {
    event.preventDefault()

    let certificationsVal = document.querySelector('#certification-form').value.trim()
    let gas_mixesVal = document.querySelector('#gas-mixes-form').value
    let ow_dive_totalsVal = document.querySelector('#ow-dive-form').value
    let photographyVal = document.querySelector('#photography-form').checked
    let active_efrVal = document.querySelector('#efr-form').checked
    let active_O2Val = document.querySelector('#O2-form').checked
    let active_dmVal = document.querySelector('#dm-form').checked
    let active_instructorVal = document.querySelector('#instructor-form').checked

    const data = {
        certifications: certificationsVal,
        gas_mixes: gas_mixesVal,
        ow_dive_totals: ow_dive_totalsVal,
        photography: photographyVal,
        active_efr: active_efrVal,
        active_O2: active_O2Val,
        active_dm: active_dmVal,
        active_instructor: active_instructorVal
    }

    const response = await fetch(`/api/divers`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        const responseData = await response.json();
        console.log('Matching Users:', responseData);
        displayMatchingUsers(responseData);
    } else {
        alert(response.statusText);
    }
};

document
    .querySelector('form')
    .addEventListener('submit', matchingFormHandler);

