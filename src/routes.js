const express = require("express");
const routes = express.Router()
const basePath = __dirname + "/views/"
const Profile = {
    data: {
        name: "Deividy",
        avatar: "https://www.github.com/Deividy-Ferreira-Nascimento.png",
        "monthly-budget": 3000,
        "days-per-week": 5,
        "hours-per-day": 5,
        "vacation-per-year": 4,
        "value-hour": 75
    },
    controllers : {
        index(req,res) {
           return res.render(basePath + "profile", {Profile: Profile.data})
        },
       update(req,res) {
        const data = req.body
        const weeksPerYear = 52
        const weeksperMount = (weeksPerYear - data["vacation-per-year"]) / 12

        const weekTotalHours = data["hours-per-day"] * data["days-per-week"]
        const monthlyTotalHours = weekTotalHours * weeksperMount

        // qual vai ser o valor da minha hora
        data["value-hour"] = data["monthly-budget"] / monthlyTotalHours

        Profile.data = data
        return res.redirect("/profile")
    },

    },
    
}

const Job = {
    data: [
        {
            id: 1,
            name: "Pizzaria",
            "daily-hours":2,
            "total-hours":1,
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
                        budget: Profile.data["value-hour"] * job["total-hours"]
                    }
                })
                
                
                return res.render(basePath + "index",{jobs:updateJobs, Profile:Profile.data,} )
            
            
            
        },
        create(req,res) {

        
            res.render(basePath + "job")
        },
        save (req,res) {
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
        show (req,res) {
            const jobId = req.params.id

            const job = Job.data.find(job => Number(job.id) === Number(jobId))
            if (!job) {
                return res.send("Job not found")
            }
            
            
            
            return res.render(basePath + "job-edit", {job})
        }
        
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
        },
        calculateBudget: (job) => Profile.data["value-hour"] * job["total-hours"]
        
    },
}





routes.get('/', Job.controllers.index )

routes.get('/job', Job.controllers.create)
routes.post('/job', Job.controllers.save)
routes.get('/job/:id', Job.controllers.show)
routes.get('/profile', Profile.controllers.index )
routes.post('/profile', Profile.controllers.update )



module.exports = routes