const shopprodctocument=require('../modals/shopproductmodal');

module.exports=async(req,res)=>{

    try{
        let shop=req.shop;
        let _id=shop._id;
        await shopprodctocument.find({shopId:_id}).populate(['customerId','userId','productId','category']).exec((err,data)=>{
          
            res.send(data);
        })
    }catch(err){

    }
}