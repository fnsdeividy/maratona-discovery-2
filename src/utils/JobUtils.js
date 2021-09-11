

module.exports =  { 
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
    calculateBudget: (job,valueHour) => valueHour *  job["total-hours"]
    
};