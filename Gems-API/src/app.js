const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

//Inicializations
const app = express();
require("./database");

//Settings
app.set('port', process.env.PORT || 3000);
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Static Resources
app.use(express.static(__dirname + '/public'));

//Routes
app.get("/", (req, res) =>{
    res.render("./src/public/index")
});
app.use(require('./routes/gems'));


//Export
module.exports = app;