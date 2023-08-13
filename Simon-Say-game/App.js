let gameseq=[];
let userSeq=[];
let buttons = ["yellow", "red", "purple", "green"];
let start = false;
let level = 0;
let h2 = document.querySelector("h2");

document.addEventListener("keypress" , function(event)
{
    if(start==false)
    {
        console.log("game started");
        start=true;
        levelUp();
    }
});
// levelup when right button is pressed
function levelUp()
{
    level++;
    h2.innerText= `Level ${level}`;
    // generate randon button
    let randColor = buttons[Math.floor(Math.random()*4)];
    let randbtn = document.querySelector(`.${randColor}`);
    //console.log(`clicked ${randColor}`);
    gameseq.push(randColor);
    console.log(gameseq);
    // now flash the whole sequence with a new random one
    let idx = 0;
    let id = setInterval(function()
    {   let color = gameseq[idx++];
        let btn = document.querySelector(`.${color}`);
        gameFlashbtn(btn);
        if(idx==gameseq.length)clearInterval(id);
    },600);
    
}
// flash property when system presses button
function gameFlashbtn(ele)
{
   ele.classList.add("flash");
   setTimeout(function()
   {
    ele.classList.remove("flash");
   },500);
}
// flash property when user presses buttonn
function userFlashBtn(ele)
{
   ele.classList.add("user");
   setTimeout(function()
   {
    ele.classList.remove("user");
   },300);
}
// define interface when user presses button
function btnPress()
{
    let btn = this;
    
    let userColor = btn.classList[btn.classList.length-1];
    userSeq.push(userColor);
    console.log(userSeq);
    userFlashBtn(btn);
    checkAns();

}

// check if the button pressed is correct
function checkAns()
{
    if(userSeq[userSeq.length-1]==gameseq[userSeq.length-1] && gameseq.length==userSeq.length)
    {// right sequence then levelup and reset userSeq
       setTimeout(function()
       { console.log("right");
        levelUp();
        userSeq=[];
       },1000);   
     
    }
    else if(userSeq[userSeq.length-1]!=gameseq[userSeq.length-1]){
        console.log("game over");
        gameOver();
    }
}
// game over function
function gameOver()
{
   let ele =  document.querySelector("body");
   ele.classList.add("gameOver");
   gameseq=[];
   userSeq=[];
   start=false;
   h2.innerText=`your Score = ${level} press any key to reset`;
   level=0;
    setTimeout(function()
    {
     ele.classList.remove("gameOver");
    },1000);

}
// add event listener to all buttons
let allbtn = document.querySelectorAll(".btn");
for(btn of allbtn)
{
    btn.addEventListener("click",btnPress);
}