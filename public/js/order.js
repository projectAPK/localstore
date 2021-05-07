


function loadorder(){
  
    $.ajax({
        url:'/order',
        type:"POST",
        success:function(data){
        let qty=''
          if(data==1){
          let msg=` <p id='order-msg' style="font-size:larger;
                    color:black;
                    border:1px solid #ddd ;
                    padding:10px;
                    text-align:center;
                    background-color:lightgrey;">You have not Ordered Yet</p> `;
                                     $('.order-body').html(msg);
                                     return;
          }
          let shoplist=Array()
          data.forEach(e=>{
                    
            if(!shoplist.includes(e.shopId.shopname)){
               shoplist.push(e.shopId.shopname)
              } 
             }) 
          let output='';
           output=`<h5 class="mb-4">Orders(<span>${data.length}</span> items)</h5>`
                
        shoplist.forEach(shop=>{  
          output=output.concat(`<h5 class="mb-4" style='text-align:center;'>${shop}</h5>`)      
        data.forEach(element => {
            if(shop==element.shopId.shopname){
       output=output.concat(`<hr class="mb-4">
      <div class="row mb-4">
     
      <div class="col-md-5 col-lg-3 col-xl-3">
        <div class="view zoom overlay z-depth-1 rounded mb-3 mb-md-0">
          <img class="img-fluid w-100"
            src="${element.productId.images[0]}" alt="Sample" style='width:15rem;height:15rem;'>
          <a href="#!">
            <div class="mask waves-effect waves-light">
              <img class="img-fluid w-100"
                src="${element.productId.images[0]}">
              <div class="mask rgba-black-slight waves-effect waves-light"></div>
            </div>
          </a>
        </div>
      </div>
      <div class="col-md-7 col-lg-9 col-xl-9">
        <div>
          <div class="d-flex justify-content-between">
            <div>
              <h5>${element.productId.product}</h5>
              <p class="mb-3 text-muted text-uppercase small">${element.category.categoryname}</p>`);
              if(element.sub_category.category_name!='kg'){
             let i=0
                element.sub_category.category_name.forEach(cat=>{
                  

                    output=output.concat(`
                <p class="mb-2 text-muted text-uppercase small"><b>${cat}</b>:${element.sub_category.category_value[i]}</p>
                `)
                i++;
                    })
                 qty=element.qty
                    output=output.concat(`
                     
                    <p class="mb-2 text-muted text-uppercase small"><b>Qty</b>:${element.qty}</p>
                    `)
   
              }else{
                qty=element.sub_category.category_value
                output=output.concat(`
                <input type='hidden' id='qty-info' value=${element.sub_category.category_value}>
                <p class="mb-2 text-muted text-uppercase small">${element.sub_category.category_name}:${element.sub_category.category_value}</p>
                `)
              
                  
    
              }
            output=output.concat(`</div>
           
          </div>
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <a href="#!" type="button" id='remove-order'  data-id=${element._id} data-qty=${qty} data-shopid=${element.shopId._id} data-shopproductid=${element.shopproductid} class="card-link-secondary small text-uppercase mr-3" style='color:red;'><i
                  class="fa fa-trash mr-1"></i> Cancel Order</a>
              
            </div>`);
            // alert(element.productId.product)
            let amt=Math.floor(element.price)
            output=output.concat(`<p class="mb-0"><span id='totalprice'><strong>Rs.${amt}</strong></span></p>
          </div>
        </div>
        <ol class="progtrckr" data-progtrckr-steps="5">`);
        if(element.status=='order accept'){
    output=output.concat(`<li class="progtrckr-todo">Order Processing</li>`);
    output=output.concat(`<li class="progtrckr-todo">Order Production</li>`);
    output=output.concat(`<li class="progtrckr-todo">Order Shipped</li>`)
    output=output.concat(`<li class="progtrckr-todo">Order Deliverd</li>`) 
        }
        if(element.status=='Process'){
    output=output.concat(`<li class="progtrckr-done">Order Processing</li>`);
    output=output.concat(`<li class="progtrckr-todo">Order Production</li>`);
    output=output.concat(`<li class="progtrckr-todo">Order Shipped</li>`)
    output=output.concat(`<li class="progtrckr-todo">Order Deliverd</li>`)
        }
        if(element.status=='Production'){
          output=output.concat(`<li class="progtrckr-done">Order Processing</li>`);
          output=output.concat(`<li class="progtrckr-done">Order Production</li>`)
          output=output.concat(`<li class="progtrckr-todo">Order Shipped</li>`)
          output=output.concat(`<li class="progtrckr-todo">Order Deliverd</li>`)
        }
        if(element.status=='Shipped'){
          output=output.concat(`<li class="progtrckr-done">Order Processing</li>`);
          output=output.concat(`<li class="progtrckr-done">Order Production</li>`);
          output=output.concat(`<li class="progtrckr-done">Order Shipped</li>`)
          output=output.concat(`<li class="progtrckr-todo">Order Deliverd</li>`)
        }
        if(element.status=='Deliverd'){
          output=output.concat(`<li class="progtrckr-done">Order Processing</li>`);
          output=output.concat(`<li class="progtrckr-done">Order Production</li>`);
          output=output.concat(`<li class="progtrckr-done">Order Shipped</li>`)
          output=output.concat(`<li class="progtrckr-done">Order Deliverd</li>`)

        }
        
        
output=output.concat(`</ol>
      </div>
    </div>
    `);
      }
        });
      
      });
  

   output=output.concat(`<p class="text-primary mb-0"> .</p>`)
    $('.order-body').html(output);
}
})
  
}
 
loadorder();

$(document).on('click','#remove-order',function(){
  let ans=confirm('Do you want to cancel this order');
  if(ans){
        let letqty=$(this).data('qty')
        let id=$(this).data('id');
     
        let shopproductid=$(this).data('shopproductid');
  
        $.ajax({
          url:'/set-product-qty',
          type:'POST',
          data:{letqty,shopproductid,chs:1},
          success:function(data){
         if(data=='1'){
          $.ajax({
            url:'/delete-order',
            type:'post',
            data:{id},
            success:function(data){
             loadorder();
            }
        })
         }
         }
       })
     
     
        
       
  }
    });