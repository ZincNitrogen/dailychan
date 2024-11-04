import express, { json } from "express";
import axios from "axios";

const app = express();
const PORT = 8000;
const HOST = "localhost";
let date = new Date().toUTCString();

let combinedJson;
let onlyBoard = null;
let aRandomPost;

let randomThreadDecision;


function get4chanBundle() {
   


    //console.log("function is running");
    console.log("nonworksafe function is running");

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
            console.log(aRandomPost);
           
            return aRandomPost;


        })
        .then(()=> {
            combinedJson = {
                Board: onlyBoard,
                Post: aRandomPost,
                OP: randomThreadDecision,
            };
        })

        .catch((err) => {

             if ((typeof(aRandomPost) === "undefined") || (typeof(onlyBoard) === 'undefined')) {
                console.log("Error. Retrying... " + err );
                get4chanBundle();             
            }

            
        })
        .finally(() => {

    
            console.log("=========FINAL=========")
            console.log(combinedJson);
          

            
        });

        
        return combinedJson;
        

}


function get4chanBundleWorksafe() {
   


    console.log("worksafe function is running");
  

    axios
        .get("http://a.4cdn.org/boards.json", {

            headers: {"Content-Type": "application/json"},

        })
        .then((res) => {
            let numberOfBoards = res.data.boards.length;
            let isWorksafe = null;
            console.log("checkpoint one");

            do {

                let boardDecision = null;
                let randomBoardElement = null;
                onlyBoard = null;
            
                let isNSFW = null; //isNSFW is the human readable version of isWorksafe. Better for debugging purposes.


                randomBoardElement = Math.floor(Math.random() * (numberOfBoards));
                boardDecision = (res.data.boards[randomBoardElement]); 
                console.log(boardDecision.board);

                isWorksafe = +boardDecision.ws_board; //gets value of ws_board property (0 is nsfw, 1 is sfw.)



                if (isWorksafe == 0) {
                    isNSFW = "YES!"; 
    
                    console.log(`is NSFW?: ${isNSFW}`);

                    console.log("checkpoint two - nsfw");
                    continue;
                } else if (isWorksafe == 1) {
                    isNSFW = "NO!";
                    console.log(`is NSFW?: ${isNSFW}`);
                    console.log("checkpoint two -non-nsfw");
                    onlyBoard = boardDecision.board;
                    
                    
                }
                

            } while (isWorksafe == 0);
          

            console.log(onlyBoard);
            console.log("checkpoint three");

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

        //>>>>>>>>>>>>>>>>.WEBM FILTER FOR DEVS>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
            // let webmFilterErr = new Error("not webm...Retrying"); //webm filter

            // if (aRandomPost.ext != ".webm"){//webm filter
            //     throw(webmFilterErr);

    
            // }

        //>>>>>>>>>>>>>>WEBM FILTER FOR DEVS END>>>>>>>>>>>>>>>>>>>>>>>>>>>    
           
            return aRandomPost;

  
        })
        .then((res) => {
            console.log(aRandomPost, typeof(aRandomPost)); 
            console.log(`final board: ${onlyBoard}`);
            console.log(onlyBoard);

            combinedJson = {
                Board: onlyBoard,
                Post: aRandomPost,
                OP: randomThreadDecision,
            };

        })
        .catch((err) => {

            if ((typeof(aRandomPost) === "undefined") || (typeof(onlyBoard) === 'undefined')) {
                console.log("Error. Retrying... " + err );
                get4chanBundleWorksafe();             
            }

         //>>>>>>>>>>>>>>>>.WEBM FILTER FOR DEVS>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

            // if (aRandomPost.ext != ".webm"){//webm filter
            //     console.log("not webm...Retrying");
                
            //     get4chanBundleWorksafe();

        
    
            // }
           
        //>>>>>>>>>>>>>>WEBM FILTER FOR DEVS END>>>>>>>>>>>>>>>>>>>>>>>>>>>    

            
        })
        .finally(() => {

            console.log("=========FINAL=========");
            console.log(combinedJson);

        });

        
    return combinedJson;
        

}


function getThumbnail(imageresponse) {


    axios
    .get(`http://i.4cdn.org/${onlyBoard}/${aRandomPost.tim}s.jpg`, {
            headers: {"Content-Type": "application/octet-stream"}, 
            responseType: "arraybuffer",
          
        })
        .then((res) => {

            let thumbnail = res.data;
            console.log(res.status);
            console.log(typeof(thumbnail));
            console.log(thumbnail);
            imageresponse.send(thumbnail);
     
        })
        .catch((err) =>{
            console.log("No thumbnail");
            // imageresponse.send(err.response.data);
            imageresponse.send(null);

        });
    


}


function getFullUserMedia(mediaresponse) {
    axios
    .get(`http://i.4cdn.org/${onlyBoard}/${aRandomPost.tim}${aRandomPost.ext}`, {
            headers: {"Content-Type": "application/octet-stream"}, 
            responseType: "arraybuffer",
        
        })
        .then((res) => {

            let media = res.data;
            console.log("=====FULL MEDIA INFO-- START --=========================")
            console.log(typeof(media));
            console.log(media);
            console.log("=====FULL MEDIA INFO-- END --=========================")

            mediaresponse.send(media);
 
        })
        .catch((err) =>{
            console.log("No media");
            // mediaresponse.send(err.response.data);
            mediaresponse.send(null);
     








        });
        


}






app.get("/ServerSideRequest", (req, nsfwres) => {
    nsfwres.json(JSON.stringify(get4chanBundle()));
})

app.get("/WorksafeServerSideRequest", (req, saferes) => {
    saferes.json(JSON.stringify(get4chanBundleWorksafe()));
})

app.get("/ServeThumbnail", (imagerequest, imageresponse) =>{
   getThumbnail(imageresponse);
})


app.get("/ServeFullMedia", (mediarequest, mediaresponse) => {
    getFullUserMedia(mediaresponse);
})


//console.log(get4chanBundle()); //initial data paint, nsfw allowed
console.log(get4chanBundleWorksafe()); //initial data paint, nsfw not allowed - this should be the default of the app.


app.use(express.static("pages"));//middleware



app.listen(PORT, () => {
    console.log(`server is listening on ${HOST}:${PORT}`)
});




//for 4chan post: "Hey anon, is my plebsite cool?"
//or perhaps: "Hey anon, how can I make my website cooler?"


//NSFW filter lag likely caused by either having the function excecute upon server start (line
//540) but I honestly can't figure out how to solve it. It's not really a major problem since the user experience is not hindered. 
//Going to put it on the back burner.