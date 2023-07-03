const images = document.querySelectorAll(".images img");

let leadIndex=0,
  lastPos = {
    x: 0,
    y: 0
  };

const calcDis = (x1, x2, y1, y2) =>
  Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

const handleMouseMove = (event) => {
  const x = event.clientX;
  const y = event.clientY;

  const dis = calcDis(x, lastPos.x, y, lastPos.y);
  if (dis < 100) return;

//   managing zIndex here
  for (let i = 0; i < images.length; ++i) {
    if (i < leadIndex) images[i].style.zIndex = `${i + 20}`;
    else images[i].style.zIndex = `${-(images.length - i) + 20}`;
  }

  images[leadIndex].style.top = `${y}px`;
  images[leadIndex].style.left = `${x}px`;
  images[leadIndex].style.zIndex = `100`;
  images[leadIndex].dataset.status = "active";

  images[(images.length + leadIndex - 5) % images.length].dataset.status =
    "inactive";

  leadIndex = (leadIndex + 1) % images.length;
  lastPos.x = x;
  lastPos.y = y;
};

document.body.onmousemove = handleMouseMove;
document.body.ontouchmove = handleMouseMove;
document.body.onmouseleave = () =>
  images.forEach((img) => (img.dataset.status = "inactive"));
