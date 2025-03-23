const express=require("express")
const app=express()
const path=require("path")
const mongoose=require("mongoose")
const port=8080
const Listing=require("./models/listing.js")
const methodOveride=require("method-override")
const engine=require("ejs-mate")

const mongo_url="mongodb://127.0.0.1:27017/wanderlust"

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"))
app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({entended:true}))
app.use(methodOveride("_method"))
app.engine('ejs',engine)


async function main(){
    await mongoose.connect(mongo_url);
}

main().then(()=>{
    console.log("connected to db");
})
.catch((err)=>{
    console.log("error")
})

app.get("/",(req,res)=>{
    res.render("listings/index.ejs")
})

app.listen(port,()=>{
    console.log("this is server")
})

app.get("/listings/new",(req,res)=>{
    res.render("new.ejs",{})
})

app.post("/listings",async (req,res)=>{
    const newListing=new Listing(req.body.listing)
    await newListing.save()
    res.redirect("/listings")
})

app.put("/listings/:id",async (req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing})
    res.redirect(`/listings/${id}`)
})

app.get("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    let list=await Listing.findById(id);
    console.log(list);
    res.render("show.ejs",{list});

})

app.get("/listings/:id/edit",async(req,res)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id)
    res.render("edit.ejs",{listing})
})

app.delete("/listings/:id",async(req,res)=>{
    let {id}=req.params
    await Listing.findByIdAndDelete(id)
    res.redirect("/listings")
})

app.get("/listings",async (req,res)=>{
  const listings= await Listing.find({})
  res.render("listings/index.ejs",{listings})
})


// app.get("/testListing",async (req,res)=>{
//     let sampleListing=new Listing({
//         title:"My New Villa",
//         description:"by the beach",
//         price:1200,
//         location:"calanute,Goa",
//         country:"India",
//     })
//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("succesfull testing")
// })