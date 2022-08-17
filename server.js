require('dotenv').config({path: '.env'})
const express = require('express');
const app = express();
const path = require('path');
const {logger} = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
// const expressStatic = require("express-static")

const PORT = process.env.PORT || 3500;
// app.use('/static', express.static(path.join(__dirname, '/public/static')));
// app.use('/images', express.static(path.join(__dirname, '/public/images')));
app.use('/', express.static(path.join(__dirname, '/public')));
// app.use(expressStatic("./public"))

// logger
app.use(logger)

// urlencoded
app.use(express.urlencoded({extended: false}));

// json
app.use(express.json())

// routers
app.use("/email", require("./routes/email"))

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({"error": "404 Not Found"});
    } else {
        res.type('txt').send("404 Not Found");
    }
});

// error handler
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));