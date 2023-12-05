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
        document.location.replace('/');
      } else {
        alert('You did not login');
      }
    }
  };

  document
  .querySelector('.login-form')
  .addEventListener('submit', loginDiveFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);


  