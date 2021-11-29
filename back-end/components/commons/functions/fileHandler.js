const { environment } = require("../../config/config");

var formidable = require('formidable');
var fs = require('fs');
//var form = new formidable.IncomingForm();

var forms = formidable({ multiples: false });
const FileHandler={
      ArticleImageUploader:async (req,files,name)=>{
        //let callback;
       // console.log(files)
     return new Promise((resolve, reject) => {
       
        // form.parse(req, async function (err, fields, files) {
            const rand = Math.floor((Math.random() * 1789838) + 17836);
            var oldpath = files.files.path;
            var newpath = environment.FilePath +name+rand+ files.files.name;
          fs.rename(oldpath, newpath, function (err) {
              if (err){ callback=false
                reject(err);
              };
              resolve({path:newpath,sucess:true})
        
            });
            
      // })
    })
     
      },

      ArticleImage:async (req,files,name)=>{
        //let callback;
       // console.log(files)
     return new Promise((resolve, reject) => {
       
        // form.parse(req, async function (err, fields, files) {
            const rand = Math.floor((Math.random() * 1789838) + 17836);
           var oldpath = files.files.path;
            var newpath = environment.UrlProfile +name+rand+ files.files.name;
           
          fs.rename(oldpath, newpath, function (err) {
              if (err){
                 callback=false;
                 reject(err);
              };
              resolve({path:newpath,sucess:true})
        
            });
            
      // })
    })
     
      }
}

const ProcessFormData =async (req,res,next)=>{
 
    forms.parse(req, (err, fields, files) => {
        if (err) {
          //next();
          return;
        }
      
        req.data={fields,files};

        
       //next()
       
        //res.json({ fields, files });
      });

}
const FormSafeExtractor = async (req)=>{
  //var form = formidable({ multiples: true });
       var files = {},
        fields = {};

     
        forms.on('field', function(field, value) {
           
           // var data = {};
            fields[field] = value;
            //fields.push(data);
           
        })
        forms.on('file', function(field, file) {
            //var data = {};
            files[field]={
                   name:file.name,
                   path:file.path
            };

          //  files.push(data);
          
        })
        forms.parse(req);
        return new Promise((resolve, reject) => {  
          forms.on('end', function() {
         

          resolve({fields,files});
        });
      })
        
       
}

module.exports={
    FileHandler,
    ProcessFormData,
    FormSafeExtractor
}