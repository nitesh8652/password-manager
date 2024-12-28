let input = document.querySelector(".input");
let copy = document.querySelector(".copy");
let generate = document.querySelector(".generate");
let dropdown = document.querySelector(".dropdown");
let functions = document.querySelector(".hide");
let save = document.querySelector(".save");

const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercase = "abcdefghijklmnopqrstuvwxyz";
const number = "1234567890";
const symbol = "!@#$%^&*()_+";

let uppercasebttn = document.querySelector(".uppercase");
let lowercasebttn = document.querySelector(".lowercase");
let numberbttn = document.querySelector(".numbers");
let symbolbttn = document.querySelector(".symbols");


let includeUppercase = false;
let includeLowercase = false;
let includeNumbers = false;
let includeSymbols = false;

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


function analyze (takat){
    let checkuppercase =/[A-Z]/.test(takat) ? 1 :0;
    let checklowercase =/[a-z]/.test(takat)?1:0;
    let checksymbol =/[!@#$%^&*()_+]/.test(takat)?1:0;
    let checknumber =/[0-9]/.test(takat)?1:0;
    let total = checkuppercase + checklowercase + checksymbol + checknumber;
    if(total === 4){
        console.log("strong")
    }else if (total >=2){
        console.log("medium")
    }else{
        console.log("weak")
    }
    
 
}

let takat = input.value;
let strength = analyze(takat);
console.log(`Password Strength: ${strength}`);


let flag = 0

dropdown.addEventListener("click", () => {
    if(flag==0){
        functions.style.display="block";
        dropdown.src = "assets/up.png";
        flag=1;
        }else{
            dropdown.src="assets/down.png";
            functions.style.display="none";
            flag=0;
        }
})


uppercasebttn.addEventListener("click", () => {
    includeUppercase = !includeUppercase; // Toggle selection
    uppercasebttn.style.backgroundColor = includeUppercase ? "black" : "";
    uppercasebttn.style.color = includeUppercase ? "#ffffff" : "";
  });

  generate.addEventListener("click", () => {
    let pass = "";
    let characterPool = "";
  
    // for selection
    if (includeUppercase) characterPool += uppercase;
    if (includeLowercase) characterPool += lowercase;
    if (includeNumbers) characterPool += number;
    if (includeSymbols) characterPool += symbol;
  
    //    generate random password
    if (characterPool === "") {
    let all = uppercase + lowercase + number + symbol;
    for(let i=0;i<15;i++){
        let char = Math.floor(Math.random()*all.length);
        pass += all.charAt(char);
    }
    input.value = pass;
      return;
    }
  

    // Generate selected  password
    for (let i = 0; i < 15; i++) {
      let randomIndex = Math.floor(Math.random() * characterPool.length);
      pass += characterPool.charAt(randomIndex);
    }
    input.value = pass; // Display the password
    
  });

lowercasebttn.addEventListener("click", () => {
    includeLowercase = !includeLowercase; // Toggle selection
    lowercasebttn.style.backgroundColor = includeLowercase ? "black" : "";
    lowercasebttn.style.color = includeLowercase ? "#ffffff" : "";
})

symbolbttn.addEventListener("click", () => {
    includeSymbols = !includeSymbols; 
    symbolbttn.style.backgroundColor = includeSymbols ? "black" : "";
    symbolbttn.style.color = includeSymbols ? "#ffffff" : "";
})

numberbttn.addEventListener("click", () => {
    includeNumbers = !includeNumbers; 
    numberbttn.style.backgroundColor = includeNumbers ? "black" : "";
    numberbttn.style.color = includeNumbers ? "#ffffff" : "";
})

save.addEventListener("click",()=>{
    let password = input.value;
    if(!password){
        alert("kachaww")
        return;
    }
    let blob = new Blob([password],{type:"text/plain"});
    let link = document.createElement("a");

    //file name;
    link.download="Your_password.txt";
    link.href=URL.createObjectURL(blob);
    link.click();
    link.remove();
})


