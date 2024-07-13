
const postContainer = document.querySelector('.post-container');
const url = "http://localhost:8000/ServerSideRequest";



async function pingProxy() {
    const response = await fetch(url);
    const fourchanData = await response.json(); 
    const usableFourChanData = JSON.parse(fourchanData);


    //console.log(fourchanData);
    console.log(usableFourChanData);
    console.log(usableFourChanData.Board);
    console.log(usableFourChanData.Post);

    //console.log(usableFourChanData[Board]);
    //console.log(usableFourChanData[1]);

    let paintBoard = document.createElement("div");
    let paintNo = document.createElement("div");
    let paintNow = document.createElement("div");
    let paintName = document.createElement("div");
    let paintCom = document.createElement("div");


    paintBoard.prepend(usableFourChanData.Board);
    paintNo.prepend(usableFourChanData.Post.no);
    paintNow.prepend(usableFourChanData.Post.now);
    paintName.prepend(usableFourChanData.Post.name);
    paintCom.prepend(usableFourChanData.Post.com);



    postContainer.append(paintBoard);
    postContainer.append(paintNo);
    postContainer.append(paintNow);
    postContainer.append(paintName);
    postContainer.append(paintCom);


   




}


pingProxy();



//certan undefined 'com' values i suspect are images. Remember to add image support from backend to frontend. 