import express from "express";
import axios from "axios";
const app = express();
const PORT = 8000;
const HOST = "localhost";
let date = new Date().toUTCString();



function get4chanBundle_Two() {
    let onlyBoard;
    let aRandomPost;

    console.log("function is running");

    axios
        .get("http://a.4cdn.org/boards.json")
        .then((res) => {
            let numberOfBoards = res.data.boards.length;
            let randomBoardElement = Math.floor(Math.random() * (numberOfBoards+1));
            let boardDecision = (res.data.boards[randomBoardElement]); 
            onlyBoard = boardDecision.board;
            return axios.get(`http://a.4cdn.org/${onlyBoard}/catalog.json`);

            
        })
        .then((res) => {    
            let numberOfPages = res.data.length;
            let randomPagePicker = Math.floor(Math.random()*(numberOfPages+1));
            let randomPageDecision = res.data[randomPagePicker];//randomPageDecision is an object with two parametes, "page: and "threads", the latter being an array of objects.
            let threadAccess = randomPageDecision.threads; //given previous structural info, it should be clear that threadAccess is the value of the "threads" parameter, it is an array of objects.
            let randomThreadPicker = Math.floor(Math.random()*(threadAccess.length + 1));
            let randomThreadDecision = threadAccess[randomThreadPicker];

            return axios.get(`http://a.4cdn.org/${onlyBoard}/thread/${randomThreadDecision.no}.json`);


        })
        .then((res) => {

            let numberOfPosts = res.data.posts.length;
            let randomPostNumber =  Math.floor(Math.random()*(numberOfPosts + 1));
            aRandomPost = res.data.posts[randomPostNumber];
            //console.log(aRandomPost);
            return aRandomPost;


        })
        .catch((err) => {err})
        .finally(() => {

            console.log(onlyBoard);
            console.log(aRandomPost); 
            //send these two variables to the front end from here(?)           


        });


    


}



//let [aRandomPost, onlyBoard] = get4chanBundle_Two();

//console.log(aRandomPost);
//console.log(onlyBoard);

// async function outerValues() {
 
//     let [aRandomPost, onlyBoard] = await get4chanBundle_Two();
//     console.log("outValues function working");

//     console.log(aRandomPost, onlyBoard);

// }

// outerValues();

//console.log(aRandomPost, onlyBoard);


// console.log(`outer working: ${x}`);
// console.log(`outer working: ${y}`);





console.log(get4chanBundle_Two());


app.use(express.static("pages"));


app.listen(PORT, () => {
    console.log(`server is listening on ${HOST}:${PORT}`)
});