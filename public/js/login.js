let loginDiveFormHandler = async (event) => {
  event.preventDefault();

  let email = document.querySelector('#email-login').value.trim();
  let password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('You did not login');
    }
  }
};

let signupDiveFormHandler = async (event) => {
  event.preventDefault();
  try {
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && email && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (password.length < 8) {
        alert("Password must be at least 8 characters!")
      }
      if (response.ok) {
        console.log('RESPONSE OK')
        document.location.replace('/profile');
      } else {
        alert("Username or Email already exists. Please try another Username and/or Email.")
      }
    }
  } catch (err) {
    console.log(err.message)
  }

};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginDiveFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupDiveFormHandler);