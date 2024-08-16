import express from "express";
import axios from "axios";
import { arrayBufferToBinaryString } from "blob-util";

const app = express();
const PORT = 8000;
const HOST = "localhost";
let date = new Date().toUTCString();
let combinedJson;

let onlyBoard;
let aRandomPost;

let randomThreadDecision;
// let threadAccess;
// let randomThreadPicker;
// let randomPagePicker;
// let randomPageDecision;

//let thumbnail;


function get4chanBundle() {
   


    console.log("function is running");

    axios
        .get("http://a.4cdn.org/boards.json", {

            headers: {"Content-Type": "application/json"},

        })
        .then((res) => {
            let numberOfBoards = res.data.boards.length;
            let randomBoardElement = Math.floor(Math.random() * (numberOfBoards));
            let boardDecision = (res.data.boards[randomBoardElement]); 
            onlyBoard = boardDecision.board;
            return axios.get(`http://a.4cdn.org/${onlyBoard}/catalog.json`, {
                headers: {"Content-Type": "application/json"},

            });


            
        })
        .then((res) => {   
            // console.log(`<<<<<<<<<<<<<<<<BEGIN THREAD MATRIX>>>>>>>>>>>>>>>>`) 
            // console.log(res.data);



            // console.log(`<<<<<<<<<<<<<<<<NUMBER OF PAGES>>>>>>>>>>>>>>>>`) 
            let numberOfPages = res.data.length;
            // console.log(numberOfPages);



            // console.log(`<<<<<<<<<<<<<<<<RANDOM PAGE>>>>>>>>>>>>>>>>`) 
            let randomPagePicker = Math.floor(Math.random()*(numberOfPages)); //picks random apge
            // console.log(randomPagePicker);


            // console.log(`<<<<<<<<<<<<<<<<ACCESS PAGE>>>>>>>>>>>>>>>>`) 
            let randomPageDecision = res.data[randomPagePicker]; //access object corresponding to page value
            // console.log(randomPageDecision);



            // console.log(`<<<<<<<<<<<<<<<<ACCESS THREADS OBJECT>>>>>>>>>>>>>>>>`) 
            let threadAccess = randomPageDecision.threads; //access threads value of pagedecision object
            // console.log(threadAccess);
            

            // console.log(`<<<<<<<<<<<<<<<<RANDOM THREAD>>>>>>>>>>>>>>>>`) 
            let randomThreadPicker = Math.floor(Math.random()*(threadAccess.length));
            // console.log(randomThreadPicker);


            // console.log(`<<<<<<<<<<<<<<<<THREAD DESCISION>>>>>>>>>>>>>>>>`) 
            randomThreadDecision = threadAccess[randomThreadPicker];
            // console.log(randomThreadDecision);

       
            return axios.get(`http://a.4cdn.org/${onlyBoard}/thread/${randomThreadDecision.no}.json`, {
                headers: {"Content-Type": "application/json"},

            });


        })
        .then((res) => {

            let numberOfPosts = res.data.posts.length;
            let randomPostNumber =  Math.floor(Math.random()*(numberOfPosts));
            aRandomPost = res.data.posts[randomPostNumber];

            // console.log(`<<<<<<<<<<<<<<<<POSTS>>>>>>>>>>>>>>>>`) 
            // console.log(res.data);

            // console.log(`<<<<<<<<<<<<<<<<A RANDOM POST>>>>>>>>>>>>>>>>`) 
            // console.log(aRandomPost);
           
            return aRandomPost;

            // return axios.get(`http://i.4cdn.org/${onlyBoard}/${aRandomPost.tim}s.jpg`, {
            //     //responseType: "blob",
            //     headers: {"Content-Type": "image/jpeg",
            //         "Accept": "image/jpeg",

            //     },
            //     // headers: {"Content-Type" : "image/jpeg"},
            //     // responseType: "blob",

            //     //headers: {"Content-Type": "application/json"},
            //     //headers: {"Content-Type": "*/*"},
            //     //headers: {"Content-Type": "application/x-www-form-urlencoded"},
            //     //headers: {"Content-Type": "application/octet-stream"},
            //     //NOTE: [4chan image ID] is the "tim" property of the "aRandomPost" object. This is not documented.
            //     //this url serves thumbnails!!!
            // }); 


        })
        // .then((res) => {


        //     //console.log(res);


        //     console.log(res.headers);
        //     console.log(res.request);
        //     //console.log(typeof(res.data));
        //     thumbnail = (res.data);
        //     console.log(thumbnail);
        // })
        .catch((err) => {

             if ((typeof(aRandomPost) === "undefined") || (typeof(onlyBoard) === 'undefined')) {
                console.log("Error. Retrying... " + err );
                get4chanBundle();             
            }

            
        })
        .finally(() => {

            //console.log(onlyBoard, typeof(onlyBoard));
            //console.log(aRandomPost, typeof(aRandomPost)); 
            combinedJson = {
                Board: onlyBoard,
                Post: aRandomPost,
                OP: randomThreadDecision,
                //Thumbnail: thumbnail,
            };

            console.log("=========new=========")
            //console.log(onlyBoard);
            //console.log(aRandomPost);
            //console.log(combinedJson);

            // app.get("/ServerSideRequest", (req, res) => {

            //     // onlyBoard = null;
            //     // aRandomPost = null
              
            //     console.log("=========old=========")
            //     console.log(onlyBoard);
            //     console.log(aRandomPost);
            //     console.log(combinedJson); 
             
            //     res.json(JSON.stringify(combinedJson));
            //     // delete combinedJson.Board;
            //     // delete combinedJson.Post;

            //     console.log(get4chanBundle());



            // });
            
          



    

            //combine the above two in a json object
            //send these two variables to the front end from here
            //
           


            
        });

        
        //console.log(combinedJson);
        return combinedJson;
        

}


function getThumbnail() {

    axios
    .get(`http://i.4cdn.org/${onlyBoard}/${aRandomPost.tim}s.jpg`, {
            //headers: {"Content-Type": "image/jpeg"},
            // headers: {"Content-Type": "application/octet-stream",
            //     "Accept" : "image/avif,image/webp,image/png,image/svg+xml,image/*;q=0.8,*/*;q=0.5",

            // },
            headers: {"Content-Type": "image/jpeg",
                //"Accept" : "image/avif,image/webp,image/png,image/svg+xml,image/*;q=0.8,*/*;q=0.5",

            },

            //responseType: "buffer",
            //NOTE: [4chan image ID] is the "tim" property of the "aRandomPost" object. This is not documented.
            //this url serves thumbnails!!!
        })
        .then((res) => {
            thumbnail = res.data;
            //console.log(typeof(res));
            console.log(thumbnail);
            //console.log(res.request);
        })
        .catch((err) =>{err});
        

    return thumbnail



}



function getThumbnailTwo(imageresponse) {

    //thumbnail = null; -> makes all blobs/bufers return 0 butes

    axios
    .get(`http://i.4cdn.org/${onlyBoard}/${aRandomPost.tim}s.jpg`, {
            headers: {"Content-Type": "application/octet-stream"}, // or image/jpeg (???) since thumbnails are supposed to be only jog's
            responseType: "arraybuffer",
            // headers: {"Content-Type": "application/octet-stream",
            //     "Accept" : "image/avif,image/webp,image/png,image/svg+xml,image/*;q=0.8,*/*;q=0.5",

            // },
            // headers: {"Content-Type": "image/jpeg",
            //     //"Accept" : "image/avif,image/webp,image/png,image/svg+xml,image/*;q=0.8,*/*;q=0.5",

            // },



           
            //NOTE: [4chan image ID] is the "tim" property of the "aRandomPost" object. This is not documented.
            //this url serves thumbnails!!!
        })
        .then((res) => {

            //thumbnail = arrayBufferToBinaryString(res.data); //convert arraybuffer to binary string via blob-util library
            let thumbnail = res.data;
            console.log(typeof(thumbnail));
            console.log(thumbnail);
            imageresponse.send(thumbnail);
            //thumbnail = res;
            //console.log(`Raw Array Buffer data: ${res.data}`);

            //console.log(typeof(res));
            //console.log(`Array Buffer converted to binary: ${thumbnail}`);
            //console.log(res.request);
        })
        .catch((err) =>{err});
        

    // return thumbnail;



}


app.get("/ServerSideRequest", (req, res) => {
    res.json(JSON.stringify(get4chanBundle()));

    
})


// app.get("/ServeThumbnail", (req, res) =>{
//     res.json(JSON.stringify(getThumbnail()));
//     //console.log(decodeURI(getThumbnail()));
    
// })


// app.get("/ServeThumbnail", (req, res) =>{
//     res.send(getThumbnailTwo());
//     //thumbnail = null;

//     //console.log(decodeURI(getThumbnail()));
    
// })

// app.get("/ServeThumbnail", (imagerequest, imageresponse) =>{
    
//     axios
//     .get(`http://i.4cdn.org/${onlyBoard}/${aRandomPost.tim}s.jpg`, {
//             headers: {"Content-Type": "application/octet-stream"}, 
//             responseType: "arraybuffer",
//         })
//         .then((res) => {

//             let thumbnail = res.data;
//             console.log(typeof(thumbnail));
//             console.log(thumbnail);
//             imageresponse.send(thumbnail);


//         })
//         .catch((err) =>{err});


    
// })


app.get("/ServeThumbnail", (imagerequest, imageresponse) =>{
   getThumbnailTwo(imageresponse);


    
})



console.log(get4chanBundle());


app.use(express.static("pages"));//middleware



app.listen(PORT, () => {
    console.log(`server is listening on ${HOST}:${PORT}`)
});


//get image/gif from endpoint: thumbnails and full files (headers are content type: application/octet-stream <--try this one first, image/jpeg, image/png, image/gif, video/webm , audio/weba, /swf)
//add it to combinedjson to pipe to front end
//fornt end recievd it and parses out file
//add cs class to it to put it in its place
//paint it in post container with everything else



