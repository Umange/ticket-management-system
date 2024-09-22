

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); 
const dotenv = require('dotenv');
const morgan = require('morgan'); 
const Ticket = require('./models/Ticket');


dotenv.config();

const app = express();


app.use(morgan('dev'));

app.use(bodyParser.json()); 


mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => {
  console.error('Failed to connect to MongoDB', err);
  process.exit(1);
});






/**
 * @route   POST /tickets
 * @desc    Create a new ticket
 * @access  Public
 */
app.post('/tickets', async (req, res) => {
  console.log('POST /tickets called with body:', req.body);
  try {
    const { title, description, status } = req.body;
    const ticket = new Ticket({ title, description, status });
    const savedTicket = await ticket.save();
    res.status(201).json(savedTicket);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ errors: messages });
    }
    console.error('Error creating ticket:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

/**
 * @route   GET /tickets
 * @desc    Retrieve all tickets
 * @access  Public
 */
app.get('/tickets', async (req, res) => {
  console.log('GET /tickets called');
  try {
    const tickets = await Ticket.find().sort({ createdAt: -1 });
    res.json(tickets);
  } catch (error) {
    console.error('Error retrieving tickets:', error);
    res.status(500).json({ error: 'Server Error' });
  }
});

/**
 * @route   GET /tickets/:id
 * @desc    Retrieve a single ticket by ID
 * @access  Public
 */
app.get('/tickets/:id', async (req, res) => {
  console.log(`GET /tickets/${req.params.id} called`);
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }
    res.json(ticket);
  } catch (error) {
    console.error(`Error retrieving ticket with ID ${req.params.id}:`, error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ error: 'Invalid Ticket ID' });
    }
    res.status(500).json({ error: 'Server Error' });
  }
});

/**
 * @route   PUT /tickets/:id
 * @desc    Update a ticket by ID
 * @access  Public
 */
app.put('/tickets/:id', async (req, res) => {
  console.log(`PUT /tickets/${req.params.id} called with body:`, req.body);
  try {
    const { title, description, status } = req.body;
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }

    if (title !== undefined) ticket.title = title;
    if (description !== undefined) ticket.description = description;
    if (status !== undefined) ticket.status = status;

    const updatedTicket = await ticket.save();
    res.json(updatedTicket);
  } catch (error) {
    console.error(`Error updating ticket with ID ${req.params.id}:`, error);
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ errors: messages });
    }
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ error: 'Invalid Ticket ID' });
    }
    res.status(500).json({ error: 'Server Error' });
  }
});

/**
 * @route   DELETE /tickets/:id
 * @desc    Delete a ticket by ID
 * @access  Public
 */
app.delete('/tickets/:id', async (req, res) => {
  console.log(`DELETE /tickets/${req.params.id} called`);
  try {
    const ticket = await Ticket.findByIdAndDelete(req.params.id);
    if (!ticket) {
      return res.status(404).json({ error: 'Ticket not found' });
    }
    res.json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    console.error(`Error deleting ticket with ID ${req.params.id}:`, error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ error: 'Invalid Ticket ID' });
    }
    res.status(500).json({ error: 'Server Error' });
  }
});

app.get('/test', (req, res) => {
  console.log('GET /test called');
  res.json({ message: 'Test route is working!' });
});


app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

app.get('/test', (req, res) => {
  res.json({ message: 'Test route is working!' });
});



app.post('/tickets', createTicketHandler);
app.get('/tickets', getAllTicketsHandler);
app.get('/tickets/:id', getTicketByIdHandler);
app.put('/tickets/:id', updateTicketHandler);
app.delete('/tickets/:id', deleteTicketHandler);


app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

