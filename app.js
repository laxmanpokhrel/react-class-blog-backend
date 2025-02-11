const express = require("express")

const app = express()

app.get("/ping", (req, res) => res.status(200).json({ "message": "Pong PONG" }))

app.listen(3000, () => {
    console.log("Listening to Port: 3000")
})
