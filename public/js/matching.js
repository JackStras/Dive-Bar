let matchingFormHandler = async (event) => {
    event.preventDefault()

    let certificationsVal = document.querySelector('#certification-form').value.trim()
    let gas_mixesVal = document.querySelector('#gas-mixes-form').value
    let ow_dive_totalsVal = document.querySelector('#ow-dive-form').value
    let photographyVal = document.querySelector('#photography-form').value
    let active_efrVal = document.querySelector('#efr-form').value
    let active_O2Val = document.querySelector('#O2-form').value
    let active_dmVal = document.querySelector('#dm-form').value
    let active_instructorVal = document.querySelector('#instructor-form').value

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
    })
    if (response.ok) {
        console.log('RESPONSE OK')
    } else {
        alert(response.statusText)
    }
}



document
    .querySelector('form')
    .addEventListener('submit', matchingFormHandler);

