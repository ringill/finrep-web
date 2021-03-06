import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { parse } from "./pdfParser/parser";
import * as sourceMaps from "source-map-support";

sourceMaps.install();

const app = express();
app.set("port", process.env.PORT || 5000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API calls
app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.get('/api/parse', (req, res) => {
  parse("");
  res.send({ express: "parsed" });
});

app.post('/api/world', (req, res) => {
  console.log(req.body);
  res.send(
    `I received your POST request. This is what you sent me: ${req.body.post}`,
  );
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

// app.listen(port, () => console.log(`Listening on port ${port}`));

export default app;
