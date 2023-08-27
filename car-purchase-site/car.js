const prices = new Map([
  ["manual", 17790],
  ["automatic", 18590],
  ["sManual", 22455],
  ["sportshift", 23155],
  ["combo1", 1235],
  ["combo2", 3354],
  ["noCombo", 0],
  ["stereo", 550],
  ["security", 399],
  ["mirror", 295],
]);
const carPhotos = new Map([
  ["red", "red.jpg"],
  ["blue", "blue.jpg"],
  ["silver", "silver.jpg"],
  ["white", "white.jpg"],
  ["black", "black.jpg"],
]);

window.onload = function () {
  document.getElementById("manualPrice").innerHTML = formatPrice(prices.get("manual"));
  document.getElementById("automaticPrice").innerHTML = formatPrice(prices.get("automatic"));
  document.getElementById("sManualPrice").innerHTML = formatPrice(prices.get("sManual"));
  document.getElementById("sportshiftPrice").innerHTML = formatPrice(prices.get("sportshift"));
  document.getElementById("combo1Price").innerHTML = formatPrice(prices.get("combo1"));
  document.getElementById("combo2Price").innerHTML = formatPrice(prices.get("combo2"));
  document.getElementById("noComboPrice").innerHTML = formatPrice(prices.get("noCombo"));
  document.getElementById("stereoPrice").innerHTML = formatPrice(prices.get("stereo"));
  document.getElementById("securityPrice").innerHTML = formatPrice(prices.get("security"));
  document.getElementById("mirrorPrice").innerHTML = formatPrice(prices.get("mirror"));
};

function formatPrice(price) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return formatter.format(price);
}

function getPrice() {
  let total = 0;

  let configuration = document.getElementById("configuration").elements["configuration"].value;
  if (configuration) {
    total += prices.get(configuration);
  }

  let combo = document.getElementById("factoryOptions").elements["factoryOptions"].value;
  if (combo) {
    total += prices.get(combo);
  }

  if (document.getElementById("stereo").checked) {
    total += prices.get("stereo");
  }
  if (document.getElementById("security").checked) {
    total += prices.get("security");
  }
  if (document.getElementById("mirror").checked) {
    total += prices.get("mirror");
  }

  document.getElementById("total").value = formatPrice(total);
}
document.getElementById("totalButton").addEventListener("click", getPrice);

document.getElementById("color").onchange = () => {
  let color = document.getElementById("color").value;
  document.getElementById("image").src = carPhotos.get(color);
};
