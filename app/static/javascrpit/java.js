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

    var played = 0
    var wins = 0
    var CStreak = 0
    var MStreak = 0

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
    var possible_words = ["CRANE"];//["SEVEN", "WORLD", "ABOUT", "AGAIN", "HEART", "PIZZA", "BRINE", "WATER", "HAPPY", "SIXTY", 'BOARD', 'MONTH', 'ANGEL', 'DEATH', 'GREEN', 'MUSIC', 'FIFTY', 'THREE', 'PARTY', 'PIANO', 'KELLY', 'MOUTH', 'WOMAN', 'SUGAR', 'AMBER', 'DREAM', 'APPLE', 'LAUGH', 'TIGER', 'FAITH', 'EARTH', 'RIVER', 'MONEY', 'PEACE', 'FORTY', 'WORDS', 'SMILE','ABATE', 'HOUSE', "ALONE", "WATCH", "LEMON", "SOUTH", "ERICA", "ANIME", "AFTER", "SANTA", "WOMEN", "ADMIN", "JESUS", "CHINA" ];
    goal_word = possible_words[Math.floor(Math.random() * possible_words.length)];
}


function guess_word(guess)
{

    if(turn_number == 0)
    {
        init_game();
    }



    if (guess.length != 5)   {alert("MUST BE 5 LETTERS")}
    else
    {

        turn_number++;
        add_word(guess.toUpperCase(), turn_number);

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

        letters[i].innerHTML = guess[i];
        
        letters[i].style.backgroundColor = "#3a3a3c";

        

        for (let n = 0; n < 5; n++)
        {
            if(goal_word[i] == guess[n])
                {
                    letters[i].style.backgroundColor = "#b59f3b";
                    //document.getElementById(goal_word[i]).backgroundColor = "#b59f3b";
                    break;
                }
        }
        
        if(guess[i] == goal_word[i])
        {
            letters[i].style.backgroundColor = "#538d4e";
        }


        var letter_is_used = false;
        for(let x = 0; x < used.innerHTML.length; x++)
        {
            if(guess[i] == used.innerHTML[x]) {letter_is_used = true;}
        }
        if(!letter_is_used) {used.innerHTML += guess[i];}
    }
    
    if(turn_number == 6) {lose_screen(goal_word);}
    if(guess == goal_word) {win_screen();}



}

function win_screen()
{
    document.getElementById("next_game").style.display = "block";
    document.getElementById("game_inputs").style.display = "none";
    document.getElementById("win/loss").innerHTML = "WINNER!!!!!"
    $.get( "/index/<WIN>" );


}


function lose_screen(goal_word)
{
    document.getElementById("next_game").style.display = "block";
    document.getElementById("game_inputs").style.display = "none";
    document.getElementById("win/loss").innerHTML = "LOSER!!! </br> WORD WAS: " + goal_word;
    $.get( "/index/<LOSS>" );
    
}


function reset()
{
    window.location.reload();
}


function place_letter(letter)
{
    let letter_blocks = document.getElementsByClassName("letter");
    let current_block_num = 0;

    for (let i = 0; i < letter_blocks.length; i++) 
    {
        if(letter_blocks[i].innerHTML == "")
        {
            current_block_num = i;
            break;
        }
        current_block_num = 30;
    }

 
    if (letter == 'Enter')
    {
        switch (current_block_num)
        {
            case 5:
                if(letter_blocks[4].style.backgroundColor == '')
                {
                    var guess = letter_blocks[0].innerHTML + letter_blocks[1].innerHTML + letter_blocks[2].innerHTML + letter_blocks[3].innerHTML + letter_blocks[4].innerHTML;
                    guess_word(guess);
                }
                break;
            case 10:
                if(letter_blocks[9].style.backgroundColor == '')
                {
                    var guess = letter_blocks[5].innerHTML + letter_blocks[6].innerHTML + letter_blocks[7].innerHTML + letter_blocks[8].innerHTML + letter_blocks[9].innerHTML;
                    guess_word(guess);            }
                break;
            case 15:
                if(letter_blocks[14].style.backgroundColor == '')
                {
                    var guess = letter_blocks[10].innerHTML + letter_blocks[11].innerHTML + letter_blocks[12].innerHTML + letter_blocks[13].innerHTML + letter_blocks[14].innerHTML;
                    guess_word(guess);            }
                break;
            case 20:
                if(letter_blocks[19].style.backgroundColor == '')
                {
                    var guess = letter_blocks[15].innerHTML + letter_blocks[16].innerHTML + letter_blocks[17].innerHTML + letter_blocks[18].innerHTML + letter_blocks[19].innerHTML;
                    guess_word(guess);            }
                break;
            case 25:
                if(letter_blocks[24].style.backgroundColor == '')
                {
                    var guess = letter_blocks[20].innerHTML + letter_blocks[21].innerHTML + letter_blocks[22].innerHTML + letter_blocks[23].innerHTML + letter_blocks[24].innerHTML;
                    guess_word(guess);            }
                break;
            case 30:
                var guess = letter_blocks[25].innerHTML + letter_blocks[26].innerHTML + letter_blocks[27].innerHTML + letter_blocks[28].innerHTML + letter_blocks[29].innerHTML;
                guess_word(guess);
                break;
        }
    }
    else
    {


        if(letter == ',')
        {
            if(letter_blocks[current_block_num-1].style.backgroundColor == '')
            {
                letter_blocks[current_block_num-1].innerHTML = '';
            }
        }
        else
        {
            letter_blocks[current_block_num].innerHTML = letter;
            switch (current_block_num)
            {
                case 5:
                    if(letter_blocks[4].style.backgroundColor == '')
                    {
                        letter_blocks[current_block_num].innerHTML = '';
                    }
                    break;
                case 10:
                    if(letter_blocks[9].style.backgroundColor == '')
                    {
                        letter_blocks[current_block_num].innerHTML = '';
                    }
                    break;
                case 15:
                    if(letter_blocks[14].style.backgroundColor == '')
                    {
                        letter_blocks[current_block_num].innerHTML = '';
                    }
                    break;
                case 20:
                    if(letter_blocks[19].style.backgroundColor == '')
                    {
                        letter_blocks[current_block_num].innerHTML = '';
                    }
                break;
                case 25:
                    if(letter_blocks[24].style.backgroundColor == '')
                    {
                        letter_blocks[current_block_num].innerHTML = '';
                    }
                break;
        
        
            }
        }
    }
}



document.addEventListener('keypress', logKey);

function logKey(e) {
    let key = e.key;
    let valid_press = ['q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l','z','x','c','v','b','n','m','Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','Z','X','C','V','B','N','M', 'Enter', ','];

    for (let i = 0; i < valid_press.length; i++)
    {
        
        if(key == valid_press[i])
        {

            place_letter(key);
        }
    }
    
}