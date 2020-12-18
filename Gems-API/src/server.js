const express = require('express');

const app = require('./app');
//const PORT = 3000



// reg Request, res Response


app.listen(app.get('port'), () =>{
    console.log('Server on port', app.get('port'))
})