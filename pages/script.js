
const postContainer = document.querySelector('.post-container');
const url = "http://localhost:8000/ServerSideRequest";
const newPostBtn = document.querySelector(`.btn`);
const html = document.querySelector(`html`);
let postContainerChildren = postContainer.childNodes;
let chanLink = document.querySelector(".quotelink");







async function pingProxy(source) {

    const response = await fetch(source);
    const fourchanData = await response.json(); 
    const usableFourChanData = JSON.parse(fourchanData);


    //console.log(fourchanData);
    //console.log(usableFourChanData);
    console.log(usableFourChanData.Board);
    console.log(usableFourChanData.Post);
    console.log(usableFourChanData.OP.no);

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

    paintNo.insertAdjacentHTML("afterbegin", '<a href=' + `https://boards.4chan.org/${usableFourChanData.Board}/thread/${usableFourChanData.OP.no}/#p${usableFourChanData.Post.no}` +" target= '_blank' " + "title='See this post on 4chan.org in a new tab'" + '>' + `No.${usableFourChanData.Post.no}` + "</a>");
    //paintNo.prepend(`No.${usableFourChanData.Post.no}`);

    
    paintNow.prepend(usableFourChanData.Post.now);
    paintName.prepend(usableFourChanData.Post.name);
    
    //paintCom.insertAdjacentHTML( 'afterbegin',  usableFourChanData.Post.com + `<span class=quote>>this is a test, a test, a test, a test quote!</span>`);
    
    paintCom.insertAdjacentHTML( 'afterbegin',  usableFourChanData.Post.com);
    //paintCom.prepend(usableFourChanData.Post.com);


    // if (chanLink || false) {
    //     chanLink.setAttribute("href", `https://boards.4chan.org/${usableFourChanData.Board}/thread/${usableFourChanData.OP.no}/#p${chanLink.firstChild} target= _blank title=See this post on 4chan.org in a new tab`);

    // }

        
    console.log(chanLink);
    //chanLink.href = `https://boards.4chan.org/${usableFourChanData.Board}/thread/${usableFourChanData.OP.no}/#p${chanLink.firstChild} target= _blank title=See this post on 4chan.org in a new tab`;






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



//TODO: Make all linkable items link back to original 4chan source

//TODO: Remember to add image support from backend to frontend. 
