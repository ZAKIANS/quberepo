/* eslint-disable no-undef */
// let url = "http://localhost:8080";
let url='https://qubanglestore.herokuapp.com';

const params = new URLSearchParams(window.location.search);
const cate = params.get("cate");
const allsubcate = async () => {
    try {
      const { data } = await axios.get(`${url}/apk/subcate/${cate}`);
      console.log({ cates: data.data.subCategory });
      const category=data.data.category;
      document.querySelector('.add_sub_cate').addEventListener('click',e=>{
          e.preventDefault();
          window.location=`/addsubcategory?cate=${category}`
      });
      data.data.subCategory.map((cate,index) => {
        const lis = ` 
        <tr>
        <td>
            ${index+1}
        </td>
        <td>
           <img src='https://cdn3.vectorstock.com/i/1000x1000/86/82/cool-word-text-with-handwritten-rainbow-vibrant-vector-23928682.jpg'
   alt="Profile Picture" class="img-responsive img-rounded rounded-circle"
   style="max-height: 80px; max-width: 60px;"
   >
        </td>
        <td>
              ${cate.name}
        </td>
        <td class="text-right">
            <a id="deleteItem" title="${cate.name}" class="btn m-2 btn-circle btn-danger text-white downs">Delete</a>
            <a href="/addsubcategory?cate=${category}" class="btn btn-circle btn-primary">Edit</a>
        </td>
    </tr>
          `;
        const li = document.createElement("tr");
        li.innerHTML = lis;
        li.querySelector(".downs").addEventListener("click", (e) => {
          e.preventDefault();
          console.log({e:e.target.title});
          deletesubcate( e.target.title );
        });
        document.querySelector(".c_cates").appendChild(li);
      });
    } catch (error) {
      console.log(error);
    }
  };
  allsubcate();
  async function   deletesubcate(title) {
    console.log(title);
    try {
     const rs=await axios.delete(`${url}/apk/deletesubcate/${cate}`,{data:{
       name:title
     }});
     console.log({rs});

      window.location=`/subcategory?cate=${cate}`;
    } catch (error) {
      console.log({error});
      alert('Something went wrong!!!')
    }
    }
  