const form1 = document.querySelector(".main2 .addSection");
const form2 = document.querySelector(".main2 .editSection");
const body = document.getElementsByTagName("body");

const addBlogButton1 = document.querySelector(".addBlogButton1");
const addBlogButton2 = document.querySelector(".addBlogButton2");
const closeBlogButton = document.querySelector(".blogandcancel .fa.fa-close");
const headerSection = document.querySelector(".header");
const closeEditButton = document.querySelector(
  ".blogandcancel .fa.fa-close.edit"
);

let myblog = false;
let changeIndex;
let deleteChangeIndex;
const addBlogForm = document.querySelector(".addForm");
const submitEditButton = document.querySelector(".submitEditButton");
// console.log(submitEditButton +"           ---------------------          >");

const success = document.querySelector(".success");
const failure = document.querySelector(".failure");

const main1 = document.querySelector(".main1");
const main2 = document.querySelector(".main2");

const deleteBlogSection = document.querySelector(".deleteBlogSection");
const cancelDeleteButton = document.querySelector(".cancelDeleteButton");
const confirmDeleteButton = document.querySelector(".confirmDeleteButton");

addBlogButton1.addEventListener("click", () => {
  // main1.style.filter="blur(20px)";
  headerSection.style.display = "none";
  main1.style.display = "none";
  form1.style.display = "flex";
});

addBlogButton2.addEventListener("click", () => {
  // main1.style.filter="blur(20px)";
  headerSection.style.display = "none";
  main1.style.display = "none";
  form1.style.display = "flex";
});

closeBlogButton.addEventListener("click", () => {
  headerSection.style.display = "block";
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
  // const name = document.querySelector(".name").value;
  // const phno = document.querySelector(".phno").value;
  // const travelSpot = document.querySelector(".travelSpot").value;
  // const experience = document.querySelector(".experience").value;
  // const rating = document.querySelector(".rating").value;

  // let requestObject = {
  //   name: name,
  //   phno: phno,
  //   travelSpot: travelSpot,
  //   experience: experience,
  //   rating: rating,
  // };

  let addBlogFormData = new FormData(addBlogForm);
  console.log("addform data====>"+addBlogFormData.get("memories").name);
  const token = localStorage.getItem("token");
  console.log(token);
  // addOrEditBlog(requestObject, token);
  const result = await fetch("http://localhost:8080/blog", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: addBlogFormData,
  });

  const resultJson = await result.json();
  console.log(resultJson);
  // debugger;
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
    allBlogList.length = 0;
    allBlogList = [...resultJson.data];
    createBlog(resultJson);
    addStylesToBlogAdmin();
  }

  myBlogButton.addEventListener("click", async () => {
    if (myBlogButton.textContent == "All Blogs") {
      location.reload();
    }
    myblog = true;
    myBlogButton.textContent = "All Blogs";
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
    addStylesToBlogAdmin();
  });

  submitEditButton.addEventListener("click", async (event) => {
    event.preventDefault();
    // event.stopPropagation();
    const name = document.querySelector(".editName").value;
    const phno = document.querySelector(".editPhno").value;
    const travelSpot = document.querySelector(".editTravelSpot").value;
    const experience = document.querySelector(".editExperience").value;
    const rating = document.querySelector(".editRating").value;

    let id = allBlogList[changeIndex].id;
    console.log("id : " + id);
    let requestObject = {
      id: id,
      name: name,
      phno: phno,
      travelSpot: travelSpot,
      experience: experience,
      rating: rating,
    };

    const token = localStorage.getItem("token");
    console.log(token);
    const result = await fetch("http://localhost:8080/blog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestObject),
    });

    const resultJson = await result.json();
    console.log("result json ==>" + resultJson.data.name);
    if (resultJson.data != null) {
      success.textContent = "Blog is edited successfully";
      success.style.display = "block";
      success.style.right = "30px";
      setTimeout(() => {
        success.style.right = "-500px";
        success.style.display = "none";
        location.reload();
      }, 1500);
      setTimeout(() => {
        form2.style.display = "none";
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
  });

  confirmDeleteButton.addEventListener("click", async () => {
    let id = allBlogList[deleteChangeIndex].id;
    console.log("id : " + id);

    const token = localStorage.getItem("token");
    console.log(token);
    let deleteUrl = `http://localhost:8080/blog/${id}`;
    const result = await fetch(deleteUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const resultJson = await result.json();
    // console.log("result json ==>" + resultJson.data.name);
    if (resultJson.data != null) {
      success.textContent = "Blog is deleted successfully";
      success.style.display = "block";
      success.style.right = "30px";
      setTimeout(() => {
        success.style.right = "-500px";
        success.style.display = "none";
        location.reload();
      }, 1500);
      setTimeout(() => {
        form2.style.display = "none";
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
  });
});

// -------method to create all Blogs and my blogs
function createBlog(resultJson1) {
  resultJson1.data.forEach((blog) => {
    let allBlog = document.createElement("div");
    allBlog.classList.add("allBlog");
    let ratingStar = "";
    let count = 0;
    const ratingResponse = blog.rating;
    for (let i = 1; i <= 5; i++) {
      if (count < ratingResponse) {
        ratingStar += `<span class="fa fa-star checked"></span>&nbsp`;
        count++;
      } else {
        ratingStar += `<span class="fa fa-star"></span>`;
      }
    }

    if (userDetails.role === "admin" || myblog == true) {
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
                           <div class="ratingStar">${ratingStar}</div>
                          </div>
                          
                        `;
    } else {
      allBlog.innerHTML = `<div class="buttonAndImg">
                            <img src= "travelblog.jpg"  alt="No content available" class="blogImg"> 
                            <div class="allButton">
                             <button class="viewBlog">View</button>
                            </div>
                          </div>
                          <div class="nameAndRating">
                           <h4 class="travelSpotName"> ${blog.travelSpot} </h4>   
                           <div class="ratingStar">${ratingStar}</div>
                          </div>
                          
                        `;
    }
    allBlogs.append(allBlog);
  });
}
// -------------add styles to blog.
function addStylesToBlogAdmin() {
  const buttonAndImgs = document.querySelectorAll(".buttonAndImg");
  const blogImgs = document.querySelectorAll(".blogImg");
  const viewBlogs = document.querySelectorAll(".viewBlog");
  const editBlogs = document.querySelectorAll(".editBlog");
  const deleteBlogs = document.querySelectorAll(".deleteBlog");

  if (userDetails.role == "admin" || myblog == true) {
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
        document.querySelector(".editName").value = allBlogList[index].name;
        document.querySelector(".editPhno").value = allBlogList[index].phno;
        document.querySelector(".editTravelSpot").value =
          allBlogList[index].travelSpot;
        document.querySelector(".editExperience").value =
          allBlogList[index].experience;
        console.log(allBlogList[index].rating);
        document.querySelector(".editRating").value = allBlogList[index].rating;
        main1.style.display = "none";
        form2.style.display = "flex";
        changeIndex = index;
      });

      closeEditButton.addEventListener("click", () => {
        main1.style.display = "inline-block";
        form2.style.display = "none";
        viewBlog.style.visibility = "hidden";
        editBlog.style.visibility = "hidden";
        deleteBlog.style.visibility = "hidden";
        blogImg.style.filter = "brightness(100%)";
      });

      deleteBlog.addEventListener("click", () => {
        main1.style.display = "none";
        deleteBlogSection.style.display = "flex";
        deleteChangeIndex = index;
      });

      cancelDeleteButton.addEventListener("click", () => {
        main1.style.display = "inline-block";
        deleteBlogSection.style.display = "none";
      });

      const faCloseBlog = document.querySelector(".fa.fa-close.blog");
      faCloseBlog.addEventListener("click", () => {
        viewOneBlogMain.style.display = "none";
        main1.style.display = "inline-block";
        viewBlog.style.visibility = "hidden";
        editBlog.style.visibility = "hidden";
        deleteBlog.style.visibility = "hidden";
        blogImg.style.filter = "brightness(100%)";
      });
    });
  } else {
    buttonAndImgs.forEach((buttonAndImg, index) => {
      const viewBlog = viewBlogs[index];
      // const editBlog = editBlogs[index];
      // const deleteBlog = deleteBlogs[index];
      const allButton = [viewBlog];
      const blogImg = blogImgs[index];

      allButton.forEach((button) => {
        button.addEventListener("mouseenter", () => {
          viewBlog.style.visibility = "visible";
          blogImg.style.filter = "brightness(50%)";
        });

        button.addEventListener("mouseleave", () => {
          viewBlog.style.visibility = "visible";
          blogImg.style.filter = "brightness(50%)";
        });
      });

      buttonAndImg.addEventListener("mouseenter", () => {
        viewBlog.style.visibility = "visible";
        blogImg.style.filter = "brightness(50%)";
      });
      buttonAndImg.addEventListener("mouseout", () => {
        viewBlog.style.visibility = "hidden";
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

      // editBlog.addEventListener("click", async () => {
      //   document.querySelector(".editName").value = allBlogList[index].name;
      //   document.querySelector(".editPhno").value = allBlogList[index].phno;
      //   document.querySelector(".editTravelSpot").value =
      //     allBlogList[index].travelSpot;
      //   document.querySelector(".editExperience").value =
      //     allBlogList[index].experience;
      //   console.log(allBlogList[index].rating);
      //   document.querySelector(".editRating").value = allBlogList[index].rating;
      //   main1.style.display = "none";
      //   form2.style.display = "flex";
      //   changeIndex = index;
      // });

      // closeEditButton.addEventListener("click", () => {
      //   main1.style.display = "inline-block";
      //   form2.style.display = "none";
      //   viewBlog.style.visibility = "hidden";
      //   blogImg.style.filter = "brightness(100%)";
      // });

      // deleteBlog.addEventListener("click", () => {
      //   main1.style.display = "none";
      //   deleteBlogSection.style.display = "flex";
      //   deleteChangeIndex = index;
      // });

      // cancelDeleteButton.addEventListener("click", () => {
      //   main1.style.display = "inline-block";
      //   deleteBlogSection.style.display = "none";
      // });

      const faCloseBlog = document.querySelector(".fa.fa-close.blog");
      faCloseBlog.addEventListener("click", () => {
        viewOneBlogMain.style.display = "none";
        main1.style.display = "inline-block";
        viewBlog.style.visibility = "hidden";
        blogImg.style.filter = "brightness(100%)";
      });
    });
  }
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
