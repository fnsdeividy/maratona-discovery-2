const express = require("express");
const routes = express.Router()
const basePath = __dirname + "/views/"
const profile = {
    name: "Deividy",
    avatar: "https://www.github.com/Deividy-Ferreira-Nascimento.png",
    "mounthly-budget": 3000,
    "days-per-week": 5,
    "hours-per-week": 5,
    "vacation-per-year": 4,
    "value-hour": 75
}

const Job = {
    data: [
        {
            id: 1,
            name: "Pizzaria",
            "daily-hours": 2,
            "total-hours": 1,
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
    ],
    controllers: {
        index(req, res) {
            const updateJobs = Job.data.map((job) => {
            
                    const remaining = Job.utils.remainingDays(job)
                    const status = remaining <= 0 ? "done"  : "progress"
                    const statusZero = remaining <= 0  ?  "Prazo Encerrado" : remaining + " dias para a entrega" 
                    
                    return {
                        ...job, 
                        remaining,
                        status,
                        statusZero,
                        budget: profile["value-hour"] * job["total-hours"]
                    }
                })
                
                
                return res.render(basePath + "index",{jobs:updateJobs, profile} )
            
            
            
        },
        create(req,res) {

            const lastId = Job.data[Job.data.length -1] ?.id || 1;
            
            Job.data.push({
                id: lastId -1 ,
                name: req.body.name,
                "daily-hours": req.body["daily-hours"],
                "total-hours": req.body["total-hours"],
                createAt: Date.now()
                
            })
        
            return res.redirect("/")
        },
        
    },
    utils: { 
        remainingDays(job) {
            const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed()
        
                const createdDate = new Date(job.createAt)
                const dueDay = createdDate.getDate() + Number(remainingDays)
                const dueDateInMs = createdDate.setDate (dueDay)
        
                const timeDiffInMs = dueDateInMs - Date.now()
        
                //transformar milli em dias
                const dayInMs = 1000 * 60 * 60 * 24
                const dayDiff = Math.floor(timeDiffInMs / dayInMs)
        
                return dayDiff
        }
    },
}





routes.get('/', Job.controllers.index )

routes.get('/job', (req, res) => res.render(basePath + "job"))
routes.post('/job', Job.controllers.create)
routes.get('/job/edit', (req, res) => res.render(basePath + "job-edit"))
routes.get('/profile', (req, res) => res.render(basePath + "profile", {profile}))



module.exports = routes