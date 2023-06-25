console.log(`
/* *****************************************
            Version 8888888888
******************************************/`)
let form = document.getElementById('custom_form');

let handelSubmit = async  (e) => {
    e.preventDefault()

    //get the form 

    if(!form) return false

    var selected_variant_id = get_selected_variant_id()

    var product_quentity = get_main_product_quantity()

    await add_product_to_cart(selected_variant_id,product_quentity)

    let cart_result = await get_cart_items()
    await fill_cart_input_and_shop_name(cart_result)
    console.log('cart = ',cart_result)
    submit_the_form()

}


async function add_product_to_cart(variant_selected_id, qty) {
    var quantity = 1  // quantity must be 1 or more
    if (qty >= 1) {
        quantity = qty
    }
    await $.ajax({
        type: "POST",
        url: "/cart/add.js",
        data: `quantity=${quantity}&id=${variant_selected_id}`,
        dataType: "json",
        success: function () {
            console.log('item added to the cart')
        },
        error: function () {
            console.log('item not added to the cart error')
        },
    });

     return true;
}

//get selected variant 
function get_selected_variant_id(){
    var pageurl = new URL(window.location.href.replace(/#/g, "?"));
    var selected_variant_id = pageurl.searchParams.get("variant");
    if(selected_variant_id){
        return selected_variant_id;
    }else{
        return document.getElementById('main_variant_id').value
    }
}

//get main products qty
function get_main_product_quantity(){
    return document.querySelector('.quantity .quantity__input').value;
}

// get cart data 
async function get_cart_items() {
    let cart = null;
    await $.ajax({
        type: 'GET',
        url: '/cart.js',
        cache: false,
        dataType: 'json',
        success: function (data) {
            cart = data
            console.log('cart cart cart cart = ',cart)
        }
    });

    return cart;
}


// create new order in app
function  submit_the_form(e) {
    form.submit();
}

async function  fill_cart_input_and_shop_name(cart) {
    document.getElementById('cart_detailes').value = JSON.stringify(cart)
    document.getElementById('shop_name').value = Shopify.shop
    return true
}