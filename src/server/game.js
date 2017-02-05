var gameState = {
  running: false,
  width: 800,
  height: 500,
  players: {},
  enemies: [],
  frameCount: 1,
  frameCountTriggerEnemyMove: 20
};

var square = function(color) {
  return {
    x: 0,
    y: 0,
    width: 20,
    height: 20,
    color: color
  };
};

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
  // TODO: emit draw() players
  for(var i=0; i<enemies.length; i++) {
    var moveDirection = Math.floor(Math.random() * 4) + 1;
    if(shouldMove) {
      if(moveDirection === 1) { move(enemies[i], 'up');}
      else if(moveDirection === 2) { move(enemies[i], 'down');}
      else if(moveDirection === 3) { move(enemies[i], 'left');}
      else if(moveDirection === 4) { move(enemies[i], 'right');}
    }
    // TODO: emit draw() enemies
  }
};

var xInside = function(objA, objB) {
  return (objB.x >= objA.x && objB.x <= objA.x + objA.width) ? true : false;
};

var yInside = function(objA, objB) {
  return (objB.y >= objA.y && objB.y <= objA.y + objA.height) ? true : false;
};

var objInside = function(objA, objB) {
  return (xInside(objA, objB) && yInside(objA, objB)) ? true : false;
}

var doesObjectOverlap = function(objA, objB) {
  return (objInside(objA, objB) || objInside(objB, objA)) ? true : false;
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
