// mongoes

const mongoose=require('mongoose')
const CommentSchema=new mongoose.Schema({
    comment:String,
    userName :String
});


 
module.exports= mongoose.model('comments',CommentSchema);
 
// await mongoose.connect('mongodb://localhost:27017/projectplace')
    
    // const CommentModel= mongoose.model('comments',CommentSchema)
    // let data=new CommentModel({
    //     comment:'Project with only project name' ,  
    //     userName:'mk30'
    // })
    // let result=await data.save();
    // console.log(result);
// } 
// main();