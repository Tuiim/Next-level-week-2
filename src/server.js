// Data
const proffys = [
    {name: "Diego Fernandes",
     avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4", whatsapp: "987456123",
     bio: "Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
     subject: "Química",
     cost: "20",
     weekday: [0],
     time_from: [720],
     time_to: [1220]},

     {name: "Arthur Santos",
     avatar: "https://avatars2.githubusercontent.com/u/28969187?s=460&u=5519b44372ce142eae92aa23bfa3d0530efabcc0&v=4", whatsapp: "987456123",
     bio: "Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
     subject: "Química",
     cost: "R$ 20",
     weekday: [1],
     time_from: [720],
     time_to: [1220]}
]

const subjects = [    
    "Artes",
    "Biologia",
    "Ciências",
    "Educação física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química",
]

const weekdays = [    
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",    
]

// Functions
function getSubject(subjectNumber) {
    const position = +subjectNumber - 1
    return subjects[position]
}


function pageLanding(req, res) {
    return res.render("index.html")
}

function pageStudy(req, res) {
    const filters = req.query
    return res.render("study.html", { proffys, filters, subjects, weekdays })
}

function pageGiveClasses(req, res) {
    const dados = req.query
        
    const isNotEmpty = Object.keys(dados).length > 0
    if (isNotEmpty) {

        dados.subject = getSubject(dados.subject)

        proffys.push(dados);
        
        return res.redirect("/study")
    }

    return res.render("give-classes.html", { subjects, weekdays })
} 

// Server
const express = require('express')
const server = express()

// Set up nunjucks
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})

// Start and server set up
server
// Set up static files (css, scripts, images)
.use(express.static("public"))
// Application routes
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
// Server start
.listen(5500)