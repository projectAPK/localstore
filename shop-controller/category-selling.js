const shoporderdocument=require('../modals/shopordermodal');
const productdocument=require('../modals/categorymodel')

module.exports=async(req,res)=>{

    try{
        let shop=req.shop;
        let _id=shop._id;
        let productId=req.body.categoryid
        await shoporderdocument.find({$and:[{shopId:_id},{status:'Deliverd'},{productId}]}).populate(['customerId','userId','productId','category']).exec((err,data)=>{
            res.send(data);
        })
    }catch(err){

    }
}