const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// define path for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// set up handle bars and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// set up static directory to serve
app.use(express.static(publicDirectoryPath));


app.get("/", (req, res) => {
    res.render("index", { title: "Weather", name: "Tooba Ali" });
});

app.get("/about", (req, res) => {
    res.render("about", { title: "About", name: "Tooba Ali" })
});

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide a location!"
        });
    }

    geocode(req.query.address, (error, { long, lat, place } = {}) => {
        if (error) {
            return res.send({ error });
        }

        forecast(long, lat, (error, { temp, weatherType } = {}) => {
            if (error) {
                return res.send({ error });
            }

            res.send({
                location: place,
                address: req.query.address,
                forecast: temp + " degrees. " + weatherType
            });
        });

    });

});

app.get("/help", (req, res) => {
    res.render("help", { title: "Help", message: "Help page content", name: "Tooba Ali" });
});

app.get("/help/*", (req, res) => {
    res.render("404", { errorMessage: "Help Article not found!", name: "Tooba Ali", title: "404" });
});

app.get("*", (req, res) => {
    res.render("404", { errorMessage: "Page Not Found!", name: "Tooba Ali", title: "404" });
});

app.listen(3000, () => {
    console.log("listening on port 3000");

});

