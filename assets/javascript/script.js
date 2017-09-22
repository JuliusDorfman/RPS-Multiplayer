$(document).ready(function() {

    sessionStorage.clear()



    var config = {
        apiKey: "AIzaSyDAuqf7v4i9eJWdF3Q38nlcon6JA5EDCps",
        authDomain: "rps-multiplayer-f0ba4.firebaseapp.com",
        databaseURL: "https://rps-multiplayer-f0ba4.firebaseio.com",
        projectId: "rps-multiplayer-f0ba4",
        storageBucket: "rps-multiplayer-f0ba4.appspot.com",
        messagingSenderId: "911210346026"
    };
    firebase.initializeApp(config);
    var database = firebase.database();

    database.ref("/chat").update({
        history: ""
    })

    var timer;
    var game = {
        rounds: 3,

        playerOne: {
            wins: "",
            losses: "",
            imageChoices: ["./assets/images/chris-rock.jpg", "./assets/images/paper-stacks.jpg", "./assets/images/edward-scissorhands.jpg"]
        },

        playerTwo: {
            wins: "",
            losses: "",
            imageChoices: ["./assets/images/the-rock.jpg", "./assets/images/toilet-paper.jpg", "./assets/images/pizza-slice.jpg"]
        },

        battleScreen: function(timer) {
            console.log('', "battleScreen");
            resetTimer();
            generatePlayers();
        },

        restScreen: function(timer) {
            console.log('', "restScreen");
            resetTimer(timer)
            timeLeft = 3
            updateTime();
            timer = setInterval(function() {
                timeLeft--;
                if (timeLeft < 0) {
                    return roundTimer(timer);
                }
                updateTime();
            }, 1000)
            $('#player-one').empty();
            $('#player-two').empty();
            compareValue();

        }
    };

    var playerChat = {
        chatBox: []
    };


    $(".start").on("click", function() {
        event.preventDefault();
        console.log('', "Start Round");
        $(".start").hide();
        resetTimer(timer);
        roundTimer();
    });

    $("#choices-selection").on("click", "img", function() {
        event.preventDefault();
        var userChoice = $(this).attr('value')
    });

    function roundTimer(timer) {
        resetTimer(timer)
        game.battleScreen();
        timeLeft = 5;
        updateTime();
        timer = setInterval(function() {
            timeLeft--;
            if (timeLeft < 0) {
                return game.restScreen(timer);
            }
            updateTime();
        }, 1000)
    };

    function updateTime() {
        $(".timer").html(timeLeft);
    };

    function resetTimer(timer) {
        clearInterval(timer);
    };

    function generatePlayers() {
        for (i = 0; i < game.playerOne.imageChoices.length; i++) {
            var images = $('<img>')
                .attr("src", game.playerOne.imageChoices[i])
                .attr("value", "1p" + i)
                .attr("active", true)
                .appendTo($("#player-one"))
        }

        for (i = 0; i < game.playerTwo.imageChoices.length; i++) {
            $('<img>')
                .attr("src", game.playerTwo.imageChoices[i])
                .attr("value", "2p" + i)
                .attr("active", true)
                .appendTo($("#player-two"))
        }
    };

    function compareValue() {
        var p1Choice = firebase.database().ref("userOneChoice");
        p1Choice.once("value", function(snapshot) {
            var p1Choice = snapshot.val();
            console.log('PlayerOneChoice', p1Choice);
        })

        var p2Choice = firebase.database().ref("userTwoChoice");
        p2Choice.once("value", function(snapshot) {
            var p2Choice = snapshot.val();
            console.log('PlayerTwoChoice', p2Choice);
        })

    }

    function scoreUpdate() {

    };

    // Player Choices

    $("#player-one").on("click", "img", function(event) {
        event.preventDefault();
        rps = $(this).attr("value")
        // var choiceMade = $(this).attr("active", false)
        // if ($(this).attr("active", true) == true) {
        if (rps == "1p0") {
            database.ref().update({
                userOneChoice: rps
            })
            $("#player-one img:nth-child(2)").hide();
            $("#player-one img:nth-child(3)").hide();
        }
        if (rps == "1p1") {
            database.ref().update({
                userOneChoice: rps
            })
            $("#player-one img:nth-child(1)").hide();
            $("#player-one img:nth-child(3)").hide();
        }
        if (rps == "1p2") {
            database.ref().update({
                userOneChoice: rps
            })
            $("#player-one img:nth-child(1)").hide();
            $("#player-one img:nth-child(2)").hide();
        }
        // }
        // console.log('', rps);
    });


    $("#player-two").on("click", "img", function(event) {
        event.preventDefault();
        rps = $(this).attr("value")
        // choiceMade = $(this).attr("active", false)
        // if ($(this).attr("active", true) == true) {
        if (rps == "2p0") {
            database.ref().update({
                userTwoChoice: rps
            })
            $("#player-two img:nth-child(2)").hide();
            $("#player-two img:nth-child(3)").hide();

        }
        if (rps == "2p1") {
            database.ref().update({
                userTwoChoice: rps
            })
            $("#player-two img:nth-child(1)").hide();
            $("#player-two img:nth-child(3)").hide();
        }
        if (rps == "2p2") {
            database.ref().update({
                userTwoChoice: rps
            })
            $("#player-two img:nth-child(1)").hide();
            $("#player-two img:nth-child(2)").hide();

        }
        // }
        // console.log('', rps);
    });


    // ChatFunction


    $("#submit-chat").on("click", function() {
        event.preventDefault();
        var playerInput = $("#chat-input").val().trim()
        if (playerInput !== "") {
            $("<div>")
                .append(formatTimeOfDay($.now()))
                .append("\xa0\xa0\xa0\xa0\xa0\xa0\xa0" + playerInput + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0")
                .prependTo("#chat-box")
            database.ref("/chat").push({
                history: playerInput
            })
            playerInput = $("#chat-input").val("")
        }
    });


    function formatTimeOfDay(millisSinceEpoch) {
        var secondsSinceEpoch = (millisSinceEpoch / 1000) | 0;
        var secondsInDay = ((secondsSinceEpoch % 86400) + 86400) % 86400;
        var seconds = secondsInDay % 60;
        var minutes = ((secondsInDay / 60) | 0) % 60;
        var hours = (secondsInDay / 3600) | 0;
        return hours + (minutes < 10 ? ":0" : ":") +
            minutes + (seconds < 10 ? ":0" : ":") +
            seconds;
    };


    $(".p1-submit").on("click", function() {
        event.preventDefault();
        var p1Name = $(".p1-login").val().trim();
        $(".p1-name").html(p1Name);
        $(".p1-login").hide();
        $(".p1-submit").hide();
        p1Storage(p1Name);
    });

    $(".p2-submit").on("click", function() {
        event.preventDefault();
        var p2Name = $(".p2-login").val().trim();
        $(".p2-name").html(p2Name);
        $(".p2-login").hide();
        $(".p2-submit").hide();
        p2Storage(p2Name);
    });

    // Dealing With SessionStorage
    function p1Storage(p1Name) {
        sessionStorage.setItem("user1", p1Name)
        database.ref().update({
            user1: p1Name
        })
    };

    function p2Storage(p2Name) {
        sessionStorage.setItem("user2", p2Name)
        database.ref().update({
            user2: p2Name
        })
    };


});





// ### Instructions

// * Create a game that suits this user story:

//   * Only two users can play at the same time.

//   * Both players pick either `rock`, `paper` or `scissors`. After the players make their selection, the game will tell them whether a tie occurred or if one player defeated the other.

//   * The game will track each player's wins and losses.

//   * Throw some chat functionality in there! No online multiplayer game is complete without having to endure endless taunts and insults from your jerk opponent.

//   * Styling and theme are completely up to you. Get Creative!

//   * Deploy your assignment to Github Pages.


// function player (name, wins, losses, choice){ 
//   this.name = name;
//   this.wins = wins;
//   this.losses = losses;
//   this.choice = choice;
//   this.fbKey = "";

//   this.changeName = function(name){
//     this.name = name;
//   }
//   this.win = function(){
//     this.wins = this.wins++;
//   }
//   this.lose = function(){
//     this.losses = this.losses++;
//   }
//   this.changeChoice = function(choice){
//     this.choice = choice;
//     console.log("the choice is "+choice);
//   }
//   this.getName = function(){
//     return this.name;
//   }
// }

// var game = {
//   player1:"",
//   player2:"",

//   setplayer1: function(name){
//      this.player1 = new player(name, 0, 0, ""); 
//       var ref = firebase.database().ref("/players");   

//       var p1Key = ref.push({
//         name: this.player1.name,
//         wins: this.player1.wins,
//         losses:this.player1.losses,
//         choice: this.player1.choice
//       }).key;

//       this.player1.fbKey = p1Key;
//      return this.player1;
//   },

//   setplayer2: function(name){
//      this.player2 = new player(name, 0, 0, ""); 
//      var ref = firebase.database().ref("/players");

//      var p2Key = ref.push({
//         name: this.player2.name,
//         wins: this.player2.wins,
//         losses:this.player2.losses,
//         choice: this.player2.choice
//       }).key;

//       this.player2.fbKey = p2Key;
//      return this.player2;
//   },
//   sendChatMessage: function(player){
//     // var newRef = myDataRef.push(...);
//     // var newID = newRef.name();
//       var ref = firebase.database().ref("/chat");
//       var messageField = $('#chat-message').val().trim();
//       var playerName = player.name;

//       var chatKey = ref.push({
//         name: playerName,
//         message: messageField,
//         dateAdded: firebase.database.ServerValue.TIMESTAMP
//       }).key;

//       //get the message just pushed to firebase and pass to addChatMessage
//       ref.on("child-added", function(snapshot) {
//         var message = snapshot.val();
//         addChatMessage(message.name, message.message)
//       });
//   }  
// }

// function addChatMessage(name, message){
//   $("#chatbox").append("<p>" + name + ": " + message +" </p>");
// }


// $(document).ready(function(){
//   //THE ON CLICK FUNCTIONS GO HERE 
//   $("#addPlayer").on("click", function(event){
//     event.preventDefault();


//     var name = $("#player-name").val().trim();
//     var p1  = game.setplayer1(name);
//     //lets push this guy to the db


//     $("#p1").empty();
//     $("#p1").prepend(p1.name);
//     //add the rest of the tuff like the rock paper scisciors. 
//     var rockDiv = $("<h2>" + "Rock" + "<h2>");
//     var paperDiv = $("<h2>" + "Paper" + "<h2>");
//     var scissorDiv = $("<h2>" + "Scissor" + "<h2>");
//     // not sure how to set the on click to not run during in line code. 
//     $("#p1").append(rockDiv).on("click", p1.changeChoice("rock"));
//     $("#p1").append(paperDiv).on("click", p1.changeChoice("paper"));
//     $("#p1").append(scissorDiv).on("click", p1.changeChoice("scissor"));
//   });

//   $("#addMessage").on("click", function(){
//     game.sendChatMessage(game.player1);
//   });
// });



// <!DOCTYPE html>
// <html lang="en">
//   <head>
//     <meta charset="utf-8">
//     <title>Rock Paper Scissors</title>

//     <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">  
//     <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
//     <link rel="stylesheet" type="text/css" href="./assets/css/styles.css">

//   </head>

//   <body >
//   <header>
//     <h1>Rock Paper Scissors</h1>
//   </header>
//   <div class="container">

//     <div class= "row" id= "playerDisplay">
//       <form class = "col-sm-12">
//         <label for="player-name-input">Enter your name</label>
//         <input type="text" id="player-name" placeholder="Name" name=""></input>
//         <input id="addPlayer" type="button" value="Start" >
//       </form>
//     </div>

//     <div class="row">
//       <div id="p1" class="col-md-3 col-sm-3 col-xs-3 box">
//         <h2>Waiting for player 1</h2>
//       </div>

//       <div id="p0" class="col-md-3 col-sm-3 col-xs-3 box"></div>

//       <div id="p2" class="col-md-3 col-sm-3 col-xs-3 box">
//         <h2>Waiting for player 2</h2>
//       </div>
//     </div>

//     <div class="row chat">
//         <!-- <div class="col-md-9 col-sm-9"> -->
//             <div id="chatbox" class="col-md-9 col-sm-9"></div>
//         </div class="col-md-9 col-sm-9">
//             <input type="text" id="chat-message" placeholder="type message here" name=""></input>
//           <input id= "addMessage" type= "button" value= "Send"></input>
//         </div>  
//     </div>
//   </div>

//     <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
//        <script src="https://www.gstatic.com/firebasejs/4.3.1/firebase.js"></script>
//      <script src="./assets/js/app.js"></script>
//   </body>
// </html>