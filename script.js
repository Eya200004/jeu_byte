const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const spinBtn = document.getElementById("spin");
const resultDiv = document.getElementById("result");


const options = [
  "Stage Classique",
  "Projet Spécial",
  "bonne chance",
  "gagner un sticker",
  "rejouer",
  "bonne chance",
  "Accès Directe",   
  "Entretien Direct",
  "Integration social",
];


const colors = ["#0072ff", "#00c6ff", "#1e90ff", "#87cefa", "#4682b4", "#5dade2"];

let angle = 0;
let spinning = false;


function drawWheel() {
  const outsideRadius = 280;
  const textRadius = 220;
  const insideRadius = 50;
  const arc = Math.PI * 2 / options.length;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "white";
  ctx.lineWidth = 2;
  ctx.font = "bold 16px Montserrat";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  for (let i = 0; i < options.length; i++) {
    const angleSlice = angle + i * arc;
    ctx.fillStyle = colors[i % colors.length];

    // Section
    ctx.beginPath();
    ctx.arc(300, 300, outsideRadius, angleSlice, angleSlice + arc, false);
    ctx.arc(300, 300, insideRadius, angleSlice + arc, angleSlice, true);
    ctx.fill();
    ctx.save();

    // Texte
    ctx.fillStyle = "white";
    ctx.translate(
      300 + Math.cos(angleSlice + arc / 2) * textRadius,
      300 + Math.sin(angleSlice + arc / 2) * textRadius
    );
    ctx.rotate(angleSlice + arc / 2 + Math.PI / 2);

    wrapText(ctx, options[i], 0, 0, 150, 18);
    ctx.restore();
  }

  // Flèche
  ctx.fillStyle = "white";
  ctx.beginPath();
  ctx.moveTo(300 - 20, 300 - (outsideRadius + 10));
  ctx.lineTo(300 + 20, 300 - (outsideRadius + 10));
  ctx.lineTo(300, 300 - (outsideRadius - 30));
  ctx.closePath();
  ctx.fill();
}

// ✅ Texte multi-lignes
function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(" ");
  let line = "";
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n] + " ";
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
}


function spinWheel() {
  if (spinning) return;
  spinning = true;

  const totalRotation = Math.random() * 360 + 720; 
  const duration = 2500; 
  const start = performance.now();
  const initialAngle = angle;

  function animate(now) {
    const elapsed = now - start;
    const t = Math.min(elapsed / duration, 1);
    const eased = easeOut(t);
    angle = initialAngle + (totalRotation * Math.PI / 180) * eased;
    drawWheel();

    if (t < 1) {
      requestAnimationFrame(animate);
    } else {
      spinning = false;
      const arc = 360 / options.length;
      const degrees = angle * 180 / Math.PI + 90;
      const index = Math.floor((360 - (degrees % 360)) / arc);
      resultDiv.textContent = "🎉 Résultat : " + options[index] + " 🎉";
      resultDiv.classList.add("show");
    }
  }

  requestAnimationFrame(animate);
}


function easeOut(t) {
  return 1 - Math.pow(1 - t, 3);
}

drawWheel();
spinBtn.addEventListener("click", spinWheel);


