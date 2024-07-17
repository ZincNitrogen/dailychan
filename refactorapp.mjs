import express from "express";
import axios from "axios";
const app = express();
const PORT = 8000;
const HOST = "localhost";
let date = new Date().toUTCString();
let combinedJson;
// let onlyBoard;
// let aRandomPost;

// let randomThreadDecision;
// let threadAccess;
// let randomThreadPicker;
// let randomPagePicker;
// let randomPageDecision;


function get4chanBundle() {
    let onlyBoard;
    let aRandomPost;


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
            let randomThreadDecision = threadAccess[randomThreadPicker];
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


        })
        .catch((err) => {

             if ((typeof(aRandomPost) === "undefined") || (typeof(onlyBoard) === 'undefined')) {
                console.log("Error. Retrying...");
                get4chanBundle();             
            }

            
        })
        .finally(() => {

            //console.log(onlyBoard, typeof(onlyBoard));
            //console.log(aRandomPost, typeof(aRandomPost)); 
            combinedJson = {
                Board: onlyBoard,
                Post: aRandomPost
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



app.get("/ServerSideRequest", (req, res) => {
    res.json(JSON.stringify(get4chanBundle()));

    
})


console.log(get4chanBundle());


app.use(express.static("pages"));//middleware



app.listen(PORT, () => {
    console.log(`server is listening on ${HOST}:${PORT}`)
});

//TODO: filter post type by file extention (ext property)