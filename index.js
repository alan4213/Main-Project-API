const express = require('express');
const axios = require('axios');
const cors = require('cors');
const Web3 = require('web3');
const {Contract,ethers}=require('ethers');
const bodyParser = require('body-parser');
const app = express();
const port = 3000; 
// Parse JSON bodies for this app
app.use(bodyParser.json());

let receivedData;
 

// Choose a port number for your API
app.use(cors());
app.post('/', async (req, res) => {
  const data = req.body; // Get the JSON data from the request body
  try {
    // Process the data here
    console.log(data);
    receivedData=data;
    // Send a response back to the client
    res.json({ message: 'Data received successfully', data: data });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error processing data');
  }
});





   
// Define a route for retrieving data with correct headers
app.get('/', async (req, res) => {
   // Get the CID from the query string
  try {
    const response = await axios.get(receivedData.uri, {
      headers: {
        'Accept': 'text/plain'
      }
    });
    res.send(response.data); // Send the response data back to the client
  } catch (error) {
    console.log(error);
    res.status(500).send('Error retrieving data from Pinata');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
