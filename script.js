// Replace with your Render backend URL
const backendURL = 'https://your-backend.onrender.com';

function addPerson() {
  const name = document.getElementById('name').value;
  const age = parseInt(document.getElementById('age').value);

  fetch(`${backendURL}/addPerson`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, age }),
  })
  .then(response => response.json())
  .then(data => {
    alert(data.message);
    getPeople();
  });
}

function getPeople() {
  fetch(`${backendURL}/people`)
    .then(response => response.json())
    .then(data => {
      const list = document.getElementById('peopleList');
      list.innerHTML = '';
      data.forEach(person => {
        const li = document.createElement('li');
        li.textContent = `${person.name} (${person.age} years old)`;
        list.appendChild(li);
      });
    });
}
