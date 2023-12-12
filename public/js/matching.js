let matchingFormHandler = async (event) => {
    event.preventDefault()

    let certificationsVal = document.querySelector('#certification-form').value.trim()
    let gas_mixesVal = document.querySelector('#gas-mixes-form').value.trim()
    let ow_dive_totalsVal = document.querySelector('#ow-dive-form').value.trim()
    let photographyVal = document.querySelector('#photography-form').value.trim()
    let active_efrVal = document.querySelector('#efr-form').value.trim()
    let active_O2Val = document.querySelector('#O2-form').value.trim()
    let active_dmVal = document.querySelector('#dm-form').value.trim()
    let active_instructorVal = document.querySelector('#instructor-form').value.trim()


    // can change this later
    const userId = document.getElementById('paragraph').dataset.userid

    const data = {
        certificationsVal,
        gas_mixesVal,
        ow_dive_totalsVal,
        photographyVal,
        active_efrVal,
        active_O2Val,
        active_dmVal,
        active_instructorVal
    }

    const response = await fetch(`/api/users/`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    if (response.ok) {
        console.log('RESPONSE OK')
        document.location.replace('/matches')
    } else {
        alert(response.statusText)
    }
}

document
  .querySelector('form')
  .addEventListener('submit', matchingFormHandler);