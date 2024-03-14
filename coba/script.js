// script.js
const player = document.getElementById("player");
const enemies = document.querySelectorAll(".enemy");
const gameOverScreen = document.getElementById("game-over");
let isJumping = false;
let isMovingRight = false;
let isMovingLeft = false;
let gameInterval;
let enemyInterval;
let playerBottom = 20; // Initial vertical position
let enemyRight = 0; // posisi awal musuh
const moveEnemyInterval = setInterval(moveEnemy, 20);

function startGame() {
    gameInterval = setInterval(moveEnemy, 20);
    enemyInterval = setInterval(checkCollision, 20);
}

document.addEventListener("keydown", event => {
    if (event.code === "ArrowUp" && !isJumping) {
        jump();
    }
    if (event.code === "ArrowRight") {
        isMovingRight = true;
    }
    if (event.code === "ArrowLeft") {
        isMovingLeft = true;
    }
});

document.addEventListener("keyup", event => {
    if (event.code === "ArrowRight") {
        isMovingRight = false;
    }
    if (event.code === "ArrowLeft") {
        isMovingLeft = false;
    }
});

function jump() {
    if (!isJumping) {
        isJumping = true;
        let jumpInterval = setInterval(() => {
            playerBottom += 20;
            player.style.bottom = playerBottom + "px";
            if (playerBottom >= 190) { // Maximum jump height
                clearInterval(jumpInterval);
                let fallInterval = setInterval(() => {
                    playerBottom -= 5;
                    player.style.bottom = playerBottom + "px";
                    if (playerBottom <= 20) { // Back to ground level
                        clearInterval(fallInterval);
                        isJumping = false;
                    }
                }, 20);
            }
        }, 20);
        const jumpSound = document.getElementById("jump-sound");
        jumpSound.currentTime = 0; // Set the audio time to start
        jumpSound.play();
    }
}

function movePlayer() {
    if (isMovingRight) {
        let playerLeft = parseInt(window.getComputedStyle(player).getPropertyValue("left"));
        player.style.left = (playerLeft + 7) + "px";
    }
    if (isMovingLeft) {
        let playerLeft = parseInt(window.getComputedStyle(player).getPropertyValue("left"));
        
        if (playerLeft > 0) {
            player.style.left = (playerLeft - 7) + "px";
        }
    }
}

function moveEnemy() {
    enemy.forEach(enemy => {
        let enemyPosition = parseInt(window.getComputedStyle(enemy).getPropertyValue("right"));
        let enemyBottom = parseInt(window.getComputedStyle(enemy).getPropertyValue("bottom"));
        enemy.style.right = (enemyPosition - 3) + "px";
        enemy.style.bottom = (enemyBottom + 1) + "px";

        if (enemyPosition <= 0) {
            enemy.style.right = "calc(100% - 50px)";
            enemy.style.bottom = (Math.random() * (window.innerHeight - 50)) + "px";
        }
    });
}

function changeEnemySkin() {
    document.body.classList.add("background-2");
}

function checkCollision() {
    enemies.forEach(enemy => {
        const playerRect = player.getBoundingClientRect();
        const enemyRect = enemy.getBoundingClientRect();

        if (
            playerRect.bottom >= enemyRect.top &&
            playerRect.top <= enemyRect.bottom &&
            playerRect.right >= enemyRect.left &&
            playerRect.left <= enemyRect.right
        ) {
            
            resetGame();
        }
    });
}

function resetGame() {
    window.location.href = window.location.href.split("?")[0]; // Memuat ulang halaman untuk memulai kembali permainan
}
document.addEventListener("DOMContentLoaded", function() {
    setTimeout(changeEnemySkin, 1); // Change enemy skin after 5 seconds
            setInterval(checkCollision, 20);
        });

let enemyMoveInterval = setInterval(moveEnemy, 20);
setInterval(movePlayer, 20);


const gameContainer = document.getElementById("game-container");

// Mendapatkan lebar layar
const screenWidth = window.innerWidth;

// Mendapatkan lebar latar belakang tambahan (background2.png)
const backgroundWidth = 2000; // Sesuaikan dengan lebar background2.png

// Fungsi untuk mendeteksi perpindahan pemain
function detectPlayerMovement() {
    // Mendapatkan posisi horizontal pemain
    const playerLeft = parseInt(window.getComputedStyle(player).getPropertyValue("left"));
    
    // Jika pemain telah melewati batas kanan layar
    if (playerLeft >= screenWidth) {
        // Mengganti latar belakang dengan latar belakang tambahan
        gameContainer.style.backgroundImage = "url('background2.png')"; // Ganti dengan nama latar belakang tambahan yang Anda gunakan
    }
}


// script.js

// Fungsi untuk mengatur ulang posisi pemain
function resetPlayerPosition() {
    // Mengatur ulang posisi pemain ke sebelah kiri layar
    player.style.left = "10px"; // Ubah posisi sesuai kebutuhan
}

// Fungsi untuk mendeteksi perpindahan pemain
function detectPlayerMovement() {
    // Mendapatkan posisi horizontal pemain
    const playerLeft = parseInt(window.getComputedStyle(player).getPropertyValue("left"));
    
    // Jika pemain telah melewati batas kanan layar
    if (playerLeft >= screenWidth) {
        // Mengganti latar belakang dengan latar belakang tambahan
        gameContainer.style.backgroundImage = "url('background2.png')"; // Ganti dengan nama latar belakang tambahan yang Anda gunakan
        
        // Mengatur ulang posisi pemain setelah latar belakang berubah
        resetPlayerPosition();
    }
}

// Memanggil fungsi untuk mendeteksi perpindahan pemain secara terus-menerus
setInterval(detectPlayerMovement, 20);


