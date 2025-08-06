const message = "बुद्धू जी जन्मदीन की बहुत बहुत बधाई! केक खाइये और मज़े कीजिये 🎂🎈\n– From, Nikhil";
const headerText = "🎈 Happy Birthday, Akanksha(BUDDHU)! 🎉";

let headerIndex = 0;
let messageIndex = 0;
let slideshowInterval;

window.addEventListener("DOMContentLoaded", () => {
  typeHeader();
});

function typeHeader() {
  const typedText = document.getElementById("typedText");
  if (headerIndex < headerText.length) {
    typedText.innerHTML += headerText.charAt(headerIndex);
    headerIndex++;
    setTimeout(typeHeader, 100);
  } else {
    showScratchBox();
  }
}

function typeMessage() {
  const msg = document.getElementById("message");
  if (messageIndex < message.length) {
    msg.innerHTML += message.charAt(messageIndex);
    messageIndex++;
    setTimeout(typeMessage, 40);
  }
}

function showScratchBox() {
  const scratchContainer = document.getElementById("scratchContainer");
  scratchContainer.classList.remove("hidden");
  document.getElementById("birthdaySong").play();
  initScratch();
  typeMessage();
}

function initScratch() {
  const canvas = document.getElementById("scratchCanvas");
  const ctx = canvas.getContext("2d");
  const clickMeBtn = document.getElementById("clickMeBtn");

  const width = canvas.width = canvas.offsetWidth;
  const height = canvas.height = canvas.offsetHeight;

  const img = new Image();
  img.src = "gift.jpeg"; // put gift.jpeg in same folder
  img.onload = () => {
    ctx.drawImage(img, 0, 0, width, height);
    ctx.globalCompositeOperation = "destination-out";

    let isDrawing = false;
    let totalScratched = 0;
    let revealed = false;

    const scratch = (x, y) => {
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2);
      ctx.fill();

      totalScratched++;
      if (!revealed && totalScratched > 200) {
        revealed = true;
        canvas.style.pointerEvents = "none";
        clickMeBtn.style.pointerEvents = "auto";
        clickMeBtn.style.opacity = "1";
      }
    };

    const getPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
      const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
      return { x, y };
    };

    canvas.addEventListener("mousedown", () => isDrawing = true);
    canvas.addEventListener("mouseup", () => isDrawing = false);
    canvas.addEventListener("mousemove", (e) => {
      if (!isDrawing) return;
      const { x, y } = getPos(e);
      scratch(x, y);
    });

    canvas.addEventListener("touchstart", (e) => {
  isDrawing = true;
  e.preventDefault();
}, { passive: false });

canvas.addEventListener("touchmove", (e) => {
  const { x, y } = getPos(e);
  scratch(x, y);
  e.preventDefault();
}, { passive: false });


    canvas.addEventListener("touchstart", () => isDrawing = true);
    canvas.addEventListener("touchend", () => isDrawing = false);
    canvas.addEventListener("touchmove", (e) => {
      const { x, y } = getPos(e);
      scratch(x, y);
    });
  };
}

// 🎁 CLICK ME button action
document.getElementById("clickMeBtn").addEventListener("click", () => {
  document.getElementById("happyBirthdayAudio").play();
  const scratchContainer = document.getElementById("scratchContainer");
  const message = document.getElementById("message");

  // Fade out scratch/message
  scratchContainer.classList.add("fade-out");
  message.classList.add("fade-out");

  // After fade completes
  setTimeout(() => {
    scratchContainer.style.display = "none";
    message.style.display = "none";

    // Show wand with animation
    const wand = document.getElementById("magicWand");
    wand.classList.remove("hidden");
    wand.classList.add("show");

    // After wand animation completes (~1s), show popup and confetti
    setTimeout(() => {
      wand.classList.remove("show");
      wand.classList.add("hidden");

      const slideshowImg = document.getElementById("slideshowImg");
      currentImg = 0;
      slideshowImg.src = imageList[currentImg];

      document.getElementById("popupWindow").classList.remove("hidden");
      startSlideshow();
      launchConfetti();
    }, 1200); // wait for wand to swing before showing popup

  }, 1000); // wait for fade-out (1s)
});


// ❌ CLOSE popup
document.getElementById("closePopupBtn").addEventListener("click", () => {
  document.getElementById("popupWindow").classList.add("hidden");
  clearInterval(slideshowInterval);
});

// 🎞️ Image Slideshow
const imageList = [
  "i7.png",
  "i5.png",
  "i8.png",
  "i3.png",
  "i1.png"
];

let currentImg = 0;
function startSlideshow() {
  const slideshowImg = document.getElementById("slideshowImg");

  if (slideshowInterval) clearInterval(slideshowInterval);

  slideshowInterval = setInterval(() => {
    currentImg = (currentImg + 1) % imageList.length;
    slideshowImg.src = imageList[currentImg];
  }, 2500);
}

// 🎊 Emoji Confetti
const confettiEmojis = ["🎈", "🌸", "⭐", "☁️", "🍭","🎂","🍰","🍫","🥂","🍹"];
function launchConfetti() {
  for (let i = 0; i < 80; i++) {
    const emoji = document.createElement("div");
    emoji.className = "confetti";
    emoji.style.left = Math.random() * 100 + "vw";
    emoji.style.animationDelay = Math.random() * 5 + "s";
    emoji.innerText = confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)];
    document.body.appendChild(emoji);
    setTimeout(() => emoji.remove(), 100000000);
  }
}
