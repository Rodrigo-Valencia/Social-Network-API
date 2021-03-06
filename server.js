// REQUIRE EXPRESS / MONGOOSE
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// pulls info from routes folder
app.use(require('./routes'));

// connects to the mongoose database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// logs mongo queries
mongoose.set('debug', true);

// starts application
app.listen(PORT, () => console.log(`==========YOU ARE CONNECTED TO:${PORT}==========`));