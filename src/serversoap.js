var soap = require('soap');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var async = require('async');
var axios = require('axios');

//express server example
var app = express();

app.use(cors());
  
// var xml = require('fs').readFileSync('myservice.wsdl', 'utf8');

//body parser middleware are supported (optional)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.listen(8001, () =>  { // ecoute du serveur sur le port 8001
    console.log('le serveur fonctionne')
});

// soap.createClient(url, function(err, client) {
//     client.getDistance(args, function(err, result) {
//         console.log(result);
//     });
// });

app.post('/api/calcul', (req, res) => {
    var url = 'http://localhost:8080/AppliSNCF_war_exploded/services/CalculDistance?wsdl';
    var args = {arg0: req.body.arg0, arg1: req.body.arg1, arg2: req.body.arg2, arg3: req.body.arg3, arg4: req.body.arg4};
    console.log('test');
    let other;

    // soap.createClientAsync(url).then((client) => {
    //     return client.getDistance(args);
    //   }).then((result) => {
    //     result = result;
    // });
    soap.createClient(url, function(err, client) {
        client.getDistance(args, function(err, result) {
            other = result;
            res.json(other);
        });
    });
 
});

app.post('/api/calculprix', (req, res) => {
    var idsmonnaie = 'EUR_' + req.body.idmonnaie;
    var kms = req.body.distance;
    console.log(kms);
    axios.get('https://free.currconv.com/api/v7/convert?q=' + idsmonnaie + '&compact=ultra&apiKey=f4ccbbbc8e3897627db1')
        .then(response => {
            // console.log(response.data[idsmonnaie]);
            var montant = response.data[idsmonnaie];
            var total = (kms / 10) * montant;
            total = total.toFixed(2);
            console.log(total);
            res.json(total);
        })
        .catch(error => {
            console.log(error);
    });
});