const checkUsername = function(){
    const username = document.getElementById('Username').value;
    if(username.length == 0){
        document.getElementById('errMessUsername').innerHTML = " Tên đăng nhập chưa có";
    }
    else{
        document.getElementById('errMessUsername').innerHTML = "";
    }
}

const checkPassword = function(){
    const pass = document.getElementById('Password').value;

    if((pass.length < 8 || pass.length > 20 || !checkNumber(pass) || !checkUpperCase(pass))){
        document.getElementById('errMessPassword').innerHTML = " mật khẩu chưa hợp lệ";
    }
    else{
        document.getElementById('errMessPassword').innerHTML = " mật khẩu hợp lệ";
    }
}

const checkName = function(){
    const name = document.getElementById('Name').value;
    if(name.length == 0){
        document.getElementById('errMessName').innerHTML = " Họ tên chưa nhập";
    }
    else{
        document.getElementById('errMessName').innerHTML = "";  
    }
}

const checkAddress = function(){
    const address = document.getElementById('Address').value;
    if(address.length == 0){
        document.getElementById('errMessAddress').innerHTML = " Địa chỉ chưa nhập";
    }
    else{
        document.getElementById('errMessAddress').innerHTML = "";
    }
}

const checkPhoneNumber = function(){
    const  phone = document.getElementById('PhoneNumber').value;
    if(phone.length == 0){
        document.getElementById('errMessPhoneNumber').innerHTML = " Số điện thoại chưa nhập";
    }
    else{
        document.getElementById('errMessPhoneNumber').innerHTML = "";
    }
}

const checkEmail = function(){
    const email = document.getElementById('Email').value;
    if(email.length == 0){
        document.getElementById('errMessEmail').innerHTML = " Email chưa nhập"
    }
    else{
        document.getElementById('errMessEmail').innerHTML = "";
    }
}

const checkNumber = function(str){
    var check = false;
    for(var i = 0; i<str.length; i++){
        if(!isNaN(str.charAt(i))){
            check = true;
            break;
        }
    }
    return check;
}

const checkUpperCase = function(str){
    for(var i = 0; i<str.length; i++){
        if(/[A-Z]/.test(str.charAt(i)))
        {
            return true;
        }
    }
    return false;
}