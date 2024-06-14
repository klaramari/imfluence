document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("container");
  let lastEmissionTime = 0;

  container.addEventListener("mousemove", (event) => {
    console.log("mouse");
    const currentTime = new Date().getTime();

    if (currentTime - lastEmissionTime >= 200) {
      // 0.5 seconds interval
      lastEmissionTime = currentTime;
      createCircle(event.clientX, event.clientY);
    }
  });

  function createCircle(x, y) {
    const circle = document.createElement("div");
    circle.classList.add("circle");
    circle.style.left = `${x}px`; // center the circle on the cursor
    circle.style.top = `${y}px`;

    container.appendChild(circle);

    // Remove the circle after animation ends
    circle.addEventListener("animationend", () => {
      circle.remove();
    });
  }
});

function elt(type, prop, ...childrens) {
  let elem = document.createElement(type);
  if (prop) Object.assign(elem, prop);
  for (let child of childrens) {
    if (typeof child == "string")
      elem.appendChild(document.createTextNode(child));
    else elem.appendChild(elem);
  }
  return elem;
}

//Progress class
class Progress {
  constructor(now, min, max, options) {
    this.dom = elt("div", {
      className: "progress-bar",
    });
    this.min = min;
    this.max = max;
    this.intervalCode = 0;
    this.now = now;
    this.syncState();
    if (options.parent) {
      document.querySelector(options.parent).appendChild(this.dom);
    } else document.body.appendChild(this.dom);
  }

  syncState() {
    this.dom.style.width = this.now + "%";
  }

  startTo(step, time) {
    if (this.intervalCode !== 0) return;
    this.intervalCode = setInterval(() => {
      console.log("sss");
      if (this.now + step > this.max) {
        this.now = this.max;
        this.syncState();
        clearInterval(this.interval);
        this.intervalCode = 0;
        return;
      }
      this.now += step;
      this.syncState();
    }, time);
  }
  end() {
    this.now = this.max;
    clearInterval(this.intervalCode);
    this.intervalCode = 0;
    this.syncState();
  }
}

let pb = new Progress(0, 0, 70, { parent: ".progress" });

//arg1 -> step length
//arg2 -> time(ms)
pb.startTo(5, 250);

//end to progress after 5s
setTimeout(() => {
  pb.end();
}, 5000);
