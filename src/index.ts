import { ArrayMutationTracker } from "./ArrayMutationTracker.js";
import { mergesort } from "./algorithms.js";
import { shuffle } from "./utils.js";

const canvas = document.querySelector("canvas")!;
const ctx = canvas.getContext("2d")!;
canvas.width = 512;
canvas.height = 512;

const x = canvas.width / 2;
const y = canvas.height / 2;
const radius = canvas.height / 2;

const slices = [];

for (let angle = 0; angle < 360; angle++) {
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, `hsl(${angle}, 10%, 100%)`);
    gradient.addColorStop(1, `hsl(${angle}, 100%, 50%)`);

    slices.push({ angle, gradient });
}

shuffle(slices);

for (let angle = 0; angle < 360; angle++) {
    const { gradient } = slices[angle];

    draw(angle, gradient);
}

const tracker = new ArrayMutationTracker(slices);

mergesort(tracker, (a, b) => a.angle - b.angle);

const past = tracker.history();

canvas.addEventListener("click", () => {
    const interval = setInterval(() => {
        const entry = past.shift();

        if (!entry) return clearInterval(interval);

        for (let angle = 0; angle < 360; angle++) {
            const { gradient } = entry[angle];

            draw(angle, gradient);
        }
    });
}, { once: true });

function draw(angle: number, gradient: CanvasGradient) {
    const start = ((angle - 2) * Math.PI) / 180;
    const end = (angle * Math.PI) / 180;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.arc(x, y, radius, start, end);
    ctx.closePath();

    ctx.fillStyle = gradient;
    ctx.fill();
}
