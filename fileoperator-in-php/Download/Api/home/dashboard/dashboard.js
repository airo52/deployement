$(document).ready(function() {
    getDashboardData();
    getReservations();
    setInterval(() => {
        
        getDashboardData();
    }, 60000);

})

function getDashboardData(){
    var data = "&control=dashboard";

    $.ajax({
        type:'POST',
        url:'../home.php',
        cache:false,
        data:data,
        success:(data)=>{
            var response = JSON.parse(data);
            var Reservation = document.getElementById('Reservation');
            var Revenue = document.getElementById('Revenue');
            var Packages = document.getElementById('packages');
            var followers =  document.getElementById('followers');

            Reservation.innerHTML= response['reservations'];
            Revenue.innerHTML = "Ksh "+response['revenue'];
            Packages.innerHTML = response['packages'];
            followers.innerHTML = response['followers'];

        }
    })


}

function getReservations() {
    var data = "&control=reservation";

    $.ajax({
        type:'POST',
        url:'../home.php',
        cache:false,
        data:data,
        success:(data)=>{
            var body = document.getElementById('tbody');
            var response = JSON.parse(data);
            for (let index = 0; index < response.length; index++) {
                
            const {title,paymentMethod,country,members,amount,category_id,id,username,descId} = response[index];
            

            var tr = document.createElement('tr');
            var td1= document.createElement('td');
            td1.append(username);
                  tr.appendChild(td1);
            var td2= document.createElement('td');
            td2.append(title);
                  tr.appendChild(td2);
            var td3= document.createElement('td');
            td3.append(country);
                  tr.appendChild(td3);
            var td4= document.createElement('td');
            td4.append(members);
                  tr.appendChild(td4);
            var td5= document.createElement('td');
            td5.append(paymentMethod);
                  tr.appendChild(td5);
            var td6= document.createElement('td');
            td6.append(amount);
                  tr.appendChild(td6);
            var td7= document.createElement('td');
            var btn = document.createElement('button');
            btn.setAttribute("class","btn btn-primary");
            $(btn).css("margin-right","10px");

       
          
            btn.setAttribute("onclick","Confirms("+id+")");
         
            btn.append("confirm");


            var btn1 = document.createElement('button');
            btn1.setAttribute("class","btn btn-success");
          

            btn1.setAttribute("data-toggle","modal");
            btn1.setAttribute("data-target","#More");
          
            btn1.setAttribute("onclick","More("+category_id+","+id+","+descId+")");
         
            btn1.append("More");

         
        
            td7.appendChild(btn);
            td7.appendChild(btn1);
            tr.appendChild(td7);

            body.appendChild(tr);
            }
            $('#dtBasicExample').DataTable();
            //console.log(response)
          
        }
    })


}

function More(params,id,descId){
    var data = "control=More"+"&id="+params+"&Id="+id+"&descId="+descId;
    $.ajax({
        type:'POST',
        url:'../home.php',
        cache:false,
        data:data,
      
        success:function(data){
           
        const {title,username,country,price,members,phone,email,amount,paymentMethod,reservationDate,TransactionId} = JSON.parse(data)[0];
            var pName = document.getElementById('pName').innerHTML=title;
            var uName = document.getElementById('uName').innerHTML=username;
            var emails = document.getElementById('email').innerHTML=email;
            var phones = document.getElementById('phone').innerHTML=phone;
            var countrys = document.getElementById('country').innerHTML=country;
            var pPrice = document.getElementById('pPrice').innerHTML=price;
            var member = document.getElementById('members').innerHTML=members;
            var amounts = document.getElementById('amount').innerHTML=amount;
             document.getElementById('method').innerHTML=paymentMethod;
             var date = new Date(reservationDate);
            document.getElementById('Date').innerHTML=date.getDay()+"-"+date.getDate()+"-"+date.getMonth()+"/"+date.getFullYear();
            var btn = document.getElementById('Foot');

       
          
            btn.setAttribute("onclick","Confirms("+id+")");
         
        
           


        }
    })
}

function Confirms(id){

    var amount = document.getElementById('1Amount').value;
    var method = document.getElementById('1method').value;

    var TransactionId = document.getElementById('transactionId').value;
    var email = document.getElementById('email').innerHTML;
    var package = document.getElementById("pName").innerHTML;
    
    if(amount !=="" && method !=="" && TransactionId !==""){
    var data = "control=confirm"+"&id="+id+"&amount="+amount+"&method="+method+"&transactionId="+TransactionId+"&email="+email+"&package="+package;
    $.ajax({
        type:'POST',
        url:'../home.php',
        cache:false,
        data:data,
      
        success:function(data){
            var response = JSON.parse(data);
         

            if(response == true){
                var body = document.getElementById('tbody');
                body.innerHTML="";
                getDashboardData();
                
                getReservations();
            }else{
                alert(response);
            }

        }
    })
}else{
    alert("Please provide the trasanction credentials");
}
}