const connectToMongo = require('./db'); // No function exported, remove invocation.
const express = require('express');
var cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// Start the server
app.listen(port, () => {
    console.log(`iNotebook backend listening at http://localhost:${port}`);
});
