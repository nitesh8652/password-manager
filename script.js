let input = document.querySelector(".input");
let copy = document.querySelector(".copy");
let generate = document.querySelector(".generate");
let dropdown = document.querySelector(".dropdown");
let functions = document.querySelector(".functions");

const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercase = "abcdefghijklmnopqrstuvwxyz";
const number = "1234567890";
const symbol = "!@#$%^&*()_+";



generate.addEventListener("click", () => {
    let pass = "";
    let all = uppercase + lowercase + number + symbol;
    for (let i = 0; i < 15; i++) {
        let char = Math.floor(Math.random() * all.length);
        pass += all.charAt(char);
    }
    input.value = pass;
});



copy.addEventListener("click", () => {
    let pass = input.value;
    if (pass){
        navigator.clipboard.writeText(pass)
        .then(()=>{
            console.log("Password copied to clipboard");
        })
        .catch((err)=>{
            console.log("failed to copy",err);
        })
    }else{
        console.log("No password to copy");
    }
});

dropdown.addEventListener("click", () => {
    functions.style.display="block";
    dropdown.src = "assets/up.png";
})