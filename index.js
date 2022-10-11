const express = require("express");
const path = require('path');
const apiRoutes = require("./routers/app.routers");
const authorizer = require("./middlewares/authorizer");

const app = express();
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static('public'));
app.use(authorizer);

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/index.html'))
})

// Routes
app.use("/api", apiRoutes);

// SERVER
const connectedServer = app.listen(PORT, () => {
    console.log(`Server is connected and listening in PORT: ${PORT} 🚀`);
});

connectedServer.on("error", (error) => {
    console.log(`error:`, error.message);
});