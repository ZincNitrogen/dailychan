import express from "express";
import axios from "axios";
const app = express();
const PORT = 8000;
const HOST = "localhost";
let date = new Date().toUTCString();
let onlyBoard;
let aRandomPost;


function get4chanBundle() {

    console.log("function is running");

    axios
        .get("http://a.4cdn.org/boards.json", {

            headers: {"Content-Type": "application/json"},

        })
        .then((res) => {
            let numberOfBoards = res.data.boards.length;
            let randomBoardElement = Math.floor(Math.random() * (numberOfBoards+1));
            let boardDecision = (res.data.boards[randomBoardElement]); 
            onlyBoard = boardDecision.board;
            return axios.get(`http://a.4cdn.org/${onlyBoard}/catalog.json`, {
                headers: {"Content-Type": "application/json"},

            });

            
        })
        .then((res) => {    
            let numberOfPages = res.data.length;
            let randomPagePicker = Math.floor(Math.random()*(numberOfPages+1));
            let randomPageDecision = res.data[randomPagePicker];
            let threadAccess = randomPageDecision.threads; 
            let randomThreadPicker = Math.floor(Math.random()*(threadAccess.length + 1));
            let randomThreadDecision = threadAccess[randomThreadPicker];

            return axios.get(`http://a.4cdn.org/${onlyBoard}/thread/${randomThreadDecision.no}.json`, {
                headers: {"Content-Type": "application/json"},

            });


        })
        .then((res) => {

            let numberOfPosts = res.data.posts.length;
            let randomPostNumber =  Math.floor(Math.random()*(numberOfPosts + 1));
            aRandomPost = res.data.posts[randomPostNumber];
            //console.log(aRandomPost);
            return aRandomPost;


        })
        .catch((err) => {

            if (!aRandomPost || !onlyBoard) {
                console.log("Error. Retrying...");
                get4chanBundle();
            }
           
        })
        .finally(() => {

            console.log(onlyBoard, typeof(onlyBoard));
            console.log(aRandomPost, typeof(aRandomPost)); 
            let combinedJson = {
                Board: onlyBoard,
                Post: aRandomPost
            };

    

            //combine the above two in a json object
            //send these two variables to the front end from here
            //
            
            app.get("/ServerSideRequest", (req, res) => { //this is working to send random stuff to frontend without template engine!
                //res.send("woah");
                // res.send(onlyBoard);
                // res.json(aRandomPost);
                res.json(JSON.stringify(combinedJson));
            })
            

           

        });
        

}




console.log(get4chanBundle());
//get4chanBundle();
//let bundle = get4chanBundle();



app.use(express.static("pages"));//middleware

// app.get("/ServerSideRequest", (req, res) => { //this si working to send random stuff to frontend without template engine!
//     res.send("woah");
// })


app.listen(PORT, () => {
    console.log(`server is listening on ${HOST}:${PORT}`)
});

//TODO; CHECK IF-MODIFIED-SINCE FOR AXIOS GEET REQUESTS TO 4CHAN SERVERS.
//TDO: How to pass a Node.js variable to the DOM? Template engines seem to be one solution, but is there a simpler way?