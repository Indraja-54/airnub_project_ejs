const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const listingSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    description:String,
    image:{
        type:String,
        default:"https://i.pinimg.com/originals/08/61/0e/08610ec9cddeba30b6daf742f74e8d1f.jpg",
        set:(v)=>v===""?"https://i.pinimg.com/originals/08/61/0e/08610ec9cddeba30b6daf742f74e8d1f.jpg":v,
    },
    price:Number,
    location:String,
    country:String
})

const Listing=mongoose.model("Listing",listingSchema)
module.exports=Listing;