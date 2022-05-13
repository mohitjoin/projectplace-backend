const express = require('express')
const port = 7000;
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
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
    const allProjects= await dbData.find({projectName:nUsername}).toArray();
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


// use put 
// use delete