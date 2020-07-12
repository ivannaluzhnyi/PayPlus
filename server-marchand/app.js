// load up the express framework and body-parser helper
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");

const Product = require("./models/product");
const Credential = require("./models/credencial");

const productsJson = require("./collections/product.json");

// create an instance of express to serve our end points
const app = express();
app.use(express.static("public"));

Product.countDocuments().then(async (finedProduct) => {
    if (finedProduct === 0) {
        try {
            await Product.create(productsJson);
        } catch (error) {
            console.log(error);
        }
    }
});

// app.use(async (req, res, next) => {
//     const finedProduct = await ;

//     console.log("finedProduct => ", finedProduct);
//     // next();
// });

// we'll load up node's built in file system helper library here
// (we'll be using this later to serve our JSON files
const fs = require("fs");
const path = require("path");
// configure our express instance with some body-parser settings
// including handling JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// this is where we'll handle our various routes from
const routes = require("./routes/routes.js")(app, fs);

app.get("/test", (req, res) => {
    res.send(req.session.test); // 'OK'
});
// finally, launch our server on port 3001.
app.listen(3001, () => {
    console.log("listening on port %s...", 3001);
});
