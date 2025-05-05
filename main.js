
     const isLogin = true;
     const isSignup = false;
     const form1 = document.querySelector(".input1");
     const form2 = document.querySelector(".input2");

     const loginButton = document.querySelector(".login");
     const signupButton = document.querySelector(".signup");

     signupButton.addEventListener("click",()=>{
          form1.style.transform = "translateX(-460px)";
          form2.style.transform = "translateX(-460px)";
          signupButton.style.backgroundColor = "grey";
          loginButton.style.backgroundColor = "transparent";
     });

     loginButton.addEventListener("click",()=>{
          form1.style.transform = "translateX(0)";
          form2.style.transform = "translateX(0)";
          signupButton.style.backgroundColor = "transparent";
          loginButton.style.backgroundColor = "grey";
     });