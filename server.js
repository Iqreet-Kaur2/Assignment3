/********************************************************************************
*  WEB322 – Assignment 03
*
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
*
*  https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
*
*  Name: Iqreet Kaur    Student ID: 157176223   Date: 2025-06-13
*  Published URL: 
********************************************************************************/

const express = require("express");
const app = express();
const fs = require("fs");

app.use(express.static("public"));

const PORT = process.env.PORT || 8080;

// Read projects.json once
const projects = JSON.parse(fs.readFileSync(__dirname + "/data/projectData.json"));

// Routes
app.get("/", (req, res) => res.sendFile(__dirname + "/views/home.html"));
app.get("about.html", (req, res) => res.sendFile(__dirname + "/views/about.html"));

app.get("/solutions/projects", (req, res) => {
  try {
    const { sector } = req.query;
    let result = sector
      ? projects.filter(p => p.sector === sector)
      : projects;
    res.json(result);
  } catch (err) {
    res.status(404).send("Projects not found");
  }
});

app.get("/solutions/projects/:id", (req, res) => {
  try {
    const project = projects.find(p => p.id == req.params.id);
    if (project) res.json(project);
    else throw new Error("Project not found");
  } catch (err) {
    res.status(404).send("Project not found");
  }
});

app.use((req, res) => {
  res.status(404).sendFile(__dirname + "/views/404.html");
});

app.listen(PORT, () => console.log(`Server listening on: ${PORT}`));
