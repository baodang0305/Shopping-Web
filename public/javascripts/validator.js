const checkUsername = function(){
    const username = document.getElementById('Username').value;
    if(username.length == 0){
        document.getElementById('errMessUsername').innerHTML = " Tên đăng nhập chưa có";
        document.getElementById("SubmitButton").disabled = true;
    }
    else{
        document.getElementById('errMessUsername').innerHTML = "";
        document.getElementById("SubmitButton").disabled = false;
    }
}

const checkPassword = function(){
    const pass = document.getElementById('Password').value;

    if((pass.length < 8 || pass.length > 20 || !checkNumber(pass) || !checkUpperCase(pass))){
        document.getElementById('errMessPassword').innerHTML = " mật khẩu chưa hợp lệ";
        document.getElementById("SubmitButton").disabled = true;
    }
    else{
        document.getElementById('errMessPassword').innerHTML = " mật khẩu hợp lệ";
        document.getElementById("SubmitButton").disabled = false;
    }
}

const checkName = function(){
    const name = document.getElementById('Name').value;
    if(name.length == 0){
        document.getElementById('errMessName').innerHTML = " Họ tên chưa nhập";
        document.getElementById("SubmitButton").disabled = true;
    }
    else{
        document.getElementById('errMessName').innerHTML = "";
        document.getElementById("SubmitButton").disabled = false;
    }
}

const checkAddress = function(){
    const address = document.getElementById('Address').value;
    if(address.length == 0){
        document.getElementById('errMessAddress').innerHTML = " Địa chỉ chưa nhập";
        document.getElementById("SubmitButton").disabled = true;
    }
    else{
        document.getElementById('errMessAddress').innerHTML = "";
        document.getElementById("SubmitButton").disabled = false;
;
    }
}

const checkPhoneNumber = function(){
    const  phone = document.getElementById('PhoneNumber').value;
    if(phone.length == 0){
        document.getElementById('errMessPhoneNumber').innerHTML = " Số điện thoại chưa nhập";
        document.getElementById("SubmitButton").disabled = true;
    }
    else{
        document.getElementById('errMessPhoneNumber').innerHTML = "";
        document.getElementById("SubmitButton").disabled = false;
    }
}

const checkEmail = function(){
    const email = document.getElementById('Email').value;
    if(email.length == 0){
        document.getElementById('errMessEmail').innerHTML = " Email chưa nhập";
        document.getElementById("SubmitButton").disabled = true;
    }
    else{
        document.getElementById('errMessEmail').innerHTML = "";
        document.getElementById("SubmitButton").disabled = false;
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

const checkRePassword = function(str) {
  let pass = document.getElementById('Password').value;
  let rePass = document.getElementById('RePassword').value;
  if (pass != rePass) {
    document.getElementById('errMessPassword').innerHTML = " mật khẩu chưa trùng khớp";
    document.getElementById("SubmitButton").disabled = true;
  } else {
    document.getElementById('errMessPassword').innerHTML = "";
    document.getElementById("SubmitButton").disabled = false;
  }
}
