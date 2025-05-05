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
openEye.addEventListener("click",togglePassword);
closeEye.addEventListener("click",togglePassword);

function togglePassword(){
  const openEye = document.querySelector(".far.fa-eye");
  const closeEye = document.querySelector(".fas.fa-eye-slash");
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
