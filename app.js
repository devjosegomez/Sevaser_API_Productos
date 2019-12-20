//SearmApp
//Cohort 18 Generation Mexico

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const db = "SearmApp";

//creating a new app using express
const app = express();

//ejs template engine
app.set('view engine', 'ejs');

//probably we can change it here to JSON instead of x-wwww-form-urlencoded

/*app.use(bodyParser.urlencoded({
    extended: true
}));
*/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"));

// {versionKey: false} disable _v 
mongoose.connect("mongodb://localhost:27017/"+db, {useNewUrlParser: true, useUnifiedTopology: true});

const ProductoSchema = {
    comidas: Object ,
    bebidas: Object ,
    botanas: Object ,
    desechables: Object
}

//Define model (its going to convert it into 'productos' plural, lowercase)
const Producto = mongoose.model("Producto", ProductoSchema);

//Express route
//Methods

//GET
app.get("/productos", function(req, res){
    //retrive all the productos
    Producto.find(function (err, foundProductos){
        if(!err){
            //show into cmd console
            //console.log(foundProductos);
            
            //send the found articles
            res.send(foundProductos);
        }else{
            res.send(err);
        }
    });
});


//POST
app.post("/productos", function(req, res){
    //Create the new article with their key and value 

    const newProducto = new Producto({
        comidas: req.body.comidas,
        bebidas: req.body.bebidas,
        botanas: req.body.botanas,
        desechables: req.body.desechables
    });

    //save into the database
    newProducto.save(function(err){
        if(!err){
            res.send("Successfully added");
        }else{
            res.send("Try again, and error was occur: " + err);
        }
    });
});


//Delete
app.delete("/productos", function(req, res){
    Producto.deleteMany(function(err){
        if(!err){
            res.send("Successfully deleted all the articles!")
        }else{
            res.send("Failed to delete all the articles, err:" + err);
        }
    });
});


app.listen(3000, function() {
    console.log("SearmApp API has started on port 3000");
});