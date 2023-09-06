const loginform = document.getElementById('loginForm');

loginform.addEventListener('submit', async (event) => {
  event.preventDefault();

  const username = loginform.username.value;
  const userpassword = loginform.userpassword.value;

  console.log(
  `Name: ${username}
  Password: ${userpassword}`
  );

  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: username, userpassword: userpassword })
  })
  .then((response) => {
    if (response.ok) window.location.href = ('/pokelist');
  })
});