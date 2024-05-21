const express = require("express");
const app = express();
const userModel = require("./models/user");
const postModel = require("./models/post")
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const post = require("./models/post");
const upload = require("./Config/multerconfig")
const path = require("path")





app.set("view engine" , "ejs")
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, "public")))
app.use(cookieParser())






//   ROUTES


// Main page route
app.get("/" , function(req,res){
    res.render("index")
})

// Profile pic upload

app.get("/profile/upload" , function(req,res){
    res.render("profileupload")
})


app.post("/upload", isLoggedIn ,upload.single("image") ,async function(req,res){
   let user = await userModel.findOne({email: req.user.email})
   user.profilepic = req.file.filename
   await user.save()
   res.redirect("profile")
})

// Login page route
app.get("/login" , function(req,res){
    res.render("login")
})

// Edit page route
app.get("/edit/:id" , async function(req,res){
    let post = await postModel.findOne({_id: req.params.id})

    res.render("edit" , {post})
})



// Update post route
app.post("/update/:id" , async function(req,res){
    let post = await postModel.findOneAndUpdate({_id: req.params.id}, {content: req.body.content})

    res.redirect("/profile")
})

// Delete post route
app.get("/delete/:id" , async function(req,res){
    let post = await postModel.findOneAndDelete({_id: req.params.id})

    res.redirect("/profile")
})

// Profile page route
app.get("/profile", isLoggedIn , async function(req,res){
    
   let user = await userModel.findOne({email: req.user.email}).populate("posts")
   
   res.render("profile" , {user})
})

// Post post route

app.post("/post", isLoggedIn , async function(req,res){
    let user = await userModel.findOne({email: req.user.email})
    let {content} = req.body;
    let post = await postModel.create({

        user: user._id,
        content: content
    })

    user.posts.push(post._id)
    await user.save()
    res.redirect("/profile")
 })

// Post page route
 app.get("/post" , function(req,res){
    res.redirect("/profile") 

 })


//  Register post route
app.post("/register" , async function(req,res){

   let{email , name , username , password} = req.body

   let user = await userModel.findOne({email});
   if(user) return res.status(500).send("User already registered");

   bcrypt.genSalt(10 , (err , salt)=> {
    bcrypt.hash(password , salt, async (err ,hash) => {
        let user = await userModel.create({
            username,
            name,
            email,
            password: hash
        })
        
        let token = jwt.sign({email: email , userid : user._id} , "shhh")
        res.cookie("token" , token)
        res.redirect("/login")
    })
   })

})


// Login post route
app.post("/login" , async function(req,res){

    let{ email , password} = req.body
 
    let user = await userModel.findOne({email});
    if(!user) return res.status(500).send("Something went wrong!");
 
    bcrypt.compare(password , user.password , function(err, result){

        if(result) {
            let token = jwt.sign({email: email , userid : user._id} , "shhh")
            res.cookie("token" , token)
            res.status(200).redirect("/profile")
        }

        else res.redirect("/login")
    })
 
 })


// Logout page route
 app.get("/logout" , function(req,res){
    res.cookie("token" , "")
    res.redirect("/login")
})


// Is logged in function
function isLoggedIn(req,res,next){
    if(req.cookies.token === "") res.render("/login")
    else{
            let data = jwt.verify(req.cookies.token , "shhh")
            req.user = data
            next()
    }
}






app.listen(3000)