
document.querySelector('#deleteItem').addEventListener('click', async(event)=>{
    event.preventDefault();
    console.log(event.target.firstElementChild.innerHTML);
    const title=event.target.firstElementChild.innerHTML;
    try {
        const data = await axios.delete(`${url}/apk/deleteApk/${{title}}`);
        // window.location='/products'
        console.log(data);
      } catch (error) {
        console.log(error);
      }
});