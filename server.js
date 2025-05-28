const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// 👇 Use your real connection string here


mongoose.connect('mongodb+srv://admin:admin1234@nameage.qzstyap.mongodb.net/?retryWrites=true&w=majority&appName=nameage')
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));


const personSchema = new mongoose.Schema({
  name: String,
  age: Number
});
const Person = mongoose.model('Person', personSchema);

// Add new person
app.post('/addPerson', async (req, res) => {
  const { name, age } = req.body;
  const person = new Person({ name, age });
  await person.save();
  res.json({ message: 'Person added' });
});

// Get all people
app.get('/people', async (req, res) => {
  const people = await Person.find();
  res.json(people);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
