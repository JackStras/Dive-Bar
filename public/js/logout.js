let divelogout = async () => {
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to log out.');
      }
    };

    document.querySelector('#logout').addEventListener('click', divelogout);


    document.getElementById('logout').addEventListener('click', function(event) {
      // Prevent the default behavior of the anchor tag
      event.preventDefault();
    });