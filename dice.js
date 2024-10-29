const images = document.querySelectorAll(".dice_img");
const coin_balance = document.getElementById("balance-span").textContent;
const bet_value = document.getElementById("colFormLabelLg").value;
const selecting_bet = document.querySelectorAll('.select_bet_type');
function audio_check()
{
    document.querySelectorAll('audio').forEach((element) => {
    
        element.pause();
        element.currentTime = 0;
        return;
    });
}
audio_check();
// Add event listener for the initial bet button
selecting_bet[0].addEventListener("click", function() {
    const coin_balance = document.getElementById("balance-span").innerText;
    const bet_value = document.getElementById("colFormLabelLg").value;
    audio_check();
    document.querySelectorAll('.result-para').forEach(element=>element.style.display="none");

    if (isNaN(bet_value) || bet_value === "") {
        alert("Kindly enter a bet amount to continue!!!");
        return;
    }
    if (Number(coin_balance) < Number(bet_value)) {
        alert("The bet amount exceeds your current balance!!");
        return;
    }

    this.style.display = "none";
    document.querySelectorAll('.bet_type').forEach(element => element.style.display = "inline");
});

document.querySelectorAll('.continue').forEach(element => element.addEventListener("click", function(){
    if (this.classList.contains("play-again")){
        audio_check();
        document.querySelectorAll('.result-para').forEach(element=>element.style.display="none");
        document.querySelectorAll('.select_bet_type').forEach(element => element.style.display="block");
        document.querySelectorAll('.continue').forEach(element =>element.style.display="none");
        document.querySelectorAll('.dice_img').forEach(element => element.setAttribute("src","die_t_shirt.jpeg"));
        document.getElementById("colFormLabelLg").value =  '';
    }
    else
    {
        history.back();
    }
}));

// Add event listener for each bet type
document.querySelectorAll('.bet_type').forEach(element => element.addEventListener("click", function() {
    const randomNumber1 = Math.floor(Math.random() * 6) + 1;
    const randomImageSource1 = `dice_imgs/dice${randomNumber1}.png`;
    const randomNumber2 = Math.floor(Math.random() * 6) + 1;
    const randomImageSource2 = `dice_imgs/dice${randomNumber2}.png`;
    images[0].setAttribute("src", randomImageSource1);
    images[1].setAttribute("src", randomImageSource2);

    const bal_amt_span = document.getElementById("balance-span");
    const bet_value = Number(document.getElementById("colFormLabelLg").value);

    const totalRoll = randomNumber1 + randomNumber2;
    const winCondition1 = this.classList.contains("7_up") && totalRoll > 7;
    const winCondition2 = this.classList.contains("7_down") && totalRoll < 7;
    const winCondition3 = this.classList.contains("sev") && totalRoll === 7;
    success_audio = document.querySelectorAll('audio')[0];
    failure_audio = document.querySelectorAll('audio')[1];

    // Update balance based on win/lose conditions
    if (winCondition1 || winCondition2) {
        bal_amt_span.innerText = Number(bal_amt_span.innerText) + bet_value;
        success_audio.play();
        document.getElementById("win-para").style.display = "block";
    } else if (winCondition3) {
        bal_amt_span.innerText = Number(bal_amt_span.innerText) + 2 * bet_value;
        success_audio.play();
        document.getElementById("win-para").style.display = "block";
    } else {
        if (this.classList.contains("sev")) {
            bal_amt_span.innerText = Number(bal_amt_span.innerText) - 2 * bet_value;
        } else {
            bal_amt_span.innerText = Number(bal_amt_span.innerText) - bet_value;
        }
        failure_audio.play();
        document.getElementById("lose-para").style.display = "block";
    }

    // Check for game over
    if (Number(bal_amt_span.innerText) <= 0) {
        document.getElementById("reload-para").style.display = "block";
        reload_button = document.querySelector('.reload-game');
        reload_button.style.display="inline";
        reload_button.addEventListener("click",function(){
            location.reload();
        });
    }
    else{
        document.querySelectorAll('.continue').forEach(element=>element.style.display="inline");
    }
    document.querySelectorAll('.bet_type').forEach(element => element.style.display="none");
}));
