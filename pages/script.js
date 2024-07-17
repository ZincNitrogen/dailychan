
const postContainer = document.querySelector('.post-container');
const url = "http://localhost:8000/ServerSideRequest";
const newPostBtn = document.querySelector(`.btn`);
const html = document.querySelector(`html`);
let postContainerChildren = postContainer.childNodes;






async function pingProxy(source) {

    const response = await fetch(source);
    const fourchanData = await response.json(); 
    const usableFourChanData = JSON.parse(fourchanData);


    //console.log(fourchanData);
    //console.log(usableFourChanData);
    console.log(usableFourChanData.Board);
    console.log(usableFourChanData.Post);

    //console.log(usableFourChanData[Board]);
    //console.log(usableFourChanData[1]);

    let paintBoard = document.createElement("div");
    let paintNo = document.createElement("div");
    let paintNow = document.createElement("div");
    let paintName = document.createElement("div");
    let paintCom = document.createElement("div");


    paintBoard.setAttribute('class',"post-container-board");
    paintNo.setAttribute('class',"post-container-no");
    paintNow.setAttribute('class',"post-container-now");
    paintName.setAttribute('class',"post-container-name");
    paintCom.setAttribute('class',"post-container-com");

    

    paintBoard.prepend(`/${usableFourChanData.Board}/`);
    paintNo.prepend(`No.${usableFourChanData.Post.no}`);
    paintNow.prepend(usableFourChanData.Post.now);
    paintName.prepend(usableFourChanData.Post.name);
    paintCom.insertAdjacentHTML( 'afterbegin',  usableFourChanData.Post.com);
    //paintCom.prepend(usableFourChanData.Post.com);




    postContainer.append(paintBoard);
    postContainer.append(paintNo);
    postContainer.append(paintNow);
    postContainer.append(paintName);
    postContainer.append(paintCom);

}


function containerDeletion() {

  

    for (let i = postContainerChildren.length -1; i >=0; i--){
        postContainerChildren[i].remove();

    }
    

}



pingProxy(url);

newPostBtn.addEventListener("pointerup", (e) => {

    containerDeletion();
    pingProxy(url);

})


//TODO: Remember to add image support from backend to frontend. 
