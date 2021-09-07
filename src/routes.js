const express = require("express");
const routes = express.Router()
const basePath = __dirname + "/views/"
const profile = {
    name: "Deividy",
    avatar: "https://avatars.githubusercontent.com/u/89440440?v=4"
}

routes.get('/', (req, res) => res.render(basePath + "index",{profile}))
routes.get('/job', (req, res) => res.render(basePath + "job"))
routes.get('/job/edit', (req, res) => res.render(basePath + "job-edit"))
routes.get('/profile', (req, res) => res.render(basePath + "profile", {profile}))



module.exports = routes