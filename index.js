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
    var $rose = $('<section class="rose"></section>');
    for (var i = 0, petals = 25; i < petals; i++) {
      $rose.append('<div class="petal"></div>');
    }
    return $rose;
  }

  var MAX_R = 25;
  var MAX_DELAY = 600;
  function randomRose(config) {
    var $rose = roseTmpl();
    $rose.css({
      width: config.diameter,
      height: config.diameter,
      top: config.top,
      left: config.left,
    }).children().each(function(index, petal) {
      var $petal = $(petal);
      var theta = randomAngle();
      var r = MAX_R - index;
      var x = r / 2.6 * Math.sin(theta) - r + '%';
      var y = r / 2.6 * Math.cos(theta) - r + '%';
      var diameter = 2 * r + '%';
      var delay = MAX_DELAY - index * 30;
      setTimeout(function() {
        $petal.css({
          marginTop: y,
          marginLeft: x,
          width: diameter,
          height: diameter,
          opacity: 1,
          backgroundColor: randomColor(r),
        });
        setTimeout(function() {
          $petal.css({ opacity: 0 });
        }, config.life + MAX_DELAY - delay * 1.5);
      }, delay);
    });
    return $rose;
  }

  function randomDelay() {
    return Math.random() * 3000;
  }

  var winH = window.innerHeight;
  var winW = window.innerWidth;
  var MAX_DIAMETER = Math.min(winH, winW) / 2;
  var MIN_DIAMETER = Math.min(winH, winW) / 5;
  function generateRose() {
    var $rose = randomRose({
      top: Math.random() * winH,
      left: Math.random() * winW,
      diameter: MIN_DIAMETER +
        Math.random() * (MAX_DIAMETER - MIN_DIAMETER),
      life: Math.random() * 25000 + 5000,
    });

    $('#content').append($rose);
    setTimeout(generateRose, randomDelay());
  }

  $(function() {
    setTimeout(generateRose, randomDelay());
  });
})();
