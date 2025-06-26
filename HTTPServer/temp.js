const bucket = "0123456789`~!@#$%^&*()_+-={}[]:\";\'/?,.<>\\|qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
var res = "";
while(res.length < 1000)
    res += bucket[Math.floor(Math.random() * bucket.length)];
console.log(res);