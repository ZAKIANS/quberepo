/* eslint-disable no-undef */
const params = new URLSearchParams(window.location.search);
const cate = params.get("cate");
document.getElementById('c_form').addEventListener('submit',(e)=>{
e.preventDefault();
const subcategory=document.getElementById("c_subCate").value;
const image = document.getElementById("c_image").files[0];
const slug=document.getElementById('c_slug').value;
const formData = new FormData();
formData.append("image", image);
formData.append("subCate", subcategory);
formData.append("slug", slug);
addSubCate(formData);
});
 async function addSubCate(formData) {
    try {
        const allCate = await axios.patch(`${url}/apk/addSubCate/${cate}`, 
       formData
   );
        console.log({ allCate });
        window.location = "/category";
      } catch (error) {
        console.log(error);
      }
  }
  