 export default class ProductModel{
    constructor(id, name , description, price, imageUrl){
        this.id=id;
        this.name=name;
        this.description=description;
        this.price=price;
        this.imageUrl= imageUrl
    }

    static get(){
        return products;
    } 
    static getProductById(id){
        return products.find(product => product.id==id);
    }
    static add(name, description, price, imageUrl){
        let newProduct= new ProductModel(
            products.length+1,
            name,
            description,
            price,
            imageUrl
        )

        products.push(newProduct);
    }
    static update(productObj){
        const index= products.findIndex(
            (p) => p.id == productObj.id
        )
        products[index]= productObj;
    }
    static delete(id){
        const index= products.findIndex(
            (p) => p.id ==id
        )
        products.splice(index, 1);
    }
 }
 var products = [
    new ProductModel(1, 'Product 1', 'Description for Product 10', 19.99, 'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg'),
    new ProductModel(2, 'Product 2', 'Description for Product 2', 29.99, 'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg'),
    new ProductModel(3, 'Product 3', 'Description for Product 3', 39.99, 'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg'),
];