/* eslint-disable no-undef */
const url='https://qubanglestore.herokuapp.com';
const urls='http://localhost:8080';
function  login() {
    const name=document.getElementById("inputUsername").value;
    const password=document.getElementById("inputPassword").value;
    if (!name || !password) {
      return  alert("Please Enter Username and Password");
    }
axios.post(`${url}/user/signin`,{
    "name":name,
    "password":password
})
   .then((response) => {
       console.log(response.data.token);
       localStorage.setItem('x-token',response.data.token)
       getAllUser();
     console.log(response);
     window.location='/dashboard'
   }, (error) => {
     alert("Incorrect username or password");
   });
}

const getAllUser=async ()=>{
    try {
        const x_token=localStorage.getItem("x-token");
const data=await axios.get(`${url}/user/getall`,{
    headers: {
      'x-token': x_token
    } });
    console.log(data);
    getAllApks();
    } catch (error) {
        console.log(error);
    }
        }

        const getMe=async ()=>{
            try {
                const x_token=localStorage.getItem("x-token");
        const data=await axios.get(`${url}/user/me`,{
            headers: {
              'x-token': x_token
            } });
            console.log(data);
            } catch (error) {
                console.log(error);
            }
                }
        const getAllApks=async ()=>{
            try {
                const x_token=localStorage.getItem("x-token");
        const data=await axios.get(`${url}/apk/allApk`,{
            headers: {
              'x-token': x_token
            } });
            console.log({allApks:data});
            } catch (error) {
                console.log(error);
            }
                }

                const addApks=async ()=>{
                    try {
                        const x_token=localStorage.getItem("x-token");
                const data=await axios.get( `${url}/user/getall`,{
                    headers: {
                      'x-token': x_token
                    } });
                    console.log(data);
                    } catch (error) {
                        console.log(error);
                    }
                        }

                        const addApk=async ()=>{
                            try {
                                const x_token=localStorage.getItem("x-token");
                        const data=await axios.get('http://localhost:8080/api/v1/apk/addApk',{

                        },{
                            headers: {
                              'x-token': x_token
                            } });
                            console.log(data);
                            } catch (error) {
                                console.log(error);
                            }
                                }