const usersModel = require("../models/usersModel")
const errorMessage = require("../util/errorMessage")
module.exports={
    getAll:async function(req, res, next) {
      try{
        const productos = await usersModel.find()
        res.json(productos)
      }catch(e){
        next(e)
      }
    },
    create:async function(req, res, next) {
        try{
          console.log(req.body)
          console.log(req.body.name)
          if(req.body.password!=req.body.passwordConfirmation){
            return res.json({message:errorMessage.USERS.passwordConfirmation});
            
          }
          const document = new usersModel(req.body)

          const response = await document.save()

          res.json(response)
        }catch(e){
          //e.status=200
          next(e)
        }
        
    },
    
}