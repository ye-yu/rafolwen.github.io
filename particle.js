"use strict";

const SVG_WIDTH = $("#header-animation").width();
const SVG_HEIGHT = 350;

const ROLE_BOX_ATTR = {
  WIDTH: 180,
  FIXED_Y: 65,
  RIGHT_OFFSET: 0.96,
  SPACING: 20
}

const PARTICLE_ATTR = {
  HEIGHT_BOUND: {
    MIN: 0, MAX: SVG_HEIGHT
  },
  LEFT_BOUND: {
    MIN: 0, MAX: SVG_WIDTH * 0.23
  },
  RIGHT_BOUND: {
    MIN: SVG_WIDTH * 0.35, MAX: SVG_WIDTH * 0.5
  },
  CONTAINER_ID: "g#particle",
  create: (x, y, text, cls) => `<text text-anchor="middle" x="${x}" y="${y}" class="${cls}">${text}</text>`
}

function adjustRoleBoxes() {
  const containers = 3;
  for(let i = 1; i <= containers; i++) {
    adjustBoxXPosition(`rect#role-box-${i}`, i);
    adjustBoxTextXPosition(`text#role-text-${i}`, i);
  }
}

function adjustReduceButton() {
  const width = 140;
  const y = 310;
  const x = SVG_WIDTH * 0.08;
  const offsetY = 23;

  d3.select("rect#reduce-button-rect").attr('x', x).attr('y', y).attr('width', width);
  d3.select("rect#reduce-button-front").attr('x', x).attr('y', y).attr('width', width)
  .on("mouseover", () => {
    d3.select("rect#reduce-button-rect").transition().duration(200).attr('fill', "#5D9BA3");
  })
  .on("mouseout", () => {
    d3.select("rect#reduce-button-rect").transition().duration(200).attr('fill', "#7DBBC3");
  })
  .on("click", reduceAction);

  d3.select("text#reduce-button-text").attr('x', x + width * 0.5).attr('y', y + offsetY);
}

function reduceAction() {
  Object.keys(DIRT_DOMS).forEach(k => {
    const marginTop = 75;
    const spacingY = 50 * DIRT_TYPE.indexOf(k);
    DIRT_DOMS[k].forEach(elem => {
      elem.interrupt();
      elem.transition().duration(randomRange(400, 800))
      .attr('y', marginTop + spacingY)
      .attr('x', SVG_WIDTH * 0.07)
      .on('end', () => {
        elem.remove();
      });
    });
    d3.select("#text" + DIRT_BIN_MAP[k]).text(DIRT_COUNT[k]).interrupt().attr('opacity', '0%')
    .transition().duration(300).attr('opacity', '100%').delay(800)
    .transition().duration(300).attr('opacity', '0%').delay(2000);
    while(DIRT_DOMS[k].length) DIRT_DOMS[k].pop();
    DIRT_COUNT[k] = 0;
  });
  clearInterval(reduce_int);
  reduce_int = setInterval(reduceAction, 1000 * 60); // clean up display after one minute
}

function adjustBoxXPosition(selector, multiplier=1) {
  const roleBox = d3.select(selector);
  const finalX = SVG_WIDTH * ROLE_BOX_ATTR.RIGHT_OFFSET - ROLE_BOX_ATTR.WIDTH * multiplier - ROLE_BOX_ATTR.SPACING * (multiplier - 1);
  roleBox.attr('width', ROLE_BOX_ATTR.WIDTH).attr('x', finalX).attr('y', ROLE_BOX_ATTR.FIXED_Y);
}

function adjustBoxTextXPosition(selector, multiplier=1, marginX=20) {
  const roleText = d3.select(selector);
  const finalX = SVG_WIDTH * ROLE_BOX_ATTR.RIGHT_OFFSET - ROLE_BOX_ATTR.WIDTH * multiplier - ROLE_BOX_ATTR.SPACING * (multiplier - 1);
  roleText.attr('x', finalX + ROLE_BOX_ATTR.WIDTH * 0.5).attr('y', ROLE_BOX_ATTR.FIXED_Y + 20);
}

function choice(arr) {
  return arr[randomInt(arr.length)];
}

const DIRT_TYPE = "$#&%@".split("");
const DIRT_BIN_MAP = {
  "$": "-dollar-bin",
  "#": "-hash-bin",
  "&": "-amper-bin",
  "%": "-percent-bin",
  "@": "-at-bin"
}

const DIRT_COUNT = {
  "$": 0,
  "#": 0,
  "&": 0,
  "%": 0,
  "@": 0
}

const DIRT_DOMS = {
  "$": [],
  "#": [],
  "&": [],
  "%": [],
  "@": []
}

function spawnDirtParticle() {
  const text = choice(DIRT_TYPE);
  const cls = "fill-white h2";
  const x = randomRange(PARTICLE_ATTR.RIGHT_BOUND.MIN, PARTICLE_ATTR.RIGHT_BOUND.MAX);
  const y = randomRange(PARTICLE_ATTR.HEIGHT_BOUND.MIN, PARTICLE_ATTR.HEIGHT_BOUND.MAX);
  const dirt = d3.select(PARTICLE_ATTR.CONTAINER_ID + DIRT_BIN_MAP[text]).append("text");
  dirt.attr('x', x).attr('y', y).attr('class', 'mono').attr('fill', '#011316').text(text);
  dirt.transition().duration(500)
  .attrTween('fill', () => (e) => d3.interpolateRgb("#011316", "#FFF")(d3.easeSinInOut(e)))
  .on('end', () => animateParticle(dirt, x, y));
}

function animateParticle(d3Elem, posX, posY) {
  const threshold = PARTICLE_ATTR.RIGHT_BOUND.MIN + 100;
  const timePerX = 5;
  if (posX > threshold) {
    // still on the right side
    const offsetY = 35;
    const randomY = 10 + randomRange(Math.max(PARTICLE_ATTR.HEIGHT_BOUND.MIN, posY - offsetY),  Math.min(PARTICLE_ATTR.HEIGHT_BOUND.MAX - 10, posY + offsetY));
    const randomX = randomRange(30, 200);
    const duration = timePerX * randomX;
    const newX = posX - randomX;
    d3Elem.transition().ease(d3.easeLinear).duration(duration)
    .attr('x', newX)
    .attrTween('y', () => (e) => d3.interpolate(posY, randomY)(d3.easeSinInOut(e)))
    .on('end', () => {
      animateParticle(d3Elem, newX, randomY);
    });
  } else {
    const text = d3Elem.text();
    const count = DIRT_COUNT[text]++;
    DIRT_DOMS[text].push(d3Elem);
    const extraMaxCount = {
      "$": 3,
      "#": 2,
      "&": 1,
      "%": 0,
      "@": 0
    }
    const marginTop = 70;
    const spacingY = 50 * DIRT_TYPE.indexOf(text);
    const marginLeft = SVG_WIDTH * 0.11;
    const spacingX = 12 * (count % (18 + (extraMaxCount[text])));
    d3Elem.transition().ease(d3.easeLinear).duration(800)
    .attrTween('fill', () => (e) => d3.interpolateRgb("#FFF", "#011316")(d3.easeSinInOut(Math.min(e * 2, 1))))
    .attr('x', posX - 50)
    .attrTween('y', () => (e) => d3.interpolate(posY, marginTop + spacingY)(d3.easeSinInOut(e)))
    .transition().ease(d3.easeLinear).duration(1200)
    .attr('x', marginLeft + spacingX);
  }
}

function randomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

const MOBILE_SVG_CONTAINER_ID = "svg#mobile-header";
function animateHeaderLines() {
  animateHeaderLine(randomInt(20) * 5, 18, 6, 12);
  animateHeaderLine(randomInt(20) * 5, 35, 4, 8);
}

const MOBILE_SVG_WIDTH = $(MOBILE_SVG_CONTAINER_ID).width();
function animateHeaderLine(width, y, thick, timePerX) {
  const svg = d3.select(MOBILE_SVG_CONTAINER_ID);
  const spacingX = 5;
  width = Math.max(width, thick);
  const firstDuration = timePerX * (width + spacingX);
  const secondDuration = timePerX * (MOBILE_SVG_WIDTH - spacingX);
  svg.append("rect").attr("class", "fill-white")
  .attr("x", MOBILE_SVG_WIDTH).attr('y', y)
  .attr('rx', thick / 2).attr('ry', thick / 2)
  .attr('width', width).attr('height', thick)
  .transition().duration(firstDuration).ease(d3.easeLinear)
  .attr('x', MOBILE_SVG_WIDTH - width - spacingX)
  .on('end', () => {
    animateHeaderLine(50 + randomInt(100), y, thick, timePerX);
  })
  .transition().duration(secondDuration).ease(d3.easeLinear)
  .attr('x', -width)
  .transition().duration(1).remove()
}

let reduce_int;
if (SVG_WIDTH >= 992){
  // adjustRoleBoxes();
  // adjustReduceButton();
  // setInterval(() => {
  //   if (!document.hidden) {
  //       let r = randomInt(5);
  //       for (let i = 0; i < r; i++) spawnDirtParticle();
  //       if (!reduce_int) reduce_int = setInterval(reduceAction, 1000 * 60); // clean up display after one minute
  //
  //   }
  // }, randomRange(200, 800));
  // $(window).blur(() => {
  //   clearInterval(reduce_int);
  //   reduce_int = 0;
  // })
} else {
  animateHeaderLines();
}
