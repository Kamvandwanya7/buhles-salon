const express= require('express')
const app= express()
const exphbz= require('express-handlebars')
const bodyParser = require('body-parser');


let PORT = process.env.PORT || 2013
app.listen(PORT, function (){
    console.log('App started on port', PORT)
})