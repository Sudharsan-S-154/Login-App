const form1 = document.querySelector(".main2 .addSection");
const body = document.getElementsByTagName("body");

const addBlogButton = document.querySelector(".addButton .btn");
const closeBlogButton = document.querySelector(".blogandcancel .fa.fa-close");

const addBlogForm = document.querySelector(".addForm");

const success = document.querySelector(".success");
const failure = document.querySelector(".failure");

const main1 = document.querySelector(".main1");
const main2 = document.querySelector(".main2");

addBlogButton.addEventListener("click", () => {
  // main1.style.filter="blur(20px)";
  main1.style.display = "none";
  form1.style.display = "flex";
});

closeBlogButton.addEventListener("click", () => {
  form1.style.display = "none";
  main1.style.display = "inline-block";
  // main1.style.filter="blur(0)";
});

const menuItemBox = document.querySelector(".menuItemBox");
const menuIcon = document.querySelector(".menuIcon");
const myBlogButton = document.querySelector(".myBlogButton");
const logoutButton = document.querySelector(".logoutButton");

menuIcon.addEventListener("click", (event) => {
  event.stopPropagation();
  menuItemBox.style.display = "inline-block";
});

document.addEventListener("click", (event) => {
  if (!menuItemBox.contains(event.target)) {
    menuItemBox.style.display = "none";
  }
});

logoutButton.addEventListener("click", () => {
  if (localStorage.getItem("token") !== null) {
    localStorage.removeItem("token");
    success.textContent = "Logout succesfully";
    success.style.display = "block";
    success.style.top = "10px";
    success.style.right = "30px";
    setTimeout(() => {
      success.style.right = "-500px";
      success.style.display = "none";
      window.location.href = "login.html";
    }, 1000);
  }
});

// ----------------

addBlogForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = document.querySelector(".name").value;
  const phno = document.querySelector(".phno").value;
  const travelSpot = document.querySelector(".travelSpot").value;
  const experience = document.querySelector(".experience").value;
  const rating = document.querySelector(".rating").value;

  let requestObject = {
    name: name,
    phno: phno,
    travelSpot: travelSpot,
    experience: experience,
    rating: rating,
  };

  const token = localStorage.getItem("token");
  console.log(token);
  addOrEditBlog(requestObject, token);
});

// --------------------

const allBlogs = document.querySelector(".allBlogs");
let allBlogList = [];
let userDetails;

document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");

  const resultUser = await fetch("http://localhost:8080/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const resultUserJson = await resultUser.json();
  userDetails = resultUserJson.data;

  const result = await fetch("http://localhost:8080/blog", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const resultJson = await result.json();
  console.log(resultJson);
  if (resultJson.data != null) {
    allBlogList = [...resultJson.data];
    createBlog(resultJson);
    addStylesToBlog();
  }

  myBlogButton.addEventListener("click", async () => {
    allBlogs.innerHTML = "";
    console.log("->" + userDetails.email);
    let url = `http://localhost:8080/blog?email=${userDetails.email}`;
    const resultBlog = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const resultBlogJson = await resultBlog.json();
    resultBlogJson.data.forEach((x) => {
      console.log(x);
    });
    createBlog(resultBlogJson);
    addStylesToBlog();
  });
});

// -------method to create all Blogs and my blogs
function createBlog(resultJson1) {
  resultJson1.data.forEach((blog) => {
    let allBlog = document.createElement("div");
    allBlog.classList.add("allBlog");
    let rating = "";
    let count = 0;
    const ratingResponse = blog.rating;
    for (let i = 1; i <= 5; i++) {
      if (count < ratingResponse) {
        rating += `<span class="fa fa-star checked"></span>&nbsp`;
        count++;
      } else {
        rating += `<span class="fa fa-star"></span>`;
      }
    }

    console.log(rating);

    if (userDetails.role === "admin") {
      // console.log("----------------->");
      allBlog.innerHTML = `<div class="buttonAndImg">
                            <img src= "travelblog.jpg"  alt="No content available" class="blogImg"> 
                            <div class="allButton">
                             <button class="viewBlog">View</button>
                             <button class="editBlog">Edit</button>
                             <button class="deleteBlog">Delete</button>
                            </div>
                          </div>
                          <div class="nameAndRating">
                           <h4 class="travelSpotName"> ${blog.travelSpot} </h4>   
                           <div class="rating">${rating}</div>
                          </div>
                          
                        `;
    } else {
      allBlog.innerHTML = `<div class="buttonAndImg">
                            <img src= "travelblog.jpg"  alt="No content available" class="blogImg"> 
                            <button class="viewBlog">View</button>
                          </div>
                          <div class="nameAndRating">
                           <h4 class="travelSpotName"> ${blog.travelSpot} </h4>   
                           <div class="rating">${rating}</div>
                          </div>
                          
                        `;
    }
    allBlogs.append(allBlog);
  });
}
// -------------add styles to blog.
function addStylesToBlog() {
  const buttonAndImgs = document.querySelectorAll(".buttonAndImg");
  const blogImgs = document.querySelectorAll(".blogImg");
  const viewBlogs = document.querySelectorAll(".viewBlog");
  const editBlogs = document.querySelectorAll(".editBlog");
  const deleteBlogs = document.querySelectorAll(".deleteBlog");

  buttonAndImgs.forEach((buttonAndImg, index) => {
    const viewBlog = viewBlogs[index];
    const editBlog = editBlogs[index];
    const deleteBlog = deleteBlogs[index];
    const allButton = [viewBlog, editBlog, deleteBlog];
    const blogImg = blogImgs[index];

    allButton.forEach((button) => {
      button.addEventListener("mouseenter", () => {
        viewBlog.style.visibility = "visible";
        editBlog.style.visibility = "visible";
        deleteBlog.style.visibility = "visible";
        blogImg.style.filter = "brightness(50%)";
      });

      button.addEventListener("mouseleave", () => {
        viewBlog.style.visibility = "visible";
        editBlog.style.visibility = "visible";
        deleteBlog.style.visibility = "visible";
        blogImg.style.filter = "brightness(50%)";
      });
    });

    buttonAndImg.addEventListener("mouseenter", () => {
      viewBlog.style.visibility = "visible";
      editBlog.style.visibility = "visible";
      deleteBlog.style.visibility = "visible";
      blogImg.style.filter = "brightness(50%)";
    });
    buttonAndImg.addEventListener("mouseout", () => {
      viewBlog.style.visibility = "hidden";
      editBlog.style.visibility = "hidden";
      deleteBlog.style.visibility = "hidden";
      blogImg.style.filter = "brightness(100%)";
    });

    const viewOneBlogMain = document.querySelector(".viewOneBlogMain");
    const bName = document.querySelector(".bName");
    const bEmail = document.querySelector(".bEmail");
    const bPhno = document.querySelector(".bPhno");
    const bTravelSpot = document.querySelector(".bTravelSpot");
    const bExperience = document.querySelector(".bExperience");
    const bRating = document.querySelector(".bRating");

    viewBlog.addEventListener("click", () => {
      bName.textContent = allBlogList[index].name;
      bEmail.textContent = allBlogList[index].email;
      bPhno.textContent = allBlogList[index].phno;
      bTravelSpot.textContent = allBlogList[index].travelSpot;
      bExperience.textContent = allBlogList[index].experience;
      bRating.textContent = allBlogList[index].rating;

      viewOneBlogMain.style.display = "inline-block";
      main1.style.display = "none";
      // main1.style.visibility="hidden";
    });

    editBlog.addEventListener("click", async () => {
      document.querySelector(".name").value = allBlogList[index].name;
      document.querySelector(".phno").value = allBlogList[index].phno;
      document.querySelector(".travelSpot").value =
        allBlogList[index].travelSpot;
      document.querySelector(".experience").value =
        allBlogList[index].experience;
      console.log(allBlogList[index].rating);
      document.querySelector(".rating").value = allBlogList[index].rating;
      main1.style.display = "none";
      form1.style.display = "flex";
    });

    const faCloseBlog = document.querySelector(".fa.fa-close.blog");
    faCloseBlog.addEventListener("click", () => {
      viewOneBlogMain.style.display = "none";
      main1.style.display = "inline-block";
    });
  });
}

//----------Method to add or edit blog
async function addOrEditBlog(requestObject1, token1) {
  const result = await fetch("http://localhost:8080/blog", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token1}`,
    },
    body: JSON.stringify(requestObject1),
  });
  const resultJson = await result.json();
  console.log(resultJson);
  debugger;
  if (resultJson.data != null) {
    success.textContent = "Blog is added successfully";
    success.style.display = "block";
    success.style.right = "30px";
    setTimeout(() => {
      success.style.right = "-500px";
      success.style.display = "none";
      location.reload();
    }, 1500);
    setTimeout(() => {
      form1.style.display = "none";
    }, 500);
  } else {
    failure.textContent = resultJson.error;
    failure.style.right = "30px";
    failure.style.display = "block";
    setTimeout(() => {
      failure.style.right = "-500px";
      failure.style.display = "none";
    }, 2000);
  }
}
