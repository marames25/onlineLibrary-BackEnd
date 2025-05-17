document.querySelectorAll('.show-pass').forEach((btn) => {
  btn.addEventListener('click', () => {
    const input = btn.previousElementSibling;
    if (input.type === 'password') {
      input.type = 'text';
      btn.querySelector('img').src = 'Imgs/view.png';
    } else {
      input.type = 'password';
      btn.querySelector('img').src = 'Imgs/hide.png';
    }
  });
});

document.querySelector('.submit').addEventListener('click', () => {
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (
    username === '' ||
    email === '' ||
    password === '' ||
    confirmPassword === ''
  ) {
    alert('please fill the form completely');
    return;
  }

  if (!emailPattern.test(email)) {
    alert('Please enter a valid email address');
    return;
  }

  if (password !== confirmPassword) {
    alert('Passwords do not match');
    return;
  }

  if (password.length < 8) {
    alert('Password must be at least 8 characters long');
    return;
  }

  const user = {
    username: username,
    email: email,
    password: password,
  };

  const account = JSON.parse(localStorage.getItem('accounts')) || [];

  if (account.some((acc) => acc.email === email)) {
    alert('Email already exists');
    return;
  }

  account.push(user);
  localStorage.setItem('accounts', JSON.stringify(account));

  if (localStorage.getItem('accounts')) {
    location.href = 'logIn.html';
  } else {
    alert('Failed to create account');
  }
});
