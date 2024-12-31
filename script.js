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
let flag = 0;

copy.addEventListener("click", () => {
    let pass = input.value;
    const revertbg = copy.style.backgroundColor;
    const reverttext = copy.style.color;
    const scale = copy.style.scale;

    copy.style.backgroundColor = "black";
    copy.style.color = "white";
    copy.style.scale = "0.90";
    setTimeout(() => {
        copy.style.backgroundColor = revertbg;
        copy.style.color = reverttext;
        copy.style.scale = scale;
    }, 300);

    if (pass) {
        navigator.clipboard.writeText(pass)
            .then(() => {
                console.log("Password copied to clipboard");
            })
            .catch((err) => {
                console.log("failed to copy", err);
            })
    } else {
        console.log("No password to copy");
    }
});


function analyze(takat) {
    let checkUppercase = /[A-Z]/.test(takat) ? 1 : 0;
    let checkLowercase = /[a-z]/.test(takat) ? 1 : 0;
    let checkSymbol = /[!@#$%^&*()_+]/.test(takat) ? 1 : 0;
    let checkNumber = /[0-9]/.test(takat) ? 1 : 0;

    let total = checkUppercase + checkLowercase + checkSymbol + checkNumber;

    if (total === 4) {
        return "Strong";
    } else if (total >= 2) {
        return "Medium";
    } else {
        return "Weak";
    }
}



dropdown.addEventListener("click", () => {

    let func = document.querySelector(".functions");

    dropdown.style.transform = "rotate(180deg)";
    if (flag == 0) {
        functions.style.display = "block";
        dropdown.src = "assets/up.png";
        dropdown.style.transform = "rotate(0deg)";
        flag = 1;
        setTimeout(()=>{
            func.style.height="50px"
        })
    } else {
        dropdown.src = "assets/up.png";
        dropdown.style.transform = "rotate(180deg)";
        func.style.height="0";
        flag = 0;
        setTimeout(()=>{
            functions.style.display = "none";
            
        },500)
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
        for (let i = 0; i < 15; i++) {
            let char = Math.floor(Math.random() * all.length);
            pass += all.charAt(char);
        }
        input.value = pass;

        //   return;
    }



    // Generate selected  password
    for (let i = 0; i < 15; i++) {
        let randomIndex = Math.floor(Math.random() * characterPool.length);
        pass += characterPool.charAt(randomIndex);
    }
    input.value = pass; // Display the password
    let strength = analyze(pass);
    console.log(`Password Strength: ${strength}`);
    let indicator = document.querySelector(".strength");
    // indicator.textContent = `Password Strength: ${strength}`;
    // indicator.style.fontWeight="900";
    let color;
    if (strength === "Strong") {
        color = "yellow";
    }else if (strength === "Medium") {
        color = "green";
        }
        else {
            color = "rgb(221, 45, 45)";
        }
    
        indicator.innerHTML = `Password Strength : <span style="font-weight:900; font-family: 'Poppins', sans-serif; color:${color}">${strength}</span>`;
 
    
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

    save.addEventListener("click", () => {
        let password = input.value;
        if (!password) {
            alert("Password is Empty")
            return;
        }
        let blob = new Blob([password], { type: "text/plain" });
        let link = document.createElement("a");

        //file name;
        link.download = "Your_password.txt";
        link.href = URL.createObjectURL(blob);
        link.click();
        link.remove();
    })


