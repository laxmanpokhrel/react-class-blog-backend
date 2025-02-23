// ESM => modern syntax
// import express from "express"

// CJS => common JS
const express = require("express")
const cors = require('cors')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { generateAccessToken } = require("./src/utils");
const blogsDb = require("./blogs.json");

// get config vars
dotenv.config();



const app = express()


app.use(cors())

app.use(express.json())

app.get("/ping", (req, res) => res.status(200).json({ "message": "Pong" }))

// add blogs
app.post('/blog', (req, res) => {
    // Check if the user is authenticated
    // Check authorization header and verify the token
    // const Authorization = req.headers.Authorization
    // console.log("🚀 ~ app.post ~ Authorization:", Authorization)
    const authHeader = req.headers['authorization']
    console.log("🚀 ~ app.post ~ authHeader:", authHeader)

    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        console.log(err)

        if (err) return res.sendStatus(403)

        req.user = user

    })

    const body = req.body
    return res.status(201).json({ message: "Blog added successfully." })
})

// get all blogs
app.get("/blog", (req, res) => {
    return res.status(200).json({ result: blogsDb.blogs })
})

// retrieve blog
app.get("/blog/:blogSlug", (req, res) => {
    const { blogSlug } = req.params
    const matchedBlog = blogsDb.blogs.find((blogx) => blogx.slug === blogSlug)

    if (!matchedBlog) {
        return res.status(400).json({ message: "Blog doesn't exist!" })
    }

    return res.status(200).json({ result: matchedBlog })
})

// delete blog
app.delete("/blog:blogId", (req, res) => {
    const { blogId } = req.params
    return res.status(200).json({ message: "Blog deleted successfully." })
})

// row => replace
// update blog
app.put("/blog/:blogId", (req, res) => {
    const authHeader = req.headers['authorization']

    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        console.log(err)

        if (err) return res.sendStatus(403)

        req.user = user

    })


    const { blogId } = req.params
    return res.status(200).json({ message: "Blog updated successfully.", result: req.body })
})

app.post('/login', (req, res) => {
    const loginData = req.body

    if (loginData.username === "my_name" && loginData.password === "Test@123") {
        // Some logic to generate JWT  
        const token = generateAccessToken({ username: req.body.username });
        return res.status(200).json({ "token": token })
    }
    return res.status(401).json({ message: "Credentials do not match." })
})

// // can update the tuple or update specific columns
// app.patch("/blog:blogId", (req, res) => {
//     const { blogId } = req.params
//     return res.status(200).json({ message: "Blog deleted successfully." })
// })

app.listen(3000, () => {
    console.log("Listening to Port: 3000")
})
