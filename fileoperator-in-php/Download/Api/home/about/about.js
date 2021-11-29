var save = document.getElementById('Save');
save.addEventListener('click',()=>{
    var description = document.getElementById("description").value;
    var error = document.getElementById('error');

    if(description !==""){
        var data ="control=addAbout"+"&description="+description;
        $.ajax({
            type:"POST",
            url:'../home.php',
            data:data,
            cache:false,
            success:(data)=>{
               var response = JSON.parse(data);
               if(response == true){
                   var Cancel = document.getElementById("Cancel");
                   error.innerHTML="description is saved succefully";
                   clearError(error);
                   setTimeout(() => {
                    $(Cancel).click();
                    loadAbout();
                   }, 2500);
                  
               }
            }
        })
    }
    else
    error.innerHTML="description can not be empty";clearError(error);
    
})

$(document).ready(()=>{
    loadAbout();
})

function clearError(error){
    setTimeout(() => {
        error.innerHTML="";
    }, 2000);
}

function loadAbout(){
    var data ="control=getAbout";
    $.ajax({
        type:'POST',
        url:'../home.php',
        data:data,
        cache:false,
        success:(data)=>{
               var response = JSON.parse(data);
               var body = document.getElementById('tbody');
               body.innerHTML="";
               for (let index = 0; index < response.length; index++) {
                   const element = response[index];
                   var tr = document.createElement('tr');
                   var td1= document.createElement('td');
                   td1.append(index+1);
                   tr.appendChild(td1);
                   var td2= document.createElement('td');
                   td2.append(element['message']);
                   tr.appendChild(td2);
                   var td5= document.createElement('td');
                   var btn = document.createElement('button');
                       btn.setAttribute("class","btn btn-primary Edit");
                       $(btn).css("margin-right","10px");
   
                       btn.setAttribute("data-toggle","modal");
                       btn.setAttribute("data-target","#AddAbout");
                      // btn.setAttribute("id",element['category_id']);
                       btn.setAttribute("onclick","Edit("+element["id"]+")");
                    
                       btn.append("Edit");
   
                    
                   
                       td5.appendChild(btn);
               
                       var btn1 = document.createElement('button');
                       btn1.setAttribute("class","btn btn-success Delete");
                       btn1.setAttribute("onclick","Delete("+element["id"]+")");
                       btn1.append("Delete");
                       td5.appendChild(btn1);
   
                       tr.appendChild(td5);


                   body.appendChild(tr);
                   
               }
               $('#dtBasicExample').DataTable();
        }
    })
}

function Edit(id){
    var data ="control=editAbout"+"&id="+id;
    $.ajax({
        type:'POST',
        url:'../home.php',
        data:data,
        cache:false,
        success:(data)=>{
               var response = JSON.parse(data);
               var description = document.getElementById("description");

               

               description.value=response[0]['message'];

        }})
}

function Delete(id){
    var data ="control=deleteAbout"+"&id="+id;
    $.ajax({
        type:'POST',
        url:'../home.php',
        data:data,
        cache:false,
        success:(data)=>{
               var response = JSON.parse(data);
               if(response == true){
                   alert("Deleted succesfuly");
                   loadAbout();
               }
        }})
}