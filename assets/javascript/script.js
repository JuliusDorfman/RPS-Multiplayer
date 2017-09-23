$(document).ready(function() {


    // Clear session storage upon page open. Initialize and clear preexisting firebase data.
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

    function prepFirebase() {
        database.ref("/chat").remove();
        database.ref("/user1").remove();
        database.ref("/user2").remove();
        database.ref("/userOneChoice").remove();
        database.ref("/userTwoChoice").remove();
    }



    // Set variables including timer(round clock)/game(players and different game screens)
    var timer;
    var winCounterOne = 0;
    var winCounterTwo = 0;

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
            prepFirebase();
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
            getValue();
        }
    };

    // Create chat box
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

    function getValue() {
        var p1Choice = firebase.database().ref("userOneChoice");
        p1Choice.on("value", function(snapshot) {
            p1ChoiceValue = snapshot.val();
            console.log('PlayerOneChoice', p1ChoiceValue);
        })

        var p2Choice = firebase.database().ref("userTwoChoice");
        p2Choice.on("value", function(snapshot) {
            p2ChoiceValue = snapshot.val();
            console.log('PlayerTwoChoice', p2ChoiceValue);
        })
        compareValue(p1ChoiceValue, p2ChoiceValue);
    }

    function compareValue(p1ChoiceValue, p2ChoiceValue) {
        if (p1ChoiceValue == "1p0") {
            if (p2ChoiceValue == "2p0") {
                $("<div>")
                    .addClass("verdict")
                    .append("It's a Tie!")
                    .prependTo("#chat-box")
                return
            }
        }
        if (p1ChoiceValue == "1p0") {
            if (p2ChoiceValue == "2p1") {
                $("<div>")
                    .addClass("verdict")
                    .append("Player One Wins!")
                    .prependTo("#chat-box")
                var winner = "p1"
                scoreUpdate(winner, timer);
            }
        }

        if (p1ChoiceValue == "1p0") {
            if (p2ChoiceValue == "2p2") {
                $("<div>")
                    .addClass("verdict")
                    .append("Player One Wins!")
                    .prependTo("#chat-box")
                var winner = "p1"
                scoreUpdate(winner, timer);
            }
        }

        if (p1ChoiceValue == "1p1") {
            if (p2ChoiceValue == "2p0") {
                $("<div>")
                    .addClass("verdict")
                    .append("Player Two Wins!")
                    .prependTo("#chat-box")
                var winner = "p2"
                scoreUpdate(winner, timer);
            }
        }

        if (p1ChoiceValue == "1p1") {
            if (p2ChoiceValue == "2p1") {
                $("<div>")
                    .addClass("verdict")
                    .append("It's a Tie!")
                    .prependTo("#chat-box")
                return
            }
        }

        if (p1ChoiceValue == "1p1") {
            if (p2ChoiceValue == "2p2") {
                $("<div>")
                    .addClass("verdict")
                    .append("Player Two Wins!")
                    .prependTo("#chat-box")
                var winner = "p2"
                scoreUpdate(winner, timer);
            }
        }

        if (p1ChoiceValue == "1p2") {
            if (p2ChoiceValue == "2p0") {
                $("<div>")
                    .addClass("verdict")
                    .append("Player Two Wins!")
                    .prependTo("#chat-box")
                var winner = "p2"
                scoreUpdate(winner, timer);
            }
        }

        if (p1ChoiceValue == "1p2") {
            if (p2ChoiceValue == "2p1") {
                $("<div>")
                    .addClass("verdict")
                    .append("Player One Wins!")
                    .prependTo("#chat-box")
                var winner = "p1"
                scoreUpdate(winner, timer);
            }
        }

        if (p1ChoiceValue == "1p2") {
            if (p2ChoiceValue == "2p2") {
                $("<div>")
                    .addClass("verdict")
                    .append("It's a Tie!")
                    .prependTo("#chat-box")
                return
            }
        }
    }

    function scoreUpdate(winner, timer) {

        if (winner == "p1") {
            winCounterOne++;
            game.playerOne.wins = winCounterOne;
            console.log('winCounterOne', winCounterOne);
            console.log('', game.playerOne.wins);
            $(".player-one-wins").html(winCounterOne);
            if (winCounterOne == 3) {
                $(".player-one-wins").html("PLAYER ONE WINS");
                $("#chat-box").html("PLAYER ONE WINS");
                clearInterval(timer)
            }
        }

        if (winner == "p2") {
            winCounterTwo++;
            game.playerTwo.wins = winCounterTwo;
            console.log('winCounterTwo', winCounterTwo);
            console.log('', game.playerTwo.wins);
            $(".player-two-wins").html(winCounterTwo);
            if (winCounterTwo == 3) {
                $(".player-two-wins").html("PLAYER TWO WINS");
                $("#chat-box").html("PLAYER TWO WINS");
                clearInterval(timer)
            }
        }
    }



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