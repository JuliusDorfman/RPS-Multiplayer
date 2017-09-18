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
        }
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
                .attr("value", i)
                .attr("active", true)
                .appendTo($("#player-one"))
        }
        for (i = 0; i < game.playerTwo.imageChoices.length; i++) {
            $('<img>')
                .attr("src", game.playerTwo.imageChoices[i])
                .attr("value", i)
                .attr("active", true)
                .appendTo($("#player-two"))
        }
    };

    function compareValue() {};

    function scoreUpdate() {};


    $("#player-one").on("click", "img", function(event) {
        event.preventDefault();
        rps = $(this).attr("value")
        if ($(this).attr("active", true) == true) {
            if (rps == "0") {
                database.ref().update({
                    userOneChoice: rps
                })
            }
            if (rps == "1") {
                database.ref().update({
                    userOneChoice: rps
                })
            }
            if (rps == "2") {
                database.ref().update({
                    userOneChoice: rps
                })
            }
        }
        $(this).attr("active", false);
    });


    $("#player-two").on("click", "img", function(event) {
        event.preventDefault();
        rps = $(this).attr("value")
        if ($(this).attr("active", true) == true) {
            if (rps == "0") {
                database.ref().update({
                    userTwoChoice: rps
                })
            }
            if (rps == "1") {
                database.ref().update({
                    userTwoChoice: rps
                })
            }
            if (rps == "2") {
                database.ref().update({
                    userTwoChoice: rps
                })
            }
        }
        $(this).attr("active", false);
    })
});

// ### Instructions

// * Create a game that suits this user story:

//   * Only two users can play at the same time.

//   * Both players pick either `rock`, `paper` or `scissors`. After the players make their selection, the game will tell them whether a tie occurred or if one player defeated the other.

//   * The game will track each player's wins and losses.

//   * Throw some chat functionality in there! No online multiplayer game is complete without having to endure endless taunts and insults from your jerk opponent.

//   * Styling and theme are completely up to you. Get Creative!

//   * Deploy your assignment to Github Pages.