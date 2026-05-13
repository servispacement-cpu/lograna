import dns from 'dns';
import express from 'express';
import mongoose from 'mongoose';
import cors  from 'cors';

//dns.setDefaultResultOrder('ipv4first');

// Create a new Express.js instance
const app = express();

 

// Set up middleware

app.use(express.json());

 

// Connect to the MongoDB database

mongoose.connect('mongodb://servispacement_db_user:test@ac-wrbrxfi-shard-00-00.r3itdqv.mongodb.net:27017,ac-wrbrxfi-shard-00-01.r3itdqv.mongodb.net:27017,ac-wrbrxfi-shard-00-02.r3itdqv.mongodb.net:27017/Lograna?ssl=true&replicaSet=atlas-10s15u-shard-0&authSource=admin&appName=Cluster0', {
});

 

// Define a schema for our data

const Schemac = new mongoose.Schema({
  Nco: String,
  desc: String,
  prix: Number,
});

 

// Define a model based on the schema

const Itemc = mongoose.model('Itemb', Schemac);

 

// Define routes
app.use(cors()); 
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.post('/cookies', async (req, res) => {
  try {
 const item = new Itemc(req.body);
  await item.save();
  res.json(item);
  } catch (error){
    console.error(error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.get('/cookies', async (req, res) => {
  const items = await Itemc.find();  
  res.json(items);
});


app.use(express.static("public"));

// Start the server

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});