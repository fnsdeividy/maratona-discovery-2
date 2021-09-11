const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')


module.exports = {
   async index(req, res) {

        const jobs = await Job.get();
        const profile = await Profile.get();
        
        let statusCount = {
            progress : 0,
            done: 0,
            total: jobs.length
        }

        let jobTotalHours = 0

        const updateJobs =  jobs.map((job) => {
        
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
                    budget: JobUtils.calculateBudget(job, profile["value-hour"])
                }
            })
             //qtd horas que vou trabalhar dia (profile) - quantidade de horas dia por projeto
            const freeHours = Number(profile["hours-per-day"]) - jobTotalHours 

            const freeHoursStatus = freeHours < 1 ?   "Você não tem horario livre no seu dia ": `Você tem ${freeHours} horas livres no seu dia ` 
            

            
            return res.render("index",{jobs:updateJobs, profile: profile, statusCount:statusCount,freeHoursStatus} )
        
        
        
    }
}
