//GLOBALS & DOM

let stylesheetRoot = document.querySelector(':root');
let body = document.body;

let navBarUL = document.querySelector(".options");

let aboutContent = document.querySelector(".about-content");

let aboutBtn = document.querySelector(".aboutbtn");


let themesDropdownBtn = document.querySelector(`.dropdown`);
let themesDropdownContent = document.querySelector(`.dropdown-content`);
let themesDropdownIcon = document.querySelector(`.dropdownarrow`);


let defaultOption = document.querySelector(`#DefaultOption`);
let minimalPaperOption = document.querySelector(`#MinimalPaperOption`);
let anontismOption = document.querySelector(`#AnontismOption`);




let postContainer = document.querySelector(".post-container");
const main = document.querySelector("main");
const baseLocation = window.location;
const url = `${baseLocation}ServerSideRequest`;
const worksafeURL = `${baseLocation}WorksafeServerSideRequest`;
const thumbnailURL = `${baseLocation}ServeThumbnail`;
const mediaURL = `${baseLocation}ServeFullMedia`;



const newPostBtn = document.querySelector(`.btn`);
const ALLOW_NSFW_CHECKBOX = document.querySelector('#allownsfw');
let postContainerChildren = postContainer.childNodes;






// DEFAULT THEME


stylesheetRoot.setAttribute("class", `DefaultTheme`);
themesDropdownContent.style.display = "none";


// NAVBAR EVENTS

navBarUL.addEventListener("pointerdown", (e)=> {



    let target = e.target;
    if (target == aboutBtn && aboutContent.style.display == "none"){
        aboutContent.style.display = "block";

    }else {
        aboutContent.style.display = "none";

    }

    if((target == themesDropdownBtn || target == themesDropdownIcon)  && themesDropdownContent.style.display == "none") {
        themesDropdownContent.style.display = "flex";
        themesDropdownIcon.style.transform = "rotate(180deg)";
        console.log("themebtn clicked");


    }else if ((target == themesDropdownBtn || target == themesDropdownIcon) && themesDropdownContent.style.display == "flex"){
        themesDropdownContent.style.display = "none";
        themesDropdownIcon.style.transform = "rotate(0deg)";
    }


    e.stopPropagation();

   


});


//THEMEING

themesDropdownContent.addEventListener("pointerdown", (e)=> {

    let target = e.target;
     
    if (target == defaultOption){
        stylesheetRoot.setAttribute("class", `DefaultTheme`);

    }else if (target == minimalPaperOption){
        stylesheetRoot.setAttribute("class", `MinimalPaperTheme`);

    }else if (target == anontismOption){
        stylesheetRoot.setAttribute("class", `AnontismTheme`);

    }
});


//OUTSIDE CLICK RESETS

document.body.addEventListener("pointerdown", (e)=> {

    themesDropdownContent.style.display = "none";
    themesDropdownIcon.style.transform = "rotate(0deg)";
    aboutContent.style.display = "none";



});




//API DATA GATHERING AND PAINTING


async function get4chanData(source, worksafeSource) {


    try {
        if (ALLOW_NSFW_CHECKBOX.checked) {
            let response =  await fetch(source);
            let fourchanData =  await response.json(); 
            return JSON.parse(fourchanData)
        } else {
            let response =  await fetch(worksafeSource);
            let fourchanData =  await response.json(); 
            return JSON.parse(fourchanData)
        }
    

    }catch(err) {
        console.log("there is no text data, somethings gone horribly wrong. It's probably all aleenas fault.")
    }


}

async function getThumbnailData(source) {
        

    try{
        const response = await fetch(source, {
            headers: {
                "Content-Type": "application/octet-stream",
            },
        });

            return await response.blob();

        
    
    }catch(err) {

        return "there is no thumbnail"
    }


    
}


async function getFullMedia(source){
    try {

        
        const response = await fetch(source, {
            headers: {
                "Content-Type": "application/octet-stream",
    
            },
        });


        
        return await response.blob(); 
    

    }catch(err){
        return "there is no media";

    }

}


function paintText(usableFourChanData) {

 

    let chanLink = null;
    let paintName = document.createElement("div");
    let paintNow = document.createElement("div");
    let paintNo = document.createElement("div");
    let paintBoard = document.createElement("div");
    let paintFileName = document.createElement("div");
    let paintFsize = document.createElement("div");
    let paintCom = document.createElement("div");
    let mediaAndTextFlexContainer = document.createElement("div");
    let fileInfoFlexContainer = document.createElement("div");
    let postTitleFlexContainer = document.createElement("div");
    paintBoard.setAttribute('class',"post-container-board");
    paintNo.setAttribute('class',"post-container-no");
    paintNow.setAttribute('class',"post-container-now");
    paintName.setAttribute('class',"post-container-name");
    paintCom.setAttribute('class',"post-container-com");
    paintFileName.setAttribute('class',"post-container-filename");
    paintFsize.setAttribute('class',"post-container-fsize");
    mediaAndTextFlexContainer.setAttribute("class", "media-text-flex-container");
    fileInfoFlexContainer.setAttribute("class", "file-info-flex-container");
    postTitleFlexContainer.setAttribute("class", "post-title-flex-container");

    
    if (usableFourChanData.Post.filename && usableFourChanData.Post.filename.length > 15) {
        let shortenedFilename =   usableFourChanData.Post.filename.substr(0,15);
        // console.log(shortenedFilename);
        paintFileName.prepend(`File: ${shortenedFilename}(...)${  usableFourChanData.Post.ext}`); //including "ext" here and only here


    
    } else if (usableFourChanData.Post.filename && usableFourChanData.Post.filename.length <= 15) {
        let fullFilename =  usableFourChanData.Post.filename;
        // console.log(fullFilename);
        paintFileName.prepend(`File: ${fullFilename}${  usableFourChanData.Post.ext}`); //including "ext" here and only here


    }




    


    paintFsize.prepend(usableFourChanData.Post.fsize); //might have to round. investigate 4chan format
    paintBoard.prepend(`/${usableFourChanData.Board}/`);
    paintNo.insertAdjacentHTML("afterbegin", '<a href=' + `https://boards.4chan.org/${usableFourChanData.Board}/thread/${usableFourChanData.OP.no}/#p${usableFourChanData.Post.no}` +" target= '_blank' " + "title='See this post on 4chan.org in a new tab'" + '>' + `No.${usableFourChanData.Post.no}` + "</a>");
    paintNow.prepend(usableFourChanData.Post.now);
    paintName.prepend(usableFourChanData.Post.name);
    
    
    if (usableFourChanData.Post.com != undefined) {
        paintCom.insertAdjacentHTML( 'afterbegin',  usableFourChanData.Post.com);


    }


    chanLink = Array.from(paintCom.querySelectorAll(".quotelink"));


    if (chanLink || false) {

        // console.log(chanLink);
        chanLink.forEach((e) => {
            //console.log(e.text);
            let postReply = (e.text).slice(2);

            e.setAttribute("href", `https://boards.4chan.org/${usableFourChanData.Board}/thread/${usableFourChanData.OP.no}/#p${postReply}`);

            e.setAttribute("target", "_blank");
            e.setAttribute("title" , "See this post on 4chan.org in a new tab");

        })

    
    }


    
    postTitleFlexContainer.append(paintName);
    postTitleFlexContainer.append(paintNow);
    postTitleFlexContainer.append(paintNo);

    if (typeof(usableFourChanData.Post.filename) !== "undefined") {
    
        fileInfoFlexContainer.append(paintFileName);
        fileInfoFlexContainer.append(paintFsize);
        
    

    }



    mediaAndTextFlexContainer.append(paintCom);

    postContainer.append(mediaAndTextFlexContainer);
    postContainer.append(fileInfoFlexContainer);
    postContainer.append(postTitleFlexContainer);




    //media queries

    const mobileSizing = window.matchMedia('(max-width: 800px)');

    function mediaQurey(e) {
        if (e.matches) {
            //do something with the board placement
            postTitleFlexContainer.append(paintBoard);

            
        }else {
            postContainer.append(paintBoard);

        }
    }

    mobileSizing.addEventListener("change", ()=> {
        mediaQurey(mobileSizing);
    });


    mediaQurey(mobileSizing);

    return {
        MTFC: mediaAndTextFlexContainer,
        FIFC: fileInfoFlexContainer

    }
    





}



function paintTN(usableFourChanData, usableThumbnailData, mediaAndTextFlexContainer) {

    if (usableFourChanData.Post.tim) {

        let paintImg = document.createElement("img");
        paintImg.setAttribute("src", URL.createObjectURL(usableThumbnailData)); //test 

        paintImg.setAttribute("height", `${usableFourChanData.Post.tn_h}`); //tn_h and _w stands for thumbnail height and width respectively
        paintImg.setAttribute("width", `${usableFourChanData.Post.tn_w}`);
        paintImg.setAttribute("class", "post-container-thumbnail");
        mediaAndTextFlexContainer.append(paintImg);


        return paintImg;



        




    }else {
        paintImg = null;
        // console.log ("no thumbnail");
        return paintImg;
    }

}


function paintMedia(usableFourChanData, fullMedia, paintImg, fileInfoFlexContainer, mediaAndTextFlexContainer) {
    

    let closebtn = document.createElement("p");
    closebtn.append(document.createTextNode("close"));
    closebtn.setAttribute("class", "closebtn");

    // console.log(`this is paintimg ${paintImg}`);


    try {

        paintImg.addEventListener("pointerdown", (e)=> { //temp solution to sizinf connundrum that the above event listener tries to fox - must figure out how 4chan calculates display size of user media when user media full sizes aren't used.
            // console.log("thumbnail is clicked u utter sucker");
            
    
    
            
            if (usableFourChanData.Post.ext == ".webm") {
                
    
                fileInfoFlexContainer.append(closebtn);
    
                let paintVid = document.createElement("video");
    
    
    
    
    
                paintVid.setAttribute("src", URL.createObjectURL(fullMedia));
                paintVid.setAttribute("controls", " ");
                paintVid.setAttribute("class", "post-container-thumbnail");
                paintImg.replaceWith(paintVid);
    
            } else {
            
                let paintFullImg = document.createElement("img");
                paintFullImg.setAttribute("src", URL.createObjectURL(fullMedia));
                paintFullImg.setAttribute("class", "post-container-thumbnail");
                paintImg.replaceWith(paintFullImg);
                fileInfoFlexContainer.append(closebtn);
    
    
        
    
            }
            
    
        })
    

    }catch(error) {
        // console.log("there is no media");
    }
  


    closebtn.addEventListener("pointerdown", (e)=> {
        closebtn.remove();
        mediaAndTextFlexContainer.children[1].replaceWith(paintImg); //1st index is second child of mediaandtextflexcontainer.

    })

}



function containerDeletion() {

  
    for (let i = postContainerChildren.length -1; i >=0; i--){
        postContainerChildren[i].remove();
    }


}



async function PromiseAllTest() { //async doesn't need to be here?
    Promise.all([
        get4chanData(url, worksafeURL),
        getThumbnailData(thumbnailURL),
        getFullMedia(mediaURL),
    ]).then((values) => {

     
        let text = null;
        let thumbnail = null;
        let media = null;
        // console.log(values);
        [text, thumbnail, media] = values;
        // console.log(text);
        // console.log(thumbnail);
        // console.log(media);

        containerDeletion();

        let paintTextOutputObject = paintText(text);

        let mediaAndTextFlexContainer = paintTextOutputObject.MTFC;
        let fileInfoFlexContainer = paintTextOutputObject.FIFC;

        
        let paintImg = paintTN(text, thumbnail, mediaAndTextFlexContainer);
        paintMedia(text, media, paintImg, fileInfoFlexContainer, mediaAndTextFlexContainer);

    }).catch((err) => {
        console.log(err);
    });
    
}

function loading() {

    let loadingIndicator = document.createElement("p");
    let loadingText = document.createTextNode("loading...");
    loadingIndicator.append(loadingText);
    postContainer.prepend(loadingIndicator);




}

// console.log(window.location);

     

loading();
PromiseAllTest();

newPostBtn.addEventListener("pointerup", (e) => {
    containerDeletion();
    loading();
    PromiseAllTest();

}) 
