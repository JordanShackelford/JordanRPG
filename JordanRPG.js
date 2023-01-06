window.onload = function() {
    let showOptionsMenu = false;
    var a_canvas = document.getElementById("a"), context = a_canvas.getContext("2d"), cursor = new Image(), boat = new Image();
    cursor.src = "res/swordicon.png";
    boat.src = "res/boat.png";
    function Tile({ size = [1, 1], image } = {}) {
        const [width, height] = size;
        this.width = screen.tileWidth * width;
        this.height = screen.tileHeight * height;
        this.image = new Image();
        this.image.src = image;
    }
    var notifications = ["Move with W,A,S,D keys or by clicking/tapping", "Press Esc to open options menu", "Use number keys to select inventory slot"];
    var map = {};
    const screen = {
        offsetX: 0,
        offsetY: 0,
        numRows: 15,
        numColumns: 15,
        mouseCanvasCoords: [0, 0],
        oldSelectionBoxCoords: [0, 0],
        selectionBoxCoords: [0, 0],
        tileX: 0,
        tileY: 0,
        notificationX: 0.02 * a_canvas.width,
        notificationY: 0.045 * a_canvas.height,
        notificationSpacing: 30,
        numOfInventorySlots: 4
    };            
    screen.tileWidth = a_canvas.width / screen.numColumns, screen.tileHeight = a_canvas.height / screen.numRows;
    var sounds = {walking: new Audio("res/walking.mp3"),music: new Audio("res/backgroundmusic.mp3")};
    var player = {
      name: "Jordan",
      screenTileX: Math.floor(screen.numRows / 2),
      screenTileY: Math.floor(screen.numColumns / 2),
      worldX: 150,
      worldY: 150,
      img: document.getElementById("player"),
      imgWidth: screen.tileWidth,
      imgHeight: screen.tileHeight * 2,
      moveSpeed: 20,
      isMoving: false,
      animationFrame: 0,
      movementQueue: [],
      deltaX: 0,
      deltaY: 0
    };
    player.pixelX = player.screenTileX * screen.tileWidth, player.pixelY = player.screenTileY * screen.tileHeight - screen.tileHeight;
    const movementDirections = {
      east: { worldX: screen.tileWidth, worldY: 0 },
      west: { worldX: -screen.tileWidth, worldY: 0 },
      north: { worldX: 0, worldY: -screen.tileHeight },
      south: { worldX: 0, worldY: screen.tileHeight }
    };
    var enemyImg = new Image();
    enemyImg.src = "res/enemy.png";
    var enemy = {
        name: "Enemy",
        screenTileX: Math.floor(screen.numRows / 2),
        screenTileY: Math.floor(screen.numColumns / 2),
        worldX: 152,
        worldY: 152,
        img: enemyImg,
        imgWidth: screen.tileWidth,
        imgHeight: screen.tileHeight * 2,
        moveSpeed: 5,
        isMoving: false,
        animationFrame: 0,
        movementQueue: []
    };
    var gameInterface = {
        inventorySlotSelected: 0,
        icons: {},
      };
      var elements = [  "hatchet",  "appletreesapling",  "apple",  "dagger",  "sword",  "bow",  "arrow",  "wood",  "stone",  "iron",  "gold",  "diamond",  "coal",  "fish",  "fishingspear",];
      for (var i = 0; i < elements.length; i++) {
        gameInterface.icons[elements[i]] = document.getElementById(elements[i]);
      }
    var graphics = {
        redrawMap: function() {
            const distLeftRight = (screen.numColumns - 1) / 2;
            const distTopBot = (screen.numRows - 1) / 2;
            const leftEdge = player.worldX - distLeftRight;
            const topEdge = player.worldY - distTopBot;
            for (let i = -6; i < screen.numColumns + 6; i++) {
              for (let j = -6; j < screen.numRows + 6; j++) {
                const tileValue = map.tileMap[Math.floor(leftEdge + i)][Math.floor(topEdge + j)];
                let image;
                switch (tileValue) {
                  case 0:
                    image = tiles.grass;
                    break;
                  case 1:
                    image = tiles.water;
                    break;
                  case 2:
                    image = tiles.dirt;
                    break;
                }
                context.drawImage(image.image, screen.tileWidth * i + screen.offsetX, screen.tileHeight * j + screen.offsetY, image.width, image.height);
              }
            }
          },
        drawSelectionBox: function(newCoords, oldCoords) {
            context.beginPath();
            context.lineWidth = 3;
            context.strokeStyle = "yellow";
            context.rect(newCoords[0], newCoords[1], screen.tileWidth, screen.tileHeight);
            context.stroke();
        },
        drawPlayer: function() {
            const animationClips = [    [8, 7],
              [55, 2],
              [102, 2],
              [153, 2],
              [8, 150],
              [51, 150],
              [104, 150],
              [155, 150],
              [8, 76],
              [51, 76],
              [104, 76],
              [155, 76],
              [8, 220],
              [51, 220],
              [104, 220],
              [155, 220],
            ];
          
            context.font = "40px Comic Sans MS";
            context.strokeStyle = "yellow";
            context.lineWidth = 2;
            context.strokeText(player.name, player.pixelX - player.imgWidth / 10, player.pixelY);
          
            if (map.tileMap[Math.floor(player.worldX)][Math.floor(player.worldY)] === 1) {
              context.drawImage(boat, player.pixelX, player.pixelY, player.imgWidth, player.imgHeight);
            } else {
              const [xClip, yClip] = animationClips[player.animationFrame];
              context.drawImage(
                player.img,
                xClip,
                yClip,
                32,
                64,
                player.pixelX,
                player.pixelY,
                player.imgWidth,
                player.imgHeight
              );
            }
          },
          
        drawEnemy: function() {
            enemy.pixelX = (enemy.worldX - player.offsetX) * screen.tileWidth;
            enemy.pixelY = (enemy.worldY - player.offsetY) * screen.tileHeight;
            context.drawImage(enemy.img, enemy.pixelX, enemy.pixelY, enemy.imgWidth, enemy.imgHeight);
        },
        drawCursor: function() {
            context.drawImage(cursor, screen.mouseCanvasCoords[0], screen.mouseCanvasCoords[1], 100, 100);
        },
        drawInterface: function() {
            const inventoryWidth = a_canvas.width * 0.7;
            const inventoryHeight = a_canvas.height * 0.15;
            const inventoryX = (a_canvas.width - inventoryWidth) / 2.0;
            const inventoryY = (a_canvas.height - inventoryHeight) * 0.9;
            const numOfSlots = 6;
            const slotWidth = inventoryWidth / numOfSlots;
            const slotHeight = inventoryHeight; 
            context.beginPath();
            context.rect(inventoryX, inventoryY, inventoryWidth, inventoryHeight);
            context.lineWidth = 3;
            context.strokeStyle = "rgba(0,0,255,0.7)";
            context.stroke();
            context.fillStyle = "rgba(0,255,255,0.3)";
            context.fill();
            for (let i = 0; i < numOfSlots; i++) {
              const slotX = inventoryX + (slotWidth * i);
              const slotY = inventoryY;
              context.beginPath();
              context.lineWidth = 3;
              context.rect(slotX, slotY, slotWidth, slotHeight);
              context.strokeStyle = "yellow";
              context.stroke();
              const fontSize = 72;
              context.fillStyle = "white";
              context.font = fontSize + "px Arial";
              context.fillText(
                i + 1,
                slotX + (slotWidth / 2) - (fontSize / 3),
                slotY + (slotHeight / 2) + (fontSize / 3),
                slotWidth
              );
            }
            const selectedSlotX = inventoryX + (slotWidth * gameInterface.inventorySlotSelected);
            const selectedSlotY = inventoryY;
            context.lineWidth = 6;
            context.strokeStyle = "rgb(150,0,0)";
            context.beginPath();
            context.rect(selectedSlotX,selectedSlotY, slotWidth, slotHeight);
            context.stroke();
            context.drawImage(gameInterface.icons.hatchet, inventoryX, inventoryY, slotWidth, slotHeight);
          },
          
        drawPlayerCoords: function() {
            context.fillStyle = "yellow";
            context.font = "14px Arial";
            var chunkX = Math.floor(player.squareX / screen.numColumns);
            var chunkY = Math.floor(player.squareY / screen.numRows);
            context.fillText(`Screen Coords: (${player.squareX},${player.squareY})`, player.pixelX, player.pixelY + player.imgHeight + 20);
            context.fillText(`Chunk Coords: (${chunkX},${chunkY})`, player.pixelX, player.pixelY + player.imgHeight + 40);
        },
        drawTrees: function() {
            const distLeftRight = (screen.numColumns - 1) / 2 + 6;
            const distTopBot = (screen.numRows - 1) / 2 + 6;
            const leftEdge = player.worldX - distLeftRight;
            const topEdge = player.worldY - distTopBot;
            for (let i = -6; i < screen.numColumns + 6; i++) {
              for (let j = -6; j < screen.numRows + 6; j++) {
                const treeX = screen.tileWidth * i - screen.tileWidth / 2 + screen.offsetX;
                const treeY = screen.tileHeight * j + screen.offsetY;
                switch (map.treeMap[Math.floor(leftEdge + i)][Math.floor(topEdge + j)]) {
                  case 1:
                    context.drawImage(tiles.tree1.image, treeX, treeY, tiles.tree1.width, tiles.tree1.height);
                    break;
                  case 2:
                    context.drawImage(tiles.tree2.image, treeX, treeY, tiles.tree2.width, tiles.tree2.height);
                    break;
                  case 4:
                    context.drawImage(tiles.flower.image, treeX, treeY, tiles.flower.width, tiles.flower.height);
                    break;
                }
              }
            }
        },

        drawMouseCoords: function() {
            var tileX = Math.floor(screen.mouseCanvasCoords[0] / screen.tileWidth);
            var tileY = Math.floor(screen.mouseCanvasCoords[1] / screen.tileHeight);
            context.font = "20px Arial";
            context.fillStyle = "yellow";
            context.fillText("(" + tileX + "," + tileY + ")", screen.selectionBoxCoords[0], screen.selectionBoxCoords[1] + screen.tileHeight + 20);
        },
        drawNotifications:function() {
            const boxWidth = a_canvas.width * 0.6;
            const boxHeight = 200;
            const boxX = a_canvas.width * 0.01;
            const boxY = a_canvas.height * 0.01;
            context.font = "40px Arial";
            context.lineWidth = 4;
            context.strokeStyle = "red";
            context.beginPath();
            context.rect(boxX, boxY, boxWidth, boxHeight);
            context.stroke();
            context.fillStyle = "rgba(0,150,150,0.5)";
            context.fill();
            for (let i = 0; i < notifications.length; i++) {
              if (notifications.length > 6) notifications.shift();
              context.fillStyle = "yellow";
              context.fillText(notifications[i], screen.notificationX, screen.notificationY + screen.notificationSpacing * i);
            }
        },          
        drawOptionsMenu: function() {
            if (showOptionsMenu) {
                context.beginPath();
                context.rect((a_canvas.width * 0.05) / 2, (a_canvas.height * 0.05) / 2, a_canvas.width * 0.9, a_canvas.height * 0.9);
                context.lineWidth = 3;
                context.strokeStyle = "yellow";
                context.fillStyle = "rgb(50,50,50)";
                context.fill();
                context.stroke();
              }
        }
    };
    var math = {
        calculateTileClicked: (coords) => [
          Math.floor(coords[0] / screen.tileWidth) * screen.tileWidth,
          Math.floor(coords[1] / screen.tileHeight) * screen.tileHeight
        ],
        calculateCanvasCoordsFromWindowCoords: (windowX, windowY) => {
          const rect = context.canvas.getBoundingClientRect();
          const canvasX = (windowX - rect.left) / (rect.right - rect.left) * context.canvas.width;
          const canvasY = (windowY - rect.top) / (rect.bottom - rect.top) * context.canvas.height;
          return [Math.round(canvasX), Math.round(canvasY)];
        }
    };
    var tileData = {
        grass: [1, 1, "res/grass.jpg"],
        water: [1, 1, "res/water1.png"],
        tree1: [2, 5, "res/tree1.png"],
        tree2: [2, 5, "res/tree2.png"],
        flower: [1, 2, "res/flower.png"],
        rock: [1, 1, "res/rock.png"],
        dirt: [1, 1, "res/dirt.jpg"],
        sand: [1, 1, "res/sand.jpg"],
        stone: [1, 1, "res/stone.jpg"],
        wood: [1, 1, "res/wood.jpg"],
        stoneWall: [1, 1, "res/stoneWall.jpg"],
    };
    var tiles = {};
    Object.assign(tiles, tileData);
    for (var key in tiles) {
        var data = tiles[key];
        tiles[key] = new Tile({ size: data.slice(0, 2), image: data[2] });
    }
    var config = {
        fps: 60
    };
    var generator = {
        generateChunk: function() {
            var chunkHeight = 300;
            var chunkWidth = 300;
            var tilesList = new Array();
            map.tileMap = new Array(chunkHeight);
            map.treeMap = new Array(chunkHeight);
            for (var i = 0; i < map.tileMap.length; i++) {
                map.tileMap[i] = new Array(chunkWidth);
                map.treeMap[i] = new Array(chunkWidth);
            }
            seed();
            for (var i = 0; i < 150; i++) {
                makeLikeSurroundingTiles();
            }
            function seed() {
                for (var i = 0; i < chunkHeight; i++) {
                    for (var j = 0; j < chunkWidth; j++) {
                        switch (Math.floor((Math.random() * 3) + 1)) {
                            case 1:
                                map.tileMap[i][j] = 0;
                                break;
                            case 2:
                                map.tileMap[i][j] = 2;
                                break;
                            case 3:
                                map.tileMap[i][j] = 1;
                                break;
                        }
                        tilesList.push([i, j]);
                    }
                }
            }
            function makeLikeSurroundingTiles() {
                for (var i = 0; i < chunkHeight; i++) {
                    for (var j = 0; j < chunkWidth; j++) {
                        if (i === 0 || j === 0 || i === chunkWidth - 1 || j === chunkHeight - 1) continue;
                        var counts = {
                            0: 0, // grass
                            1: 0, // water
                            2: 0, // dirt
                        };
                        var center = map.tileMap[i][j];
                        counts[center] += 1;
                        var surrounding = [                    [i - 1, j], // left
                            [i - 1, j - 1], // top-left
                            [i, j - 1], // top
                            [i + 1, j - 1], // top-right
                            [i + 1, j], // right
                            [i + 1, j + 1], // bottom-right
                            [i, j + 1], // bottom
                            [i - 1, j + 1], // bottom-left
                        ];
                        surrounding.forEach(([r, c]) => {
                            var tile = map.tileMap[r][c];
                            counts[tile] += 1;
                        });
                        if (counts[0] >= counts[1] && counts[0] >= counts[2]) {
                            map.tileMap[i][j] = 0; // grass
                        } else if (counts[1] >= counts[0] && counts[1] >= counts[2]) {
                            map.tileMap[i][j] = 1; // water
                        } else {
                            map.tileMap[i][j] = 2; // dirt
                        }
                    }
                }
            }
            numTiles = tilesList.length;
        },
        generateTrees: function() {
            for (let i = 0; i < map.tileMap.length; i++) {
              for (let j = 0; j < map.tileMap[i].length; j++) {
                if (map.tileMap[i][j] === 0 && !map.treeMap[i][j]) {
                  map.treeMap[i][j] = Math.random() < 0.01 ? 1 : 0;
                }
              }
            }
        }          
    };
    var waterAnimationFrame = 0;
    setInterval(function() {
        waterAnimationFrame = (waterAnimationFrame + 1) % 2;
        if (waterAnimationFrame === 0) {
            tiles.water.image.src = "res/water1.png";
        } else {
            tiles.water.image.src = "res/water2.png";
        }
    }, 300);
    generator.generateChunk();
    generator.generateTrees();   
    const directions = {
      north: {
        sound: sounds.walking,
        animationFrame: [12, 13, 14, 15],
        x: 0,
        y: -1,
        offsetX: 0,
        offsetY: screen.tileHeight / 15,
      },
      south: {
        sound: sounds.walking,
        animationFrame: [0, 1, 2, 3],
        x: 0,
        y: 1,
        offsetX: 0,
        offsetY: -screen.tileHeight / 15,
      },
      east: {
        sound: sounds.walking,
        animationFrame: [4, 5, 6, 7],
        x: 1,
        y: 0,
        offsetX: -screen.tileWidth / 15,
        offsetY: 0,
      },
      west: {
        sound: sounds.walking,
        animationFrame: [8, 9, 10, 11],
        x: -1,
        y: 0,
        offsetX: screen.tileWidth / 15,
        offsetY: 0,
      },
      northeast: {
        sound: sounds.walking,
        animationFrame: [16, 17, 18, 19],
        x: 1,
        y: -1,
        offsetX: -screen.tileWidth / 15,
        offsetY: screen.tileHeight / 15,
      },
      northwest: {
        sound: sounds.walking,
        animationFrame: [20, 21, 22, 23],
        x: -1,
        y: -1,
        offsetX: screen.tileWidth / 15,
        offsetY: screen.tileHeight / 15,
      },
      southeast: {
        sound: sounds.walking,
        animationFrame: [24, 25, 26, 27],
        x: 1,
        y: 1,
        offsetX: -screen.tileWidth / 15,
        offsetY: -screen.tileHeight / 15,
      },
      southwest: {
        sound: sounds.walking,
        animationFrame: [28, 29, 30, 31],
        x: -1,
        y: 1,
        offsetX: screen.tileWidth / 15,
        offsetY: -screen.tileHeight / 15,
      },
    };    
    function move(direction) {
      
    
      const dir = directions[direction];
      if (map.treeMap[player.worldX + dir.x][player.worldY + dir.y] === 3) {
        notifications.push("There is a rock right there!");
      } else if (!player.isMoving) {
        dir.sound.play();
        player.isMoving = true;
        player.animationFrame = dir.animationFrame[(player.animationFrame + 1) % 4];
        let moveInterval = setInterval(() => {
          screen.offsetX += dir.offsetX;
          screen.offsetY += dir.offsetY;
        }, 250 / 15);
        const distance = Math.abs(dir.x) + Math.abs(dir.y);
        const duration = 250 * distance;
        setTimeout(() => {
          player.worldX += dir.x;
          player.worldY += dir.y;
          clearInterval(moveInterval);
          player.isMoving = false;
          screen.offsetX = 0;
          screen.offsetY = 0;
        }, duration);
      }
    }
    a_canvas.addEventListener('mousemove', function(evt) {
        screen.mouseCanvasCoords = math.calculateCanvasCoordsFromWindowCoords(evt.clientX, evt.clientY);
        screen.oldSelectionBoxCoords = screen.selectionBoxCoords;
        screen.selectionBoxCoords = math.calculateTileClicked(screen.mouseCanvasCoords);
    }, false);
    a_canvas.addEventListener('click', function(evt) {
      player.movementQueue = [];
      var canvasCoords = math.calculateCanvasCoordsFromWindowCoords(evt.clientX, evt.clientY);
      var tileCoords = [Math.floor(canvasCoords[0] / screen.tileWidth), Math.floor(canvasCoords[1] / screen.tileHeight)];
      for (var i = 0; i < 2; i++) {
          var direction = tileCoords[i] < player["screenTile" + ["X", "Y"][i]] ? ["west", "north"][i] : ["east", "south"][i];
          var distance = Math.abs(tileCoords[i] - player["screenTile" + ["X", "Y"][i]]);
          for (var j = 0; j < distance; j++) {
              player.movementQueue.push(direction);
          }
      }
    }, false);    
    a_canvas.addEventListener('contextmenu', function(evt) {
        evt.preventDefault();
        return false;
    }, false);
    const KEY_CODE_ACTIONS = {
        87: "north",
        83: "south",
        65: "west",
        68: "east",
        46: "clear notifications",
        49: "select inventory slot 0",
        50: "select inventory slot 1",
        51: "select inventory slot 2",
        52: "select inventory slot 3",
        53: "select inventory slot 4",
        54: "select inventory slot 5",
        107: "zoom out",
        109: "zoom in",
        187: "unused",
        39: "rotate clockwise",
        37: "rotate counter-clockwise",
        27: "toggle options menu"
    };
    function handleKeyDown(e) {
        const action = KEY_CODE_ACTIONS[e.keyCode];
        if (!action) return;
        switch (action) {
          case "north":
          case "south":
          case "west":
          case "east":
            player.movementQueue.push(action);
            break;
          case "clear notifications":
            notifications = [];
            break;
          case "select inventory slot 0":
          case "select inventory slot 1":
          case "select inventory slot 2":
          case "select inventory slot 3":
          case "select inventory slot 4":
          case "select inventory slot 5":
            gameInterface.inventorySlotSelected = action.slice(-1);
            break;
          case "zoom out":
            screen.zoom(-2);
            break;
          case "zoom in":
            screen.zoom(2);
            break;
          case "rotate clockwise":
            screen.rotate(5);
            break;
          case "rotate counter-clockwise":
            screen.rotate(-5);
            break;
          case "toggle options menu":
            showOptionsMenu = !showOptionsMenu;
            break;
        }
      }
      function processPlayerMovement(){
        if (player.movementQueue.length > 0 && !player.isMoving) {
            move(player.movementQueue.shift());
        }
    }
    window.addEventListener("keydown", handleKeyDown, false)
    sounds.music.play();
    function updateEnemyPosition() {
        enemy.worldX += enemy.deltaX;
        enemy.worldY += enemy.deltaY;
      }
      function gameLoop() {
        graphics.redrawMap();
        graphics.drawSelectionBox(screen.oldSelectionBoxCoords, screen.selectionBoxCoords);
        graphics.drawPlayer();
        updateEnemyPosition();
        graphics.drawEnemy();
        graphics.drawTrees();
        graphics.drawCursor();
        graphics.drawNotifications();
        graphics.drawInterface();
        graphics.drawOptionsMenu();
        graphics.drawPlayerCoords();
        notifications.push(`${enemy.pixelX} ${enemy.pixelY}`);
        processPlayerMovement();
      }      
    setInterval((gameLoop), 1000 / config.fps);
}