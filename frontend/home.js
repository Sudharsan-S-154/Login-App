const form1 = document.querySelector(".main .addSection");
const body = document.getElementsByTagName("body");

const addBlogButton = document.querySelector(".addButton .btn");
const closeBlogButton = document.querySelector(".blogandcancel .fa.fa-close");

addBlogButton.addEventListener("click",()=>{
    form1.style.display="flex";
})

closeBlogButton.addEventListener("click",()=>{
    form1.style.display="none";
})
