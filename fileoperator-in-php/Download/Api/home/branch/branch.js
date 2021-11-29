var save = document.getElementById('Save');

save.addEventListener("click",()=>{
    var name = document.getElementById('description').value;

    if(name !==""){
        Save(name);
    }
    else{
        alert("Provide Branch Name");
    }
})
function Save(name){
  var data = "control=addBranch"+"&name="+name;

  $.ajax({
      type:'POST',
      cache:false,
      url:'../home.php',
      data:data,
      success:function(data){
          var response = JSON.parse(data);
         
          if(response == true){
              alert("Branch Added");
              Load();
          }
      }
  })
}

$(document).ready(function(){
    
    Load();
})

function Load(){
    var data = "control=loadBranches";
    $.ajax({
        type:'POST',
        url:'../home.php',
        cache:false,
        data:data,
        success:function(data){
            var response = JSON.parse(data);
           // console.log(response);
            var body = document.getElementById('tbody');

            for (let index = 0; index < response.length; index++) {
                const element = response[index];

                var tr = document.createElement('tr');
                var td1 = document.createElement('td');
                td1.append(index+1);
                tr.append(td1);
                var td2 = document.createElement('td');
                td2.append(element['name']);
                tr.appendChild(td2);
                var td3 = document.createElement('td');

                var btn1 = document.createElement('button');
                btn1.setAttribute("class","btn btn-success Delete");
                btn1.setAttribute("onclick","Remove("+element['id']+")");
                btn1.append("Delete");
                td3.appendChild(btn1);
                tr.appendChild(td3);
                body.appendChild(tr);

                
            }
            $('#dtBasicExample').DataTable();
        }
    })
}

function Remove(id){
  
    var data = "control=DeleteBranch"+"&id="+id;
    $.ajax({
        type:'POST',
        url:'../home.php',
        cache:false,
        data:data,
        success:function(data){
            var response = JSON.parse(data);
            var body = document.getElementById('tbody');

           // console.log(response)
           
          if(response == true){
            body.innerHTML="";
              Load();
          }
        }
    })
}