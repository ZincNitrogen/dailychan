

import express from "express";
import axios from "axios";
const app = express();
const PORT = 5500;
const HOST = "localhost";
let date = new Date().toUTCString();

//get initial 4chan bundle



//gets
axios
    .get("http://a.4cdn.org/boards.json")
    .then((res) => {

       //1) for elements in res.data,
        //res.data is and object that containsa a property that is itself an array of objects. To randomly access, I need to a) randomly pick an element from array, and then acces the value of that element's "board" value (since each element is an object)
        let numberOfBoards = res.data.boards.length;
        let randomBoardElement = Math.floor(Math.random() * (numberOfBoards+1));
        let boardDecision = (res.data.boards[randomBoardElement]); //res.data is an object, boards is a proeprty of res.data, the value of boards is an array of objects.
        // console.log(boardDecision);
        // console.log(typeof(boardDecision));
        // console.log(boardDecision.board);
        return boardDecision//now new response in the next "then" will be boardDecision.
       



     })
    .then((res) => {
            //1) get request to catalog.jon using randomboard
            // 2) pick random page and random thread on that page
        let onlyBoard = res.board;
        // console.log(onlyBoard);

        axios
        
            .get(`http://a.4cdn.org/${onlyBoard}/catalog.json`)
            .then((res) => {

    

                //console.log(res.data); //here, res.data is an array of objects with two parmaeters, one of them (threads) being an array itself.
                let numberOfPages = res.data.length;
                let randomPagePicker = Math.floor(Math.random()*(numberOfPages+1));
                // console.log(numberOfPages);
                // console.log(randomPagePicker);
                // console.log("SEPERATOR=====================================")
                let randomPageDecision = res.data[randomPagePicker];//randomPageDecision is an object with two parametes, "page: and "threads", the latter being an array of objects.
                // console.log(randomPageDecision);
                let threadAccess = randomPageDecision.threads; //given previous structural info, it should be clear that threadAccess is the value of the "threads" parameter, it is an array of objects.
                // console.log(threadAccess);
                let randomThreadPicker = Math.floor(Math.random()*(threadAccess.length + 1));
                // console.log(randomThreadPicker);
                let randomThreadDecision = threadAccess[randomThreadPicker]; //was randomPagePicker, no idea why
                // console.log(randomThreadDecision);
                let returnArray =  [randomThreadDecision,  onlyBoard]; //next response will be randomThreadDecision and onlyBoard (need to destructure in order to make next URL programmable)

                return returnArray;








             

            }).then((res) => {
                //     1) get threadendpoint using random thread
                //     2) print it to console
                let [randomThreadDecision, onlyBoard] = res;
                // console.log(randomThreadDecision);
                // console.log(onlyBoard);



                axios
                    .get(`http://a.4cdn.org/${onlyBoard}/thread/${randomThreadDecision.no}.json`)
                    .then((res) => {
                        // console.log("working")
                        // console.log(onlyBoard)
                        // console.log(res.data)// here, res.data is an object with 1 parameter, "posts", which holds am array of obejcts.
                        let numberOfPosts = res.data.posts.length;
                        let randomPostNumber =  Math.floor(Math.random()*(numberOfPosts + 1));
                        // console.log(randomPostNumber);
                        let aRandomPost = res.data.posts[randomPostNumber];
                        // console.log(aRandomPost);
                        return aRandomPost;                  
                    })
                    .catch((err) => console.log(err, "innermost level"));
            })
            .catch((err) => console.log(err, "middle level"));
    })
    .catch((err) => console.log(err, "outermost level"));


// let [aRandomPost, onlyBoards] = KeptValues;

// console.log(aRandomPost);
// console.log(onlyBoards);









//some code to deliver the base html/css/js page.
app.use(express.static("pages"));
//deliver initial 4chan bundle
//then only get new 4chan bundle upon button click from frontend

app.listen(PORT, () => {
    console.log(`server is listening on ${HOST}:${PORT}`)
});
