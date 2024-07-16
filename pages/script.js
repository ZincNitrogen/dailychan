
const postContainer = document.querySelector('.post-container');
const url = "http://localhost:8000/ServerSideRequest";
const newPostBtn = document.querySelector(`.btn`);
let postContainerChildern = postContainer.childNodes;






async function pingProxy(source) {

    const response = await fetch(source);
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




async function pingProxyTwo(source) {

    const response = await fetch(source);
    const fourchanData = await response.text(); 
    const usableFourChanData = fourchanData;


    //console.log(fourchanData);
    console.log(usableFourChanData);
    console.log(usableFourChanData.Board);
    console.log(usableFourChanData.Post);

    //console.log(usableFourChanData[Board]);
    //console.log(usableFourChanData[1]);

    let one = document.createElement("div");
    let two = document.createElement("div");
    let three = document.createElement("div");
    let four = document.createElement("div");
    let five = document.createElement("div");


    one.prepend(usableFourChanData.Board);
    two.prepend(usableFourChanData.Post.no);
    three.prepend(usableFourChanData.Post.now);
    four.prepend(usableFourChanData.Post.name);
    five.prepend(usableFourChanData.Post.com);



    postContainer.append(one);
    postContainer.append(two);
    postContainer.append(three);
    postContainer.append(four);
    postContainer.append(five);

}



//pingProxy(url);


//button must call function and refesh page
newPostBtn.addEventListener("pointerup", (e) => {

    //deleteChildren(postContainer);
    pingProxy(url);

    // location.reload();
    // return false;
})



//TODO: Remember to add image support from backend to frontend. 
//TODO: FIGURE OUT HOW TO GET UNIQUE VALUES FROM BACKEND