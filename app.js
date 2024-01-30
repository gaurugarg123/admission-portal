const express = require('express')
const app = express()
const port = 3000
const web = require('./routes/web')
const connectDb = require('./db/connectDb')
const session = require('express-session')
const flash = require('connect-flash');
const fileUpload = require("express-fileupload");
// cookies
const cookieparser = require('cookie-parser')
app.use(cookieparser())
// View Engine
app.set('view engine', 'ejs')

// connected to DataBase 
connectDb()
// Session
app.use(session({
  secret: 'secret',
  cookie: {maxAge:60000},
  resave: false,
  saveUninitialized: false,

}));

// for file upload
app.use(fileUpload({useTempFiles: true}));

app.use(flash());

// insert CSS and IMG
app.use(express.static('public'))

// change user data to object with the help of body-parser package
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// router load 
app.use('/', web)





// Create Searver
app.listen(port, () => {
    console.log(`Server start on port localhost:${port}`)
  })
