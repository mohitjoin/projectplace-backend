const dbConnect = require('./dbconnect')


const main = async() => {
    let data = await dbConnect();
    data = await data.find({}).toArray();

    console.log(data)


}
main();
const insert = async() => {
        const data = await dbConnect();

        const result = await data.insertOne({
            projectId: '3',
            projectName: "ReferIt"
        });
        // if we want to insert many then simply pass an array
        // [
        //     {

        //     },
        //     {

        //     }
        // ]
        if (result.acknowledged == true) {
            console.log("Item inserted")
        } else {
            console.log("Error occurred while inserting");
        }
    }
    // insert();


// update
const updatadata = async() => {
        const data = await dbConnect();
        // use update insted of updateOne to update all
        const result = await data.updateOne({ projectId: '3' }, { $set: { projectName: 'NodeJs Project' } })

        console.log(result);
    }
    // updatadata();

const deletedata = async() => {
    const data = await dbConnect();
}