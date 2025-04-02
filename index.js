const express = require('express');
const mongoose = require('mongoose');

const session = require("express-session");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path= require('path')
const productRoute = require('./Routes/ProductRoute');
const userRoute = require('./Routes/UserRoute');
const loginRoute = require('./Routes/loginRoute')
const { validateJWT } = require('./middleware/verifyJWT')

require('dotenv').config();
const app = express();


//database

const databaseUrl = process.env.DATABASE_URL;
const dbName = "Aarusoft";

mongoose.connect(databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongoDB connection error'));
db.once('open', () => {
    console.log(`Connection to MongoDB:${dbName}`)
});

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
    session({
        secret: "your_secret_key",
        resave: false,
        saveUninitialized: true,
    })
);

// Set EJS as the templating engine
app.set("view engine", "ejs");
app.set('views', path.resolve('./views'));

// Routes
app.get("/", (req, res) => {
    res.render("landing", { user: req.session.user });
});

// app.get("/login", (req, res) => {
//     res.render("login", { error: null });
// });

// app.post("/auth/login", async (req, res) => {
//     const { email, password } = req.body;
    
//     const user = await User.findOne({ email });
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//         return res.render("login", { error: "Invalid credentials" });
//     }

//     req.session.user = user;
//     res.redirect("/products"); // Redirect to product list after login
// });

//Protected Routes
app.use(express.json());
// app.get('/', function (req, res) {
//     res.send('Welcome to the World of Aarusoft');
// });
app.use('/product', validateJWT, productRoute);
app.use('/user', userRoute);
app.use('/auth', loginRoute);




const PORTNo = process.env.PORTNO;
app.listen(PORTNo, () => {
    console.log(`Server started at port no ${PORTNo} `);
})