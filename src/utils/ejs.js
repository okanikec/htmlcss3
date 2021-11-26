//app.js
var express = require("express"),
app = express(),
bodyparser = require("body-parser"),
mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/commuters", {useNewUrlParser: true});

app.use(bodyparser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

var schema = new mongoose.Schema({
  route : String,
  origin : String,
  destination : String,
  estimatedTimeOfArrival : String,
  date : String,
  time : String
}) 
var detailsModel = mongoose.model("detailsModel", schema);
app.get("/", function (req, res) {
res.render("index",{ details: null })
})
app.get("/getdetails", function (req, res) {   
detailsModel.find({}, function (err, allDetails) {
    if (err) {
        console.log(err);
    } else {
        res.render("index", { details: allDetails })
    }
})
})
app.listen(3000, "localhost", function () {
console.log("server has started");
})

//index.ejs
// <div>
// <a href="/getdetails">Get Details</a>
// </div>
// <hr>

// <% if(details!=null) { %>
// <table>
// <tr>
//     <th>Route</th>
//     <th>origin </th>
//     <th>Destination</th>
//     <th>EstimatedTimeOfArrival </th>
//     <th>Date </th>
//     <th>Time</th>
// </tr>
// <% details.forEach(function(item){ %>
// <tr>
//     <td><%= item.route%></td>
//     <td><%= item.origin %></td>
//     <td><%= item.destination%></td>
//     <td><%= item.estimatedTimeOfArrival %></td>
//     <td><%= item.date%></td>
//     <td><%= item.time%></td>

// </tr>
// <% }) %>
// </table>
// <% } %></hr>