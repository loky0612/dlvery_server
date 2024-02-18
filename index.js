const express = require('express');
const app = express();
const db = require('./Database/mySql');

const PORT = process.env.PORT || 8000;
app.use(express.json());
app.use('/', require('./routes/authRoutes'));

app.listen(PORT,() => {
    console.log("Server Connected at port 8000");
    db.connect((err) => {
        if (err) throw err;
        console.log("DB connected sucessfully");
    })
})