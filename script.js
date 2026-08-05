console.log("SCRIPT BERJALAN");
/* ======================================================
   FLAGSHIP ULTRA V4
   PART 3A
   AI SCANNER ENGINE
====================================================== */

const heroes = [
{
    name:"Iron Man",
    universe:"Marvel",
    image:"assets/marvel/ironman.jpeg",
    power:95,
    speed:82,
    intel:100,
    leader:97,
    match:97,
    desc:"Seorang jenius, miliarder, penemu, dan pemimpin yang selalu mengandalkan teknologi."
},
{
    name:"Spider-Man",
    universe:"Marvel",
    image:"assets/marvel/spiderman.jpeg",
    power:88,
    speed:95,
    intel:91,
    leader:82,
    match:96,
    desc:"Cepat, cerdas, dan selalu mengutamakan tanggung jawab."
},
{
    name:"Thor",
    universe:"Marvel",
    image:"assets/marvel/thor.jpeg",
    power:100,
    speed:84,
    intel:80,
    leader:94,
    match:98,
    desc:"Dewa petir dengan keberanian dan kekuatan luar biasa."
},
{
    name:"Doctor Strange",
    universe:"Marvel",
    image:"assets/marvel/doctorstrange.jpeg",
    power:94,
    speed:75,
    intel:99,
    leader:89,
    match:95,
    desc:"Ahli sihir yang menguasai dimensi dan waktu."
},
{
    name:"Batman",
    universe:"DC",
    image:"assets/dc/batman.jpeg",
    power:85,
    speed:84,
    intel:100,
    leader:96,
    match:96,
    desc:"Detektif terbaik dengan strategi yang hampir selalu berhasil."
},
{
    name:"Superman",
    universe:"DC",
    image:"assets/dc/superman.jpeg",
    power:100,
    speed:100,
    intel:92,
    leader:98,
    match:99,
    desc:"Simbol harapan dengan kekuatan yang luar biasa."
},
{
    name:"Flash",
    universe:"DC",
    image:"assets/dc/flash.jpeg",
    power:86,
    speed:100,
    intel:88,
    leader:82,
    match:95,
    desc:"Manusia tercepat di dunia dengan refleks luar biasa."
},
{
    name:"Green Lantern",
    universe:"DC",
    image:"assets/dc/greenlantern.jpeg",
    power:92,
    speed:87,
    intel:89,
    leader:91,
    match:94,
    desc:"Kekuatan berasal dari kemauan dan keberanian."
}
];

const aiProfile = {

"Iron Man":{
    personality:"GENIUS LEADER",
    combat:"TECH STRATEGY",
    source:"ARC TECHNOLOGY",
    role:"COMMANDER"
},

"Spider-Man":{
    personality:"RESPONSIBLE",
    combat:"AGILITY FIGHTER",
    source:"BIO MUTATION",
    role:"SUPPORT"
},

"Thor":{
    personality:"WARRIOR KING",
    combat:"DIVINE POWER",
    source:"ASGARD ENERGY",
    role:"FRONT LINE"
},

"Doctor Strange":{
    personality:"CALCULATING",
    combat:"MYSTIC CONTROL",
    source:"TIME MAGIC",
    role:"TACTICIAN"
},

"Batman":{
    personality:"TACTICAL MIND",
    combat:"MARTIAL ARTS",
    source:"HUMAN TECHNOLOGY",
    role:"STRATEGIST"
},

"Superman":{
    personality:"TRUE HERO",
    combat:"RAW POWER",
    source:"KRYPTON ENERGY",
    role:"LEADER"
},

"Flash":{
    personality:"FAST THINKER",
    combat:"SPEED ATTACK",
    source:"SPEED FORCE",
    role:"SCOUT"
},

"Green Lantern":{
    personality:"STRONG WILL",
    combat:"ENERGY CONTROL",
    source:"POWER RING",
    role:"DEFENDER"
}

};

/* ============================= */

const scanBtn = document.getElementById("scanBtn");
const clearBtn = document.getElementById("clearBtn");

const input = document.getElementById("name");

const progress = document.getElementById("loadingProgress");
const status = document.getElementById("status");
const percent = document.getElementById("statusPercent");

const heroCard = document.getElementById("heroCard");

/* =========================
   SOUND SYSTEM
========================= */

const sound = {

scanStart:new Audio(
"assets/sounds/scan-start.mp3"
),

scanning:new Audio(
"assets/sounds/scanning.mp3"
),

match:new Audio(
"assets/sounds/match.mp3"
),

download:new Audio(
"assets/sounds/download.mp3"
)

};


sound.scanning.loop=true;

/* ============================= */

clearBtn.onclick=()=>{

input.value="";
input.focus();

}

/* ============================= */

function hashName(text){

let hash=0;

for(let i=0;i<text.length;i++){

hash=((hash<<5)-hash)+text.charCodeAt(i);

hash|=0;

}

return Math.abs(hash);

}

/* ============================= */

function animateNumber(id,target){

let value=0;

const step=Math.max(1,Math.ceil(target/40));

const timer=setInterval(()=>{

value+=step;

if(value>=target){

value=target;

clearInterval(timer);

}

document.getElementById(id).innerHTML=value;

},20);

}

/* ============================= */

function showHero(hero){

const img = document.getElementById("heroImage");

img.src = hero.image;

console.log("GAMBAR:", hero.image);

document.getElementById("heroName").innerHTML=hero.name;

document.getElementById("heroUniverse").innerHTML=hero.universe;

document.getElementById("heroDesc").innerHTML=hero.desc;

const profile = aiProfile[hero.name];

document.getElementById("personality").innerHTML =
profile.personality;

document.getElementById("combat").innerHTML =
profile.combat;

document.getElementById("source").innerHTML =
profile.source;

document.getElementById("role").innerHTML =
profile.role;

document.getElementById("matchText").innerHTML=hero.match+"%";

document.getElementById("matchFill").style.width=hero.match+"%";

animateNumber("power",hero.power);
animateNumber("speed",hero.speed);
animateNumber("intel",hero.intel);
animateNumber("leader",hero.leader);

heroCard.classList.add("show");

}

/* ============================= */

scanBtn.onclick=function(){
sound.scanStart.currentTime=0;
sound.scanStart.play();

const scanner = document.querySelector(".scanner");


if(scanner){
    scanner.classList.add("scanning");
}


const nama=input.value.trim();


if(nama===""){

alert("Masukkan nama terlebih dahulu.");

if(scanner){
    scanner.classList.remove("scanning");
}

return;

}


heroCard.classList.remove("show");

progress.style.width="0%";


let value=0;


const texts=[

"BOOTING AI CORE",
"CALIBRATING QUANTUM SENSOR",
"SCANNING IDENTITY PATTERN",
"ANALYZING PERSONALITY",
"SEARCHING HERO DATABASE",
"CONNECTING MULTIVERSE",
"CALCULATING POWER LEVEL",
"FINALIZING HERO MATCH"

];


let textIndex=0;


status.innerHTML=texts[0];
sound.scanning.currentTime=0;
sound.scanning.play();


const loading=setInterval(()=>{


value++;


progress.style.width=value+"%";

percent.innerHTML=value+"%";



if(value % 12 === 0 && textIndex < texts.length-1){

textIndex++;

status.innerHTML=texts[textIndex];

}



if(value>=100){
sound.scanning.pause();

sound.match.currentTime=0;
sound.match.play();


clearInterval(loading);



if(scanner){

scanner.classList.remove("scanning");

}


status.classList.add("match");



const hero =
heroes[
hashName(nama)%heroes.length
];



setTimeout(()=>{

showHero(hero);

},400);



}



},40);


};


/* ============================= */

input.addEventListener("keydown",(e)=>{

if(e.key==="Enter"){

scanBtn.click();

}

});

/* ======================================================
   FLAGSHIP ULTRA V4
   PART 3B
   EFFECTS & INTERACTION
====================================================== */

const portal = document.querySelector(".bg-glow");
const againBtn = document.getElementById("againBtn");
const downloadBtn = document.getElementById("downloadBtn");

/* =========================
   HERO CARD 3D
========================= */

heroCard.addEventListener("mousemove", (e) => {

    const rect = heroCard.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateY = ((x / rect.width) - 0.5) * 18;
    const rotateX = ((y / rect.height) - 0.5) * -18;

    heroCard.style.transform =
        `perspective(1200px)
         rotateX(${rotateX}deg)
         rotateY(${rotateY}deg)
         scale(1.02)`;

});

heroCard.addEventListener("mouseleave", () => {

    heroCard.style.transform =
        "perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)";

});

/* =========================
   PORTAL EFFECT
========================= */

function activatePortal(){

    portal.style.transition = "1s";

    portal.style.transform =
        "translate(-50%,-50%) scale(1.35)";

    portal.style.filter =
        "blur(40px)";

    setTimeout(()=>{

        portal.style.transform =
            "translate(-50%,-50%) scale(1)";

        portal.style.filter =
            "blur(80px)";

    },900);

}

/* =========================
   HERO REVEAL FLASH
========================= */

function flashScreen(){

    const flash = document.createElement("div");

    flash.style.position="fixed";
    flash.style.left=0;
    flash.style.top=0;
    flash.style.width="100%";
    flash.style.height="100%";
    flash.style.background="rgba(0,255,255,.18)";
    flash.style.pointerEvents="none";
    flash.style.zIndex="9999";
    flash.style.opacity="1";
    flash.style.transition=".6s";

    document.body.appendChild(flash);

    setTimeout(()=>{

        flash.style.opacity="0";

    },50);

    setTimeout(()=>{

        flash.remove();

    },700);

}

/* =========================
   OVERRIDE SHOW HERO
========================= */

const originalShowHero = showHero;

showHero = function(hero){

    activatePortal();

    flashScreen();

    originalShowHero(hero);

}

/* =========================
   SCAN AGAIN
========================= */

againBtn.onclick = ()=>{

    heroCard.classList.remove("show");

    progress.style.width="0%";

    percent.innerHTML="0%";

    status.innerHTML="SYSTEM READY";

    input.focus();

}

/* =========================
   DOWNLOAD
========================= */

/* =========================
   DOWNLOAD
========================= */

downloadBtn.onclick = async ()=>{
sound.download.currentTime=0;
sound.download.play();


heroCard.classList.add("export-mode");


// tunggu CSS berubah
await new Promise(resolve=>setTimeout(resolve,300));


html2canvas(heroCard,{

   backgroundColor:"#203b57",

    scale:4,

    useCORS:true,

    allowTaint:true,

    logging:false


}).then(canvas=>{


const link=document.createElement("a");


link.download="AI-Hero-Card.png";


link.href=
canvas.toDataURL(
"image/png",
1
);


link.click();



heroCard.classList.remove("export-mode");


});


};
