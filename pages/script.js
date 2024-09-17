
let stylesheetRoot = document.querySelector(':root');





let themesDropdownBtn = document.querySelector(`.dropdown`);
let themesDropdownContent = document.querySelector(`.dropdown-content`);
let themesDropdownIcon = document.querySelector(`.dropdownarrow`);


let defaultOption = document.querySelector(`#DefaultOption`);
let minimalPaperOption = document.querySelector(`#MinimalPaperOption`);
let anontismOption = document.querySelector(`#AnontismOption`);





const postContainer = document.querySelector('.post-container');
const url = "http://localhost:8000/ServerSideRequest";
const worksafeURL = "http://localhost:8000/WorksafeServerSideRequest";
const thumbnailURL = "http://localhost:8000/ServeThumbnail";
const newPostBtn = document.querySelector(`.btn`);
const ALLOW_NSFW_CHECKBOX = document.querySelector('#allownsfw');
let postContainerChildren = postContainer.childNodes;

let chanLink;
let usableFourChanData;
let paintImg;


//THEMEING

//stylesheetRoot.setAttribute("class", `MinimalPaperTheme`);
//stylesheetRoot.setAttribute("class", `AnontismTheme`);
// stylesheetRoot.setAttribute("class", `SleekTheme`);
stylesheetRoot.setAttribute("class", `DefaultTheme`);



//DROPDOWN
themesDropdownContent.style.display = "none"; //by default, dropdown is invisible

themesDropdownBtn.addEventListener("pointerenter", (e) => {
    themesDropdownContent.style.display = "flex"; 
    themesDropdownIcon.style.transform = "rotate(180deg)";



});


document.body.addEventListener("pointerdown", (e) => {
    themesDropdownContent.style.display = "none";
    themesDropdownIcon.style.transform = "rotate(0deg)";
    

    e.stopPropagation(); 


});


themesDropdownContent.addEventListener("pointerenter", (e) => {
    themesDropdownContent.style.display = "flex"; 
    themesDropdownIcon.style.transform = "rotate(180deg)";


});

themesDropdownContent.addEventListener("pointerleave", (e) => {
    themesDropdownContent.style.display = "none"; 
    themesDropdownIcon.style.transform = "rotate(0deg)";

});

//when theme option is clicked, remove al classes and add theme class to root elemnt


defaultOption.addEventListener('pointerdown' , (e) => { 
    stylesheetRoot.setAttribute("class", `DefaultTheme`);
});
   


minimalPaperOption.addEventListener('pointerdown' , (e) => {
    stylesheetRoot.setAttribute("class", `MinimalPaperTheme`);

});
    


anontismOption.addEventListener('pointerdown' , (e) => {
    stylesheetRoot.setAttribute("class", `AnontismTheme`);

});






//API DATA GATHERING AND PAINTING

async function pingProxy(source, worksafeSource) {
    //while this solution works, the latency is terrible. I think a better way of doing this is to implement
    //some sort of flag sent with the request that lets the server know the state of the checkbox
    //the server will then only choose from boards that are approved.

    
    console.log("top");
    console.log(ALLOW_NSFW_CHECKBOX.checked);


    if (ALLOW_NSFW_CHECKBOX.checked) {
        let response =  await fetch(source);
        let fourchanData =  await response.json(); 
        usableFourChanData = JSON.parse(fourchanData);
    } else {
        let response =  await fetch(worksafeSource);
        let fourchanData =  await response.json(); 
        usableFourChanData = JSON.parse(fourchanData);
    }

    
    
    





 
    //const convertThumbnail = usableFourChanData.Thumbnail;


    //console.log(fourchanData);
    console.log(usableFourChanData);
    console.log(usableFourChanData.Board);
    console.log(usableFourChanData.Post);
    console.log(usableFourChanData.OP.no);






   




    //console.log(usableFourChanData.Thumbnail);

    //console.log(usableFourChanData[Board]);
    //console.log(usableFourChanData[1]);

    //let test = btoa(usableFourChanData.Thumbnail);
    //let test = (usableFourChanData.Thumbnail);

    // console.log(test);
    // console.log(typeof(test));
    let paintName = document.createElement("div");
    let paintNow = document.createElement("div");

    let paintNo = document.createElement("div");
    let paintBoard = document.createElement("div");
    let paintFileName = document.createElement("div");
    let paintFsize = document.createElement("div");
    

    let paintCom = document.createElement("div");
   
    //let paintImg = document.createElement("img");

 



    paintBoard.setAttribute('class',"post-container-board");
    paintNo.setAttribute('class',"post-container-no");
    paintNow.setAttribute('class',"post-container-now");
    paintName.setAttribute('class',"post-container-name");
    paintCom.setAttribute('class',"post-container-com");
    paintFileName.setAttribute('class',"post-container-filename");

    paintFsize.setAttribute('class',"post-container-fsize");

    // paintImg.setAttribute("src", `data:image/jpeg;base64,${test}`);

    // paintImg.setAttribute("src", `data:image/jpeg;base64,` + test);
    // paintImg.setAttribute("height", `${usableFourChanData.Post.tn_h}`); //tn_h and _w stands for thumbnail height and width respectively
    // paintImg.setAttribute("width", `${usableFourChanData.Post.tn_w}`);
    // paintImg.setAttribute("class", "post-contianer-thumbnail");



    paintFileName.prepend(`File: ${usableFourChanData.Post.filename}${usableFourChanData.Post.ext}`); //including "ext" here and only here
    paintFsize.prepend(usableFourChanData.Post.fsize); //might have to round. investigate 4chan format


    paintBoard.prepend(`/${usableFourChanData.Board}/`);

    paintNo.insertAdjacentHTML("afterbegin", '<a href=' + `https://boards.4chan.org/${usableFourChanData.Board}/thread/${usableFourChanData.OP.no}/#p${usableFourChanData.Post.no}` +" target= '_blank' " + "title='See this post on 4chan.org in a new tab'" + '>' + `No.${usableFourChanData.Post.no}` + "</a>");
    //paintNo.prepend(`No.${usableFourChanData.Post.no}`);

    
    paintNow.prepend(usableFourChanData.Post.now);
    paintName.prepend(usableFourChanData.Post.name);
    
    //paintCom.insertAdjacentHTML( 'afterbegin',  usableFourChanData.Post.com + `<span class=quote>>this is a test, a test, a test, a test quote!</span>`);
    
    if (usableFourChanData.Post.com != undefined) {
        paintCom.insertAdjacentHTML( 'afterbegin',  usableFourChanData.Post.com);


    }
    //paintCom.prepend(usableFourChanData.Post.com);




    chanLink = Array.from(paintCom.querySelectorAll(".quotelink"));


    if (chanLink || false) {

        console.log(chanLink);
        chanLink.forEach((e) => {
            //console.log(e.text);
            let postReply = (e.text).slice(2);

            e.setAttribute("href", `https://boards.4chan.org/${usableFourChanData.Board}/thread/${usableFourChanData.OP.no}/#p${postReply}`);

            e.setAttribute("target", "_blank");
            e.setAttribute("title" , "See this post on 4chan.org in a new tab");

        })

    
    }

    
    
  

    //chanLink.href = `https://boards.4chan.org/${usableFourChanData.Board}/thread/${usableFourChanData.OP.no}/#p${chanLink.firstChild} target= _blank title=See this post on 4chan.org in a new tab`;





    postContainer.append(paintName);
    postContainer.append(paintNow);
    postContainer.append(paintNo);
    postContainer.append(paintBoard);






    if (typeof(usableFourChanData.Post.filename) !== "undefined") {
        postContainer.append(paintFileName);
        postContainer.append(paintFsize);
        
    

    }
    //postContainer.append(paintImg);

    postContainer.append(paintCom);


    return usableFourChanData 
   
  
}


function containerDeletion() {

  
    //paintImg.removeAttribute("src");

    for (let i = postContainerChildren.length -1; i >=0; i--){
        postContainerChildren[i].remove();
    }






    

}



async function getThumbnailArrayBufferBinary(source) {

    try {

        const response = await fetch(source, {
            headers: {
                "Content-Type": "application/octet-stream",
            },
        });

        
        const usableThumbnailData = await response.blob(); //takes in the incoming array buffer and resolves it as a blob
    

        //const usableThumbnailData =  URL.createObjectURL( await response.blob());

        console.log(usableThumbnailData);
        console.log(usableThumbnailData.text());
        //console.log(blobbyResponse.text());
        console.log(typeof(usableThumbnailData));  
        //const thumbnail = URL.createObjectURL(blobbyResponse);
    
    
    
    
    
    
        //turn arraybuffer into blob(?) NOW I HAVE TO FIGURE OUT WHY OLD THUMBNAILS SOMETIMES STICKAROUND PAST THEIR WELCOME!!



        // const test =  new Blob([usableThumbnailData], {type: "image/*"}); //"or image/jpeg" ? since thumbnails are supposed to be only jpg's
        // console.log(test);

        
    
    
    
        // const mediaContainer = document.createElement("img");
        // mediaContainer.setAttribute("src", thumbnail);
        // postContainer.append(mediaContainer);
    
        //console.log(URL.createObjectURL(blobbyResponse));


    
        if (usableFourChanData.Post.tim) {

            paintImg = document.createElement("img");
      

            paintImg.setAttribute("src", URL.createObjectURL(usableThumbnailData)); //test 
        
        
            paintImg.setAttribute("height", `${usableFourChanData.Post.tn_h}`); //tn_h and _w stands for thumbnail height and width respectively
            paintImg.setAttribute("width", `${usableFourChanData.Post.tn_w}`);
            paintImg.setAttribute("class", "post-container-thumbnail");
            postContainer.append(paintImg);
        

        } else {
            throw (err);
        }
       

    } catch(err) {
        
        console.log(err + " or no image");

      

    }






}



pingProxy(url, worksafeURL);
getThumbnailArrayBufferBinary(thumbnailURL);




newPostBtn.addEventListener("pointerup", (e) => {
    containerDeletion();
    pingProxy(url, worksafeURL);
    getThumbnailArrayBufferBinary(thumbnailURL);

    

})



//TODO: Remember to add image/webm support from backend to frontend. 

//TODO: ADD A TOGGLE OPTION FOR THUMBNAIL BLUR

//TODO CURRENT: FORMAT THUMBNAIL SO THAT IT PROPERLY MIMICS 4CHAN STYLE. THEN, BEGIN INTEGRATING COMPLETE VERSIONS OF MEDIA!

//TODO: IMplement a mini game : the game will be a weekly lottery. All week, donations to a crypto pool will be open. 
//Only those that participated will have a chance to win. At the end of every week. a winner is randomly selected by wallet and they get the toal pool money.