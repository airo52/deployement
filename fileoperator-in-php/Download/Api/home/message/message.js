$(document).ready(function(){
    getMessages();
})


function getMessages(){
    var data="control=getMessages";
    var body = document.getElementById("body");
    body.innerHTML="";
    $.ajax({
        type:"POST",
        url:"../home.php",
        data:data,
        cache:false,
        success:function(data){
          var response = JSON.parse(data);
          

          for (let index = 0; index < response.length; index++) {
              const element = response[index];

              var tr = document.createElement("tr");
              var th = document.createElement('th');
                th.setAttribute("scope","row");
                th.append(index+1);
                tr.appendChild(th);
              var td = document.createElement('td');
              td.append(element['subject']);
              tr.appendChild(td);
              var td1 = document.createElement('td');
              td1.append(element['username']);
              tr.appendChild(td1);
              var td2 = document.createElement('td');
              td2.append(element['email']);
              tr.appendChild(td2);
              var td3 = document.createElement('td');
              td3.append(element['phone']);
              tr.appendChild(td3);
              var td5 = document.createElement('td');

              var btn1 = document.createElement("button");
              btn1.setAttribute("type","button");
              btn1.setAttribute("class","btn btn-danger btn-sm px-3");
              btn1.setAttribute("onclick","confirm("+element['id']+")");

              var icon = document.createElement('i');
              icon.setAttribute("class","fa fa-times");
              btn1.appendChild(icon);
              $(btn1).css("margin-right","10px");
              var btn2 = document.createElement("button");
              btn2.setAttribute("type","button");
              btn2.setAttribute("class","btn btn-danger btn-sm px-3");
              //btn2.setAttribute("onclick","View('"+element['email']+"','"+element['message']+"')");
              btn2.addEventListener("click",()=>{
                  //console.log(element['message']);

               var Message = document.getElementById("Message");
               var xI = document.getElementById("xI");
               Message.innerHTML=element['message'];
               xI.value=element['id'];
               View(element['email']);
              })
             
             

              var icon1 = document.createElement('i');
              icon1.setAttribute("class","fa fa-edit");
              btn2.appendChild(icon1);

              td5.appendChild(btn1);
              td5.appendChild(btn2);

              tr.appendChild(td5);

              body.appendChild(tr);
              
          }
          $('#dtBasicExample').DataTable();
        }
    })
}
function View(id){

    var User = document.getElementById("User");
    User.innerHTML=id;
  
    var edit = document.getElementById('rep');
    edit.click();


}

function confirm(id){

    
    var data = "control=confirmContact"+"&id="+id;
    $.ajax({
        type:'POST',
        url:'../home.php',
        cache:false,
        data:data,
        success:function(data){
              var response = JSON.parse(data);

            
              if(response == true){
                  alert("confirmed");
              }
        }
    })

}

var Reply = document.getElementById("reply");
Reply.addEventListener('click',function(){
    var email = document.getElementById('User').innerHTML;
    var id = document.getElementById('xI').value;   
    var message = document.getElementById('description').value;
    if(email !=="" && id !==""){
        if(message !==""){
         reply(id,email,message);
        }
        else
        alert("You can no send empty message");
    }
})

function reply(id,email,message){
    var data = "control=Reply"+"&id="+id+"&email="+email+"&message="+message;
    $.ajax({
        type:'POST',
        url:'../home.php',
        cache:false,
        data:data,
        success:function(data){
            var response = JSON.parse(data);
            console.log(response);
            if(response == true){
                alert('Reply has been sent');

            }
            

        }
    })
}