const init = () => {
  const submitBtn = document.querySelector("button");
  submitBtn.addEventListener("click", displayColorScheme);
  displayColorScheme();
};

const displayColorScheme = async (e) => {
  if (e) {
    e.preventDefault();
  }

  const form = document.querySelector("form");
  const hex = form.elements.color.value.slice(1);
  const mode = form.elements.mode.value;
  const colors = await getColorScheme(hex, mode);
  let html = "";

  for (const color of colors) {
    html += `
      <div class="color-container">
        <div style="background:${color.hex.value}" class="color"></div>
        <p class="hex">${color.hex.value}</p>
      </div>
    `;
  }

  document.querySelector("section").innerHTML = html;
};

const getColorScheme = async (hex, mode) => {
  const url = `https://www.thecolorapi.com/scheme?hex=${hex}&mode=${mode}`;
  return await fetch(url)
    .then((res) => res.json())
    .then((data) => data.colors);
};

init();
