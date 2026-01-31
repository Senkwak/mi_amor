const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let w = canvas.width = window.innerWidth;
let h = canvas.height = window.innerHeight;

// Création drones multicolores
const drones = [];
const numDrones = 400;

for(let i=0;i<numDrones;i++){
    drones.push({
        x: Math.random()*w,
        y: Math.random()*h,
        size: Math.random()*2+1,
        color: `hsl(${Math.random()*360}, 100%, 70%)`,
        angle: Math.random()*Math.PI*2,
        speed: Math.random()*0.5 + 0.1
    });
}

// Cœurs 3D flottants
const hearts = [];
for(let i=0;i<30;i++){
    hearts.push({
        x: Math.random()*w,
        y: Math.random()*h,
        size: Math.random()*20+10,
        speed: Math.random()*1+0.5,
        angle: 0
    });
}

// Animation arbres stylisés
const trees = [];
for(let i=0;i<10;i++){
    trees.push({
        x: Math.random()*w,
        y: h-50,
        size: Math.random()*50+50
    });
}

function draw(){
    ctx.clearRect(0,0,w,h);

    // Drones
    drones.forEach(d=>{
        d.x += Math.cos(d.angle)*d.speed;
        d.y += Math.sin(d.angle)*d.speed;
        if(d.x>w)d.x=0;
        if(d.x<0)d.x=w;
        if(d.y>h)d.y=0;
        if(d.y<0)d.y=h;
        ctx.beginPath();
        ctx.arc(d.x,d.y,d.size,0,Math.PI*2);
        ctx.fillStyle=d.color;
        ctx.shadowBlur=10;
        ctx.shadowColor=d.color;
        ctx.fill();
    });

    // Cœurs
    hearts.forEach(h=>{
        h.angle+=0.02;
        h.y -= h.speed;
        if(h.y<0) h.y=h.size+h.speed+h.speed;
        ctx.save();
        ctx.translate(h.x,h.y);
        ctx.rotate(h.angle);
        ctx.fillStyle='rgba(255,20,70,0.8)';
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.bezierCurveTo(0,-h.size/2,h.size,-h.size/2,h.size,0);
        ctx.bezierCurveTo(h.size,h.size/2,0,h.size/1.2,0,h.size);
        ctx.bezierCurveTo(0,h.size/1.2,-h.size,h.size/2,-h.size,0);
        ctx.bezierCurveTo(-h.size,-h.size/2,0,-h.size/2,0,0);
        ctx.fill();
        ctx.restore();
    });

    // Arbres stylisés
    trees.forEach(t=>{
        ctx.strokeStyle=`hsl(${Math.random()*360},100%,50%)`;
        ctx.lineWidth=2;
        ctx.beginPath();
        ctx.moveTo(t.x,h);
        ctx.lineTo(t.x,h-t.size);
        ctx.stroke();
        for(let i=0;i<3;i++){
            ctx.beginPath();
            ctx.moveTo(t.x,h-t.size/2);
            ctx.lineTo(t.x+Math.random()*50-25,h-t.size-20-i*10);
            ctx.stroke();
        }
    });

    requestAnimationFrame(draw);
}

draw();

// Resize
window.addEventListener('resize', ()=>{
    w=canvas.width=window.innerWidth;
    h=canvas.height=window.innerHeight;
});