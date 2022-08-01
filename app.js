function Touch_Edge(this_sprite) {
    if (isTouchingEdges(({costume: "bee"}))) {
      destroy(({costume: "bee"}));
      destroy(({costume: "apple"}));
      playSound('sound://category_music/gameover.mp3');
      showTitleScreen('Game Over', 'Press Space to Restart');
    }
  }
  
  function do_something(this_sprite) {
  }
  
  function moving_west(this_sprite) {
    moveInDirection(this_sprite, getProp(this_sprite, "speed"), "West");
  }
  
  function spinning_right(this_sprite) {
    turn(this_sprite, 6, "right");
  }
  
  function growing(this_sprite) {
    changePropBy(this_sprite, "scale", 1);
  }
  
  function swimming_left_and_right(this_sprite) {
    if (getProp(this_sprite, "direction") == 0) {
      mirrorSprite(this_sprite, "right");
    } else if (getProp(this_sprite, "direction") == 180) {
      mirrorSprite(this_sprite, "left");
    }
    moveForward(this_sprite, getProp(this_sprite, "speed"));
    if (isTouchingEdges(this_sprite)) {
      edgesDisplace(this_sprite);
      changePropBy(this_sprite, "direction", 180);
    }
  }
  
  function moving_east(this_sprite) {
    moveInDirection(this_sprite, getProp(this_sprite, "speed"), "East");
  }
  
  function moving_north(this_sprite) {
    moveInDirection(this_sprite, getProp(this_sprite, "speed"), "North");
  }
  
  function patrolling(this_sprite) {
    moveForward(this_sprite, getProp(this_sprite, "speed"));
    if (isTouchingEdges(this_sprite)) {
      edgesDisplace(this_sprite);
      changePropBy(this_sprite, "direction", 180);
    }
    if (getProp(this_sprite, "direction") > 270 || getProp(this_sprite, "direction") < 90) {
      mirrorSprite(this_sprite, "right");
    } else {
      mirrorSprite(this_sprite, "left");
    }
  
  }
  
  function moving_south(this_sprite) {
    moveInDirection(this_sprite, getProp(this_sprite, "speed"), "South");
  }
  
  function math_random_int(a, b) {
    if (a > b) {
      // Swap a and b to ensure a is smaller.
      var c = a;
      a = b;
      b = c;
    }
    return Math.floor(Math.random() * (b - a + 1) + a);
  }
  
  function jittering(this_sprite) {
    changePropBy(this_sprite, "scale", math_random_int(-1, 1));
  }
  
  function wandering(this_sprite) {
    withPercentChance(20, function () {
      changePropBy(this_sprite, "direction", math_random_int(-25, 25));
    });
    moveForward(this_sprite, getProp(this_sprite, "speed"));
    if (isTouchingEdges(this_sprite)) {
      edgesDisplace(this_sprite);
      changePropBy(this_sprite, "direction", math_random_int(135, 225));
    }
    if (getProp(this_sprite, "direction") > 270 || getProp(this_sprite, "direction") < 90) {
      mirrorSprite(this_sprite, "right");
    } else {
      mirrorSprite(this_sprite, "left");
    }
  
  }
  
  function shrinking(this_sprite) {
    changePropBy(this_sprite, "scale", -1);
  }
  
  function spinning_left(this_sprite) {
    turn(this_sprite, 6, "left");
  }
  
  function moving_with_arrow_keys(this_sprite) {
    if (isKeyPressed("up")) {
      moveInDirection(this_sprite, getProp(this_sprite, "speed"), "North");
    }
    if (isKeyPressed("down")) {
      moveInDirection(this_sprite, getProp(this_sprite, "speed"), "South");
    }
    if (isKeyPressed("left")) {
      moveInDirection(this_sprite, getProp(this_sprite, "speed"), "West");
    }
    if (isKeyPressed("right")) {
      moveInDirection(this_sprite, getProp(this_sprite, "speed"), "East");
    }
  }
  
  function driving_with_arrow_keys(this_sprite) {
    if (isKeyPressed("up")) {
      moveForward(this_sprite, getProp(this_sprite, "speed"));
    }
    if (isKeyPressed("down")) {
      moveBackward(this_sprite, getProp(this_sprite, "speed"));
    }
    if (isKeyPressed("left")) {
      changePropBy(this_sprite, "direction", -5);
      changePropBy(this_sprite, "rotation", -5);
    }
    if (isKeyPressed("right")) {
      changePropBy(this_sprite, "direction", 5);
      changePropBy(this_sprite, "rotation", 5);
    }
    if (isTouchingEdges(this_sprite)) {
      edgesDisplace(this_sprite);
    }
  }
  
  function fluttering(this_sprite) {
    changePropBy(this_sprite, "y", math_random_int(-1, 1));
  }
  
  function wobbling(this_sprite) {
    withPercentChance(50, function () {
      setProp(this_sprite, "rotation", math_random_int(-1, 1));
    });
  }
  
  function moving_west_and_looping(this_sprite) {
    mirrorSprite(this_sprite, "left");
    moveInDirection(this_sprite, getProp(this_sprite, "speed"), "West");
    if (getProp(this_sprite, "x") < -50) {
      setProp(this_sprite, "x", 450);
    }
  }
  
  function moving_east_and_looping(this_sprite) {
    mirrorSprite(this_sprite, "right");
    moveInDirection(this_sprite, getProp(this_sprite, "speed"), "East");
    if (getProp(this_sprite, "x") > 450) {
      setProp(this_sprite, "x", -50);
    }
  }
  
  function moving_north_and_looping(this_sprite) {
    moveInDirection(this_sprite, getProp(this_sprite, "speed"), "North");
    if (getProp(this_sprite, "y") > 450) {
      setProp(this_sprite, "y", -50);
    }
  }
  
  function moving_south_and_looping(this_sprite) {
    moveInDirection(this_sprite, getProp(this_sprite, "speed"), "South");
    if (getProp(this_sprite, "y") < -50) {
      setProp(this_sprite, "y", 450);
    }
  }
  
  showTitleScreen('Eat The Apple', 'Run and Press Space to Start');
  
  checkTouching("when", ({costume: "bee"}), ({costume: "apple"}), function (extraArgs) {
    destroy(({costume: "apple"}));
    makeNewSpriteAnon("apple", randomLocation());
    playSound('sound://category_accent/puzzle_game_accent_a_01.mp3');
  });
  
  keyPressed("when", "space", function () {
    hideTitleScreen();
    setBackground('#99ff99');
    playSound('sound://category_music/fun_game_win_musical_1.mp3');
    makeNewSpriteAnon("bee", ({"x":35,"y":191}));
    makeNewSpriteAnon("apple", randomLocation());
  });
  
  keyPressed("when", "right", function () {
    moveInDirection(({costume: "bee"}), 10, "East");
    if (isTouchingEdges(({costume: "bee"}))) {
      destroy(({costume: "apple"}));
      destroy(({costume: "bee"}));
      playSound('sound://category_music/gameover.mp3');
      showTitleScreen('Game Over', 'Press Space to Start Again');
    }
  });
  
  keyPressed("when", "up", function () {
    moveInDirection(({costume: "bee"}), 10, "North");
    if (isTouchingEdges(({costume: "bee"}))) {
      destroy(({costume: "apple"}));
      destroy(({costume: "bee"}));
      playSound('sound://category_music/gameover.mp3');
      showTitleScreen('Game Over', 'Press Space to Start Again');
    }
  });
  
  keyPressed("when", "down", function () {
    moveInDirection(({costume: "bee"}), 10, "South");
    if (isTouchingEdges(({costume: "bee"}))) {
      destroy(({costume: "apple"}));
      destroy(({costume: "bee"}));
      playSound('sound://category_music/gameover.mp3');
      showTitleScreen('Game Over', 'Press Space to Start Again');
    }
  });
  
  keyPressed("when", "left", function () {
    moveInDirection(({costume: "bee"}), 10, "West");
    if (isTouchingEdges(({costume: "bee"}))) {
      destroy(({costume: "apple"}));
      destroy(({costume: "bee"}));
      playSound('sound://category_music/gameover.mp3');
      showTitleScreen('Game Over', 'Press Space to Start Again');
    }
  });