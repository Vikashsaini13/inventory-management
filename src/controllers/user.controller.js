import UserModel from "../model/user.model.js";
import ProductModel from "../model/product.model.js";
export default class UserController{
    getRegister(req, res){
        res.render("register")
    }
    getLogin(req, res){
        res.render('login', {errorMassage: null })
    }

    postRegister(req, res){
        const {name, email, password}= req.body;
        UserModel.add(name, email, password)
        
        res.render('login', {errorMassage: null});
    }

    postLogin(req, res){
        const {email, password}= req.body;
        const user= UserModel.isValid(email, password);

        if(!user){
           return res.render('login', {errorMassage: "invalid Credentials!!"})
        }
        req.session.userEmail=email;
        var products= ProductModel.get();
        res.render('products', {products, userEmail: req.session.userEmail})

    }

    logout(req, res){
        req.session.destroy((err)=>{
            if(err){
                console.log(err);
            }
            else{
                res.redirect('/login')
            }
        })
        res.clearCookie('lastVisit')
    }
}