const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')


module.exports = {
    index(req, res) {

        const jobs = Job.get();

        let statusCount = {
            progress : 0,
            done: 0,
            total: jobs.length
        }

        let jobTotalHours = 0

        const updateJobs = jobs.map((job) => {
        
                const remaining = JobUtils.remainingDays(job)
                const status = remaining <= 0 ? "done"  : "progress"
                const statusZero = remaining <= 0  ?  "Prazo Encerrado" : remaining + " dias para a entrega" 

                statusCount [status] += 1;


            jobTotalHours = status === 'progress' ? jobTotalHours += Number(job['daily-hours']) : jobTotalHours
                

                return {
                    ...job, 
                    remaining,
                    status,
                    statusZero,
                    budget: JobUtils.calculateBudget(job, Profile.get()["value-hour"])
                }
            })
             //qtd horas que vou trabalhar dia (profile) - quantidade de horas dia por projeto
            const freeHours = Number(Profile.get()["hours-per-day"]) - jobTotalHours 

            const freeHoursStatus = freeHours >= 0 ? `Você tem ${freeHours} horas livres no seu dia ` : "Você não tem horario livre no seu dia " 

            
            
            
            return res.render("index",{jobs:updateJobs, Profile:Profile.get(), statusCount:statusCount,freeHoursStatus} )
        
        
        
    }
}
