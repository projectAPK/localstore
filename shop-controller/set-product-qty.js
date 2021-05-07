const shop_productDocument=require('../modals/shopproductmodal');
module.exports=async(req,res)=>{
    try{
        if(req.body.chs==0){
        let _id=req.body.shopproductid;
        let qty=req.body.letqty;
        console.log(req.body)
     await shop_productDocument.updateMany({_id},{
         $set:{qty}
     })
    }else if(req.body.chs==1){
        
        let _id=req.body.shopproductid;
        let qty=req.body.letqty;
      
        console.log(req.body)
     await shop_productDocument.updateMany({_id},{
        $inc: {qty:qty}
     })
     res.send('1');
    }
    }catch(err){

    }
}