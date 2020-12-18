const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://paulinabe:Pa16550405@gems-db.fmjsp.mongodb.net/gems?retryWrites=true&w=majority", {
    useCreateIndex: true,
    useNewUrlParser:true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(db => { console.log('Db is connected' )})
.catch(err => console.error(err))