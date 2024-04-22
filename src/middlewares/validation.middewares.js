
export const validRequest=async (req, res, next)=>{
    
    const {name, price, imageUrl}= req.body;
    let errors=[];
    if(!name || name.trim()==''){
        errors.push("Invalid Name!!!")
    }
    if(!price || parseFloat(price)<1){
        errors.push("price must be positive number!!!")
    }
    
    if(errors.length>0){
        return res.render("new_add_product", {errorMassage: errors[0]})
    }

    next();
}

