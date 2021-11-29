function UrlParams(param){
    var query = window.location.href;
    
    var vars = query.split("&");
   
    for (var i=0;i<vars.length;i++) {
  
      if(i ==0){
         var first = vars[i].split("?");
         if(first[1] == undefined){ return false;}
         
          var pair = first[1].split("=");
        }else{
         var pair= vars[i].split("=");
        }
        
    if(pair[0] == param){
      
  
      return pair[1]
    }
     }
  }

  export {
      UrlParams
  }