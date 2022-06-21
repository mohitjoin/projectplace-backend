require("dotenv").config();
const express = require('express')
const port = process.env.PORT || 7000  ;  
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
const Razorpay = require("razorpay");

app.use(cors());
// app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json()) // use while pass data
const dbConnect = require('./dbconnect')
app.get('/', async(req, res) => {
    res.send('This is up and running server of Nodejs for ProjectPlace app')
})



app.listen(port, (err) => {
    if (err)
        console.log('There is an error inn running');

    console.log(`server is running at ${port}`); 
}) 

app.get('/findprojects', async(req, res) => {
    const dbData=await dbConnect();
    const allProjects= await dbData.find({}).toArray();
     res.send(allProjects);
    //res.send('Find projects')
})

// api for getting all project of an individual
app.get('/userproject/:username', async(req, res) => {
    const dbData=await dbConnect();
    const username=req.params.username;;
    const nUsername=username.toString();
    const allProjects= await dbData.find({userName:nUsername}).toArray();
     res.send(allProjects);
    //res.send('Find projects')
})

// api for getting a project
app.get('/project/:projectId', async(req, res) => {
    const dbData=await dbConnect();
    const project_id=req.params.projectId;;
    const ProjectId=project_id.toString();
    const allProjects= await dbData.find({projectId:ProjectId}).toArray();
     res.send(allProjects);
    //res.send('Find projects')
})

// api for Adding a project
app.post('/addproject', async(req, res) => {
    const dbData=await dbConnect();

    const Upname = req.body.UserPname;
    const Upid = req.body.UserPid;
    const Uphl = req.body.UserPHl;
    const Updsc = req.body.UserPDesc;
    const Uptechno = req.body.UserPtechno;
    const Upalink = req.body.UserPanLink;
    const CuUser = req.body.cUser;


     
    const allProjects= await dbData.insertOne(
        {
            projectId: Upid.toString(),
            projectName: Upname.toString(),
            userName:CuUser.toString(),
            aboutProject:Updsc.toString(),
            techUsed:Uptechno.toString(),
            upVotes:'10'.toString(),
            liveLink:Uphl.toString(),
            codeLink:Upalink.toString()
        },
        function (err, result) {
            if (err) {
              res.status(400).send("Error inserting matches!");
            } else {
              console.log(`Added a new match with id ${result.insertedId}`);
              res.status(204).send();
            }
          })  
    // console.log(allProjects);  
    //    res.send(allProjects)   
    // if (allProjects.acknowledged == true) {
    //     console.log("Item inserted")
    // } else {
    //     console.log("Error occurred while inserting");
    // }
})
// use put 
// use delete 

// Razerpay route


app.post('/payments', async (req, res) => {
    console.log("Razerpay api");
    const amont = req.body.amount*100;
    try {
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET,
        });

        const options = {
            amount: amont, // amount in smallest currency unit
            currency: "INR",
            receipt: "receipt_order_premium",
        };

        const order = await instance.orders.create(options);

        if (!order) return res.status(500).send("Some error occured");

        res.json(order);
    } catch (error) {
        res.status(500).send(error);
    }

    
});