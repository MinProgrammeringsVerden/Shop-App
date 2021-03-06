const fs = require('fs');
const path = require('path');
const Cart = require('./cart');

const p = path.join(
    path.dirname(process.mainModule.filename) , 
    'data' , 
    'products.json'
    );


    const getProductsFromFail = cb => {
        
        fs.readFile(p ,(err, fileContent)  => {
            //console.log(err);
            if (err) {
                cb ( [] );
            } else{
              cb(JSON.parse(fileContent)) ;
            }
         })
      };




module.exports = class Product {
    constructor(id , title , imgUrl , price , description ){
        this.id = id ;
        this.title = title ,
        this.imgUrl = imgUrl , 
        this.price = price , 
        this.description = description
    }

    save() {
        getProductsFromFail(products => {
        if (this.id) {
                const existingProductIndex = products.findIndex( prod => prod.id === this.id);
                const updatedProducts = [...products]
                updatedProducts[existingProductIndex] = this;
                fs.writeFile(p , JSON.stringify(updatedProducts) , (err) => {
                 console.log(err);
                     });
                
        } else {
         this.id = Math.random().toString();
         products.push(this);
         fs.writeFile(p , JSON.stringify(products) , (err) => {
         console.log(err);
             });
         }
      
    });
  }
        
        
    static findById(id , cb) {
        getProductsFromFail(products => {
         const product = products.find(prod => prod.id === id);
         cb(product);
        })
        
    } ;      
        

    static fetchAll(cb) {
        getProductsFromFail(cb)
    };

    static deleteById(id ) {
        getProductsFromFail(products => {
           const product = products.find(prod => prod.id === id)
           const filteredProducts = products.filter(prod => prod.id !== id)
           fs.writeFile(p , JSON.stringify(filteredProducts) , (err) => {
            if (!err) {
              Cart.deleteProduct(id , product.price)
            };
          });
       
       });
  };

}
