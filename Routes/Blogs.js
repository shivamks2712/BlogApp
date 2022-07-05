const express = require ('express');
const {check,validationResult}=require('express-validator');
const router = express.Router();
const Blog = require('../Models/Blog');
const User = require('../Models/User');
const multer = require('multer');
const  mongoose  = require('mongoose');


const storage = multer.diskStorage({
  destination :function(req,file,cb){
    cb(null,'./uploads/');
  },
  filename: function(req,file,cb){
    cb(null, file.originalname)
  }
})
const fileFilter=(req,file,cb)=>{
  if(imageMimeType.includes(file.mimetype)) {cb(null,true);}
  else
  cb(null,true);

}

const upload =multer({storage:storage,limits:{
  fieldSize:1024*1024*20
  },
  fileFilter:fileFilter
});

const imageMimeType = ['image/jpeg','image/png','image/gif'];


router.post('/create',[
check('title','Title is required').not().isEmpty(),
check('description','Description is required').not().isEmpty(),
upload.single('image')]
, async (req,res)=>{
  console.log('requested');
    const errors=validationResult(req.body)
 if(!errors.isEmpty()){
     return  res.status(400).send(errors.array());
 }     
      const obj = JSON.parse(JSON.stringify(req.body));
       const newBlog = Blog({title:obj.title,description:obj.description,tag:obj.tag,user:obj.user})
          try{
            newBlog.image = req.file.path;
            console.log(req.file)
          }
          catch(ex){
          }
       newBlog.save((err,saved)=>{
         if(err){
          return res.status(500).send('Server Error')
        }
         else return res.status(200).send(saved)
       })

})




//                                                           get by tag
router.get('/byTag', async(req,res)=>{
    if(req.query.type=='id'){
      try{
        const blog =await Blog.findById(req.query.id).populate('user',['name','avatar']);
        if(blog) {
          const blogs=[];
          blogs.push(blog)
          return res.status(200).send(blogs);
        }
        else return res.status(400).send('NO blogs find') 
      }
       catch(exc){
         
       }
      }
    if(req.query.type=='any'){
    const blogs = await Blog.find().populate('user',['name','avatar']);
    if(blogs) {
    return res.status(200).send(blogs);}
    else return res.status(404).send('NO blogs find')
    }
    const blogs = await Blog.find({tag:req.query.tag}).populate('user',['name','avatar']);
    if(blogs) {
      return res.status(200).send(blogs);}
    else return res.status(404).send('NO blogs find')
})

router.get('/getMy',async(req,res)=>{
  try{
    var id = mongoose.Types.ObjectId(req.query.id)
    const myBlogs = await Blog.find({user:id});

    if(myBlogs)res.status(200).send(myBlogs);
    else{
      res.status(400).send('No blog found')
    }
  }
  catch(exc){
    res.status(400).send();
  }
})


router.delete('/deletePost',async(req,res)=>{
    const b=await Blog.findByIdAndDelete(req.query.id);

    if(b){res.status(200).send('Deleted')} 
    else{
        console.log(b)
        res.status(500).send('Server Error ')
    }
  
})

module.exports = router;
