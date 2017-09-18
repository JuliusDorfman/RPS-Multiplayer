$(document).ready(function() {
    var timer;
    var database = firebase.database();
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

    // chatbox will push to firebase
    // chatbox will save to session storage
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

        // var pOneChoice = database.ref("userOneChoice")
        // var pTwoChoice = database.ref("userTwoChoice")
        // pOneChoice.once("value")
        //     .then(function(snapshot) {
        //         var key = snapshot.key; // "ada"
        //         var childKey = snapshot.child("userOneChoice").key; // "last"
        //         console.log('', pOneChoice);
        //     });

        // var rootRef = firebase.database().ref();
        // rootRef.once("value")
        //     .then(function(snapshot) {
        //         var key = snapshot.key; // null
        //         var childKey = snapshot.child("users/ada").key; // "ada"
        //     });
    }

  
    function scoreUpdate() {

    };


    $("#player-one").on("click", "img", function(event) {
        event.preventDefault();
        rps = $(this).attr("value")
        // var choiceMade = $(this).attr("active", false)
        // if ($(this).attr("active", true) == true) {
        if (rps == "1p0") {
            database.ref().update({
                userOneChoice: rps
            })
        }
        if (rps == "1p1") {
            database.ref().update({
                userOneChoice: rps
            })
        }
        if (rps == "1p2") {
            database.ref().update({
                userOneChoice: rps
            })
        }
        // }
        console.log('', rps);
    });


    $("#player-two").on("click", "img", function(event) {
        event.preventDefault();
        rps = $(this).attr("value")
        // choiceMade = $(this).attr("active", false)
        console.log('', $(this).attr("active"))
        // if ($(this).attr("active", true) == true) {
        if (rps == "2p0") {
            database.ref().update({
                userTwoChoice: rps
            })
        }
        if (rps == "2p1") {
            database.ref().update({
                userTwoChoice: rps
            })
        }
        if (rps == "2p2") {
            database.ref().update({
                userTwoChoice: rps
            })
        }
        // }
        console.log('', rps);
    });


    $("#submit-chat").on("click", function() {
        event.preventDefault();
        var playerInput = $("#chat-input").val().trim()
        $("<div>")
            .append(playerInput + "\xa0\xa0\xa0\xa0\xa0\xa0\xa0")
            .append(formatTimeOfDay($.now()))
            .prependTo("#chat-box")
        playerInput = $("#chat-input").val('')
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

});




// ### Instructions

// * Create a game that suits this user story:

//   * Only two users can play at the same time.

//   * Both players pick either `rock`, `paper` or `scissors`. After the players make their selection, the game will tell them whether a tie occurred or if one player defeated the other.

//   * The game will track each player's wins and losses.

//   * Throw some chat functionality in there! No online multiplayer game is complete without having to endure endless taunts and insults from your jerk opponent.

//   * Styling and theme are completely up to you. Get Creative!

//   * Deploy your assignment to Github Pages.