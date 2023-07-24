const { Plan, Price } = require("./model")

const fun = () =>{

// Plan.create({
//     sub_name : "Starter",

// })

const price = Price.create({
    price_id : "price_1NWYA0SBx6KtlGUSWJNe8qii",
    price : 100.0, 
    prod_id : "prod_Nwm54qsAaJLG6N"
})

const plan = Plan.create({
    sub_name : "sunglass",
    default_price_id : "price_1NWYA0SBx6KtlGUSWJNe8qii",
    price_ids : ["price_1NWYA0SBx6KtlGUSWJNe8qii","price_1NAsXKSBx6KtlGUSMossgWrK"],
    prod_id :"prod_Nwm54qsAaJLG6N",
    
})

}

fun()