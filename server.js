const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const customerRoutes = require('./routes/customers');
const visitsRoute = require('./routes/visits');
const adminRoute = require("./routes/admins");

require('dotenv').config();


//Mongodb Connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, () => console.log("Connected to database"))


//Middlewares
app.use(cors());
app.use(express.json());
//Route Middlewares
app.use('/', customerRoutes);
app.use('/', visitsRoute);
app.use('/', adminRoute);



app.listen(process.env.PORT || 5000, () => console.log("Server running"));