const loginform = document.getElementById('loginForm');

loginform.addEventListener('submit', async (event) => {
  event.preventDefault();

  const username = loginform.username.value;
  const password = loginform.password.value;

  console.log(
  `Name: ${username}
  Password: ${password}`
  );

  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: username, password: password })
  })
  .then(async(response) => {
    if (response.ok) {
      window.location.href = (`/pokelist/${username}`);
    } else {
      console.error('Login failed');
      alert('Login failed');
    }
  })
});