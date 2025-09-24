const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const spinBtn = document.getElementById("spin");
const resultDiv = document.getElementById("result");

const options = [
  "Accès direct au club🚀",
  "Merci de postuler",
  "Rejoue 🔄",
  "Petit cadeau 🎁",
  "Interaction sociale 👥",
  "Gagner un sticker🤍"
];

let startAngle = 0;
let arc = Math.PI * 2 / options.length;
let spinTimeout = null;
let spinAngle = 0;
let spinTime = 0;
let spinTimeTotal = 0;


function drawRouletteWheel() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "white";
  ctx.lineWidth = 4;
  ctx.font = "bold 22px Poppins";

  for (let i = 0; i < options.length; i++) {
    const angle = startAngle + i * arc;
    ctx.fillStyle = i % 2 === 0 ? "#9b5de5" : "#00bbf9";
    ctx.beginPath();
    ctx.arc(300, 300, 300, angle, angle + arc, false);
    ctx.arc(300, 300, 0, angle + arc, angle, true);
    ctx.fill();
    ctx.save();

    ctx.fillStyle = "white";
    ctx.translate(300 + Math.cos(angle + arc / 2) * 180,
                  300 + Math.sin(angle + arc / 2) * 180);
    ctx.rotate(angle + arc / 2 + Math.PI / 2);
    ctx.fillText(options[i], -ctx.measureText(options[i]).width / 2, 0);
    ctx.restore();
  }

  
  ctx.fillStyle = "#eaeff2ff";
  ctx.beginPath();
  ctx.moveTo(300 - 30, 5);   
  ctx.lineTo(300 + 30, 5);
  ctx.lineTo(300, 45);
  ctx.closePath();
  ctx.fill();
}


function rotateWheel() {
  spinTime += 30;
  if (spinTime >= spinTimeTotal) {
    stopRotateWheel();
    return;
  }
  const spinAngleIncrement = spinAngle * Math.sin(spinTime / spinTimeTotal * Math.PI);
  startAngle += (spinAngleIncrement * Math.PI / 180);
  drawRouletteWheel();
  spinTimeout = setTimeout(rotateWheel, 30);
}


function stopRotateWheel() {
  clearTimeout(spinTimeout);
  const degrees = startAngle * 180 / Math.PI + 90;
  const arcd = arc * 180 / Math.PI;
  const index = Math.floor((360 - (degrees % 360)) / arcd);
  resultDiv.textContent = " 🎉 Résultat : " + options[index] + " 🎉";

  
  resultDiv.style.transform = "scale(1.3)";
  setTimeout(() => { resultDiv.style.transform = "scale(1)"; }, 600);
}


spinBtn.addEventListener("click", () => {
  spinAngle = Math.random() * 10 + 10;
  spinTime = 0;
  spinTimeTotal = Math.random() * 3000 + 4000;
  rotateWheel();
});


drawRouletteWheel();

const bgMusic = document.getElementById("bgMusic");
bgMusic.volume = 0.2;
