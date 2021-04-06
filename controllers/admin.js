const Product = require('../models/product')

exports.getAddProduct = (req, res , next) => {
    res.render('admin/edit-product' , { 
       pageTitle:'Add product' , 
       path :'/admin/add-product' , 
       editing :false,
      });
 };

 exports.postAddProduct =  (req, res , next) => {
    //console.log(req.body)
    title = req.body.title
    imgUrl = req.body.imgUrl
    price = req.body.price
    description= req.body.description
    const product = new Product(null , title , imgUrl , price , description);
    product.save()
    res.redirect('/');
 };

 exports.getEditProduct = (req, res , next) => {
    const editMode = req.query.edit;
    if (!editMode){
       return res.redirect('/')
    };
    
    const productId = req.params.productId;
    Product.findById(productId , product =>{
     if(!product){
        res.redirect('/')
     }
     res.render('admin/edit-product' , { 
      pageTitle:'Edit product' , 
      path :'/admin/edit-product' , 
      editing: editMode ,
      product:product
     });
    })
};

exports.postEditProduct= (req , res , next ) => {
   const prodId = req.body.productId;
   const updatedTitle = req.body.title;
   const updatedImgUrl = req.body.imgUrl;
   const updatedPrice = req.body.price;
   const updatedDescription = req.body.description;
   const updatedProduct = new Product (prodId , updatedTitle , updatedImgUrl , updatedPrice ,updatedDescription  );
   updatedProduct.save();
   res.redirect('/admin/products');

};
exports.postDeletProduct = (req , res , next ) => {
 const productId = req.body.productId
 Product.deleteById(productId);
 res.redirect('/admin/products');
};


 exports.getProducts = (req, res , next) => {
    Product.fetchAll(products => {
        res.render('admin/products' , { 
          pageTitle: 'Admin Products' ,
          prods: products  ,
          path:'admin/products' , 
          harProducts: products.length > 0,
        });
      });
       
 };