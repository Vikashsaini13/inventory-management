import path from "path";
import ProductModel from "../model/product.model.js";

export default class ProductController{
    getProducts(req, res){
        let products= ProductModel.get();
        console.log(products);

    
        res.render("products", {products: products, userEmail: req.session.userEmail})
        // return res.sendFile(path.join(path.resolve(),'src','views', 'product.html'));
    }

    getNewProduct(req,res){
        res.render("new_add_product", {errorMassage: null, userEmail: req.session.userEmail})
    }

    postNewProduct(req, res){
        const {name, description, price} = req.body;
        const imageUrl= 'images/' + req.file.filename;
        console.log(req.body);
        ProductModel.add(name, description, price, imageUrl)
        let products= ProductModel.get();

      return  res.render("products", {products: products, userEmail: req.session.userEmail})

    }

    getUpdateproduct(req, res, next){
        const id= req.params.id;
        let productFound= ProductModel.getProductById(id);

        if(productFound){
            res.render("update_product", {product: productFound, errorMassage: null, userEmail: req.session.userEmail})
        }
        else{
            res.status(401).send("product not found");
        }

    }

    postUpdateProduct(req, res, next){
        console.log(req.body);
        ProductModel.update(req.body)
        let products= ProductModel.get();

      return  res.render("products", {products: products, userEmail: req.session.userEmail})
    }
    deleteProduct(req, res, next){
        const id= req.params.id;
        let productFound= ProductModel.getProductById(id);
        if(!productFound){
           return res.status(401).send("product not found");
        }
        ProductModel.delete(id);
        let products= ProductModel.get();

      return  res.render("products", {products: products, userEmail: req.session.userEmail})
    }
}