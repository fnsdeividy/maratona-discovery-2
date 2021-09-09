    let data = {
        name: "Deividy",
        avatar: "https://www.github.com/Deividy-Ferreira-Nascimento.png",
        "monthly-budget": 3000,
         "days-per-week": 4,
        "hours-per-day": 5,
        "vacation-per-year": 4,
        "value-hour": 75
    };
    
    
module.exports = {
    get() {
        return data;
    },
    update(newData) {
        data= newData
    },
}