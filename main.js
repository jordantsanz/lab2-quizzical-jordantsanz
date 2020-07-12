// Jordan Sanz
// JavaScript for Lab 2 - Quiz Website
// 7/6/2020

// makes sure that document is scrolled to the top
$(document).ready(function(){
    checkScrollMid("#bk1");
    checkScrollMid("#bk2");
    checkScrollMid("#bk3");
});

/* taken from webflow.com */
$(window).on('beforeunload', function() {
    $('body').hide();
    $(window).scrollTop(0);
  });

// grabs the text for the page from a JSON file
$.getJSON("data.json", function(data){

    // loops through all of the questions

    for (let question=0; question < data.questions.length; question++){

        $('#title-' + (question + 1)).append(data.questions[question].header);
        $('#subtitle-' + (question + 1)).append(data.questions[question].subtitle);

        // loops through every choice for the question
        for (let choice=0; choice < data.questions[question].choices.length; choice++){
            $('#question-' + (question + 1) + '-choice-' + (choice + 1) + "-cover").append(data.questions[question].choices[choice].text);
            $('#question-' + (question + 1) + '-choice-' + (choice + 1) + '-radio').val(data.questions[question].choices[choice].value);
        }
    }

    // loops through all of the answers and adds the text to the HTML
    for (let a=0; a < data.answers.length; a++){
        $('#answer-' + (a + 1) + '-title').append(data.answers[a].title);
        $('#answer-' + (a + 1) + '-description').append(data.answers[a].description);
        $('#answer-' + (a + 1) + '-image').append(data.answers[a].image);
    }

    // reading in text at the top
    $('#main-title').append(data.mainTitle);
    $('#main-subtitle').append(data.mainSubtitle);

    // background text read-in
    $('#bk1').append(data.background[0].background1);
    $('#bk2').append(data.background[0].background2);
    $('#bk3').append(data.background[0].background3);

    // secret section read-in
    $(".hero-title").append(data.heroTitle);
    $(".hero-background-info").append(data.heroBackground);
    $(".hero-instructions").append(data.heroInstructions);

    // for every hero question
    for (let b=0; b<data.heroQuestions.length; b++){

        // title
        $("#hero-title-" + (b + 1)).append(data.heroQuestions[b].header);
        $("#hero-subtitle-" + (b + 1)).append(data.heroQuestions[b].subtitle);
        for (let c=0; c<data.heroQuestions[b].choices.length; c++){
            $("#hero-question-" + (b+1) + "-choice-" + (c+1) + "-cover").append(data.heroQuestions[b].choices[c].text);
            $("#hero-question-" + (b+1) + "-choice-" + (c+1) + "-radio").val(data.heroQuestions[b].choices[c].value);
        }
    }
});

$(window).on("load", function(){
    $("#main-title").delay(200).css("opacity", "1");

    // phone-size
})

function otherModal(){
    $(".close").fadeIn(200);
    $("#play-again-container").fadeIn(200);
}

// scroll checking adapted from stackoverflow, I adapted to make it depend on center of viewing screen rather than top
function checkScrollMid(item){
    $(document).scroll(function(){
        let y = $(this).scrollTop() + ($(window).height() / 1.5);
        let height = $(item).offset().top;
        if(y > height){
            $(item).css("opacity", "1");
        }
    })
}

function checkScrollQuestion(question, atATime){
    // checks scroll to see if reached question title
    $(document).scroll(function(){
        let y = $(this).scrollTop() + ($(window).height()/3.5);
        let height = $(question).offset().top;
        let a = atATime; // number of choices to reveal at once

        // if reached title: 
        if (y > height){

            // changes title to visible
            $(question).find(".question-title-holder").css("opacity", "1");

            let time = 500; // time counter in betewen delays
            let i = 0; // number of choices that have appeared

            // makes each choice visible with a delay
            $(question).find(".choice").each(function(){
            
                let choice = this;
                if ($(choice).css("opacity") == 0){
                // delay in between; makes visible
                setTimeout(function(){
                    $(choice).css("opacity", "1");
                }, time);

                i += 1; // increment choices that have appeared

            // one at a time, then delay increases in between each
            if (a == 1){
                time += 200;
            }

            else{
                if(i == 3){
                time += 400;
                }}
            
        }})
        }
    })
}

// makes questions all fade-in
checkScrollQuestion("#question-1-div", 1);
checkScrollQuestion("#question-2-div", 3);
checkScrollQuestion("#question-3-div", 1);
checkScrollQuestion("#question-4-div", 3);
checkScrollQuestion("#question-5-div", 1);
checkScrollQuestion("#question-6-div", 3);


// got autoscroll function from stackoverflow
function autoScroll(nextID){

    // checks to make sure not last question
    if(nextID != null){
    document.querySelector("#" + nextID).scrollIntoView(
        {
        behavior: "smooth"
    }); }
}

// answer calculator
$('#submit').on('click', function(e)
{

    var choices = $("input[type='radio']:checked").map(function(i, radio){
        return $(radio).val();
    })

    // not all the questions have been answered
    if (choices.length != 6){
        $('.pop-up').css("display", "flex");
        $('.popup-content').fadeIn(800, "linear");
        
        // popup for something is wrong!
        $('.something-wrong-popup').delay(200).fadeIn(200).delay(1500).fadeOut(200, function(){
            $('.pop-up').delay(200).fadeOut(200);
        });
        
    }

    // all the questions have been answered
    else{
        // to fix spacing on answer popup
        $('.popup-content').css("justify-content", "unset");
        hero = 0;
        nerdySidekick = 0;
        funnySidekick = 0;
        villain = 0;
        overConfident = 0;
        antiHero = 0;
        sage = 0;
        inDistress = 0;

        

        challenge = choices[0];
        journey = choices[1];
        troll = choices[2];
        fork = choices[3];
        destination = choices[4];
        boss = choices[5];

        switch(challenge){

            case "scared":
                nerdySidekick += 1/2;
                inDistress += 1/4;
                break;

            case "easy":
                villain += 1/4;
                overConfident += 1/2;
                break;

            case "up":
                funnySidekick += 1;
                break;

            case "nothing":
                villain += 1/2;
                overConfident += 1/4;
                break;

            case "carefully":
                sage += 1/2;
                break;

            case "failed":
                inDistress += 1/2;
                nerdySidekick += 1/4;
                break;
        }

        switch(journey){
            case "sword":
                overConfident += 1/2;
                villain += 1/2;
                break;

            case "friends":
                nerdySidekick += 1;
                funnySidekick += 1/4;
                break;

            case "sidekick":
                nerdySidekick += 1/4;
                nerdySidekick += 1/4;
                overConfident += 1/4;
                break;

            case "have":
                funnySidekick += 1;
                inDistress += 1/2;

            case "brain":
                sage += 1;
                villain += 1/4;
                break;

            case "prepare":
                villain += 1/2;
                inDistress += 1;
                break;
        }
        
        switch(troll){
            case "alone":
                nerdySidekick += 1;
                inDistress += 1/2;
                sage += 1/2;
                break;

            case "spiders":
                nerdySidekick += 1/2;
                funnySidekick += 1/4;
                break;

            case "tiktok":
                funnySidekick += 1;
                break;

            case "inferior":
                villain += 1;
                overConfident += 1;
                break;

            case "nothing":
                sage += 1;
                nerdySidekick += 1/2;
                break;

            case "embarrassed":
                villain += 1/2;
                overConfident += 1.5;
                break;
        }

        switch(fork){
            case "care":
                funnySidekick += 1;
                inDistress += 1/4;
                break;

            case "left":
                villain += 2;
                break;

            case "right":
                overConfident += 2;
                sage += 1;
                break;

            case "map":
                sage += 1.5;
                nerdySidekick += 1;
                break;

            case "someone":
                nerdySidekick += 1.5;
                inDistress += 2;
                break;

            case "back":
                nerdySidekick += 1;
                funnySidekick += 1/2;
                inDistress += 1;
                break;
        }

        switch(destination){
            case "love":
                overConfident += 2;
                inDistress += 1/2;
                break;

            case "know":
                sage += 2;
                nerdySidekick += 1;
                funnySidekick += 1/2;
                break;

            case "care":
                funnySidekick += 2;
                break;

            case "nowhere":
                villain += 1/2;
                sage += 1;
                break;

            case "tristate":
                villain += 2;
                break;

            case "home":
                nerdySidekick += 1/2;
                inDistress += 2;
                break;
        }

        switch(boss){
            case "yes":
                overConfident += 2;
                break;

            case "iam":
                villain += 2;
                break;

            case "excuse":
                nerdySidekick += 1/4;
                sage += 1;
                funnySidekick += 1/4;
                inDistress += 1/4;
                break;

            case "quest":
                inDistress += 2;
                nerdySidekick += 1;
                break;

            case "really":
                sage += 3;
                break;

            case "woohoo":
                inDistress += 1/2;
                funnySidekick += 1;
                break;
        }

        scores = [villain, funnySidekick, nerdySidekick, overConfident, sage, inDistress, hero];
        answers= ["villain", "funnySidekick", "nerdySidekick", "overConfident", "sage", "inDistress", "hero"];

        max = 0;
        answer = "none";

      

       for (let i = 0; i < scores.length; i++){
           if (scores[i] > max){
               max = scores[i];
               answer = answers[i];
           }
       }

       
       $('.pop-up').css("display", "flex");
       

       let num = 0;
       
        

        // presents correct answer text
        switch(answer){
            case "villain":
                num = "1";
                break;

            case "funnySidekick":
                num = "2";
                break;

            case "nerdySidekick":
                num = "3";
                break;

            case "overConfident":
                num = "4";
                break;

            case "sage":
                num = "5";
                break;

            case "inDistress":
                num = "6";
                break;

            case "hero":
                num = "7";
                break;
        }

        $('.popup-content').fadeIn(800, "linear");
        $('.you-are').delay(200).fadeIn(600);
        $("#answer-" + num + "-container").fadeIn(1500, otherModal);


        
    }

    


});

// pressing the try again button
$("#play-again-button").on("click", function(e)

    {

        if($("#answer-7-container").css("display") != "none"){
            secretReset();
        }
        else{
        // scrolls back to top; adapted from w3schools
    $('html, body').animate({scrollTop: $('body').offset().top});

    // rehides all of modal
    $('#play-again-container').fadeOut(200);
    $(".answer-container").hide();
    $(".pop-up").hide();
    $(".popup-content").css("justify-content", "center");
    $(".choice").each(function(){


        // changes all of the input choices back to normal states
        $(this).css("background-color", "#475c6c");
        $(this).css("opacity", "0");
        $(this).find(".choice-image-cover").css("background-color", "rgba(218, 165, 32, 0.932)").css("color", "#475c6c").css("font-weight", "normal");
        $(this).find("input").prop('checked', false); // unchecking function prop taken from stack overflow
    })
    
    // resets all scores
    for (value in scores){
        value = 0;
    }
    choices = 0;

}});

// input clicking event handler

$('input[type="radio"]').on('click', function(e)
{
    // deselects other choices
    $questionChoice = $(this).parent().parent().parent();
    $($questionChoice).find(".choice").each(function(){
        $(this).css("background-color", "gray");
        $(this).css("opacity", "40%");
        $(this).find(".choice-image-cover").css("background-color", "black").css("color", "#475c6c").css("font-weight", "normal");
    
    })

    $choice = $(this).parent().parent();
    
    // makes the choice highlighted
    $($choice).css("background-color", "red");
    $($choice).find(".choice-image-cover").css("background-color", "white").css("color", "red").css("font-weight", "bold");
    $($choice).css("opacity", "100%");


    $nextSection = $($questionChoice).parent().parent().next();

    nextID = $($nextSection).children(".question-div").attr('id');
    autoScroll(nextID);


})


// the HERO EXPERIENCE! 

let secretClick = 0;

$("#secret").on("click", function(){
    console.log("clicked");
    console.log(secretClick);
    
    // first button press
    if (secretClick == 0){
    secretClick += 1;
    $(".button-text").text("Oh, hey! Do you reeeeeeally want to click on me?");
    }

    // second button press
    else if (secretClick == 1){
        secretClick += 1;
        $(".button-text").text("Be careful..............");
        $("#question-6-choices").find(".choice").each(function(){
            $(this).css("animation", "shake .5s").css("animation-iteration-count", "infinite"); });
            $("#question-6-choices").find(".choice-image-cover").each(function(){
                $(this).css("width", "100%")});
            $("#submit").css("animation", "shake .5s").css("animation-iteration-count", "infinite");
        }

    // third button press! FIGHT THE BOSS!!!
    else if (secretClick == 2){
        secretClick += 1;
        $(".button-text").text("YOU'VE DONE IT NOW! MUAHAHA!")
        $('html, body').animate({scrollTop: $('body').offset().top});

        $(".regular-experience").not("#question-div-6").hide();
        $(".hero-experience-background").fadeIn(200);
        $(".hero-experience-background-overlay").fadeIn(400);
        $(".hero-experience-background-overlay").css("opacity", "1");

        checkScrollQuestion("#hero-question-1-div", 1);
        checkScrollQuestion("#hero-question-2-div", 1);
        checkScrollQuestion("#hero-question-3-div", 1);
    
    
        $('#secret-submit').on('click', function(e){
            var secretchoices = $("input[type='radio'].hero:checked").map(function(i, radio){
                return $(radio).val();
            }).toArray();

            if(secretchoices.length != 3){
                $('.pop-up').css("display", "flex");
                $('.popup-content').fadeIn(800, "linear");
        
                // popup for something is wrong!
                $('.something-wrong-popup').delay(200).fadeIn(200).delay(1500).fadeOut(200, function(){
                $('.pop-up').delay(200).fadeOut(200);
                })}

                // counts the number of correct answers
                else{
                    let corrects = 0;
                    for(i=0; i < secretchoices.length; i++){
                        if (secretchoices[i] == "correct"){
                            corrects += 1;
                        }
                    }
                    let num = 0;

                    // hero!
                    if (corrects == 3){
                        num = 7;
                    }

                    // not hero :(
                    else{
                        num = 8;
                    }

                    // popup
                    $('.popup-content').css("justify-content", "unset");
                    $('.pop-up').css("display", "flex");
                    $('.popup-content').fadeIn(800, "linear");
                    $('.you-are').delay(200).fadeIn(600);
                    $("#answer-" + num + "-container").fadeIn(1500, otherModal); 
                }
        })
    }})


function secretReset(){
    $('#play-again-container').fadeOut(200);
    $(".answer-container").hide();
    $(".pop-up").hide();
    $(".popup-content").css("justify-content", "center");

    location.reload(true);
    $('html, body').animate({scrollTop: $('body').offset().top});


}





