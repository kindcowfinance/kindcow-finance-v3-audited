function setCookie(key, value, expiry) {
    var expires = new Date();
    expires.setTime(expires.getTime() + (expiry * 24 * 60 * 60 * 1000));
    document.cookie = key + '=' + value + ';expires=' + expires.toUTCString();
}

function getCookie(key) {
    var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
    return keyValue ? keyValue[2] : null;
}

function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

function loading(a){
    var text = a.textContent;
    a.textContent="Loading . . .";
    
    setTimeout(function () {
        a.textContent=text;
    }, 5000);
    console.log(text);
}

function number_format(b,f= -1){

    var a =parseFloat(b);

    if(b==0) return 0;
    
    if(f>=0) return a.toFixed(f);
    if(a>10)return a.toFixed(2);
    if(a>1)return a.toFixed(5);
    //if(a>0.00000000) return a.toFixed(f);
    return a.toFixed(8);
    
}