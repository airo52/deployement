var addPackage = document.getElementById('Save');
var editSave = document.getElementById('editSave');

addPackage.addEventListener('click',function(){
    var element = ["Title","capacity","caption","description","price"];

    element.forEach(element => {
         window[element] = document.getElementById(element).value;

    });
    
   
  if(Title !=="" && capacity !=="" && caption !=="" && description !=="" && price !==""){
     var image = document.getElementById('caption').files[0];
     var formData = new FormData();
          formData.append("title",Title);
          formData.append("capacity",capacity);
          formData.append("image",image);
          formData.append("description",description);
          formData.append('price',price);
          formData.append("control","adPackage");
        
          var c =0;

          if(c == 0){

          $.ajax({
            type:'POST',
            url:'../home.php',
            cache:false,
            data:formData,
            processData: false,
            contentType: false,
            success:function(data){
               
                var response = JSON.parse(data);
               // if(response == true){
                    alert('New package added');
                //}
                
            }
        })
        c=c+1;
    }
         

  }else{
  

      alert('Please provide all the details');
  }
    
})




$(document).ready(function(){
 loadPackages();
})




function Edit(params,id) {
    var data = "control=Edit"+"&id="+params+"&Id="+id;
    $.ajax({
        type:'POST',
        url:'../home.php',
        cache:false,
        data:data,
      
        success:function(data){
           
            const {image,price,capacity,title,category_id,id} = JSON.parse(data);
            var d = JSON.parse(data);

            var editTitle = document.getElementById("editTitle");
            var Editcapacity = document.getElementById("Editcapacity");
            var Editprice = document.getElementById("Editprice");
            var Editdescription = document.getElementById("Editdescription");
            var description = document.getElementById('desct');
            var category = document.getElementById('category');

            var images = document.getElementById('editImage');

            images.setAttribute('src',image);
            description.value=id;
            editTitle.value=title;
            Editcapacity.value=capacity;
            Editdescription.value=d['description'];
            Editprice.value = price;
            category.value = category_id;
     
        }
    })
}

function Delete(params,id){
  if(confirm("You are about to delete an item")){
    var data = "control=DeletePackage"+"&id="+params+"&Id="+id;;
    $.ajax({
        type:"POST",
        cache:false,
        url:'../home.php',
        data:data,
        success:function(data){
              var response = JSON.parse(data);

              if(response){
                  alert("deleted succesfully");
                  var body = document.getElementById('tbody');
                  body.innerHTML="";
                  $('#dtBasicExample').DataTable();
                  loadPackages();

              }
        }
    })
  }
}

editSave.addEventListener("click",function() {
    var element = ["editTitle","Editcapacity","Editprice","Editcaption","Editdescription","category","editImage","desct"];

    element.forEach(element => {
         window[element] = document.getElementById(element).value;

    });

    if(Editcaption !== ""){
        
          if(editTitle !=="" && Editcapacity !=="" && Editprice !=="" && Editcaption!=="" && Editdescription !==""){
              Update(editTitle,Editcapacity,Editprice,Editdescription,document.getElementById('Editcaption').files[0],desct,category,"f");
          }else{
           
            alert("can not update")
          }
    }else{
    
        if(editTitle !=="" && Editcapacity !=="" && Editprice !=="" && Editdescription !==""){
            Update(editTitle,Editcapacity,Editprice,Editdescription,document.getElementById('editImage').src,desct,category,"ok");
        }else{
          alert("can not update")
        }
    }

    
})

function Update(title,capacity,price,desc,image,id,category,control){

    var formData = new FormData();
         formData.append("title",title);
         formData.append("capacity",capacity);
         formData.append("image",image);
         formData.append("description",desc);
         formData.append('price',price);
         formData.append("control","update");
         formData.append("id",id);
         formData.append("category",category);
         formData.append("c",control);
  
    

         
          $.ajax({
              type:"POST",
              url:'../home.php',
              cache:false,
              data:formData,
              processData: false,
              contentType: false,
              success:function(data){
          
                 var response = JSON.parse(data);
          
                 if(response){
                     alert("updated succesfully");
                 }
                 else{
                     console.log(response)
                     alert('updating failed');
                 }
              }
          })
       // }
       // else{

       // }
}


function loadPackages(){
    var data = "control=packages";
    $.ajax({
        type:'POST',
        url:'../home.php',
        cache:false,
        data:data,
        success:function(data){
            var response = JSON.parse(data);
           // var tbody = document.createElement('tbody');
                var body = document.getElementById('tbody');
            for (let index = 0; index < response.length; index++) {
                const element = response[index];
              

                var tr = document.createElement('tr');
                var td1= document.createElement('td');
                  td1.append(element['title']);
                  tr.appendChild(td1);
                var td2= document.createElement('td');
                td2.append(element['price']);capacity
                tr.appendChild(td2);
                var td3= document.createElement('td');
                td3.append(element['capacity']);
                tr.appendChild(td3);
                var td4= document.createElement('td');
                td4.append(element['remaining']);
                tr.appendChild(td4);
               
                var td5= document.createElement('td');
                var btn = document.createElement('button');
                    btn.setAttribute("class","btn btn-primary Edit");
                    $(btn).css("margin-right","10px");

                    btn.setAttribute("data-toggle","modal");
                    btn.setAttribute("data-target","#exampleModal");
                    btn.setAttribute("id",element['category_id']);
                    btn.setAttribute("onclick","Edit("+element['category_id']+","+element["id"]+")");
                 
                    btn.append("Edit");

                 
                
                    td5.appendChild(btn);
            
                    var btn1 = document.createElement('button');
                    btn1.setAttribute("class","btn btn-success Delete");
                    btn1.setAttribute("onclick","Delete("+element['category_id']+","+element["id"]+")");
                    btn1.append("Delete");
                    td5.appendChild(btn1);

                    tr.appendChild(td5);


                   body.appendChild(tr);
   
   
            }
        
            
            $('#dtBasicExample').DataTable();
               // console.log(response);
        }
     
    })
}