let newDiveFormHandler = async (event) => {
    event.preventDefault();
// let newDiveFormHandler = async (event) => {
//     event.preventDefault();

    const name = document.querySelector('#DiveDates').value.trim();  
    const datefinder = document.querySelector('#find-dates').value.trim();
    const datetype = document.querySelector('#date-type').value.trim();
    // const name = document.querySelector('#DiveDates').value.trim();  
    // const datefinder = document.querySelector('#find-dates').value.trim();
    // const datetype = document.querySelector('#date-type').value.trim();


    if (name && datefinder && datetype) {
        const response = await fetch(`/api/users`, {
          method: 'POST',
          body: JSON.stringify({ name, datefinder, datetype }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
    if (name && datefinder && datetype) {
        const response = await fetch(`/api/users`, {
          method: 'POST',
          body: JSON.stringify({ name, datefinder, datetype }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
            document.location.replace('/profile');
          } else {
            alert('Failed to create User Dating Profile');
          }
        }
      };
        if (response.ok) {
            document.location.replace('/profile');
          } else {
            alert('Failed to create User Dating Profile');
          }
        }
      ;
      

      document
      .querySelector('Find-your-Date')
      .addEventListener('submit', newDiveFormHandler);
 

      document
  .querySelector('project-list')
  .addEventListener('click');
 