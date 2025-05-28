const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Atlas connection string
const mongoURI = 'your-mongodb-atlas-connection-string'; // Replace with your real connection string

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

const personSchema = new mongoose.Schema({
  name: String,
  age: Number
});

const Person = mongoose.model('Person', personSchema);

app.post('/addPerson', async (req, res) => {
  const { name, age } = req.body;
  try {
    const newPerson = new Person({ name, age });
    await newPerson.save();
    res.json({ message: 'Person added!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save person' });
  }
});

app.get('/people', async (req, res) => {
  try {
    const people = await Person.find();
    res.json(people);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch people' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
