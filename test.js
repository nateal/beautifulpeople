const express = require('express');
const app = express();
app.use(express.json());

/*Array standin for database
const inv = [
	{id: 1, items: 'test1'},
	{id: 2, items: 'test2'},
	{id: 3, items: 'test3'},
];
*/


//Connect to database
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "inventory"
});


//Create table if it doesnt exists
con.connect(function(err) {
  if (err) throw err;
	con.query("SELECT * items", function (err, result) {
		if (!err){
			var sql = "CREATE TABLE items (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), qty INT, amount INT)";
			con.query(sql, function (err, result) {
				if (err) throw err;
					console.log("Table created");
			});			
		}
			
	});
});


//Get table & put it in array
var inv = [];
con.query("SELECT * from items", function (err, result){
	if (err) throw err;
		inv = result;
		console.log(inv);
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

console.log('Hello world');