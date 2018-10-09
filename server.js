const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path')


// Porta para subir o servidor
const serverPort = process.env.PORT || 8080;

// Seta as rotas default da API
const routes = {
	products: {
		get: '/api/products'
	}
};




// Aplica o CORS para aceitar requisições de outros domínios
app.use(cors());
// app.use(express.static('build'))


if (process.env.NODE_ENV === 'production') {
// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '/build')))
}

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

const multer = require("multer");
const path = require("path");
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var SKUg;


// configure storage
const storage = multer.diskStorage({
	destination: (req, file, cb) => {

		cb(null, './src/static/products');
	},
	filename: (req, file, cb) => {
		/*
			use path.extname() to get
			the extension from the original file name. These combined will create the file name used
			to save the file on the server and will be available as
			req.file.pathname in the router handler.
		*/
		console.log("SKU is: " + SKUg);
		const newFilename = `${SKUg}_1.jpg`;
		cb(null, newFilename);
	},
});
// create the multer instance that will be used to upload/save the file
const upload = multer({ storage });


app.post('/api/products/upload', upload.single('selectedFile'), (req, res) => {

	/*
		We now have a new req.file object here. At this point the file has been saved
		and the req.file.filename value will be the name returned by the
		filename() function defined in the diskStorage configuration. Other form fields
		are available here in req.body.
	*/
	res.send();
});


app.get('/api/products/addItem/:id/:sku/:title/:price/:installments/:shipping?', addItem);
function addItem(request, response){
	var data = request.params;
	var id = Number(data.id);
	var sku = Number(data.sku);
	SKUg = data.sku;
	var title = data.title;
	var price = Number(data.price);
	var installments = Number(data.installments);
	var shipping = data.shipping;

	products.products.push({		
      "id": id,
      "sku": sku,
      "title": title,
      "description": "",
      "availableSizes": [
        ""
      ],
      "availableTypes": [
        ""
      ],
      "availableGenders": [
        ""
      ],
      "style": "",
      "price": price,
      "installments": installments,
      "currencyId": "USD",
      "currencyFormat": "$",
      "isFreeShipping": shipping
	})

	var newData = JSON.stringify(products, null, 2);

	fs.writeFile(__dirname + '/data/products.json', newData, finished);
	function finished(err){
		console.log(err);
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
