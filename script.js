// frontend/script.js
function getMessage() {
  fetch('http://localhost:3000/time') // 👈 Call server for current time
    .then(response => response.json())
    .then(data => {
      document.getElementById('message').innerText = `Server Time: ${data.time}`;
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
