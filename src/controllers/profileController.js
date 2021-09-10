const Profile = require('../model/Profile')

module.exports = {
    async index(req,res) {
       return res.render("profile", {Profile: await Profile.get()})
    },
   async update(req,res) {
    const data = req.body
    const weeksPerYear = 52
    const weeksperMount = (weeksPerYear - data["vacation-per-year"]) / 12

    const weekTotalHours = data["hours-per-day"] * data["days-per-week"]
    const monthlyTotalHours = weekTotalHours * weeksperMount

    // qual vai ser o valor da minha hora
    const valueHour =  data["monthly-budget"] / monthlyTotalHours
    await Profile.update({
        ... await Profile.get(),
        ...req.body,
        "value-hour": valueHour
    })
     
    return res.redirect("/profile")
},

}
