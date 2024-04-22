import express from 'express';
import ProductController from './src/controllers/product.controller.js'
import path from "path";
import ejsLayouts from "express-ejs-layouts"
import { validRequest } from './src/middlewares/validation.middewares.js';
import { uploadFile } from './src/middlewares/file-upload.middleware.js';
import UserController from './src/controllers/user.controller.js'
import session from 'express-session';
import { auth,} from './src/middlewares/auth.middleware.js';
import cookieParser from 'cookie-parser';
import { setlastVisit } from './src/middlewares/lastVisit.middleware.js';


const server= express();
server.use(express.static('public'));
server.use(cookieParser());

server.use(express.urlencoded({extended: true}))

server.set('view engine', 'ejs')
server.set("views", path.join(path.resolve(),'src','views'))
server.use(ejsLayouts)
server.use(
    session({
        secret: "secretKey",
        resave: false,
        saveUninitialized: true,
        cookie: {secure: false}
    })
)

//User
const userController= new UserController();
server.get('/register',setlastVisit, userController.getRegister)
server.get('/login', userController.getLogin)
server.post('/register', userController.postRegister)
server.post('/login', userController.postLogin)
server.get('/logout', userController.logout)



const productController= new ProductController()
server.get('/', auth, productController.getProducts)
server.get('/new',auth, productController.getNewProduct)
server.post('/', auth, uploadFile.single('imageUrl'),validRequest, productController.postNewProduct)
server.get('/update_product/:id', auth, productController.getUpdateproduct)

server.post('/update-product',setlastVisit, auth,  productController.postUpdateProduct)
server.get('/delete-product/:id', auth, productController.deleteProduct)
server.use(express.static('src/views'))




server.listen(3000,()=>{
    console.log("server is listening on port 3000");
})