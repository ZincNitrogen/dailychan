
// const postContainer = document.querySelector('.post-container');
const url = "http://localhost:8000/ServerSideRequest";



async function pingProxy() {
    const response = await fetch(url);
    //const data = await response;
    //console.log(response.body);
    const fourchanData = response.text();
    console.log(fourchanData);
    




}


pingProxy();


//TODO: FIGURE OUT HOW TO GET 4CHAN DATA HERE!!


