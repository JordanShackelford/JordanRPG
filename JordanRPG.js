/* need to fix animations and stop repeating code so much */
window.onload = function() {
    //will use to rotate screen based on tilt of mobile device
    if (window.DeviceMotionEvent) {
        window.addEventListener("devicemotion", function() {

        }, false);
    } else {
        console.log("DeviceMotionEvent is not supported");
    }

    var a_canvas = document.getElementById("a");
    var context = a_canvas.getContext("2d");
    var showOptionsMenu = false;
    var cursor = new Image();
    cursor.src = "res/swordicon.png";
    var boat = new Image();
    boat.src = "res/boat.png";

    function Tile({ size = [1, 1], image } = {}) {
        [width, height] = size;
        this.width = screen.tileWidth * width;
        this.height = screen.tileHeight * height;
        this.image = new Image();
        this.image.src = image;
    }
    
    var notifications = ["Move with W,A,S,D keys or by clicking/tapping", "Press Esc to open options menu", "Use number keys to select inventory slot"];
    var map = {};
    var screen = {
        offsetX: 0,
        offsetY: 0,
        //TODO: base numrows and columns on screensize
        numRows: 15,
        numColumns: 15,
        mouseCanvasCoords: [0, 0],
        oldSelectionBoxCoords: [0, 0],
        selectionBoxCoords: [0, 0],
        tileX: 0,
        tileY: 0,
        notificationX: a_canvas.width * 0.02,
        notificationY: a_canvas.height * 0.045,
        notificationSpacing: 30,
        numOfInventorySlots: 4
    };
    screen.tileWidth = a_canvas.width / screen.numColumns;
    screen.tileHeight = a_canvas.height / screen.numRows;

    //TODO: function to update npc positions. Animate the movement if they are inside the player's vision
    var sounds = {
        walking: new Audio("res/walking.mp3")
    };
    var player = {
        name: "Jordan",
        screenTileX: Math.floor(screen.numRows / 2),
        screenTileY: Math.floor(screen.numColumns / 2),
        worldX: 150,
        worldY: 150,
        img: document.getElementById("player"),
        imgWidth: screen.tileWidth,
        imgHeight: screen.tileHeight * 2,
        moveSpeed: 5,
        isMoving: false,
        animationFrame: 0,
        movementQueue: []
    };
    player.pixelX = player.screenTileX * screen.tileWidth;
    player.pixelY = player.screenTileY * screen.tileHeight - screen.tileHeight;

    const movementDirections = {
        east: {
            worldX: screen.tileWidth,
            worldY: 0
        },
        west: {
            worldX: -screen.tileWidth,
            worldY: 0
        },
        north: {
            worldX: 0,
            worldY: -screen.tileHeight
        },
        south: {
            worldX: 0,
            worldY: screen.tileHeight
        }
    };

    player.animateMovement = function(direction, animationTime = 1000, numFrames = config.fps) {
        screen.offsetX = 0;
        screen.offsetY = 0;
        player.isMoving = true;
        const movement = movementDirections[direction];
        player.worldX += movement.worldX;
        player.worldY += movement.worldY;
    }

    var interface = {
        inventorySlotSelected: 0,
        icons: {
            hatchet: document.getElementById("hatchet"),
            treeSapling: document.getElementById("appletreesapling")
        },
    };
    var graphics = {

        redrawMap: function() {
            //camera centered on player so numRows and numColumns should always be odd
            var distLeftRight = (screen.numColumns - 1) / 2;
            var distTopBot = (screen.numRows - 1) / 2;
            var leftEdge = player.worldX - distLeftRight;
            var topEdge = player.worldY - distTopBot;
            for (var i = 0; i < screen.numColumns; i++) {
                for (var j = 0; j < screen.numRows; j++) {
                    switch (map.tileMap[Math.floor(leftEdge + i)][Math.floor(topEdge + j)]) {
                        case 0:
                            context.drawImage(tiles.grass.image, screen.tileWidth * i + screen.offsetX, screen.tileHeight * j + screen.offsetY, tiles.grass.width, tiles.grass.height);
                            break;
                        case 1:
                            context.drawImage(tiles.water.image, screen.tileWidth * i + screen.offsetX, screen.tileHeight * j + screen.offsetY, tiles.water.width, tiles.water.height);
                            break;
                        case 2:
                            context.drawImage(tiles.dirt.image, screen.tileWidth * i + screen.offsetX, screen.tileHeight * j + screen.offsetY, tiles.dirt.width, tiles.dirt.height);
                            break;
                    }
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
            //animation is completely broken
            var animationClips = [
                [8, 7],
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
                [155, 220]
            ];
            var xClip = animationClips[player.animationFrame][0];
            var yClip = animationClips[player.animationFrame][1];

            context.font = "40px Comic Sans MS";
            context.strokeStyle = "yellow";
            context.lineWidth = 2;
            context.strokeText(player.name, player.pixelX - player.imgWidth / 2, player.pixelY);
            if (map.tileMap[Math.floor(player.worldX)][Math.floor(player.worldY)] === 1) {
                context.drawImage(boat, player.pixelX, player.pixelY, player.imgWidth, player.imgHeight);
            } else {
                context.drawImage(player.img, xClip, yClip, 32, 64, player.pixelX, player.pixelY, player.imgWidth, player.imgHeight);
            }
        },
        drawEnemies: function() {
            // calculate the distance from the player to the edges of the screen
            var distLeftRight = (screen.numColumns - 1) / 2;
            var distTopBot = (screen.numRows - 1) / 2;
            var leftEdge = player.worldX - distLeftRight;
            var rightEdge = player.worldX + distLeftRight;
            var topEdge = player.worldY - distTopBot;
            var botEdge = player.worldY + distTopBot;

            // check if the enemy is within the bounds of the screen
            if (leftEdge < enemies.worldX < rightEdge && topEdge < enemies.worldY < botEdge) {
                // calculate the coordinates of the enemy's sprite on the sprite sheet
                var xClip = enemies.animationFrame * 47 + 8;
                var yClip = [7, 2, 2, 2, 150, 150, 150, 150, 76, 76, 76, 76, 220, 220, 220, 220][enemies.animationFrame];

                // draw the enemy on the screen
                context.drawImage(enemies.img, xClip, yClip, 32, 64, player.pixelX, player.pixelY, enemies.imgWidth, enemies.imgHeight);
            }
        },
        drawCursor: function() {
            context.drawImage(cursor, screen.mouseCanvasCoords[0], screen.mouseCanvasCoords[1], 100, 100);
        },
        drawInterface: function() {
            // calculate the dimensions and position of the inventory
            const inventoryWidth = a_canvas.width * 0.7;
            const inventoryHeight = a_canvas.height * 0.15;
            const inventoryX = (a_canvas.width - inventoryWidth) / 2.0;
            const inventoryY = (a_canvas.height - inventoryHeight) * 0.9;
          
            // draw the background of the inventory
            context.beginPath();
            context.rect(inventoryX, inventoryY, inventoryWidth, inventoryHeight);
            context.lineWidth = 3;
            context.strokeStyle = "rgba(0,0,255,0.7)";
            context.stroke();
            context.fillStyle = "rgba(0,255,255,0.3)";
            context.fill();
          
            // calculate the dimensions of each inventory slot
            const numOfSlots = 6;
            const slotWidth = inventoryWidth / numOfSlots;
            const slotHeight = inventoryHeight;
          
            // draw each inventory slot
            for (let i = 0; i < numOfSlots; i++) {
              const slotX = inventoryX + (slotWidth * i);
              const slotY = inventoryY;
              context.beginPath();
              context.lineWidth = 3;
              context.rect(slotX, slotY, slotWidth, slotHeight);
              //Todo: animate selection change, blue square sliding to the selected slot
              context.strokeStyle = "yellow";
              context.stroke();
          
              // draw the slot number in the center of each slot
              const fontSize = 72;
              context.fillStyle = "white";
              context.font = fontSize + "px Arial";
              context.fillText(
                i + 1,
                slotX + (slotWidth / 2) - (fontSize / 3),
                slotY + (slotHeight / 2) + (fontSize / 3),
                slotWidth
              );
              //slot numbers are not quite centered
            }
          
            // draw the selected slot with a red border
            const selectedSlotX = inventoryX + (slotWidth * interface.inventorySlotSelected);
            const selectedSlotY = inventoryY;
            context.lineWidth = 6;
            context.strokeStyle = "rgb(150,0,0)";
            context.beginPath();
            context.rect(selectedSlotX,selectedSlotY, slotWidth, slotHeight);
            context.stroke();
            
            // draw an image in the first inventory slot
            context.drawImage(interface.icons.hatchet, inventoryX, inventoryY, slotWidth, slotHeight);
            },
          
        drawPlayerCoords: function() {
            // set the fill style and font
            context.fillStyle = "yellow";
            context.font = "14px Arial";

            // calculate the player's chunk coordinates
            var chunkX = Math.floor(player.squareX / screen.numColumns);
            var chunkY = Math.floor(player.squareY / screen.numRows);

            // draw the player's screen and chunk coordinates
            context.fillText(`Screen Coords: (${player.squareX},${player.squareY})`, player.pixelX, player.pixelY + player.imgHeight + 20);
            context.fillText(`Chunk Coords: (${chunkX},${chunkY})`, player.pixelX, player.pixelY + player.imgHeight + 40);
        },
        drawTrees: function() {
            var distLeftRight = (screen.numColumns - 1) / 2;
            var distTopBot = (screen.numRows - 1) / 2;
            var leftEdge = player.worldX - distLeftRight;
            var topEdge = player.worldY - distTopBot;
            //instead of looping throught each square and checking if there is a tree there
            //I should just loop through the trees
            for (var i = 0; i < screen.numColumns; i++) {
                for (var j = 0; j < screen.numRows; j++) {
                    switch (map.treeMap[Math.floor(leftEdge + i)][Math.floor(topEdge + j)]) {
                        case 1:
                            context.drawImage(tiles.tree1.image, (screen.tileWidth * i) - screen.tileWidth / 2 + screen.offsetX, screen.tileHeight * j + screen.offsetY, tiles.tree1.width, tiles.tree1.height);
                            break;
                        case 2:
                            context.drawImage(tiles.tree2.image, screen.tileWidth * i - screen.tileWidth / 2 + screen.offsetX, screen.tileHeight * j + screen.offsetY, tiles.tree2.width, tiles.tree2.height);
                            break;
                        case 4:
                            context.drawImage(tiles.flower.image, screen.tileWidth * i + screen.offsetX, screen.tileHeight * j + screen.offsetY, tiles.flower.width, tiles.flower.height);
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
        drawNotifications: function() {
            // set the font and stroke style
            context.font = "40px Arial";
            context.lineWidth = 4;
            context.strokeStyle = "red";

            // calculate the dimensions and position of the notifications box
            var boxWidth = a_canvas.width * 0.6;
            var boxHeight = 200;
            var boxX = a_canvas.width * 0.01;
            var boxY = a_canvas.height * 0.01;

            // draw the notifications box
            context.beginPath();
            context.rect(boxX, boxY, boxWidth, boxHeight);
            context.stroke();
            context.fillStyle = "rgba(0,150,150,0.5)";
            context.fill();

            // draw each notification in the notifications array
            for (var i = 0; i < notifications.length; i++) {
                // remove the oldest notification if there are more than 6 notifications
                if (notifications.length > 6) {
                    notifications.shift();
                }

                // draw the notification text
                context.fillStyle = "yellow";
                context.fillText(notifications[i], screen.notificationX, screen.notificationY + screen.notificationSpacing * i);
            }
        },
        drawOptionsMenu: function() {
            // only draw the options menu if it is visible
            if (showOptionsMenu === true) {
                // calculate the dimensions and position of the menu
                var menuWidth = a_canvas.width * 0.9;
                var menuHeight = a_canvas.height * 0.9;
                var menuX = (a_canvas.width - menuWidth) / 2;
                var menuY = (a_canvas.height - menuHeight) / 2;

                // draw the menu
                context.beginPath();
                context.rect(menuX, menuY, menuWidth, menuHeight);
                context.lineWidth = 3;
                context.strokeStyle = "yellow";
                context.stroke();
                context.fillStyle = "rgb(50,50,50)";
                context.fill();
            }
        }
    };

    var math = {
        calculateTileClicked: function(coords) {
            var x = Math.floor(coords[0] / screen.tileWidth) * screen.tileWidth;
            var y = Math.floor(coords[1] / screen.tileHeight) * screen.tileHeight;
            return [x, y];
        },
        calculateCanvasCoordsFromWindowCoords: function(windowX, windowY) {
            var rect = context.canvas.getBoundingClientRect();
            var canvasX = (windowX - rect.left) / (rect.right - rect.left) * context.canvas.width;
            var canvasY = (windowY - rect.top) / (rect.bottom - rect.top) * context.canvas.height;
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
    // Convert the data arrays to Tile objects
    for (var key in tiles) {
        if (tiles.hasOwnProperty(key)) {
            var data = tiles[key];
            tiles[key] = new Tile({ size: data.slice(0, 2), image: data[2] });
        }
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

            //the more times you run this, the more the different terrain types should cluster
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
                        // Skip tiles that are on the edge or corner of the chunk
                        if (i === 0 || j === 0 || i === chunkWidth - 1 || j === chunkHeight - 1) continue;

                        var counts = {
                            0: 0, // grass
                            1: 0, // water
                            2: 0, // dirt
                        };

                        var center = map.tileMap[i][j];
                        counts[center] += 1;

                        var surrounding = [
                            [i - 1, j], // left
                            [i - 1, j - 1], // top-left
                            [i, j - 1], // top
                            [i + 1, j - 1], // top-right
                            [i + 1, j], // right
                            [i + 1, j + 1], // bottom-right
                            [i, j + 1], // bottom
                            [i - 1, j + 1], // bottom-left
                        ];

                        // Update the counts for each surrounding tile
                        for (var [r, c] of surrounding) {
                            var tile = map.tileMap[r][c];
                            counts[tile] += 1;
                        }

                        // Update the center tile based on the counts
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

    //pre-gameloop setup
    generator.generateChunk();

    var processPlayerMovement = setInterval(function() {
        if (player.movementQueue.length > 0) {
            var direction = player.movementQueue.shift();
            switch (direction) {
                case "west":
                    moveWest();
                    break;
                case "east":
                    moveEast();
                    break;
                case "north":
                    moveNorth();
                    break;
                case "south":
                    moveSouth();
                    break;
                case "northwest":
                    moveNorthWest();
                    break;
                case "northeast":
                    moveNorthEast();
                    break;
                case "southwest":
                    moveSouthWest();
                    break;
                case "southeast":
                    moveSouthEast();
                    break;
            }
        }
    }, 1000 / player.moveSpeed);

    var gameLoop = setInterval(function() {
        graphics.redrawMap();
        graphics.drawSelectionBox(screen.oldSelectionBoxCoords, screen.selectionBoxCoords);
        graphics.drawPlayer();
        graphics.drawTrees();
        graphics.drawCursor();
        graphics.drawNotifications();
        graphics.drawInterface();
        graphics.drawOptionsMenu();
    }, 1000 / config.fps);

    //TODO: MAKE DRY
    function moveNorth() {
        sounds.walking.play();
        if (player.animationFrame > 2) {
            player.animationFrame = 0;
        } else {
            player.animationFrame++;
        }

        if (map.treeMap[player.worldX][player.worldY + 1] === 3) {
            notifications.push("There is a rock right there!");
        } else {
            if (!player.IsMoving) {
                player.isMoving = true;
                var moveUp = setInterval(function() {
                    screen.offsetY += screen.tileHeight / 15;
                }, 250 / 15);
                setTimeout(function() {
                    player.worldY -= 1;
                    clearInterval(moveUp);
                    player.isMoving = false;
                    screen.offsetY = 0;
                }, 250);
            }
        }
    }

    function moveSouth() {
        sounds.walking.play();
        if (player.animationFrame > 2) {
            player.animationFrame = 0;
        } else {
            player.animationFrame++;
        }

        if (map.treeMap[player.worldX][player.worldY + 1] === 3) {
            notifications.push("There is a rock right there!");
        } else {
            if (!player.IsMoving) {
                player.isMoving = true;
                var moveDown = setInterval(function() {
                    screen.offsetY -= screen.tileHeight / 15;
                }, 250 / 15);
                setTimeout(function() {
                    player.worldY += 1;
                    clearInterval(moveDown);
                    player.isMoving = false;
                    screen.offsetY = 0;
                }, 250);
            }
        }
    }

    function moveEast() {
        sounds.walking.play();
        player.animationFrame++;
        if (map.treeMap[player.worldX + 1][player.worldY] === 3) {
            notifications.push("There is a rock right there!");
        } else {
            if (!player.IsMoving)
                player.isMoving = true;
            var moveRight = setInterval(function() {
                screen.offsetX -= screen.tileWidth / 15;
            }, 250 / 15);
            setTimeout(function() {
                player.worldX += 1;
                clearInterval(moveRight);
                player.isMoving = false;
                screen.offsetX = 0;
            }, 250);
        }
    }

    function moveWest() {
        sounds.walking.play();
        player.animationFrame = 8;
        if (map.treeMap[player.worldX - 1][player.worldY] === 3) {
            notifications.push("There is a rock right there!");
        } else {
            if (!player.IsMoving) {
                player.isMoving = true;
                var moveLeft = setInterval(function() {
                    screen.offsetX += screen.tileWidth / 15;
                }, 250 / 15);
                setTimeout(function() {
                    player.worldX -= 1;
                    clearInterval(moveLeft);
                    player.isMoving = false;
                    screen.offsetX = 0;
                }, 250);
            }
        }
    }

    a_canvas.addEventListener('mousemove', function(evt) {
        screen.mouseCanvasCoords = math.calculateCanvasCoordsFromWindowCoords(evt.clientX, evt.clientY);
        screen.oldSelectionBoxCoords = screen.selectionBoxCoords;
        screen.selectionBoxCoords = math.calculateTileClicked(screen.mouseCanvasCoords);
    }, false);

    a_canvas.addEventListener('click', function(evt) {
        var canvasCoords = math.calculateCanvasCoordsFromWindowCoords(evt.clientX, evt.clientY);
        var tileCoords = [Math.floor(canvasCoords[0] / screen.tileWidth), Math.floor(canvasCoords[1] / screen.tileHeight)];

        if (tileCoords[0] < player.screenTileX) {
            var distance = player.screenTileX - tileCoords[0];
            for (var i = 0; i < distance; i++) {
                player.movementQueue.push("west");
            }
        } else if (tileCoords[0] > player.screenTileX) {
            var distance = tileCoords[0] - player.screenTileX;
            for (var i = 0; i < distance; i++) {
                player.movementQueue.push("east");
            }
        }

        if (tileCoords[1] < player.screenTileY) {
            var distance = player.screenTileY - tileCoords[1];
            for (var i = 0; i < distance; i++) {
                player.movementQueue.push("north");
            }
        } else if (tileCoords[1] > player.screenTileY) {
            var distance = tileCoords[1] - player.screenTileY;
            for (var i = 0; i < distance; i++) {
                player.movementQueue.push("south");
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
                player.movementQueue.push(action);
                break;
            case "south":
                player.movementQueue.push(action);
                break;
            case "west":
                player.movementQueue.push(action);
                break;
            case "east":
                player.movementQueue.push(action);
                break;
            case "clear notifications":
                notifications = [];
                break;
            case "select inventory slot 0":
                interface.inventorySlotSelected = 0;
                break;
            case "select inventory slot 1":
                interface.inventorySlotSelected = 1;
                break;
            case "select inventory slot 2":
                interface.inventorySlotSelected = 2;
                break;
            case "select inventory slot 3":
                interface.inventorySlotSelected = 3;
                break;
            case "select inventory slot 4":
                interface.inventorySlotSelected = 4;
                break;
            case "select inventory slot 5":
                interface.inventorySlotSelected = 5;
                break;
            case "zoom out":
                screen.numRows -= 2;
                screen.numColumns -= 2;
                screen.tileWidth = a_canvas.width / screen.numColumns;
                screen.tileHeight = a_canvas.height / screen.numRows;
                break;
            case "zoom in":
                screen.numRows += 2;
                screen.numColumns += 2;
                screen.tileWidth = a_canvas.width / screen.numColumns;
                screen.tileHeight = a_canvas.height / screen.numRows;
                break;
            case "rotate clockwise":
                context.rotate(1 * Math.PI / 180);
                break;
            case "rotate counter-clockwise":
                context.rotate(-1 * Math.PI / 180);
                break;
            case "toggle options menu":
                showOptionsMenu = !showOptionsMenu;
        }
    }

    window.addEventListener("keydown", handleKeyDown, false);

}