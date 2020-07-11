// Jordan Sanz
// JavaScript for Lab 2 - Quiz Website
// 7/6/2020

// grabs the text for the page from a JSON file
$.getJSON("data.json", function(data){

    // loops through all of the questions

    for (let question=0; question < data.questions.length; question++){

        $('#title-' + (question + 1)).append(data.questions[question].header);
        $('#subtitle-' + (question + 1)).append(data.questions[question].subtitle);

        // loops through every choice for the question
        for (let choice=0; choice < data.questions[question].choices.length; choice++){
            $('#question-' + (question + 1) + '-choice-' + (choice + 1) + "-cover").append(data.questions[question].choices[choice].text);
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
})
