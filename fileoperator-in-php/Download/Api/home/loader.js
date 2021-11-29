var elements = ['dashboard','package','about','profile','gallery','message','branch','Logout'];
$(document).ready(function(){
    var Root = document.querySelector('#content');

    $(Root).load('dashboard/dashboard.html');
})
var Root = document.querySelector('#content');


elements.forEach(element =>{
   var button = document.getElementById(element);
   button.addEventListener('click',()=>{
       if(button.id === "profile")
       $(Root).load(button.id+"/"+button.id+".php");
       else if(button.id === "Logout")
          Logout();
       else
    $(Root).load(button.id+"/"+button.id+".html");
   })
})

var Log = document.getElementById('Log');

Log.addEventListener("click",()=>{
    Logout();
})

function Logout(){
    if(confirm("you are about to Logout?")){
        var data = "control=Logout";
        $.ajax({
            type:'POST',
            url:'../home.php',
            cache:false,
            data:data,
            success:function(data){
                location.reload();
            }
        })

    }
}


