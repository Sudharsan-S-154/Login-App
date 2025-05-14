const isLogin = true;
const isSignup = false;
const form1 = document.querySelector(".input1");
const form2 = document.querySelector(".input2");

const loginButton = document.querySelector(".login");
const signupButton = document.querySelector(".signup");

const success = document.querySelector(".success");
const failure = document.querySelector(".failure");

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

const openEye = document.querySelector("#openEye");
const closeEye = document.querySelector("#closeEye");
const openEye1 = document.querySelector("#openEye1");
const closeEye1 = document.querySelector("#closeEye1");
openEye.addEventListener("click", togglePassword1);
closeEye.addEventListener("click", togglePassword1);
openEye1.addEventListener("click", togglePassword2);
closeEye1.addEventListener("click", togglePassword2);

function togglePassword1() {
  const inputPassword = document.querySelector(".showPassword .text");

  if (inputPassword.type == "password") {
    inputPassword.type = "text";
    closeEye.style.visibility = "hidden";
    openEye.style.visibility = "visible";
  } else {
    inputPassword.type = "password";
    closeEye.style.visibility = "visible";
    openEye.style.visibility = "hidden";
  }
}

function togglePassword2() {
  const inputPassword = document.querySelector(".showPassword .signupEmail");

  if (inputPassword.type == "password") {
    inputPassword.type = "text";
    closeEye1.style.visibility = "hidden";
    openEye1.style.visibility = "visible";
  } else {
    inputPassword.type = "password";
    closeEye1.style.visibility = "visible";
    openEye1.style.visibility = "hidden";
  }
}

form2.addEventListener("submit", async (event) => {
  const username = document.querySelector(".username").value;
  const signupEmail = document.querySelector(".signupEmail").value;
  const password = document.querySelector(".password").value;

  event.preventDefault();

  const result = await fetch("http://localhost:8080/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: username,
      email: signupEmail,
      password: password,
    }),
  });

  const resultJson = await result.json();
  console.log(resultJson);

  if (resultJson.data != null) {
    success.textContent = "Your account has been created successfully";
    success.style.right = "30px";
    setTimeout(() => {
      success.style.right = "-500px";
    }, 3000);
    form1.style.transform = "translateX(0)";
    form2.style.transform = "translateX(0)";
    signupButton.style.backgroundColor = "transparent";
    loginButton.style.backgroundColor = "grey";
  } else {
    failure.textContent = resultJson.error;
    failure.style.right = "30px";
    setTimeout(() => {
      failure.style.right = "-500px";
    }, 3000);
  }
});

form1.addEventListener("submit", async (event) => {
  event.preventDefault();
  const loginMail = document.querySelector(".loginmail").value;
  const loginPassword = document.querySelector(".loginpassword").value;

  const result = await fetch("http://localhost:8080/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: loginMail,
      password: loginPassword,
    }),
  });

  const resultJson = await result.json();
  console.log(resultJson);
  if (resultJson.data != null) {
    success.textContent = "Log in successfully";
    success.style.right = "30px";
    setTimeout(() => {
      success.style.right = "-500px";
    }, 3000);
    form1.style.transform = "translateX(0)";
    form2.style.transform = "translateX(0)";
    signupButton.style.backgroundColor = "transparent";
    loginButton.style.backgroundColor = "grey";

    localStorage.setItem("token", resultJson.data);
    console.log(resultJson.data);
    setTimeout(() => {
      window.location.href = "home.html";
    }, 2000);
  } else {
    failure.textContent = resultJson.error;
    failure.style.right = "30px";
    setTimeout(() => {
      failure.style.right = "-500px";
    }, 3000);
  }
});
