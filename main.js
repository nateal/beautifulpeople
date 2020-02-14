const express = require('express');
const app = express();
app.use(express.json());

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
	if (!result){
		var sql = "CREATE TABLE items (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), qty INT, amount INT)";
		con.query(sql, function (err, result) {
			if (err) throw err;
				console.log("Table created");
		});			
	}		
	});
});


//GET
app.get('/api/inv/:any', (request, respond) => {

	con.query(`SELECT * from items WHERE id = '${request.params.any}'`, function (err, result){
	if (err) throw err;
		if(!result){
		respond.status(404).send('unable to find id');
	}
	else
		respond.send(result); 
	});

});


//POST
app.post('/api/inv', (request, respond) => {

	con.query(`INSERT INTO items (name, qty, amount) VALUES ("${request.body.name}","${request.body.qty}","${request.body.amount}")`);

	var inventory = {
		name: request.body.name,
		qty: request.body.qty,
		amount: request.body.amount
	};

	respond.send(inventory);

});


//PUT
app.put('/api/inv/:any', (request, respond) => {

	con.query(`SELECT * from items WHERE id = '${request.params.any}'`, function (err, result){
	if (err) throw err;
		if(!result){
		respond.status(404).send('unable to find id');
	}

	else{
		if(request.body.name != '')
			var nameQuery = `name = '${request.body.name}'`;

		if(request.body.qty != '')
			var qtyQuery = `qty = '${request.body.qty}'`;

		if(request.body.amount != '')
			var amountQuery = `amount = '${request.body.amount}'`;

		var queryBuilder = `${nameQuery}, ${qtyQuery}, ${amountQuery}`

		con.query(`UPDATE items SET ${queryBuilder} WHERE id = '${request.params.any}'`);

		respond.send(queryBuilder);
	}

	});
});


//DELETE
app.delete('/api/inv/:any', (request, respond) => {

	con.query(`SELECT * from items WHERE id = '${request.params.any}'`, function (err, result){
	if (err) throw err;
		if(!result){
		respond.status(404).send('unable to find id');
	}
	else
		con.query(`DELETE from items WHERE id = '${request.params.any}'`)
		respond.send('Deleted') 
	});
});


// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`port ${port}`));
console.log("Connected");
