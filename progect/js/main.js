
var cart = {};//Массив с моей корзиной

$('document').ready(function(){
 loadGoods();
 checkCart();
// showMiniCart() ;
});
function checkCart(){
    //проверка корзины в локал сторэйдж
    if(localStorage.getItem('cart') != null){
        cart =JSON.parse(localStorage.getItem('cart'));
    }
}

/*function showMiniCart(){
    //Показываю содержимое корзины
    var out ='';
    for (var w in cart){
        out += 'Количество товара данного артикула '+w + ' === '+cart[w]+'<br>';
    }
    $('#mini-cart').html(out);
}*/


function loadGoods(){
    //Загрузка товаров
   $.getJSON('goods.json',function(data){
    var out= '';
    for (var key in data){
        out+='<div class="single-goods col-lg-3">';
        out+='<img class="img-goods" src="'+data[key].image+'">';
        out+='<h3>'+data[key]['name']+'</h3>';
        out+='<p>Цена: '+data[key]['cost']+' р.</p>';
        out+='<button url="cart.html" class="btn button btn-goods-to-cart" data-art="'+key+'" >Добавить в корзину</button>'
        out+='</div>';
    }
    $('.goods').html(out);
    $('.shop-cart').html(out);
    $('button.btn-goods-to-cart').on('click',addToCart);
       $('.btn-goods-to-cart').on('click',changeLocation);
       $('.shop').on('click',changeLocation);
 })
    function  changeLocation(){
        window.location.href = $(this).attr('url');
    }
    function addToCart(){
       //Добавляю товар в корзину
        var article= $(this).attr('data-art');
        if (cart[article] != undefined){
            cart[article]++;
        }else
            {
               cart[article]=1;
            }
        localStorage.setItem('cart',JSON.stringify(cart) );
        //showMiniCart();
    }

}
