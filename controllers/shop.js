const Product = require('../models/product')
const Cart = require('../models/cart')



 exports.getProducts =  (req, res , next) => {
   Product.fetchAll(products => {
    res.render('shop/products' , { 
      pageTitle: 'Products' ,
      prods: products  ,
      path:'/products' , 
      harProducts: products.length > 0,
    });
  });
   
   
};


exports.getProduct = (req, res , next) => {
  const productId = req.params.productId
  Product.findById(productId , product => {
    res.render('shop/product-detail' ,  {
      product : product , 
      pageTitle:'Product details' , 
      path:'/products' , 
    
    })
  });
  

};

exports.getIndex =  (req, res , next) => {
  Product.fetchAll(products => {
   res.render('shop/index' , { 
     pageTitle: 'Shop' ,
     prods: products  ,
     path:'/' , 
     harProducts: products.length > 0,
   });
 });
  
  
};

exports.getCart =  (req, res , next) => {
    Cart.getCart(cart => {
      Product.fetchAll(products => {
        const cartProductsList = [];
        for ( product of products ){
          const cartProductData = cart.products.find(prod => prod.id === product.id);
          if(cartProductData){
            cartProductsList.push({productData : product , qty :cartProductData.qty });
          }
        }
          res.render('shop/cart' , { 
          pageTitle: 'Your cart' ,
          path:'/cart' , 
          products:cartProductsList, 
         
       });
    });

  });
   

};

exports.postCart =  (req, res , next) => {
  const productId = req.body.productId
  Product.findById(productId , product => {
    Cart.addProduct(productId , product.price);
  });
  res.redirect('/cart')

};

exports.postDeleteProduct = (req ,  res ,  next ) => {
 const productId = req.body.productId
 Product.findById(productId , prod => {
  Cart.deleteProduct(productId ,  prod.price );
  res.redirect('/cart');
 });
};


exports.getOrders =  (req, res , next) => {
  res.render('shop/orders' , { 
  pageTitle: 'Your orders' ,
  path:'/orders' , 
 
   });

};

exports.getCheckout =  (req, res , next) => {
  
  res.render('shop/checkout' , { 
  pageTitle: 'Checkout' ,
  prods: products  ,
  path:'/checkout' , 
  
  });

};