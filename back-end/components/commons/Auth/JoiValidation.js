const Joi = require('joi');

const JoiValidation={
    LoginValidation:(data)=>{
        const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/;
         if(reg.test(data.password)){
    const Schema = Joi.object({
          email:Joi.string().email({ tlds: { allow: false } }).max(255).required(),
          password:Joi.string().pattern(new RegExp(reg)).required().min(8)
    })

    return Schema.validate(data);
   // error['details'][0]['message']
  }else { return {error:{
        details:[
            {
                //message:"wrong credentials"
                message:"Wrong password or Email",
            }
        ]
  }}
      }
  },
  ActivationKeyValidation:(Key)=>{
    const Schema = Joi.object({
        Key:Joi.number().integer().required(),
    })
    return Schema.validate(Key);
},
 ForgotEmail:(email)=>{
    const Schema = Joi.object({
        email:Joi.string().email({ tlds: { allow: false } }).max(255).required(),
    })
    return Schema.validate({email});
 },

    adminRegistraTionValidation:(data)=>{
        const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/;
        var pHONE =/^([0-9]{10}|[0-9]{12})$/ ///^[0-9]+$/;
        //var phone =/^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i
        if(reg.test(data.password)){
            if(pHONE.test(data.phone)){
            const Schema = Joi.object({
                email:Joi.string().email({ tlds: { allow: false } }).max(255).required(),
                password:Joi.string().pattern(new RegExp(reg)).required().min(8),
                username:Joi.string().required(),
                country:Joi.string().required(),
                phone:Joi.number().integer().required(),
                address:Joi.string().required(),
                adminLevel:Joi.string().required()
                
          })
         return Schema.validate(data);
        }else{ return {error:{
            details:[
                {
                    //message:"wrong credentials"
                    message:"Phone is incorrect",
                }
            ]
      }}}
        }else{
            return {error:{
                details:[
                    {
                        //message:"wrong credentials"
                        message:"Password Must be a minimum of eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
                    }
                ]
          }}
        }
    },
    writerRegistraTionValidation:(data)=>{
        const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/;
        var pHONE =/^([0-9]{10}|[0-9]{12})$/ ///^[0-9]+$/;
        //var phone =/^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i
        if(reg.test(data.password)){
            if(pHONE.test(data.phone)){
            const Schema = Joi.object({
                email:Joi.string().email({ tlds: { allow: false } }).max(255).required(),
                password:Joi.string().pattern(new RegExp(reg)).required().min(8),
                username:Joi.string().required(),
                country:Joi.string().required(),
                phone:Joi.number().integer().required(),
                address:Joi.string().required(),
                category:Joi.string().required()
                
          })
         return Schema.validate(data);
        }else{ return {error:{
            details:[
                {
                    //message:"wrong credentials"
                    message:"Phone is incorrect",
                }
            ]
      }}}
        }else{
            return {error:{
                details:[
                    {
                        //message:"wrong credentials"
                        message:"Password Must be a minimum of eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
                    }
                ]
          }}
        }
    }

}

module.exports = {JoiValidation};