
const customerDocument=require('../modals/customermodal');



const order=async(req,res,next)=>{
    try{
        const user=req.user;

        
        const customer=await customerDocument.find({userId:user._id})
        
            if(customer.length==0 || customer==undefined || customer==''){
                
                res.render('make-order');
            }else{
               
                req.customer=customer;
                
                next();
            }
       
        
      
    }catch(err){
        console.log
        res.render('make-order');
  
    }
}

module.exports=order;