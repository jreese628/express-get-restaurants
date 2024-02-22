const express = require("express");
const app = express();
const Restaurant = require("../models/index");
const db = require("../db/connection");

//TODO: Create your GET Request Route Below:

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/restaurants", async (req, res) => {
  const restaurants = await Restaurant.findAll();
  res.json(restaurants);
});

app.get("/restaurants/:id", async (req, res) => {
  const id = req.params.id;
  const restaurant = await Restaurant.findByPk(id);
  res.json(restaurant);
});

app.post("/restaurants", async (req, res) => {
  const newRestaurant = req.body;
  const createdRestaurant = await Restaurant.create(newRestaurant);
  res.json(createdRestaurant)
});

app.put("/restaurants/:id", async (req, res) => {
  const id = req.params.id
  const updatedRestaurantData = req.body;

  const restaurant = await Restaurant.findByPk(id);
  const updatedRestaurant = await restaurant.update(updatedRestaurantData);
  res.json(updatedRestaurant);
});

app.delete("/restaurants/:id", async (req, res) => {
  const id = req.params.id;

  const restaurant = await Restaurant.findByPk(id);
  await restaurant.destroy();
  res.status(200).send()
});

module.exports = app;
