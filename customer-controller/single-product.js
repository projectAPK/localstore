const productDocument=require('../modals/productsModal');
module.exports=async(req,res)=>{
    try{
        let _id=req.body.id;


const product=await productDocument.find({_id}).populate(['category']).exec((err,data)=>{
     
      res.send(data)
     
});

    }catch(err){

    }
}