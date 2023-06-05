//------cart open/close------
let cartbtn=document.querySelector("#cart");
let cartmenu=document.querySelector(".cart");
let cartremove=document.querySelector(".cart-remove");

cartbtn.addEventListener('click',()=>{
    cartmenu.classList.toggle("cart-active")
});

cartremove.addEventListener('click',()=>{
    cartmenu.classList.toggle("cart-active")
});

//------cart add items------

document.addEventListener('DOMContentLoaded',pageLoad);

function pageLoad(){
    loadContent();
}
function loadContent(){
    //Remove from cart
    let btnremove=document.querySelectorAll('#cart-remove');
    btnremove.forEach((btn)=>{
        btn.addEventListener('click',removeitem);
    });

    //change qty
    let qtychange=document.querySelectorAll('.cart-qty');
    qtychange.forEach((input)=>{
        input.addEventListener('change',qtychangeitem);
    });

    //add prodect cart
    let addcart=document.querySelectorAll('#cart-btn');
    addcart.forEach((btn)=>{
        btn.addEventListener('click',addCart);
    });

    updatetotal();
}



//remove item
function removeitem(){
    if(confirm('Are You Sure to Remove')){
        let title=this.parentElement.querySelector('.cart-prodect-title').innerHTML;
        this.parentElement.remove();
        itemlist=itemlist.filter((el)=>el.title!=title);
        this.parentElement.remove();
        loadContent();
    }
}

//chamge qty
function qtychangeitem(){
    if(isNaN(this.value) || this.value<1){
        this.value=1;
    }
    loadContent();
}

let itemlist =[];

//add cart
function addCart(){
    let prodect=this.parentElement;
    let title = prodect.querySelector('#prodect-title').innerHTML;
    let price = prodect.querySelector('#prodect-price').innerHTML;
    let imgSrc = prodect.querySelector('.shadow').src;
    //console.log(title,price,imgSrc);

    let newprodectdetails ={title,price,imgSrc}

    //check prodect already exist in cart
    if(itemlist.find((el)=>el.title==newprodectdetails.title))
    {
        alert("Prodect Already in Cart");
        return;
    }
    else{
        itemlist.push(newprodectdetails);
    }

    let newprodect = createCartProdect(title,price,imgSrc);
    let element = document.createElement('div');
    element.innerHTML=newprodect;
    let basket = document.querySelector('.cart-content');
    basket.append(element);
    loadContent();
}

function createCartProdect(title,price,imgSrc){
    return`
    <div class="cart-box">
        <div class="row">
            <div class="col-3">
                <img src="${imgSrc}" class="cart-img" width="70px" height="auto">
            </div>
            <div class="col-6">
                <div class="detail-box">
                    <div class="cart-prodect-title">${title}</div>
                    <div class="row">
                        <div class="col-12">
                            <div class="clearfix mt-1">
                                <div class="cart-price float-start">${price}</div>
                                <div class="cart-amt float-end">${price}</div>
                            </div>
                        </div>
                        <div class="col-12 mt-1"> 
                            <input type="number" value="1" class="cart-qty">
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-3 ps-4 my-auto" id="cart-remove">
                <i class="fa-solid fa-trash"></i>
            </div><hr class="mt-1">
        </div>                        
    </div>
    `
} 

function updatetotal(){
    const cartitem=document.querySelectorAll('.cart-box');
    const totalprice=document.querySelector('.total-amt');

    let total=0;

    cartitem.forEach((prodect)=>{
        let elementprice=prodect.querySelector('.cart-price');
        let price=parseFloat(elementprice.innerHTML.replace("Rs.",""));
        let qty = prodect.querySelector('.cart-qty').value;
        total+=(price*qty);
        prodect.querySelector('.cart-amt').innerHTML="Rs."+(price*qty);
    });
    totalprice.innerHTML="Rs."+total;

    //Add prodect count
    let cartcount = document.querySelector('#cart-count');
    let listcount = itemlist.length;
    console.log(listcount);
    cartcount.innerHTML=listcount;

    if(listcount==0){
        cartcount.style.display='none';
    }
    else{
        cartcount.style.display='inline';
    }
}