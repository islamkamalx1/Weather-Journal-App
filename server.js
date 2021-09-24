// Setup empty JS object to act as endpoint for all routes
projectData = {};
// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
const { response } = require('express');
// instance of app
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;
const runningServer = ()=>{
    console.log(`The server running in local host: ${port}`);
};
const server = app.listen(port, runningServer);

//GET route that returns the projectData object
const sendWeatherData = (req,res) =>{
    res.send(projectData)
}
app.get('/all', sendWeatherData)

// POST data
const receiveWeatherData = (req,res) =>{
    projectData = {...req.body}
    res.end();
    console.log(projectData)
}
app.post('/addWeatherData', receiveWeatherData)
