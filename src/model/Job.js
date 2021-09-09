let data = [
    {
        id: 1,
        name: "Pizzaria",
        "daily-hours":2,
        "total-hours":1,
        createAt: Date.now(),
        
        remaining: 3,
        status: "progress"
    },
        {
        id: 2,
        name: "OneTwo Project",
        "daily-hours": 3,
        "total-hours": 47,
        createAt: Date.now(),
        
        remaining: 3,
        status: "done"
    },
];

module.exports = {
    get() {
        
        return data
    },
    update(newJob) {
        data = newJob
    },
    delete(id) {
        data = data.filter(job => Number(job.id) !== Number(id))
    }
}