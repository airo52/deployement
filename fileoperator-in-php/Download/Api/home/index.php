<?php
include_once "auth.php";
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <link rel="apple-touch-icon" sizes="76x76" href="../assets/img/apple-icon.png">
  <link rel="icon" type="image/png" href="../assets/img/favicon.png">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
  <title>
    ONGOLLAH Safaris||Admin
  </title>
  <meta content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0, shrink-to-fit=no' name='viewport' />
  <!--     Fonts and icons     -->
  <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700,200" rel="stylesheet" />
  <link href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css" rel="stylesheet">
  <!-- CSS Files -->
  <link href="../assets/css/bootstrap.min.css" rel="stylesheet" />
  <link href="../assets/css/paper-dashboard.css?v=2.0.1" rel="stylesheet" />
  <link href="https://cdn.datatables.net/1.10.20/css/dataTables.bootstrap4.min.css" rel="stylesheet" crossorigin="anonymous" />
  <!-- CSS Just for demo purpose, don't include it in your project -->
  <link href="../assets/demo/demo.css" rel="stylesheet" />
  <script src="../assets/js/core/jquery.min.js"></script>
  <script src="../assets/js/data.js"></script>
  <script src="../assets/js/data1.js"></script>
  <link rel="shortcut icon" href="../log.png" />
</head>

<body class="">
  <div class="wrapper ">
    <div class="sidebar" data-color="white" data-active-color="danger">
      <div class="logo">
        <a href="#none" class="simple-text logo-mini">
          <div class="logo-image-small">
            <img style="border-radius:100%;height:40px;width:40px;" src="<?php echo $profile; ?>">
          </div>
          <!-- <p>CT</p> -->
        </a>
        <a href="#none" class="simple-text logo-normal">
          Welcome <?php echo $username; ?>
        
        </a>
      </div>
      <div class="sidebar-wrapper">
        <ul class="nav">
          <li class="active ">
            <a id="dashboard" href="#none">
              <i class="nc-icon nc-bank"></i>
              <p>Dashboard</p>
            </a>
          </li>
          <li id="package" class="">
            <a  href="#none">
              <i class="nc-icon nc-bookmark-2"></i>
              <p>Packages</p>
            </a>
          </li>
          <li class="">
            <a id="about" href="#none">
              <i class="nc-icon nc-simple-add"></i>
              <p>ABOUT US</p>
            </a>
          </li>
          <li class="">
            <a id="gallery" href="#none">
              <i class="nc-icon nc-album-2"></i>
              <p>Gallery</p>
            </a>
          </li>
          <li class="">
            <a id="profile" href="#none">
              <i class="nc-icon nc-single-02"></i>
              <p>Profile</p>
            </a>
          </li>

          <li class="">
            <a id="message" href="#none">
              <i class="nc-icon nc-bell-55"></i>
              <p>Messages 
                <span id="messageCount" class="badge badge-danger"></span>
              </p>
            </a>
          </li>
          <li class="">
            <a id="branch" href="#none">
              <i class="nc-icon nc-map-big"></i>
              <p>Branches</p>
            </a>
          </li>
          
          <li class="">
            <a id="Logout" href="#none">
              <i class="nc-icon nc-button-power"></i>
              <p>Logout</p>
            </a>
          </li>
        
        </ul>
      </div>
    </div>
    <div class="main-panel">
      <!-- Navbar -->
      <nav class="navbar navbar-expand-lg navbar-absolute fixed-top navbar-transparent">
        <div class="container-fluid">
          <div class="navbar-wrapper">
            <div class="navbar-toggle">
              <button type="button" class="navbar-toggler">
                <span class="navbar-toggler-bar bar1"></span>
                <span class="navbar-toggler-bar bar2"></span>
                <span class="navbar-toggler-bar bar3"></span>
              </button>
            </div>
            <a class="navbar-brand" href="javascript:;">Ogollah Safaris</a>
          </div>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-bar navbar-kebab"></span>
            <span class="navbar-toggler-bar navbar-kebab"></span>
            <span class="navbar-toggler-bar navbar-kebab"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-end" id="navigation">
            <form>
              <div class="input-group no-border">
                <input type="text" value="" class="form-control" placeholder="Search...">
                <div class="input-group-append">
                  <div class="input-group-text">
                    <i class="nc-icon nc-zoom-split"></i>
                  </div>
                </div>
              </div>
            </form>
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link btn-magnify" href="javascript:;">
                  <i class="nc-icon nc-layout-11"></i>
                  <p>
                    <span class="d-lg-none d-md-block">Stats</span>
                  </p>
                </a>
              </li>
              <li class="nav-item btn-rotate dropdown">
                <a class="nav-link dropdown-toggle" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i class="nc-icon nc-bell-55"></i>
                  <p>
                    <span class="d-lg-none d-md-block">Some Actions</span>
                  </p>
                </a>
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                  <a class="dropdown-item" href="#">Add memebers</a>
                  <a class="dropdown-item" id="Log" href="#"><i class="nc-icon nc-button-power"></i>Logout</a>
                 
                </div>
              </li>
              <li class="nav-item">
                <a class="nav-link btn-rotate" href="javascript:;">
                  <i class="nc-icon nc-settings-gear-65"></i>
                  <p>
                    <span class="d-lg-none d-md-block">Account</span>
                  </p>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <!-- End Navbar -->
      <div id="content" class="content">
   



  </div>
  <script src="loader.js"></script>

 
      <footer class="footer footer-black  footer-white ">
        <div class="container-fluid">
          <div class="row">
            <nav class="footer-nav">
           
            </nav>
            <div class="credits ml-auto">
              <span class="copyright">
                © <script>
                  document.write(new Date().getFullYear())
                </script>, made with <i class="fa fa-heart heart"></i> softonica.buzz
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </div>

<!-- Button trigger modal -->


<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Edit Package</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      
      <div class="modal-body">
      <form>
  <div class="row">
  
    <div class="col">
       <label>Title</label>
       <input type="hidden" id="category">
       <input type="hidden" id="desct">
      <input id="editTitle" type="text" class="form-control" placeholder="Title">
    </div>
    <div class="col">
    <label>Capacity</label>
      <input id="Editcapacity" type="number" class="form-control" placeholder="Capacity">
    </div>
  </div>

  <div class="row">
    <div class="col">
       <label>Price</label>
      <input id="Editprice" type="numbers" class="form-control" placeholder="Price In dollars">
    </div>
    <div class="col">
    <img id="editImage" style="width:60px;">
    <label>Caption</label>
      <input id="Editcaption" type="file" class="form-control" placeholder="Image">
    </div>
  </div>

  <div class="form-group">
    <label for="exampleFormControlTextarea1">Description</label>
    <textarea id="Editdescription" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
  </div>
</form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button id="editSave" type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>



<div class="modal fade" id="AddPackage" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Add New Package</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
<form>
  <div class="row">
    <div class="col">
       <label>Title</label>
      <input id="Title" type="text" class="form-control" placeholder="Title">
    </div>
    <div class="col">
    <label>Capacity</label>
      <input id="capacity" type="number" class="form-control" placeholder="Capacity">
    </div>
  </div>

  <div class="row">
    <div class="col">
       <label>Price</label>
      <input id="price" type="numbers" class="form-control" placeholder="Price In dollars">
    </div>
    <div class="col">
    <label>Caption</label>
      <input id="caption" type="file" class="form-control" placeholder="Image">
    </div>
  </div>

  <div class="form-group">
    <label for="exampleFormControlTextarea1">Description</label>
    <textarea style="width:100%;" id="description" class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
  </div>
</form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
        <button type="button" id="Save" class="btn btn-primary">Save</button>
      </div>
    </div>
  </div>
</div>
  <!--   Core JS Files   -->
 
  <script src="../assets/js/core/popper.min.js"></script>
  <script src="../assets/js/core/bootstrap.min.js"></script>
  
  <script src="../assets/js/plugins/perfect-scrollbar.jquery.min.js"></script>
  <!--  Google Maps Plugin    -->
  
  <!--  Notifications Plugin    -->
  <script src="../assets/js/plugins/bootstrap-notify.js"></script>
  <!-- Control Center for Now Ui Dashboard: parallax effects, scripts for the example pages etc -->
  <script src="../assets/js/paper-dashboard.min.js?v=2.0.1" type="text/javascript"></script>
  <script src="../assets/demo/demo.js"></script>
 
</body>

</html>

<script>
  var messageCount = document.getElementById("messageCount");
  get();

  setInterval(() => {
    get();
  }, 3000);
  function get(){
  var data="control=getMessagesCount";
     $.ajax({
         type:"POST",
         url:"../home.php",
         data:data,
         cache:false,
         success:function(data){
           var response = JSON.parse(data);
           messageCount.innerHTML = response;
         }

     })
    }
</script>
