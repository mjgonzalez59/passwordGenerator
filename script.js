const resultElement = document.querySelector(".result");
const lengthElement = document.querySelector(".length");
const uppercaseElement = document.querySelector(".uppercase");
const lowercaseElement = document.querySelector(".lowercase");
const numbersElement = document.querySelector(".numbers");
const symbolsElement = document.querySelector(".symbols");
const generateBtn = document.querySelector("#generate");
const clipboardBtn = document.querySelector("#clipboard");

const getRandomUpper = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65); // A -> 65 ASCII CODE
}

const getRandomLower = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97); // a -> 97 ASCII CODE
}

const getRandomNumber = () => {
  return +String.fromCharCode(Math.floor(Math.random() * 10) + 48); // 0 -> 48 ASCII CODE
}

const getRandomSymbol = () => {
  const symbol = "!@#$%^&*(){}[]=+-<>,.";
  return symbol[Math.floor(Math.random() * symbol.length)];
  // return String.fromCharCode(Math.floor(Math.random() * 14) + 33); // ! -> 33 ASCII CODE
}

const randomFunc = {
  upper: getRandomUpper,
  lower: getRandomLower,
  number: getRandomNumber,
  symbol: getRandomSymbol
}

clipboardBtn.onclick = () => {
  const textarea = document.createElement("textarea");
  const password = resultElement.innerText;
  if(!password){
    return alert("No result to copy");
  }
  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  alert("Password copied to clipboard");
};

generateBtn.onclick = () => {
  const length = +lengthElement.value
  const hasUpper = uppercaseElement.checked;
  const hasLower = lowercaseElement.checked;
  const hasNumber = numbersElement.checked;
  const hasSymbol = symbolsElement.checked;
  resultElement.innerText = generatePassword(hasUpper, hasLower, hasNumber, hasSymbol, length);
};

const generatePassword = (upper, lower, number, symbol, length) => {
  let generatedPassword = "";
  const typesCount = upper + lower + number + symbol;
  const typesArray = [{upper}, {lower}, {number}, {symbol}].filter( (item) => Object.values(item)[0] );
  if(typesCount == 0){
    return alert("No selected value");
  }
  
  for(let i=0; i<length; i+=typesCount){
    typesArray.forEach((type) => {
      const funcName = Object.keys(type)[0];
      generatedPassword += randomFunc[funcName]();
    });
  }

  const finalPassword = generatedPassword.slice(0, length);
  return finalPassword;
}
