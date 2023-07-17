const express = require('express');
const app = express();
const axios = require('axios');
const port = 3000;

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index'); 
});

app.get('/search', async (req, res) => {
  console.log(req.query.page)
  try {

    const response = await axios.get('https://pixabay.com/api/', {  
    params: {
        key: '38313297-0251fd09df47623d4d840ebec',
        q: req.query.term,
        image_type: 'photo',
        page: req.query.page
      }
    });
 
    // hardcoding that key is awful :( will try to refactor later on
    console.log(`${response} backend`)
    res.json(response.data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to perform the search' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});