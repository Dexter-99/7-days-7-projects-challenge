const lights = document.querySelectorAll(".container");
lights.forEach(light => {
  const circles = light.children;
  const lights = console.log(circles);
  console.log(lights);
  let activeLight = 0;

  setInterval(() => {
    changeLight();
  }, Math.floor(Math.random() * 1000 + 500));

  function changeLight() {
    circles[activeLight].className = "circle";
    activeLight++;

    if (activeLight > 2) {
      activeLight = 0;
    }

    const currentLight = circles[activeLight];

    currentLight.classList.add(currentLight.getAttribute("color"));
  }
});
