let express = require('express');
let app = express();

const fs = require('fs');
const path = require('path');
const cors = require('cors');
const port = 4000 ;
app.use(
    cors({
        origin:"*"
    })
);

app.use(express.json());
const router= require("./routes/router");
app.use("/indifusion/list",router);

let dbconnect = require("./connectdb/connect");

dbconnect();


app.get("/",(req,res)=>{
    res.send("Page Loading");
});

app.listen(port,()=>{
    console.log("server is connected");
    
})
