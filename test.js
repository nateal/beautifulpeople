const express = require('express');
const app = express();
app.use(express.json());

//Array standin for database
const inv = [
	{id: 1, items: 'test1'},
	{id: 2, items: 'test2'},
	{id: 3, items: 'test3'},
];


app.get('/', (request, respond) => {
	respond.send('Hello World!!!');
});

app.get('/api/inv', (request, respond) => {
	respond.send (inv);
});

//GET
app.get('/api/inv/:any', (request, respond) => {
	const inventory = inv.find(c => c.id === parseInt(request.params.any));
	if(!inventory){
		respond.status(404).send('unable to find id');
	}
	else
		respond.send(inventory);
});

//POST
app.post('/api/inv', (request, respond) => {
	const inventory = {
		id: inv.length + 1,
		items: request.body.items
	};
	inv.push(inventory);
	respond.send(inventory);
});

//PUT
app.put('/api/inv/:any', (request, respond) => {
	const inventory = inv.find(c => c.id === parseInt(request.params.any));
	if(!inventory){
		respond.status(404).send('unable to find id');
	}

	else{
		inventory.items = request.body.items;
		respond.send(inventory);

	}
});

//DELETE
app.delete('/api/inv/:any', (request, respond) => {
	const inventory = inv.find(c => c.id === parseInt(request.params.any));
	if(!inventory){
		respond.status(404).send('unable to find id');
	}

	const index = inv.indexOf(inventory);
	inv.splice(index, 1);
	respond.send(inventory);

});

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`port ${port}`));

console.log('hello world');