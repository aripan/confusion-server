const express = require("express");
const http = require("http");
const morgan = require("morgan");

const hostname = "localhost";
const port = 3000;

const app = express();
app.use(morgan("dev"));
app.use(express.json());

app.all("/dishes", (req, res, next) => {
  res.status(200);
  next();
});

app.get("/dishes", (req, res, next) => {
  res.send("Will send all the dishes to you!");
});

app.post("/dishes", (req, res, next) => {
  res.send(
    "Will add the dish: " +
      req.body.name +
      "with details: " +
      req.body.description
  );
});

app.put("/dishes", (req, res, next) => {
  res.status(403).send("PUT operation is not supported on /dishes");
});

app.delete("/dishes", (req, res, next) => {
  res.send("Deleting all the dishes to you!");
});

app.get("/dishes/:dishId", (req, res, next) => {
  res.send("Will send details of the dish: " + req.params.dishId + " to you!");
});

app.post("/dishes/:dishId", (req, res, next) => {
  res
    .status(403)
    .send("POST operation is not supported on /dishes/" + req.params.dishId);
});

app.put("/dishes/:dishId", (req, res, next) => {
  res.write("Updating the dish: " + req.params.dishId + "\n");
  res.end(
    "Will update the dish: " +
      req.body.name +
      "with details: " +
      req.body.description
  );
});

app.delete("/dishes/:dishId", (req, res, next) => {
  res.send("Deleting the dish: " + req.params.dishId);
});

app.use(express.static(__dirname + "/public"));

app.use((req, res, next) => {
  res.statusCode = 200;
  res.setHeader("content-Type", "text/html");
  res.end("<html><body><h1>This is an Express Server</h1></body></html>");
});

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});
