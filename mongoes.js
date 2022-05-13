// mongoes

const mongoose=require('mongoose')
const ProjectSchema=new mongoose.Schema({
    projectName:String,
    userName :String
});


const main= async ()=>{
    await mongoose.connect('mongodb://localhost:27017/projectplace')
    
    const ProjectModel= mongoose.model('projects',ProjectSchema)
    let data=new ProjectModel({
        projectName:'Project with only project name'
        // ,
        // userName:'mk30'
    })
    let result=await data.save();
    console.log(result);
} 
// main();