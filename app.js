const express = require('express');
const app = express();
const http = require('https');

app.set('view engine', 'ejs');

const hostname = '127.0.0.1';
const port =8800;

app.get("/",(request,response) => {
 

  const options = {
      method: 'GET',
      hostname: 'imdb-top-100-movies1.p.rapidapi.com',
      port: null,
      path: '/',
      headers: {
          'X-RapidAPI-Key': 'af100cec2fmsh62192055da50066p1f8eefjsn0c7a788c0ec3',
          'X-RapidAPI-Host': 'imdb-top-100-movies1.p.rapidapi.com'
      }
  };
  
  const req = http.request(options, function (res) {
    const chunks = [];
  
    res.on('data', function (chunk) {
      chunks.push(chunk);
    });
  
    res.on('end', function () {
      const body = Buffer.concat(chunks);
      console.log(body.toString());
      let data = JSON.parse(body);
      response.render('index.ejs',{movie:data})
    });
  });
  req.end();
});
app.get("/filter", (request, response) => {
    const filterParam = request.query.filter; // Assuming the filter parameter is in the query string
  
    const options = {
      method: 'GET',
      hostname: 'imdb-top-100-movies1.p.rapidapi.com',
      port: null,
      path: '/',
      headers: {
        'X-RapidAPI-Key': 'af100cec2fmsh62192055da50066p1f8eefjsn0c7a788c0ec3',
        'X-RapidAPI-Host': 'imdb-top-100-movies1.p.rapidapi.com'
      }
    };
  
    const req = http.request(options, function (res) {
      const chunks = [];
  
      res.on('data', function (chunk) {
        chunks.push(chunk);
      });
  
      res.on('end', function () {
        const body = Buffer.concat(chunks);
        console.log(body.toString());
        let data = JSON.parse(body);
  
        // Filter movies based on the filter parameter
        
        const filterParam = data.filter(movie => movie.year >= 2000);
        
  
        response.render('index.ejs', { movie:filterParam });
      });
    });
  
    req.end();
  });
  
app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

