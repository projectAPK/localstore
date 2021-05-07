const shoporderDocment=require('../modals/shopordermodal');

module.exports=async(req,res)=>{
    try{
        let _id=req.body.id;
        console.log(_id);
     const deltetedorder=await shoporderDocment.deleteOne({_id});
     res.send('1');
    }catch(err){

    }
}