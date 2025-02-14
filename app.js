// ESM => modern syntax
// import express from "express"

// CJS => common JS
const express = require("express")
const cors = require('cors')
const app = express()

const blogsDb = require("./blogs.json")

app.use(cors())

app.get("/ping", (req, res) => res.status(200).json({ "message": "Pong" }))

// add blogs
app.post('/blog', (req, res) => {
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
app.put("/blog:blogId", (req, res) => {
    const { blogId } = req.params
    return res.status(200).json({ message: "Blog deleted successfully." })
})

// // can update the tuple or update specific columns
// app.patch("/blog:blogId", (req, res) => {
//     const { blogId } = req.params
//     return res.status(200).json({ message: "Blog deleted successfully." })
// })

app.listen(3000, () => {
    console.log("Listening to Port: 3000")
})
