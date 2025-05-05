const isLogin = true;
const isSignup = false;
const form1 = document.querySelector(".input1");
const form2 = document.querySelector(".input2");

const loginButton = document.querySelector(".login");
const signupButton = document.querySelector(".signup");

signupButton.addEventListener("click", () => {
  form1.style.transform = "translateX(-460px)";
  form2.style.transform = "translateX(-460px)";
  signupButton.style.backgroundColor = "grey";
  loginButton.style.backgroundColor = "transparent";
});

loginButton.addEventListener("click", () => {
  form1.style.transform = "translateX(0)";
  form2.style.transform = "translateX(0)";
  signupButton.style.backgroundColor = "transparent";
  loginButton.style.backgroundColor = "grey";
});

form1.addEventListener("submit", (event) => {
  event.preventDefault();
});

const openEye = document.querySelector("#openEye");
const closeEye = document.querySelector("#closeEye");
const openEye1 = document.querySelector("#openEye1");
const closeEye1 = document.querySelector("#closeEye1");
openEye.addEventListener("click",togglePassword1);
closeEye.addEventListener("click",togglePassword1);
openEye1.addEventListener("click",togglePassword2);
closeEye1.addEventListener("click",togglePassword2);

function togglePassword1(){
  const inputPassword = document.querySelector(".showPassword .text");

  if (inputPassword.type == "password") {
    inputPassword.type = "text";
    closeEye.style.visibility = "hidden";
    openEye.style.visibility = "visible";
  }
  else {
    inputPassword.type = "password";
    closeEye.style.visibility = "visible";
    openEye.style.visibility = "hidden";
  }
}

function togglePassword2(){
  const inputPassword = document.querySelector(".showPassword .signupEmail");

  if (inputPassword.type == "password") {
    inputPassword.type = "text";
    closeEye1.style.visibility = "hidden";
    openEye1.style.visibility = "visible";
  }
  else {
    inputPassword.type = "password";
    closeEye1.style.visibility = "visible";
    openEye1.style.visibility = "hidden";
  }
}