const express = require('express');
const app = express();
const port = 3003;
app.use(express.json());

const axios = require('axios');

const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');


const mariadb = require('mariadb');
const pool = mariadb.createPool({
       host : 'localhost',
       user : 'root',
       password: 'root',
       database:  'sample',
       port: 3306,
       connectionLimit:5
});

const options = {
    swaggerDefinition: {
    openapi: '3.0.0',
    componenets: {},
        info: {
           title: 'Maria DB API',
           version: '1.0.0',
           description: 'Mariadb API autogenerated by swagger doc and Mandy Fisher-Wesley',
       },
       host: '24.199.84.107:3003',
       basePath: '/',
   },
   apis: ['./my-function.js'],
};
const specs = swaggerJsdoc(options);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use(cors());

app.get("/say", (req, res) => {const keyword = req.query.keyword;
    axios.get("https://g9oenhka3i.execute-api.us-east-2.amazonaws.com/mystage?keyword=" + keyword)
    .then((resp) => res.json(resp.data))
    .catch((err) => res.send("Oops"))
})

app.listen(port, () => {
console.log(`API served at http://localhost:${port}`,port);
});