let computerNum = 1;
let resultArea = document.getElementById("result-area");
let chanceArea = document.getElementById("chance-area");
let userInput = document.getElementById("user-input");
let playBtn = document.getElementById("play-btn");
let restBtn = document.getElementById("rest-btn");
let chances = 5; // 기회 5번
let history = []; // 입력한 숫자를 확인하기 위해 배열을 저장할 변수 history 생성
let gameOver = false;

pickRandomNum(); // 랜덤 숫자 호출

// 버튼 클릭 이벤트
playBtn.addEventListener("click",play);
restBtn.addEventListener("click",restart);

// input 선택 시 입력되어있던 값 지워줌
userInput.addEventListener("foces",function(){userInput.value=""}) 

function pickRandomNum(){ // 랜덤 숫자를 1부터 100까지 숫자 사이로 지정
  computerNum = Math.floor(Math.random()*100)+1;
}

function play(){ 
  let userNum = userInput.value; // input 값을 가져와서 userNum 변수에 저장
  resultArea.style.color = "black";
  
  if(userNum < 1 || userNum > 100){
    // 입력한 숫자가 1~100 사이의 숫자가 아니라면 알려주고, 기회는 차감하지 않음
    resultArea.style.color = "#dc2c2c";
    resultArea.textContent = "1부터 100까지의 숫자만 입력해주세요.";
    userNum = "";
    return;
  }
  if(history.includes(userNum)){
    // 입력한 숫자가 이미 입력했던 숫자일 경우 알려주고, 기회는 차감하지 않음
    resultArea.style.color = "#dc2c2c";
    resultArea.textContent = "입력한 숫자입니다. 다시 입력해주세요.";
    userNum = "";
    return;
  }
  chances--; // 결과 확인 시 기회 차감
  chanceArea.textContent = `남은 기회는 ${chances}번 입니다.`; // 남은 기회 표시

  // 입력한 숫자와 랜덤 숫자를 비교해 up, down 알려주고, 정답일 경우 정답 표시
  if(userNum < computerNum){
    resultArea.textContent = "Up";
  }else if(userNum > computerNum){
    resultArea.textContent = "Down";
  }else if(userNum == computerNum){
    resultArea.textContent = "정답입니다:)";
    chanceArea.textContent = "";
    gameOver = true // 정답을 맞추면 게임 끝
  }
  history.push(userNum); // 입력한 숫자를 history 배열에 추가함

  if(chances < 1){ // 기회를 다 쓰면 게임 끝
    gameOver = true;
    resultArea.textContent = "ㅠㅠ";
    chanceArea.textContent = `다시 도전하세요`
  }
  if(gameOver == true){ // 게임이 끝나면 버튼 비활성화
    playBtn.disabled = true;
  }
}

function restart(){
  // 모든 표시 내용과 기회를 초기화
  resultArea.textContent = "정답은?";
  chanceArea.textContent = "남은 기회";
  userInput.value = "";
  chances = 5;
  pickRandomNum(); // 새로운 번호 생성
  playBtn.disabled = false; // play 버튼 활성화
}