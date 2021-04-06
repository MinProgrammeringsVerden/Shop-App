const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename) , 
    'data' , 
    'cart.json'
);


module.exports = class Cart {
 static addProduct(id , productPrice){
  fs.readFile(p , (err , fileContent) => {
      let cart = { products:[] , totalPrice  : 0 };
    if (!err) {
        cart = JSON.parse(fileContent)
        }
        const existingProductindex = cart.products.findIndex(prod => prod.id === id );
        const existingProduct = cart.products[existingProductindex];
        let productToUpdate ;
    if(existingProduct) {
             productToUpdate = {...existingProduct };
             productToUpdate.qty = productToUpdate.qty + 1;
             cart.products = [...cart.products];
             cart.products[existingProductindex] = productToUpdate;
    } else{
          productToUpdate = { id:id , qty:1};
          cart.products =[...cart.products , productToUpdate];
        }

        cart.totalPrice = cart.totalPrice + +productPrice;
         
        fs.writeFile(p , JSON.stringify(cart) , err => {
            console.log(err);
        });
    });
} ;

static deleteProduct(id , productPrice ) {
    fs.readFile(p , (err , fileContent) => {
    //let cart = { products:[] , totalPrice  : 0 }; 
    //cart reprezentuje objekt , a pozniej object cart {} jest kopiowany za pomoca spread operator do nowej zmiennej o nazwie updatedCart {}
     
    if (err) {
          return;
          }

    // updatedCart ma falowane nawiasy a nie kwadratowe bo test obiektem jako calosc(ma w sobie intablice i totalPrice) , a nie tylko tablica obiektow
    const updatedCart = {... JSON.parse(fileContent) }
    const product = updatedCart.products.find(prod => prod.id ===id)
    if (!product){
        return;
    }
    const productQty = product.qty
    updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);
    updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty;
    fs.writeFile(p , JSON.stringify(updatedCart) , err => {
        console.log(err);
       });
    
    });
  };

  static getCart(cb){
    fs.readFile(p , (err , fileContent) => {
        const cart = JSON.parse(fileContent);
      if (err) {
         cb(null)
          } else{
            cb(cart)
          }
    });
  }
}