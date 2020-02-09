const generateBtn = document.getElementById("generate-btn");
const result = document.getElementById("result");
const pwdLengthInput = document.getElementById("pwd-length");
const pwdUppercase = document.getElementById("pwd-uppercase");
const pwdLowercase = document.getElementById("pwd-lowercase");
const pwdNumber = document.getElementById("pwd-numbers");
const pwdSymbols = document.getElementById("pwd-symbols");
const clipboardBtn = document.getElementById("clipboard");
const passwordlength = null;
generateBtn.addEventListener("click", () => {
  const passwordlength = Number(pwdLengthInput.value);
  const hasUppercase = pwdUppercase.checked;
  const hasLowercase = pwdLowercase.checked;
  const hasNumber = pwdNumber.checked;
  const hasSymbols = pwdSymbols.checked;

  result.textContent = generatePassword(
    hasUppercase,
    hasLowercase,
    hasSymbols,
    hasNumber,
    passwordlength
  );
});
const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol
};
//Clipboard Copy
clipboardBtn.addEventListener("click", () => {
  const copytext = document.createElement("textarea");
  const password = result.innerText;
  if (!password) {
    return;
  } else {
    copytext.value = password;
    document.body.appendChild(copytext);
    copytext.select();
    document.execCommand("copy");
    copytext.remove();
    alert("Password Copied : " + copytext.value);
  }
  console.log(copyText);

  document.execCommand("copy");

  /* Alert the copied text */
  alert("Copied the text: " + copyText);
});

//Generate Password
function generatePassword(lower, upper, symbol, number, length) {
  let str = "";
  const typesCount = lower + upper + symbol + number;
  let typesArr = [{ lower }, { upper }, { symbol }, { number }].filter(
    item => Object.values(item)[0]
  );
  if (typesCount === 0) {
    return "Please Check Something";
  } else if (length === 0) {
    return "Please Enter Length";
  } else {
    for (let i = 0; i <= length; i += typesCount) {
      typesArr.forEach(type => {
        let funcName = Object.keys(type)[0];
        str += randomFunc[funcName]();
      });
    }
    str = str.slice(0, length);
    return str;
  }
}

//Generator functions

function getRandomLower() {
  const num = Math.floor(Math.random() * 26 + 97);
  const char = String.fromCharCode(num);
  return char;
}

function getRandomUpper() {
  const num = Math.floor(Math.random() * 26 + 65);
  const char = String.fromCharCode(num);
  return char;
}
function getRandomNumber() {
  const num = Math.floor(Math.random() * 10 + 48);
  const char = String.fromCharCode(num);
  return char;
}
function getRandomSymbol() {
  const sym = "!@#$%^&*(){}[]=<>/,.";
  return sym[Math.floor(Math.random() * sym.length)];
}
