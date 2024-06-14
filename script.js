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
