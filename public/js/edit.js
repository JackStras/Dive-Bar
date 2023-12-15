let editFormHandler = async (event) => {
    event.preventDefault()
    console.log("Work")

    let selectedCerts = document.querySelectorAll('#certification-form option:checked')
    let arrayCerts = Array.from(selectedCerts).map(el => el.value)
    let certificationsVal = arrayCerts.toString()

    let selectedGas = document.querySelectorAll('#gas-mixes-form option:checked')
    let arrayGas = Array.from(selectedGas).map(el => el.value)
    let gas_mixesVal = arrayGas.toString()
    let ow_dive_totalsVal = document.querySelector('#ow-dive-form').value.trim()
    let photographyVal = document.querySelector('#photography-form').value.trim()
    let active_efrVal = document.querySelector('#efr-form').value.trim()
    let active_O2Val = document.querySelector('#O2-form').value.trim()
    let active_dmVal = document.querySelector('#dm-form').value.trim()
    let active_instructorVal = document.querySelector('#instructor-form').value.trim()

    console.log(certificationsVal)

    // can change this later
    const userId = document.getElementById('paragraph').dataset.userid

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