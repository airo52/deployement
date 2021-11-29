$(document).ready(function(){
    loadGallery();
    var Save = document.getElementById('Save');
Save.addEventListener('click',()=>{
    var image = document.getElementById('caption').files[0];
    var description = document.getElementById('description').value;
    var title = document.getElementById('title').value;
    

    if(description !=="" && image !=="" && title !==""){
        
          var formData = new FormData();
          formData.append("control","addGallery");
          
          formData.append("description",description);
          formData.append('image',image);
           formData.append("title",title);

          $.ajax({
            type:'POST',
            url:'../home.php',
            cache:false,
            data:formData,
            processData: false,
            contentType: false,
              success:function(data){
                var response = JSON.parse(data);
                if(response == true){
                    alert("added succesfully");
                    loadGallery();

                }


              }
          })
    }else{
        alert("you must provide all the fileds");
    }
})
})


function loadGallery(){
    document.getElementById("1").innerHTML="";
    document.getElementById("2").innerHTML="";
    document.getElementById("3").innerHTML="";
    var data="control=loadGallery";
    $.ajax({
        type:'POST',
        cache:false,
        data:data,
        url:'../home.php',
        success:function(data){
            
            var contained = [];
           
            var response = JSON.parse(data);
           

            for (let index = 0; index < response.length; index++) {
                //console.log(index);
                const element = response[index];
                
                var Next = index +1 == response.length ? index -1:index+1;
                var current = index;
             
             

                var check = false;

                  var rndInt = randomIntFromInterval(1, 3);
                  if(contained.length >= 3){
                      contained =[];
                  }

                  while (contained.includes(rndInt)) {
                      rndInt = randomIntFromInterval(1, 3);
                  }

                  
                      
                  contained.push(rndInt);
                

        
            appendGallery(element,response[Next],check,rndInt);

           
                
               
               
                


                
            }
            contained=[];
           
          
        }
    })
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  
  

function appendGallery(current,Next,check,selected){
    
    
    var body = document.getElementById(selected);
  
    var Html = document.createElement('div');
    Html.setAttribute('class',"container");
    var img = document.createElement('img');
    img.setAttribute("class","w-100 shadow-1-strong rounded mb-4");
    img.setAttribute('src',current['image']);
    Html.appendChild(img);
    var midle = document.createElement('div');
    midle.setAttribute("class","middle");
    var text = document.createElement('div');
    text.setAttribute("class","text");
    var trash = document.createElement('div');
    trash.setAttribute('class','fa fa-trash');
    trash.setAttribute("onclick","deleteGallery("+current["id"]+",'"+current['image']+"')");
    text.appendChild(trash);
    midle.appendChild(text);

    var text1 = document.createElement('div');
    text1.setAttribute("class","text");
    var trash1 = document.createElement('div');
    trash1.setAttribute('class','fa fa-pencil-square-o');
    trash1.setAttribute("onclick","EditGallery("+current["id"]+")");
    text1.appendChild(trash1);
    midle.appendChild(text1);
    Html.appendChild(midle);

  
  
  body.append(Html);

  

 

}

function EditGallery(id){
    var btns = document.createElement('button');
    btns.setAttribute("class","btn btn-danger");
    btns.setAttribute("id","Edit");
    btns.append("Edit");
    btns.setAttribute("onclick","Edit("+id+")");
    btns.setAttribute('type',"button");

    $("#Save").remove();

    var data="control=EditGallery"+"&id="+id;
    $.ajax({
        type:'POST',
        cache:false,
        data:data,
        url:'../home.php',
        success:function(data){
            var response = JSON.parse(data);

           

            var btn = document.getElementById('AddGalleryy');
            var head = document.getElementById("exampleModalLabel");
            head.innerHTML="Edit Gallery Image";

           // $('#descritption').val(response['descritption']);
           document.getElementById('footer').append(btns);
           document.getElementById("title").value=response[0]['title'];

            document.getElementById("description").value=response[0]['descritption'];
            btn.click();


           // console.log(data);

        }
    })
}

function Edit(id){
    var image = document.getElementById('caption').files[0];
    var description = document.getElementById('description').value;
    var title = document.getElementById('title').value;

    if(description !=="" && image !=="" && title !==""){
        
          var formData = new FormData();
          formData.append("control","GalleryEdit");
          
          formData.append("description",description);
          formData.append("id",id);
          formData.append('image',image);
        
          formData.append("title",title);

          $.ajax({
            type:'POST',
            url:'../home.php',
            cache:false,
            data:formData,
            processData: false,
            contentType: false,
              success:function(data){
                var response = JSON.parse(data);
                if(response == true){
                    alert("updated succesfully");
                    loadGallery();

                }


              }
          })
    }else{
        alert("you must provide all the fileds");
    }
}

function deleteGallery(id,image){
    if(confirm("You are about to delete an image from  gallery")){
       var path =   image.split('/files/')[1];
       //console.log(path); 
       var data="control=deleteGallery"+"&id="+id+"&path="+path;

        $.ajax({
            type:'POST',
            cache:false,
            data:data,
            url:'../home.php',
            success:function(data){
              var response = JSON.parse(data);
              if(response == true){
                  alert("Image deleted succesfully");
                  setTimeout(() => {
                    loadGallery();
                  }, 1500);
              }
            }
        })
        
    }

}