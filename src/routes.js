const express = require("express");
const routes = express.Router()
const basePath = __dirname + "/views/"
const profile = {
    name: "Deividy",
    avatar: "https://www.github.com/Deividy-Ferreira-Nascimento.png"
}
const jobs = [
    {
    id: 1,
    name: "Pizzaria",
    "daily-hours": 2,
    "total-hours": 60,
    createAt: Date.now(),
    budget: 4500,
    remaining: 3,
    status: "progress"
},
    {
    id: 2,
    name: "OneTwo Project",
    "daily-hours": 3,
    "total-hours": 47,
    createAt: Date.now(),
    budget: 4500,
    remaining: 3,
    status: "done"
},
]


routes.get('/', (req, res) => {
    const updateJobs = jobs.map((job)=> {

        const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed()

        return job

    })
    
    
    res.render(basePath + "index",{jobs, profile} )

})


routes.get('/job', (req, res) => res.render(basePath + "job"))
routes.get('/job/edit', (req, res) => res.render(basePath + "job-edit"))
routes.post('/job', (req, res) => {

    const lastId = jobs[jobs.length -1] ?.id || 1;
    
    jobs.push({
        id: lastId -1 ,
        name: req.body.name,
        "daily-hours": req.body["daily-hours"],
        "total-hours": req.body["total-hours"],
        createAt: Date.now()
        
    })

    return res.redirect("/")
})
routes.get('/profile', (req, res) => res.render(basePath + "profile", {profile}))



module.exports = routes