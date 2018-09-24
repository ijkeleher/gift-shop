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


const handleError = (err, res) => {
  res
    .status(500)
    .contentType("text/plain")
    .end("Oops! Something went wrong!");
};

const upload = multer({
  dest: "/tempImages"
});

app.get("/", express.static(path.join(__dirname, "./src/components/shelf")));

var SKUg;

app.post(
  "/upload",
  upload.single("file" /* name attribute of <file> element in your form */),
  (req, res) => {
    const tempPath = req.file.path;
    const targetPath = path.join(__dirname, `./src/static/products/${SKUg}_1.png`);

    if (path.extname(req.file.originalname).toLowerCase() === ".png") {
      fs.rename(tempPath, targetPath, err => {
        if (err) return handleError(err, res);

        res
          .status(200)
          .contentType("text/plain")
          .end("File uploaded!");
      });
    } else {
      fs.unlink(tempPath, err => {
        if (err) return handleError(err, res);

        res
          .status(403)
          .contentType("text/plain")
          .end("Only .png files are allowed!");
      });
    }
	}
);


app.get('/api/products/addItem/:id/:sku/:title/:price/:installments/:shipping?', addItem);
function addItem(request, response){
	var data = request.params;
	var id = Number(data.id);
	var sku = Number(data.sku);
	SKUg = data.sku;
	var title = data.title;
	var price = Number(data.price);
	var installments = data.installments;
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

	//fs.writeFile(__dirname + '/data/products.json', newData, finished);
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

