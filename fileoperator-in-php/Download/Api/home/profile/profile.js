var button = document.getElementById('update');
var PROFILE = document.getElementById('PROFILE');
var USER = document.getElementById('USER');
var createUser = document.getElementById('createUser');


PROFILE.addEventListener('click',()=>{
   var CUSER = document.getElementById('CUSER');
   var CCREATE = document.getElementById('CCREATE');
  
   CUSER.style.display = "block";
   CCREATE.style.display ="none";



})

USER.addEventListener('click',()=>{
   
    var CUSER = document.getElementById('CUSER');
    var CCREATE = document.getElementById('CCREATE');

    CUSER.style.display = "none";
    CCREATE.style.display ="block";
})

createUser.addEventListener('click',()=>{
    var username = document.getElementById('cusername').value;
    var email = document.getElementById('cemail').value;
    var oldPassword = document.getElementById('coldPassword').value;
    var newPassword = document.getElementById('cnewPassword').value;
    var profile = document.getElementById('cFile').value;

    if(username !=="" || email !=="" || oldPassword !=="" || newPassword !=="" || profile !==""){
       // var data = "&control=updateProfile"+"&username="+username+"&email="+email+"&oldPassword="+oldPassword+"&password="+newPassword+"&profile="+document.getElementById('File').files[0];

       if(oldPassword === newPassword){
        var image = document.getElementById('cFile').files[0];
        var formData = new FormData();
        formData.append("username",username);
        formData.append("email",email);
        formData.append("oldPassword",oldPassword);
        formData.append("password",newPassword);
        formData.append('profile',image);
        formData.append("control","createProfile");
         $.ajax({
        type:'POST',
        url:'../home.php',
        cache:false,
        data:formData,
        processData: false,
        contentType: false,
        success:(data)=>{
            var response = JSON.parse(data);
            if(response == true){
                alert('user added succesfully');
            }
            else{
                alert('user profile can not be created...user may already have an account');
            }
          
        }
    })
} else{ alert('password dint much');}  
    }
    else{
        alert("All the fields can not be empty");
    }
})



button.addEventListener('click',()=>{
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var oldPassword = document.getElementById('oldPassword').value;
    var newPassword = document.getElementById('newPassword').value;
    var profile = document.getElementById('File').value;

    if(username !=="" || email !=="" || oldPassword !=="" || newPassword !=="" || profile !==""){
       // var data = "&control=updateProfile"+"&username="+username+"&email="+email+"&oldPassword="+oldPassword+"&password="+newPassword+"&profile="+document.getElementById('File').files[0];

        var image = document.getElementById('File').files[0];
        var formData = new FormData();
        formData.append("username",username);
        formData.append("email",email);
        formData.append("oldPassword",oldPassword);
        formData.append("password",newPassword);
        formData.append('profile',image);
        formData.append("control","updateProfile");
         $.ajax({
        type:'POST',
        url:'../home.php',
        cache:false,
        data:formData,
        processData: false,
        contentType: false,
        success:(data)=>{
            var response = JSON.parse(data);
            console.log(response);
          
        }
    })   
    }
    else{
        alert("All the fields can not be empty");
    }
})

