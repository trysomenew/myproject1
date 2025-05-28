// frontend/script.js
function getMessage() {
  fetch('https://myproject1-xyi9.onrender.com') // 👈 Call server for current time
    .then(response => response.json())
    .then(data => {
      document.getElementById('message').innerText = `Server Time: ${data.time}`;
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
