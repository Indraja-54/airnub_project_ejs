const mongoose=require("mongoose")
const initdata=require("./data.js")
const Listing=require("../models/listing.js")

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust")
}
main().then(()=>{
    console.log("connection to db");
})
.catch((err)=>{
    console.log("error")
})

const initdb=async()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(initdata.data);
    console.log("data was initialized");
}


initdb();