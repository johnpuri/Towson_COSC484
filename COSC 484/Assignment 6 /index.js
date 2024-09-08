const express =  require ('express');
const bodyParser = require('bpdy-parser');
import { data } from "./data.js";
const app = express();

const port = 5000;

app.get("/v1/zillow/zestimate?", (request, response) => {
  let zestimate =
    request.query.sqft * request.query.bed * request.query.bath * 10;
  response.json({
    zestimate: zestimate,
  });
});

app.get("/v1/zillow/houses?:city", (req, res) => {
  if ("city" in req.query) {
    let _city_ = req.query.city;
    console.log("search city", searchCity(_city_));
    if (searchCity(_city_)) {
      let result = data.filter((item) => {
        return item.city === _city_;
      });
      res.json(result);
    } else {
      res.json([]);
    }
  } else {
    res.json(data);
  }
  console.log(req.query);
});

function searchCity(city) {
  let flag = false;
  data.forEach((item) => {
    if (item.city === city) {
      flag = true;
    }
  });

  return flag;
}

app.listen(port, () => console.log(`Server started at ${port}`));