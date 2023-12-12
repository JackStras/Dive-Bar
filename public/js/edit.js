const { User } = require('../../models')



let editFormHandler = async (event) => {
    event.preventDefault()

    let certificationsVal = document.querySelector('#certification-form').value.trim()
    let gas_mixesVal = document.querySelector('#gas-mixes-form').value.trim()
    let ow_dive_totalsVal = document.querySelector('#ow-dive-form').value.trim()
    let deep_dive_totalsVal = document.querySelector('#deep-dive-form').value.trim()
    let cave_dive_totalsVal = document.querySelector('#cave-dive-form').value.trim()
    let night_dive_totalsVal = document.querySelector('#night-dive-form').value.trim()
    let shark_dive_totalsVal = document.querySelector('#shark-dive-form').value.trim()
    let wreck_dive_totalsVal = document.querySelector('#wreck-dive-form').value.trim()
    let drift_dive_totalsVal = document.querySelector('#drift-dive-form').value.trim()
    let altitude_dive_totalsVal = document.querySelector('#altitude-dive-form').value.trim()
    let tech_dive_totalsVal = document.querySelector('#tech-dive-form').value.trim()
    let photographyVal = document.querySelector('#photography-form').value.trim()
    let active_efrVal = document.querySelector('#efr-form').value.trim()
    let active_O2Val = document.querySelector('#O2-form').value.trim()
    let active_dmVal = document.querySelector('#dm-form').value.trim()
    let active_instructorVal = document.querySelector('#instructor-form').value.trim()


    // can change this later
    const userId = document.getElementById('paragraph').dataset.userId
    const data = {
        certificationsVal,
        gas_mixesVal,
        ow_dive_totalsVal,
        deep_dive_totalsVal,
        cave_dive_totalsVal,
        night_dive_totalsVal,
        shark_dive_totalsVal,
        wreck_dive_totalsVal,
        drift_dive_totalsVal,
        altitude_dive_totalsVal,
        tech_dive_totalsVal,
        photographyVal,
        active_efrVal,
        active_O2Val,
        active_dmVal,
        active_instructorVal
    }

    const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    if (response.ok) {
        console.log('RESPONSE OK')
        document.location.replace('/profile')
    } else {
        alert(response.statusText)
    }
}
document
    .querySelector('.form')
    .addEventListener('submit', editFormHandler);