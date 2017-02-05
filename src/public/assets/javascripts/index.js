

var canvasSize = { width: 800, height: 300 };
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var print = function(message) {
  $('#paper').append("<div>"+message+"</div>");
}

var square = function(color) { return { x: 0, y: 0, width: 20, height: 20, color: color }};

var draw = function(obj) {
  ctx.fillStyle = obj.color;
  ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
}

var move = function(obj, direction) {
  var moveBy = obj.width;
  if(direction === 'up') {
    obj.y = ((obj.y - moveBy) < 0) ? obj.y : (obj.y - moveBy);
  } else if(direction === 'down') {
    obj.y = ((obj.y + moveBy + obj.height) > canvasSize.height) ? obj.y : (obj.y + moveBy);
  } else if(direction === 'left') {
    obj.x = ((obj.x - moveBy) < 0) ? obj.x : (obj.x - moveBy);
  } else if(direction === 'right') {
    obj.x = ((obj.x + moveBy + obj.width) > canvasSize.width) ? obj.x : (obj.x + moveBy);
  }
}

var renderFrame = function(player, enemies, shouldMove) {
  ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
  draw(player);
  for(var i=0; i<enemies.length; i++) {
    var moveDirection = Math.floor(Math.random() * 4) + 1;
    //console.log(moveDirection);
    if(shouldMove) {
      if(moveDirection === 1) { move(enemies[i], 'up');}
      else if(moveDirection === 2) { move(enemies[i], 'down');}
      else if(moveDirection === 3) { move(enemies[i], 'left');}
      else if(moveDirection === 4) { move(enemies[i], 'right');}
    }
    draw(enemies[i]);
  }
};

var doesObjectOverlap = function(objA, objB) {
  // objects overlap if:
  //   (objB.x >= objA.x && objB.x <= (objA.x + objA.width)) &&
  //   (objB.y >= objA.y && objB.y <= (objA.y + objA.height))
  if((objB.x >= objA.x && objB.x <= (objA.x + objA.width)) &&
     (objB.y >= objA.y && objB.y <= (objA.y + objA.height))) {
    return true;
  } else if((objA.x >= objB.x && objA.x <= (objB.x + objB.width)) &&
     (objA.y >= objB.y && objA.y <= (objB.y + objB.height))) {
    return true;
  } else {
    return false;
  }
}

var detectCollision = function(player, enemies) {
  for(var i=0; i<enemies.length; i++) {
    var enemy = enemies[i];
    var overlap = doesObjectOverlap(player, enemy);
    if(overlap) {
      return true;
    }
  }
  return false;
};

$(window).keydown(function(event) {
  //console.log('keyCode', event.keyCode);
  var key = event.keyCode;
  var UP = 38, DOWN = 40, LEFT = 37, RIGHT = 39;
  if(key === UP) {
    move(lamby, 'up');
  } else if (key === DOWN) {
    move(lamby, 'down');
  } else if (key === LEFT) {
    move(lamby, 'left');
  } else if (key === RIGHT) {
    move(lamby, 'right');
  }
});

var gameLoop = function() {
  //console.log('here');
  if(running) {
    window.requestAnimationFrame(gameLoop);
    frameCount++;
    if(frameCount > frameCountTriggerEnemyMove * 2) frameCount = 1;
    if(frameCount % frameCountTriggerEnemyMove === 0) {
      renderFrame(lamby, enemies, true);
    } else {
      renderFrame(lamby, enemies, false);
    }
    var collision = detectCollision(lamby, enemies);
    if(collision) {
      running = false;
      print('<strong>You <span style="color: red;">LOSE</span>!</strong>');
    }
  }
}

// Settings
var OFF = false;
var ON = true;
var enemies = [];
var running = OFF;
var frameCount = 1;
var frameCountTriggerEnemyMove = 20;
var lamby = square('pink');

var createEnemies = function(numOfEnemies) {
  for(var i=0; i<numOfEnemies; i++) {
    var enemy = square('blue');
    enemy.x += 200;
    enemy.y += 100;
    enemies.push(enemy);
  }
}

var power = function(on) {
  createEnemies(15);
  running = on;
  if(on === ON) {
    gameLoop();
  }
}

// Start
print("Hello, this is Emma's game!");
print("this game is going to be fun!");
print("Run away from the blue guy!");

power(ON);
