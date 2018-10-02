const express = require('express');
const cors = require('cors');
const app = express();

// Porta para subir o servidor
const serverPort = 8001;

// Seta as rotas default da API
const routes = {
	products: {
		get: '/api/products'
	}
};

// Aplica o CORS para aceitar requisições de outros domínios
app.use(cors());

// Registra a rota GET default, enviando o JSON como retorno
app.get(routes.products.get, function (req, res) {
    res.sendFile(__dirname + '/data/products.json');
});



app.get('/user/:email', (req, res) => {

	var nodemailer = require('nodemailer');
	var emailDest = JSON.stringify(req.params);
	var transporter = nodemailer.createTransport({
	  service: 'hotmail',
	  auth: {
	    user: 'blueteamsept@hotmail.com',
	    pass: 'AdminAdminAdmin'
	  }
	});


	var mailOptions = {
	  from: 'blueteamsept@hotmail.com',
	  to: emailDest,
	  subject: 'Your forgotten Admin Account password',
	  text: 'Your forgotten password is: admin'
	};

	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
	    console.log(error);
	  } else {
	    console.log('Email sent: ' + info.response);
	  }
	});
});





var fs = require('fs');
//var data = fs.readFileSync('fred.json');
//var words = JSON.parse(data);
//console.log(words);

var prod = fs.readFileSync(__dirname + '/data/products.json');
var products = JSON.parse(prod);
//console.log(products.products[0].price);


app.get('/api/products/hello', (req, res) => {
	res.send(words);
});

app.get('/api/products/write/:products', writeFile);

function writeFile(request, response){
	var cart = request.params;
	cart = JSON.stringify(cart, null, 2);
	fs.appendFile(__dirname + '/data/checkout.txt', cart, finished);
	function finished(err){
		console.log("all set");
	}
}

app.get('/api/products/edit/:word/:replace?', editWord);

function editWord(request, response){
	var data = request.params;
	var word = Number(data.word);
	var replace = Number(data.replace);
	products.products[word].price = replace;
	var data = JSON.stringify(products, null, 2);
	fs.writeFile(__dirname + '/data/products.json', data, finished);
	function finished(err){
		console.log(err);
	}
}

app.get('/api/products/edit/name/:name/:replace?', editName);

function editName(request, response){
	var data = request.params;
	var word = Number(data.name);
	var replace = data.replace;
	products.products[word].title = replace;
	var data = JSON.stringify(products, null, 2);
	fs.writeFile(__dirname + '/data/products.json', data, finished);
	function finished(err){
		console.log(err);
	}
}


app.use('*', function (req, res) {
    res.redirect(routes.products.get);
});




// Inicia o servidor e avisa o usuário
app.listen(serverPort);
console.log(`[products] API escutando na porta ${serverPort}.`);
