/* eslint-disable no-undef */
const url='https://qubanglestore.herokuapp.com';
let g_category;
let g_subCategory;
// const url = "http://localhost:8080";
function login() {
  const name = document.getElementById("inputUsername").value;
  const password = document.getElementById("inputPassword").value;
  if (!name || !password) {
    return alert("Please Enter Username and Password");
  }
  axios
    .post(`${url}/user/signin`, {
      name: name,
      password: password,
    })
    .then(
      (response) => {
        //    console.log(response.data.token);
        //    localStorage.setItem('x-token',response.data.token)
        //    getAllUser();
        console.log(response);
        window.location = "/dashboard";
      },
      (error) => {
        alert("Incorrect username or password");
        console.log(error);
      }
    );
}

const getAllUser = async () => {
  try {
    const x_token = localStorage.getItem("x-token");
    const data = await axios.get(`${url}/user/getall`, {
      headers: {
        "x-token": x_token,
      },
    });
    console.log(data);
    getAllApks();
  } catch (error) {
    console.log(error);
  }
};

const getMe = async () => {
  try {
    const x_token = localStorage.getItem("x-token");
    const data = await axios.get(`${url}/user/me`, {
      headers: {
        "x-token": x_token,
      },
    });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
const getAllCate = async () => {
    try {
      const cate = await axios.get(`${url}/cate/allcate`);
      console.log({cate});
    } catch (error) {
      console.log(error);
    }
  };
  
  const addCate = async () => {
    const cate = document.getElementById("newCate").value;
    const slug = document.getElementById("newSlug").value;
    try {
      const allCate = await axios.post(`${url}/apk/addCate`,{category:cate,slug:slug});
      console.log({allCate});
      window.location='/category';
    } catch (error) {
      console.log(error);
    }
  };
const getAllApks = async () => {
  try {
    const x_token = localStorage.getItem("x-token");
    const data = await axios.get(`${url}/apk/allApk`, {
      headers: {
        "x-token": x_token,
      },
    });
    console.log({ allApks: data });
  } catch (error) {
    console.log(error);
  }
};

const onsubCateSelect = async () => {
  var cont = document.getElementById('subcategory').value;
  g_subCategory=cont;
  console.log({g_category,g_subCategory});

}
const onCateSelect = async () => {
  try {
      const cate=document.getElementById('cat_id').value;
      console.log(cate);
      const {data} = await axios.get(`${url}/apk/getcategory`,{id:cate});
      console.log(data.data);
      g_category=data.data.category;
      const list=data.data.subCategory;
    var cont = document.getElementById('subcategory');
    // removeAllChildNodes(cont);
    for (i = 0; i <= list.length - 1; i++) {
      var option = document.createElement('option');
      option.innerHTML = list[i];      // assigning text to li using array value.
        option.setAttribute('value', list[i]);
        cont.appendChild(option);     // append li to ul.
     }

  //   const cate = await axios.get(`${url}/cate/allcate`);
  //   console.log({cate});
  } catch (error) {
    console.log(error);
  }
};

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}
const addApk = async () => {
  console.log("we are adding apks");
  const developer = document.getElementById("developer").value;
  const trending = document.getElementById("trending").checked;
  const feature = document.getElementById("feature").checked;
  const pre_register = document.getElementById("pre_register").checked;
  const file = document.getElementById("file").files[0];
  const website = document.getElementById("website").value;
  const description = document.getElementById("description").value;
  const image = document.getElementById("image").files[0];
  const title = document.getElementById("title").value;
  const formData = new FormData();
  formData.append("title", title);
  formData.append("category", g_category);
  formData.append("subCategory", g_subCategory);
  formData.append("developer", developer);
  formData.append("trending", trending);
  formData.append("feature", feature);
  formData.append("pre_register", pre_register);
  formData.append("description", description);
  formData.append("website", website);
  formData.append("image", image);
//   formData.append("file", file, );
//   var obj = {};
// formData.forEach((value, key) => obj[key] = value);
// const data = JSON.stringify(obj);
//   console.log({
//     subcategory,
//     description,
//     developer,
//     trending,
//     feature,
//     pre_register,
//     file,
//     website,
//     image,
//   });

  try {
    const result = await axios.post(`${url}/apk/addApk`, formData);
    const fileData = new FormData();
    fileData.append("file", file);
    const datas = await axios.patch(`${url}/apk/addApkFile/${title}`,fileData);


    console.log({result,datas});
    window.location='/products';
  } catch (error) {
    console.log(error);
  }
};

