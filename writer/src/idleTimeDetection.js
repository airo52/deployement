import { Logout } from "./Api/auth/auth";

var inactivityTime = function () {
    var time;
    window.onload = resetTimer;
    // DOM Events
    document.onmousemove = resetTimer;
    document.onkeydown = resetTimer;

    function logout() {
        Logout();
      //  alert("You are now logged out.")
        //location.href = 'logout.html'
    }

    function resetTimer() {
        
        clearTimeout(time);
        time = setTimeout(logout, 600000)
        // 1000 milliseconds = 1 second
    }
};

export default inactivityTime;