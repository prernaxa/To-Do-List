import express from "express";
import bodyParser from "body-parser";

const app = express();
const portNumber = 3000;

var todayDiv = [];
var workDiv = []
var options = {  weekday: 'long', month: 'long', day: 'numeric' };
var actualDate = new Date().toLocaleDateString('en-us', options);



app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) =>{
res.render("index.ejs", {
    actualDate: actualDate,
    newToDo: todayDiv,
});
});

app.get("/work", (req, res) =>{
    res.render("work.ejs", {
        
        newToDo: workDiv,
    });
    });
    

app.post("/submit", (req, res) =>{
    todayDiv.push(`<div class="all-div item"> <input type="checkbox" class="strike-through"  name="added-list" /> 
    <label for="added-list" class="strike-this">${req.body["newToDoList"]}</label> </div>`);

    res.redirect("/");
})

app.post("/workSubmit", (req, res) =>{
    workDiv.push(`<div class="all-div item"> <input type="checkbox" class="strike-through"  name="added-list" /> 
    <label for="added-list" class="strike-this">${req.body["newToDoWorkList"]}</label> </div>`);
    res.redirect("/work");
})

app.listen(portNumber, () =>{
    console.log(`${portNumber} port is running now.`);
});