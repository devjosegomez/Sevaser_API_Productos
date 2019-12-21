//SearmApp
//Cohort 18 Generation Mexico
//https://github.com/devjosegomez

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

// si no utilizamos cors no funciona en el front end
const cors = require("cors")

const db = "Sevaser";

//creating a new app using express
const app = express();
app.use(cors())

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

const DatosSchema = {
    account: Object,
    datosFiesta: Object,
    comidas: Object ,
    bebidas: Object ,
    botanas: Object ,
    desechables: Object,
    listaCompras: Object,
    overview: Object
}

//Define model (its going to convert it into 'datos' plural, lowercase)
const Dato = mongoose.model("Dato", DatosSchema);

//Express route
//Methods

//GET
app.get("/api/datos", function(req, res){
    //retrive all the data
    Dato.find(function (err, foundDatos){
        if(!err){

            //send the found data
            res.send(foundDatos);
        }else{
            res.send(err);
        }
    });
});


//POST
app.post("/api/datos", function(req, res){
    //Create the new article with their key and value 

    const newDato = new Dato({
        account: req.body.account,
        datosFiesta: req.body.datosFiesta,
        comidas: req.body.comidas,
        bebidas: req.body.bebidas,
        botanas: req.body.botanas,
        desechables: req.body.desechables,
        listaCompras: req.body.listaCompras,
        overview: req.body.overview
    });

    //save into the database
    newDato.save(function(err){
        if(!err){
            res.send("Successfully added");
        }else{
            res.send("Try again, and error was occur: " + err);
        }
    });
});


//Delete
app.delete("/api/datos", function(req, res){
    Dato.deleteMany(function(err){
        if(!err){
            res.send("Successfully deleted all the data!")
        }else{
            res.send("Failed to delete all the data, err:" + err);
        }
    });
});


//POST 
app.post("/api/datos/template", function(req, res){
    //Create the new article with their key and value 
    const day = new Date();
    console.log(day)
    const newDato = new Dato({
        account: {
            "username": "Invitado"
        },
        datosFiesta:{
            "partyType": req.body.datosFiesta.partyType,
            "gastoEstimado": 0,
            "numeroPersonas": 0,
            "costoPorPersona": 0,
            "createdOn": day,
            "dateParty": day
        },
        comidas: req.body.comidas,
        bebidas: req.body.bebidas,
        botanas: req.body.botanas,
        desechables: req.body.desechables,
        listaCompras: req.body.listaCompras,
        overview: req.body.overview
    });

    //save into the database
    newDato.save(function(err){
        if(!err){
            res.send("Successfully added");
        }else{
            res.send("Try again, and error was occur: " + err);
        }
    });
});

app.listen(3000, function() {
    console.log("SearmApp API has started on port 3000");
});