const Database = require('./db')
const createProffy = require('./createProffy')

Database.then(async (db) => {
    // Insert data

    proffyValue = {
        name: "Arthur Santos",
        avatar: "https://avatars2.githubusercontent.com/u/28969187?s=460&u=5519b44372ce142eae92aa23bfa3d0530efabcc0&v=4",
        whatsapp: "987456123",
        bio: "Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",        
    }

    classValue = {
        subject: 1,
        cost: "R$ 20",
        // proffy id will come by the database
    }

    classScheduleValues = [
        // class_id will come by the database after we insert the class
        {
            weekday: 1,
            time_from: 720,
            time_to: 1220
        },
        {
            weekday: 0,
            time_from: 520,
            time_to: 1220
        }
    ]

    //await createProffy(db, {proffyValue, classValue, classScheduleValues})

    // Consult data

    // All proffys
    const selectedProffys =await db.all("SELECT * FROM proffys")
    //console.log(selectedProffys)

    // Consult a teacher class
    // And bring his data together
    const selectClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
    `)
    //console.log(selectedProffys)

    // The person schedule is 8AM - 18PM
    // Schedule of time_from (8AM) needs to come before or at the same time of the choosen schedule
    // time_to needs to be more than time_from
    const selectClassesSchedules = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = "1" 
        AND class_schedule.weekday = "0"
        AND class_schedule.time_from <= "1300"
        AND class_schedule.time_to > "1300"    
    `)

    console.log(selectClassesSchedules)
})