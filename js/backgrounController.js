var environmentalEffects = {
    "inForest": false, // done
    "inCave": false, // done
    "inTown": false,
    "inDungeon": false, // done
    "lightLevel": 0.65, // done
    "isRaining": false, // done
    "isSnowing": false // done
}


function getColorFromLightLevel(lightLevel) {
    // Ensure lightLevel is between 0 and 1
    lightLevel = Math.max(0, Math.min(1, lightLevel));
    var color1;
    // Decompose the colors into RGB components
    if (environmentalEffects.inForest) {
        color1 = { r: 0x00, g: 0x66, b: 0x00 };
    } else if (environmentalEffects.inCave) {
        color1 = { r: 22, g: 22, b: 22 };
    }
    else {
        color1 = { r: 0xfe, g: 0xcc, b: 0x66 };
    }
    const color2 = { r: 40, g: 0, b: 40 };

    // Compute the interpolated RGB values
    const r = Math.round(color1.r * lightLevel + color2.r * (1 - lightLevel));
    const g = Math.round(color1.g * lightLevel + color2.g * (1 - lightLevel));
    const b = Math.round(color1.b * lightLevel + color2.b * (1 - lightLevel));

    // Convert the RGB values to a hex color string
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

function setBackgroundFromEffects(environmentalEffects) {
    var firstBackgroundColor = getColorFromLightLevel(environmentalEffects.lightLevel);
    var secondBackgroundColor = getColorFromLightLevel(environmentalEffects.lightLevel - 0.2);
    var backgroundGradient = `linear-gradient(45deg, ${firstBackgroundColor}, ${secondBackgroundColor})`;
    // Set bg image
    if (environmentalEffects.inDungeon) {
        $("body").css("background", "url(images/brickWall.jpg)");
    } else {
        $("body").css("background", backgroundGradient);
    }

}

setBackgroundFromEffects(environmentalEffects);



// CANVAS STUFF
const canvas = document.getElementById('rainCanvas');
const ctx = canvas.getContext('2d');
const toggleRainButton = document.getElementById('toggleRain');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const numberOfRaindrops = 100;
const numberOfSnowflakes = 100;
const numberOfLeaves = 50;
const raindrops = [];
const snowflakes = [];
const leaves = [];
const numberOfEmbers = 10;
const embers = [];
let animationFrameId;

function Raindrop() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.length = Math.random() * 50 + 30;
    this.speed = Math.random() * 15 + 5;
}

Raindrop.prototype.draw = function () {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.length * Math.sin(20 * Math.PI / 180), this.y + this.length * Math.cos(20 * Math.PI / 180));
    ctx.strokeStyle = '#00f';
    ctx.lineWidth = 1;
    ctx.stroke();
}

Raindrop.prototype.update = function () {
    this.y += this.speed * Math.cos(20 * Math.PI / 180);
    this.x += this.speed * Math.sin(20 * Math.PI / 180);
    if (this.y > canvas.height + this.length) {
        this.y = 0 - this.length;
        this.x = Math.random() * canvas.width;
    }
}

for (let i = 0; i < numberOfRaindrops; i++) {
    raindrops.push(new Raindrop());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < raindrops.length; i++) {
        raindrops[i].update();
        raindrops[i].draw();
    }
    animationFrameId = requestAnimationFrame(animate);
}


function Snowflake() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 5 + 1;
    this.speedY = Math.random() * 3 + 1;
    this.speedX = Math.random() * 2 - 1;
}

Snowflake.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
}

Snowflake.prototype.update = function () {
    this.y += this.speedY;
    this.x += this.speedX;
    if (this.y > canvas.height + this.radius) {
        this.y = 0 - this.radius;
        this.x = Math.random() * canvas.width;
    }
}

for (let i = 0; i < numberOfRaindrops; i++) {
    raindrops.push(new Raindrop());
}



for (let i = 0; i < numberOfSnowflakes; i++) {
    snowflakes.push(new Snowflake());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (environmentalEffects.isRaining) {
        for (let i = 0; i < raindrops.length; i++) {
            raindrops[i].update();
            raindrops[i].draw();
        }
    }
    if (environmentalEffects.isSnowing) {
        for (let i = 0; i < snowflakes.length; i++) {
            snowflakes[i].update();
            snowflakes[i].draw();
        }
    }
    animationFrameId = requestAnimationFrame(animate);
}

function Leaf() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 20 + 10;
    this.speedY = Math.random() * 2 + 1;
    this.speedX = Math.random() * 2 - 1;
    this.rotation = Math.random() * Math.PI;
    this.rotationSpeed = (Math.random() - 0.5) * 0.03;
    this.color = `rgba(${255 * Math.random()}, ${160 + 95 * Math.random()}, 0, 1)`;
}

Leaf.prototype.draw = function () {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.beginPath();
    ctx.ellipse(0, 0, this.size, this.size / 2, 0, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
}

Leaf.prototype.update = function () {
    this.y += this.speedY;
    this.x += this.speedX;
    this.rotation += this.rotationSpeed;
    if (this.y > canvas.height + this.size) {
        this.y = 0 - this.size;
        this.x = Math.random() * canvas.width;
    }
}

for (let i = 0; i < numberOfRaindrops; i++) {
    raindrops.push(new Raindrop());
}

for (let i = 0; i < numberOfSnowflakes; i++) {
    snowflakes.push(new Snowflake());
}

for (let i = 0; i < numberOfLeaves; i++) {
    leaves.push(new Leaf());
}


function Ember() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height;
    this.speedY = Math.random() * 1.5 + 0.5;
    this.size = Math.random() * 5 + 3;
    this.fluctuation = Math.random() * 0.5 - 0.25;
    this.opacity = Math.random() * 0.5 + 0.5;
}

Ember.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 100, 0, ${this.opacity})`;
    ctx.shadowColor = '#ff6400';
    ctx.shadowBlur = 20;
    // Blur the actual arc
    // ctx.filter = 'blur(15px)';
    ctx.fill();
}

Ember.prototype.update = function () {
    this.y -= this.speedY;
    this.x += this.fluctuation;
    if (this.y < 0 - this.size) {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + this.size;
        this.speedY = Math.random() * 1.5 + 0.5;
        this.size = Math.random() * 5 + 3;
        this.fluctuation = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.5;
    }
}

for (let i = 0; i < numberOfEmbers; i++) {
    embers.push(new Ember());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (environmentalEffects.isRaining) {
        for (let i = 0; i < raindrops.length; i++) {
            raindrops[i].update();
            raindrops[i].draw();
        }
    }
    if (environmentalEffects.isSnowing) {
        for (let i = 0; i < snowflakes.length; i++) {
            snowflakes[i].update();
            snowflakes[i].draw();
        }
    }
    if (environmentalEffects.inForest) {
        for (let i = 0; i < leaves.length; i++) {
            leaves[i].update();
            leaves[i].draw();
        }
    }

    if (environmentalEffects.inDungeon) {
        for (let i = 0; i < embers.length; i++) {
            embers[i].update();
            embers[i].draw();
        }
    }
    animationFrameId = requestAnimationFrame(animate);
}


animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});


