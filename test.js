const express = require('express');
const app = express();

app.get('/', (request, respond) => {
	respond.send('Hello World!!!');
});

app.get('/api/courses', (request, respond) => {
	respond.send ([1,2,3]);
});


// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`port ${port}`));

console.log('hello world');