function open_help()
{
    const help_window = document.getElementById("help_popup");
    help_window.style.display = "block";  
}

function close_help()
{
    const help_window = document.getElementById("help_popup");
    help_window.style.display = "none";
}

function open_stats()
{
    const help_window = document.getElementById("stats_popup");
    help_window.style.display = "block";  
}

function close_stats()
{
    const help_window = document.getElementById("stats_popup");
    help_window.style.display = "none";
}


var goal_word = "CRANE";
var turn_number = 0;

function init_game()
{
    goal_word = "TIGHT";
    turn_number = 0;
    var possible_words = ["SEVEN", "WORLD", "ABOUT", "AGAIN", "HEART", "PIZZA", "BRINE", "WATER", "HAPPY", "SIXTY", 'BOARD', 'MONTH', 'ANGEL', 'DEATH', 'GREEN', 'MUSIC', 'FIFTY', 'THREE', 'PARTY', 'PIANO', 'KELLY', 'MOUTH', 'WOMAN', 'SUGAR', 'AMBER', 'DREAM', 'APPLE', 'LAUGH', 'TIGER', 'FAITH', 'EARTH', 'RIVER', 'MONEY', 'PEACE', 'FORTY', 'WORDS', 'SMILE','ABATE', 'HOUSE', "ALONE", "WATCH", "LEMON", "SOUTH", "ERICA", "ANIME", "AFTER", "SANTA", "WOMEN", "ADMIN", "JESUS", "CHINA" ];
    goal_word = possible_words[Math.floor(Math.random() * possible_words.length)];
}


function guess_word()
{
    if(turn_number == 0)
    {
        init_game();
    }
    var guess = document.getElementById('Guess');
    if (guess.value.length != 5)   {alert("MUST BE 5 LETTERS")}
    else
    {
        turn_number++;
        add_word(guess.value.toUpperCase(), turn_number);

    }
    guess.innerHTML = "";
}

function add_word(guess, turn_num)
{
    const used = document.getElementById("used_letters");
    const letters = [];

    if(turn_num == 1)
    {
        
        const letter1 = document.getElementById("L11");
        const letter2 = document.getElementById("L12");
        const letter3 = document.getElementById("L13");
        const letter4 = document.getElementById("L14");
        const letter5 = document.getElementById("L15");
        letters.push(letter1, letter2, letter3, letter4, letter5);
    }
    if(turn_num == 2)
    {
        const letter1 = document.getElementById("L21");
        const letter2 = document.getElementById("L22");
        const letter3 = document.getElementById("L23");
        const letter4 = document.getElementById("L24");
        const letter5 = document.getElementById("L25");
        letters.push(letter1, letter2, letter3, letter4, letter5);

    }
    if(turn_num == 3)
    {
        const letter1 = document.getElementById("L31");
        const letter2 = document.getElementById("L32");
        const letter3 = document.getElementById("L33");
        const letter4 = document.getElementById("L34");
        const letter5 = document.getElementById("L35");
        letters.push(letter1, letter2, letter3, letter4, letter5);

    }
    if(turn_num == 4)
    {
        const letter1 = document.getElementById("L41");
        const letter2 = document.getElementById("L42");
        const letter3 = document.getElementById("L43");
        const letter4 = document.getElementById("L44");
        const letter5 = document.getElementById("L45");
        letters.push(letter1, letter2, letter3, letter4, letter5);

    }
    if(turn_num == 5)
    {
        const letter1 = document.getElementById("L51");
        const letter2 = document.getElementById("L52");
        const letter3 = document.getElementById("L53");
        const letter4 = document.getElementById("L54");
        const letter5 = document.getElementById("L55");
        letters.push(letter1, letter2, letter3, letter4, letter5);

    }
    if(turn_num == 6)
    {
        const letter1 = document.getElementById("L61");
        const letter2 = document.getElementById("L62");
        const letter3 = document.getElementById("L63");
        const letter4 = document.getElementById("L64");
        const letter5 = document.getElementById("L65");
        letters.push(letter1, letter2, letter3, letter4, letter5);

    }
    



    for (let i = 0; i < 5; i++) 
    {

        letters[i].innerHTML += guess[i];
        
        letters[i].style.backgroundColor = "#3a3a3c";
        if(guess[i] == goal_word[0] || guess[i] == goal_word[1] || guess[i] == goal_word[2] || guess[i] == goal_word[3] || guess[i] == goal_word[4])
        {letters[i].style.backgroundColor = "#b59f3b";}
        if(guess[i] == goal_word[i])
        {letters[i].style.backgroundColor = "#538d4e";}

        var letter_is_used = false;
        for(let x = 0; x < used.innerHTML.length; x++)
        {
            if(guess[i] == used.innerHTML[x]) {letter_is_used = true;}
        }
        if(!letter_is_used) {used.innerHTML += guess[i];}
    }
    
    if(guess == goal_word) {alert("WIN!!!");}
    if(turn_number == 6) {alert("LOSE!!!, word was: " +  goal_word);}


}

function check_word()
{

    


    var letters = document.getElementsByClassName("letter")
    word = "";
    for (let i = 0; i < letters.length; i++) {
        word += letters[i].innerText.toUpperCase();

      } 

    if(word == "CRANE") {alert('WIN');}
      
}

function reset()
{


    window.location.reload();
}