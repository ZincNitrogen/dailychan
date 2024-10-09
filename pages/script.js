
let stylesheetRoot = document.querySelector(':root');
let body = document.body;





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
const mediaURL = "http://localhost:8000/ServeFullMedia";



const newPostBtn = document.querySelector(`.btn`);
const ALLOW_NSFW_CHECKBOX = document.querySelector('#allownsfw');
let postContainerChildren = postContainer.childNodes;

let chanLink;
let usableFourChanData;

// Eventually attempt to get rid of these global variables. Start with defining usableFourChanData in the pingproxy function where it is usableFourChanData, used 
// then since it is already returned from that function, just add that function as a callback to the thumbnail function.
let paintImg;

let fullMedia;

let mediaAndTextFlexContainer;
let fileInfoFlexContainer = null; 









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

//when theme option is clicked, remove all classes and add theme class to root elemnt


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

    // let usableFourChanData;
    console.log("top");
    console.log(ALLOW_NSFW_CHECKBOX.checked);


    if (ALLOW_NSFW_CHECKBOX.checked) {
        let response =  await fetch(source);
        let fourchanData =  await response.json(); 
        usableFourChanData =  JSON.parse(fourchanData);
    } else {
        let response =  await fetch(worksafeSource);
        let fourchanData =  await response.json(); 
        usableFourChanData =  JSON.parse(fourchanData);
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

    // paintImg = document.createElement("img");   

    mediaAndTextFlexContainer = document.createElement("div");
    fileInfoFlexContainer = document.createElement("div");
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


    // paintImg.setAttribute("src", `data:image/jpeg;base64,${test}`);

    // paintImg.setAttribute("src", `data:image/jpeg;base64,` + test);
    // paintImg.setAttribute("height", `${usableFourChanData.Post.tn_h}`); //tn_h and _w stands for thumbnail height and width respectively
    // paintImg.setAttribute("width", `${usableFourChanData.Post.tn_w}`);
    // paintImg.setAttribute("class", "post-contianer-thumbnail");



    if (usableFourChanData.Post.filename && usableFourChanData.Post.filename.length > 15) {
        let shortenedFilename =   usableFourChanData.Post.filename.substr(0,15);
        console.log(shortenedFilename);
        paintFileName.prepend(`File: ${shortenedFilename}(...)${  usableFourChanData.Post.ext}`); //including "ext" here and only here


    
    } else if (usableFourChanData.Post.filename && usableFourChanData.Post.filename.length <= 15) {
        let fullFilename =  usableFourChanData.Post.filename;
        console.log(fullFilename);
        paintFileName.prepend(`File: ${fullFilename}${  usableFourChanData.Post.ext}`); //including "ext" here and only here


    }
   



    

    // paintFileName.prepend(`File: ${usableFourChanData.Post.filename}${usableFourChanData.Post.ext}`); //including "ext" here and only here

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





    postTitleFlexContainer.append(paintName);
    postTitleFlexContainer.append(paintNow);
    postTitleFlexContainer.append(paintNo);

    postContainer.append(paintBoard);






    if (typeof(usableFourChanData.Post.filename) !== "undefined") {
      
        fileInfoFlexContainer.append(paintFileName);
        fileInfoFlexContainer.append(paintFsize);
        
    

    }
    //postContainer.append(paintImg);

    // postContainer.append(paintCom);
    




    mediaAndTextFlexContainer.append(paintCom);

    postContainer.append(mediaAndTextFlexContainer);
    postContainer.append(fileInfoFlexContainer);
    postContainer.append(postTitleFlexContainer);


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
            mediaAndTextFlexContainer.append(paintImg);

           
    
            
           

          

        }else {
            throw(err + "no thumbnail");
        }




        // if (usableFourChanData.Post.ext == "jpg" || usableFourChanData.Post.ext == "png" || usableFourChanData.Post.ext == "gif") {

        //     paintImg = document.createElement("img");
      

        //     paintImg.setAttribute("src", URL.createObjectURL(usableThumbnailData)); //test 
        
        
        //     paintImg.setAttribute("height", `${usableFourChanData.Post.tn_h}`); //tn_h and _w stands for thumbnail height and width respectively
        //     paintImg.setAttribute("width", `${usableFourChanData.Post.tn_w}`);
        //     paintImg.setAttribute("class", "post-container-thumbnail");
        //     postContainer.append(paintImg);
        

        // } else if (usableFourChanData.Post.ext == "webM") {
        //     paintImg = document.createElement("video");

        // }
        
        
        
        
        // else {
        //     throw (err);
        // }
       
       

        //Meda Access

             //on thumbnail click - replace the thumbnail specs with that of the specs of the full media, add a "close" button near the spot.

        // paintImg.addEventListener("pointerdown", (e)=> { //needs modal window
        //     console.log("thumbnail clicked");


        //     let heightClac = () => {
        //         let dataHeight;
        //         if (!(usableFourChanData.Post.h) > 1000) {
        //             dataHeight = `${usableFourChanData.Post.h/2}px`;
        //             console.log(usableFourChanData.h, typeof(usableFourChanData.h));
        //             console.log('greater h')

        //         }else {
        //             dataHeight = `${usableFourChanData.Post.h}px`;
        //         }

        //         return dataHeight;
        //     };


            

        //     let widthCalc = () => {

        //         let dataWidth; 
        //         if (!(usableFourChanData.Post.w) > 1000) {
        //             dataWidth =  `${usableFourChanData.Post.w/2}px`;
        //             console.log(usableFourChanData.w, typeof(usableFourChanData.w));

        //             console.log('greater w')


        //         } else {
        //             dataWidth =  `${usableFourChanData.Post.w}px`;

        //         }

        //         return dataWidth;
        //     };


        //     paintImg.setAttribute("height", `${heightClac()}`); 



        //     paintImg.setAttribute("width", `${widthCalc()}`);

        //     console.log(usableFourChanData.h, typeof(usableFourChanData.h));
        //     console.log(usableFourChanData.w, typeof(usableFourChanData.w));


        //     console.log(`computed height: ${heightClac()}px`);
        //     console.log(`computed width: ${widthCalc()}px`);

        //     // paintImg.setAttribute("class", "post-container-thumbnail");


        

        // })
  






        // paintImg.addEventListener("pointerdown", (e)=> { //temp solution to sizinf connundrum that the above event listener tries to fox - must figure out how 4chan calculates display size of user media when user media full sizes aren't used.
        //     console.log("thumbnail is clicked u utter sucker");


        //     paintImg.setAttribute("class", "post-container-fullmedia");
            

        //     // paintImg.setAttribute("height", `${usableFourChanData.Post.h/3}`); 
        //     // paintImg.setAttribute("width",`${usableFourChanData.Post.w/3}`);

        // })


    } catch(err) {
        
        console.log(err + " or no image");

      

    }








}

async function getMedia(source) {

    try{
        const response = await fetch(source, {
            headers: {
                "Content-Type": "application/octet-stream",
    
            },
        });
    
        const fullMedia = await response.blob();
        console.log(`This is the full media: ${await fullMedia.text()}`);

    
    
        //get extention of the media
        //if img, keep img tag
        //if video, turn paintimg into video.

        let closebtn = document.createElement("p");
        closebtn.append(document.createTextNode("close"));
        closebtn.setAttribute("class", "closebtn");

    
    
        paintImg.addEventListener("pointerdown", (e)=> { //temp solution to sizinf connundrum that the above event listener tries to fox - must figure out how 4chan calculates display size of user media when user media full sizes aren't used.
            console.log("thumbnail is clicked u utter sucker");
            
    
    
            
            if (usableFourChanData.Post.ext == ".webm") {
                

                fileInfoFlexContainer.append(closebtn);

                let paintVid = document.createElement("video");





                paintVid.setAttribute("src", URL.createObjectURL(fullMedia));
                paintVid.setAttribute("controls", " ");
                paintVid.setAttribute("class", "post-container-thumbnail");
                paintImg.replaceWith(paintVid);
                // paintVid.setAttribute("height", `${usableFourChanData.Post.h/3}`); 
                // paintVid.setAttribute("width",`${usableFourChanData.Post.w/3}`);
    




    
    
    
    
            } else {
                // let closebtn = document.createElement("p");
                closebtn.append(document.createTextNode("close"));
                closebtn.setAttribute("class", "closebtn");
                let paintFullImg = document.createElement("img");
                paintFullImg.setAttribute("src", URL.createObjectURL(fullMedia));
                paintFullImg.setAttribute("class", "post-container-thumbnail");
                paintImg.replaceWith(paintFullImg);
                fileInfoFlexContainer.append(closebtn);
                // paintFullImg.setAttribute("height", `${usableFourChanData.Post.h/3}`); 
                // paintFullImg.setAttribute("width",`${usableFourChanData.Post.w/3}`);
    
        
    
            }
            // paintImg.setAttribute("class", "post-container-fullmedia");
            
    


            
        

    
        })

        closebtn.addEventListener("pointerdown", (e)=> {
            mediaAndTextFlexContainer.children[1].replaceWith(paintImg); //1st index is second child of mediaandtextflexcontainer.
            closebtn.remove();



        })



    }catch(error){
        throw(error + ` or there is no media`);
    }









  

    



    //I want to open a clickable. draggable window when thumbnail is clicked that will show the full media.

    return fullMedia;
}




pingProxy(url, worksafeURL);

getThumbnailArrayBufferBinary(thumbnailURL);
getMedia(mediaURL);






newPostBtn.addEventListener("pointerup", (e) => {
    containerDeletion();
    pingProxy(url, worksafeURL);


    getThumbnailArrayBufferBinary(thumbnailURL);

    getMedia(mediaURL);

    

})



//TODO: Remember to add image/webm support from backend to frontend. 

//TODO: ADD A TOGGLE OPTION FOR THUMBNAIL BLUR

//TODO CURRENT: FORMAT THUMBNAIL SO THAT IT PROPERLY MIMICS 4CHAN STYLE. THEN, BEGIN INTEGRATING COMPLETE VERSIONS OF MEDIA!

//TODO: IMplement a mini game : the game will be a weekly lottery. All week, donations to a crypto pool will be open. 
//Only those that participated will have a chance to win. At the end of every week. a winner is randomly selected by wallet and they get the toal pool money.