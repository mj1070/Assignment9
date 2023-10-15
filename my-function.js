const axios = require('axios');
const port = 3003;

app.get("/say", (req, res) => {const keyword = req.query.keyword;
    axios.get("https://g9oenhka3i.execute-api.us-east-2.amazonaws.com/mystage?keyword=" + keyword)
    .then((resp) => res.json(resp.data))
    .catch((err) => res.send("Oops"))
})

app.listen(port, () => {
console.log(`API served at http://localhost:${port}`,port);
});