const express = require('express');
const app = express();
const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();
const Chatkit = require('@pusher/chatkit-server');


const chatkit = new Chatkit.default({
  instanceLocator: process.env.INSTANCE_LOCATOR,
  key:process.env.SECRET_KEY
})




const { Pool } = require('pg')
const pool = new Pool({
    host: 'localhost',
    database : 'closeted',
    port: 5432
});

if (!process.env.AUTH0_DOMAIN || !process.env.AUTH0_AUDIENCE) {
  throw 'Make sure you have AUTH0_DOMAIN, and AUTH0_AUDIENCE in your .env file'
}

app.use(cors());
app.use(express.json())
app.use(morgan('API Request (port 3002): :method :url :status :response-time ms - :res[content-length]'));


const checkJwt = jwt({
  // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256']
});

// const checkScopes = jwtAuthz([ 'openid profile email read:messages' ]);

console.log(jwtAuthz(['read:users']))
app.get('/api/public', function(req, res) {
  res.json({ message: "Hello from a public endpoint! You don't need to be authenticated to see this." });
});

app.get('/api/private', checkJwt, function(req, res) {
  res.json({ message: "Hello from a private endpoint! You need to be authenticated  to see this." });
});
//chatkit users //
app.post("/users/", (req, res) => {
  const { username } = req.body;
  console.log('this is the username')
  chatkit
    .createUser({
      id: username,
      name: username
    })
    .then(() => {
      console.log(`User created: ${username}`);
      res.sendStatus(201);
    })
    .catch(err => {
      if (err.error === "services/chatkit/user_already_exists") {
        console.log(`User already exists: ${username}`);
        res.sendStatus(200);
      } else {
        res.status(err.status).json(err);
      }
    });
});

//Chatkit authenticate //
app.post('/authenticate', (req, res) => {
  const authData = chatkit.authenticate({ userId: req.query.user_id })
  res.status(authData.status).send(authData.body)
})

///send data to user d

app.post('/user',async (req, res) => {
  const client =await pool.connect();
  // console.log('this is the request',req)
  console.log('end of reqs about to call for the user')
  let user= await client.query('SELECT * FROM userData WHERE email=$1',[req.body.email]);
  console.log('this is the user:',user)
  if(user.rowCount===1){
    console.log('found');
    client.release();
  }else{
    user= await client.query('INSERT INTO userData VALUES (default,$1,$2,$3,$4) RETURNING *',
      [
        req.body.email,
        req.body.auth0,
        req.body.name,
        req.body.authtype

      ])
    console.log('this is the req',req.body);
    client.release();
    console.log('this is the users information',user.rows[0])
    res.json(user.rows[0])
     
    }
  })
  //********************************* DIARY SECTION ********************************//
//POST TO DIARY///
  app.post('/diary',async (req,res)=>{
    console.log('this is the body',req.body)
    const client =await pool.connect();
    var events = await client.query('INSERT INTO diaryEntries VALUES (default,$1,$2,$3,$4) RETURNING *',[
       req.body.diary_post,
       req.body.created_at,
       req.body.updated_at,
       req.body.authid,
      
    ]);
    console.log(req);
    client.release();
    res.json(events.rows[0]);
})

// GET DIARY ///

app.get('/diary/:id', async (req,res) =>{
  // console.log('we are in the sever')
  const client =await pool.connect();
  var events = await client.query('SELECT * FROM diaryEntries WHERE authId=$1',[req.params.id]);
  client.release();
  console.log('this is in the server side',events.rows[0])
  res.json(events.rows);
})
app.get('/user/:id', async (req,res) =>{
  // console.log('we are in the sever')
  const client =await pool.connect();
  var events = await client.query('SELECT * FROM userData WHERE email=$1',[req.params.id]);
  client.release();
  console.log('this is in the server side',events.rows[0])
  res.json(events.rows);
})
// DELETE DIARY POST///
app.delete('/diary/:id', async (req,res) =>{
  // console.log('we are in the sever')
  const client =await pool.connect();
  var events = await client.query('DELETE FROM diaryEntries WHERE diary_id=$1 RETURNING *',[req.params.id]);
  client.release();
  console.log('this is in the server side',events.rows[0] )
  res.json(events.rows); 
})

///edit Diary Post///

app.put('/diary/:id',async(req,res)=>{
  const client = await pool.connect();
  var events = await client.query('UPDATE diaryEnteries SET diary_id = $1, updated_at = $2 WHERE diary_id=$1',[req.body.diary_id,req.body.diary_id,req.params.id]);
  client.release();
  res.json(events.rows[0]);
})

// Get the post from explore///
app.get('/explorpage/',async(req,res)=>{
  const client = await pool.connect();
  var events = await client.query('SELECT * FROM explorpage');

  res.json(events.rows);
  client.release();
})
///post to the explore page ///
app.post('/explorpage/',async (req,res)=>{
  console.log('this is the body',req.body)
  const client = await pool.connect();
  var events = await client.query('INSERT INTO explorpage VALUES (default,$1,$2,$3,$4) RETURNING *',[
    req.body.authid,
    req.body.url,
    req.body.likes,
     req.body.cation,
    
     
    
  ]);
  console.log(req);
  client.release();
  res.json(events.rows[0]);
})
//// QUOTES ////
app.get('/quotes/:id', async (req,res) =>{
  
  const client = await pool.connect();
console.log('we are in the server for the qoutes')
  var events = await client.query('SELECT * FROM inspirationalQuotes WHERE id=$1',[req.params.id]);
  console.log(JSON.stringify(events))
  client.release();
  
 
  res.json(events.rows[0]);
})
     


app.listen(3001);
console.log('Server listening on http://localhost:3001. The React app will be built and served at http://localhost:3000.');
