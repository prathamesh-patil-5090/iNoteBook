
const mongoose = require('mongoose');

// MongoDB connection string
// const mongoDBURL = "mongodb://127.0.0.1:27017/iNotebookDatabase?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.4";
const mongoDBURL = "YOUR_MONGODB_OR_MONGODB_ATLAS_CONNECTION_STRING";

// Connect to MongoDB
mongoose.connect(mongoDBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("Connection Successful");
    })
    .catch((err) => {
        console.error("Connection Error:", err.message);
    });
