// String Animation 

// cello string properties 
let length = 0.69;       // length of the vibrating string in (m)
let frequency = 220;     // fundamental frequency of A string (Hz)
let amplitude = 0.005;   // amplitude of wave (m) - this is an estimate

// harmonic amplitudes 
const A1 = A;
const A2 = A / 2;
const A3 = A / 4;
const A4 = A / 8;
const A5 = A / 16;
const A6 = A / 32;
const A7 = A / 64;
const A8 = A / 128;

// create an array of 500 evenly spaced positions along the string 
const x = [];

for (let i = 0; i < 500; i++) { 
    x.push((i / 499) * length) // add each values to the array
}

// graph
const canvas = document.querySelector(#stringCanvas);
const ctx = canvas.getContext("2d");

function drawString(y) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.beginPath();

    for (let i = 0; i < x.length; i++) {
        if (i === 0 ) {
            ctx.moveTo(x[i], y[i]);
        }
        else {
            ctx.lineTo(x[i], y[i]);
        }
    }
    ctx.stroke();
}

// graph limits 
const canvasX = (xValue / L) * canvas.width;
const canvasY = canvas.height / 2 - (yValue / (amplitude * 2) * (canvas.height / 2));

// define what the string does over time 
function string(frame) {
    let t = frame / 50
    // first harmonic (fundamental)
    y1 = A1 * Math.sin(Math.PI * x / L)* Math.cos(2 * Math.PI * f * t)
        // sin(pi*x/L) = shape of the fundamental vibration
        // cos(2*pi*f*t) = how the string moves over time
    // second harmonic
    y2 = A2 * Math.sin(2 * Math.PI * x / L)* Math.cos(2 * Math.PI * 2 * f * t)
    // third harmonic
    y3 = A3 * Math.sin(3 * Math.PI * x / L)* Math.cos(2 * Math.PI * 3 * f * t)
    // fourth harmonic
    y4 = A4 * Math.sin(4 * Math.PI * x / L)* Math.cos(2 * Math.PI * 4 * f * t)
    // fifth harmonic
    y5 = A5 * Math.sin(5 * Math.PI * x / L)* Math.cos(2 * Math.PI * 5 * f * t)
    // sixth harmonic
    y6 = A6 * Math.sin(6 * Math.PI * x / L)* Math.cos(2 * Math.PI * 6 * f * t)
    // seventh harmonic
    y7 = A7 * Math.sin(7 * Math.PI * x / L)* Math.cos(2 * Math.PI * 7 * f * t)
    // eighth harmonic
    y8 = A8 * Math.sin(8 * Math.PI * x / L)* Math.cos(2 * Math.PI * 8 * f * t)
    
    // add waves together (principal of superposition)
    y = y1 + y2 + y3 + y4 + y5 + y6 + y7 + y8
}