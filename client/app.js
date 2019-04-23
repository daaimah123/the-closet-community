const express = require('express');
const app = express();
app.use(express.json());


/****************************** Personal Diary ********************************************/

app.get('/diary',async (req,res)=>{
    const client = await pool.connect();
    var diaryPosts = await client.query('SELECT * FROM ')
})