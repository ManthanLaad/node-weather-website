const path = require("path");
const express = require("express");
const hbs = require("hbs");

const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const app = express();

// Define paths for Express Config
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine, views & partials location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup directory to serve
app.use(express.static(publicPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Manthan",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Message",
    message: "We are always here to help you ;)",
    name: "Manthan",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Manthan",
  });
});

app.get("/weather", ({ query }, res) => {
  if (!query.address) {
    return res.send({
      error: "Address must be provided",
    });
  }
  geocode(query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(latitude, longitude, (error, tempData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forecast: tempData,
        location,
        address: query.address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query.search);
  res.send({
    products: {},
  });
});

// The error route is always the last to avoid any valid matches

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 error",
    message: "help article not found",
    name: "Manthan",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404 error",
    message: "Page not found!",
    name: "Manthan",
  });
});

app.listen(3000, () => {
  console.log("Server started at Port 3000! ");
});
