const crypto = require('crypto')
function encryptData(data,password){
        //--let password_hash = crypto.createHash('sha256').update(password, 'utf-8').digest('hex').slice(0,32).toLowerCase();
        let password_hash = crypto.createHash('sha256').update(password, 'utf-8').digest();
        let iv = Buffer.from('mBj0tzBUxDFmix1T', 'base64'); // TEST ONLY SHOULD BE UNIQUE (such as random) 
        let cipher = crypto.createCipheriv('aes-256-gcm', password_hash, iv);
        //--let encryptedData = Buffer.from(cipher.update(data, 'utf8', 'hex') + cipher.final('hex'), 'hex');
        let encryptedData = Buffer.concat([cipher.update(data, 'utf8'), cipher.final()]);
        //--return iv.toString('base64') + cipher.getAuthTag().toString('base64') + encryptedData.toString('base64');
        return Buffer.concat([iv,encryptedData,cipher.getAuthTag()]).toString('base64');
        // or just concat([iv,cipher.update(data,'utf8'),cipher.final(),cipher.getAuthTag()]).toString('base64') 
    }
    
function decryptData(data,password){
        let password_hash = crypto.createHash('sha256').update(password, 'utf-8').digest(); //**
        let combinerBuffer = Buffer.from(data, 'base64'); //**
        let iv = combinerBuffer.slice(0,12); //**
        let deciper = crypto.createDecipheriv('aes-256-gcm', password_hash, iv);
        let temp = combinerBuffer.length-16;
        deciper.setAuthTag(combinerBuffer.slice(temp));
        return deciper.update(combinerBuffer.slice(12,temp), 'utf8') + deciper.final('utf8');
    }

    module.exports = {
        encryptData,
        decryptData
    }

//let Key = '12345', data = 'Airotony52@';
//let c = encryptData(data,Key); console.log(c);
//let d = decryptData(c,Key); console.log(d);