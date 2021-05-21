/* eslint-disable no-undef */
const url='https://qubanglestore.herokuapp.com';
let g_category;
let files=[];//This is multiple images 
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
const selectElement = document.querySelector('#cat_id');

selectElement.addEventListener('change', async(event) => {
  try {
    const {data} = await axios.get(`${url}/apk/getcategory/${selectElement.options[selectElement.selectedIndex].label}`
  );
    g_category=data.data.category;
    const list=data.data.subCategory;
  var cont = document.getElementById('subcategory');
  var op = document.createElement('option');
  op.innerHTML = 'select ...';      // assigning text to li using array value.
  removeAllChildNodes(cont);
  cont.appendChild(op);     // append li to ul.
  for (i = 0; i <= list.length - 1; i++) {
    var option = document.createElement('option');
    option.innerHTML = list[i].name;      // assigning text to li using array value.
      option.setAttribute('value', list[i].name);
      cont.appendChild(option);     // append li to ul.
   }

//   const cate = await axios.get(`${url}/cate/allcate`);
//   console.log({cate});
} catch (error) {
  console.log(error);
}
});
const onCateSelect = async () => {
  
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
  // const website = document.getElementById("website").value;
  const description = document.getElementById("description").value;
  const image = document.getElementById("image").files[0];
  const title = document.getElementById("title").value;
  const category = document.getElementById("cat_id").value;
  const formData = new FormData();
  formData.append("title", title);
  formData.append("category", g_category);
  formData.append("subCategory", g_subCategory);
  formData.append("developer", developer);
  formData.append("trending", trending);
  formData.append("feature", feature);
  formData.append("pre_register", pre_register);
  formData.append("description", description);
  // formData.append("website", website);
  formData.append("image", image);
 try {
    const rs1= await axios.post(`${url}/apk/addApk`, formData);
    console.log({rs1});
    const fd = new FormData();
    var ins =files.length;
for (var x = 0; x < ins; x++) {
    fd.append("images", files[x]);
}
const rs2=  await axios.patch(`${url}/apk/addApkImages/${title}`,fd);
console.log({rs2});
 const fileData = new FormData();
 fileData.append("file", file);
 const rs3= await axios.patch(`${url}/apk/addApkFile/${title}`,fileData);
 console.log({rs3});

    // console.log({result,datas});
    window.location='/products';
  } catch (error) {
    console.log(error);
  }
};

// preview multiple images
function previewImages() {

  var preview = document.querySelector('#preview');
  files.push(this.files[0]);
  if (this.files) {
    [].forEach.call(this.files, readAndPreview);
  }

  function readAndPreview(file) {
    // Make sure `file.name` matches our extensions criteria
    if (!/\.(jpe?g|png|gif)$/i.test(file.name)) {
      return alert(file.name + " is not an image");
    } // else...
    
    var reader = new FileReader();
    
    reader.addEventListener("load", function() {
      var image = new Image();
      image.height = 100;
      image.title  = file.name;
      image.src    = this.result;
      preview.appendChild(image);
    });
    
    reader.readAsDataURL(file);
    
  }

}

document.querySelector('#file-input').addEventListener("change", previewImages);
// document.getElementsByClassName('deleteItem');
// console.log(fun);
// const all=fun.addEventListener('click',e=>{
//     console.log(e.target);
//     console.log('hell0');
//   });

// alert('helol9o');


// document.forms["status"]["pending"].checked=true;
