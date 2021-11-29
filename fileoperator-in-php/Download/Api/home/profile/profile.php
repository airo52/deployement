<?php
include_once '../auth.php';
?>
<div class="row">
    <div class="col-md-4">
      <div class="card card-user">
        <div class="image">
          <img src="../log.png" alt="...">
        </div>
        <div class="card-body">
          <div class="author">
            <a href="#">
              <img class="avatar border-gray" src="<?php echo $profile; ?>" alt="...">
              <h5 class="title"><?php echo $username;?></h5>
            </a>
            <p class="description">
              @<?php echo $username;?>
            </p>
          </div>
          
        </div>
        <div class="card-footer">
          <hr>
   
        </div>
      </div>
     
    </div>

     
    <div style="display:block" id="CUSER" class="col-md-8">
      <div class="card card-user">
        <div style="display:flex;flex-direction:row;" class="card-header">
          <h5 class="card-title">Edit Profile</h5>
          <button style="float:right;" id="USER" class="btn btn-info">CREATE NEW USER</button>
        </div>
        <div class="card-body">
          <form>
            <div class="row">
              <div class="col-md-5 pr-1">
                <div class="form-group">
                  <label>Company (disabled)</label>
                  <input type="text" class="form-control" disabled="" placeholder="Company" value="Ogollah Safaris.">
                </div>
              </div>
              <div class="col-md-3 px-1">
                <div class="form-group">
                  <label>Username</label>
                  <input type="text" class="form-control" id="username" placeholder="Username" >
                </div>
              </div>
              <div class="col-md-4 pl-1">
                <div class="form-group">
                  <label for="exampleInputEmail1">Email address</label>
                  <input type="email" class="form-control" id="email" placeholder="Email">
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 pr-1">
                <div class="form-group">
                  <label>Old password</label>
                  <input type="password" class="form-control" id="oldPassword" placeholder="Old password">
                </div>
              </div>
              <div class="col-md-6 pl-1">
                <div class="form-group">
                  <label>New password</label>
                  <input type="password" class="form-control" id="newPassword" placeholder="New password">
                </div>
              </div>
            </div>
            
            <div class="row">
                <div class="col-md-12 ">
                  <label>Profile</label>
                   <input class="form-control" type="file" name="" id="File">
                </div>
              </div>
         
        
            <div class="row">
              <div class="update ml-auto mr-auto">
                <button id="update" type="button" class="btn btn-primary btn-round">Update Profile</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div style="display:none" id="CCREATE" class="col-md-8">
      <div class="card card-user">
        <div style="display:flex;flex-direction:row;" class="card-header">
          <h5 class="card-title">CREATE NEW USER</h5>
          <button style="float:right;" id="PROFILE" class="btn btn-info">EDIT PROFILE</button>
        </div>
        <div class="card-body">
          <form>
            <div class="row">
              <div class="col-md-5 pr-1">
                <div class="form-group">
                  <label>Company (disabled)</label>
                  <input type="text" class="form-control" disabled="" placeholder="Company" value="Ogollah Safaris.">
                </div>
              </div>
              <div class="col-md-3 px-1">
                <div class="form-group">
                  <label>Username</label>
                  <input type="text" class="form-control" id="cusername" placeholder="Username" >
                </div>
              </div>
              <div class="col-md-4 pl-1">
                <div class="form-group">
                  <label for="exampleInputEmail1">Email address</label>
                  <input type="email" class="form-control" id="cemail" placeholder="Email">
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 pr-1">
                <div class="form-group">
                  <label>Old password</label>
                  <input type="password" class="form-control" id="coldPassword" placeholder="Old password">
                </div>
              </div>
              <div class="col-md-6 pl-1">
                <div class="form-group">
                  <label>Cpnfirm password</label>
                  <input type="password" class="form-control" id="cnewPassword" placeholder="New password">
                </div>
              </div>
            </div>
            
            <div class="row">
                <div class="col-md-12 ">
                  <label>Profile</label>
                   <input class="form-control" type="file" name="" id="cFile">
                </div>
              </div>
         
        
            <div class="row">
              <div class="update ml-auto mr-auto">
                <button id="createUser" type="button" class="btn btn-primary btn-round">CREATE USER</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <script src="profile/profile.js"></script>