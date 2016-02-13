'use strict';

(function() {
  var k = 0;
  function randomAngle() {
    k = (k + 1) % 5;
    return (Math.random() + k) / 5 * 2 * Math.PI;
  }

  function randomColor(r) {
    var delta = r * 7;
    return 'rgb(' + ~~(Math.random() * 50 + 40 + delta / 2) +
      ',' + ~~(delta / 150 * (Math.random() * 30)) +
      ',' + ~~(delta / 150 * (Math.random() * 50)) + ')';
  }

  function roseTmpl() {
    var rose = document.createElement('section');
    rose.className = 'rose';
    var petals = '';
    for (var i = 0, petalsCount = 25; i < petalsCount; i++) {
      petals += '<div class="petal"></div>';
    }
    rose.innerHTML = petals;
    return rose;
  }

  function setStyle(target, style) {
    for (var key in style) {
      if (style.hasOwnProperty(key)) {
        var value = style[key];
        target.style[key] = typeof value === 'number' && key !== 'opacity' ? value + 'px' : value;
      }
    }
  }

  var MAX_R = 25;
  var MAX_DELAY = 600;
  function randomRose(config) {
    var rose = roseTmpl();
    setStyle(rose, {
      width: config.diameter,
      height: config.diameter,
      top: config.top,
      left: config.left,
    });
    var children = Array.prototype.slice.call(rose.children);
    children.forEach(function(petal, index) {
      var theta = randomAngle();
      var r = MAX_R - index;
      var x = r / 2.6 * Math.sin(theta) - r + '%';
      var y = r / 2.6 * Math.cos(theta) - r + '%';
      var diameter = 2 * r + '%';
      var delay = MAX_DELAY - index * 30;
      setTimeout(function() {
        setStyle(petal, {
          marginTop: y,
          marginLeft: x,
          width: diameter,
          height: diameter,
          opacity: 1,
          backgroundColor: randomColor(r),
        });
        setTimeout(function() {
          setStyle(petal, { opacity: 0 });
        }, config.life + MAX_DELAY - delay * 1.5);
      }, delay);
    });
    return rose;
  }

  function randomDelay() {
    return Math.random() * 3000;
  }

  var winH = window.innerHeight;
  var winW = window.innerWidth;
  var MAX_DIAMETER = Math.min(winH, winW) / 2;
  var MIN_DIAMETER = Math.min(winH, winW) / 5;
  var content = document.getElementById('content');
  function generateRose() {
    var diameter = MIN_DIAMETER + Math.random() * (MAX_DIAMETER - MIN_DIAMETER);
    var rose = randomRose({
      diameter: diameter,
      top: Math.random() * (winH - diameter) + diameter / 2,
      left: Math.random() * (winW - diameter) + diameter / 2,
      life: Math.random() * 25000 + 5000,
    });

    content.appendChild(rose);
    setTimeout(generateRose, randomDelay());
  }

  setTimeout(generateRose, randomDelay());
})();
