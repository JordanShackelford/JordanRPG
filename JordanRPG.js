window.onload = function() {

    // Simulated in-app purchase data
    const purchasedSkins = {
        "Classic": {
            mainFont: "bold 40px 'Courier New'",
            subFont: "italic 35px 'Courier New'",
            highlightMain: 'green',
            highlightSub: 'blue',
            background: "#000",
            textShadow: "2px 2px #000",
            clickSound: new Audio('classic_click.mp3'),
            tooltips: ["Start", "Settings", "Credits"]
        },
        "Modern": {
            mainFont: "bold 40px 'Arial'",
            subFont: "italic 35px 'Arial'",
            highlightMain: 'yellow',
            highlightSub: 'orange',
            background: "linear-gradient(to bottom, #00f, #f00)",
            hoverAnimation: "bounce",
            clickSound: new Audio('modern_click.mp3'),
            accessibility: {
                textToSpeech: true
            }
        }
    };



    // Simulating a chosen skin from in-app purchases
    let activeSkin = purchasedSkins["Modern"];

    const specialTiles = {
        'quicksand': {
            image: new Image(),
            width: 64,
            height: 64
        },
        'lava': {
            image: new Image(),
            width: 64,
            height: 64,
            effect: 'damageOverTime'
        },
        'bonus': {
            image: new Image(),
            width: 64,
            height: 64,
            effect: 'extraPoints'
        },
        'power-up': {
            image: new Image(),
            width: 64,
            height: 64,
            effect: 'temporaryBoost'
        },
        'cutsceneTrigger': {
            image: new Image(),
            width: 64,
            height: 64,
            effect: 'initiateCutscene'
        },
        'boost': {
            image: new Image(),
            width: 64,
            height: 64,
            effect: 'speedBoost'
        },
        'questObjective': {
            image: new Image(),
            width: 64,
            height: 64,
            effect: 'advanceQuest'
        },
        'trap': {
            image: new Image(),
            width: 64,
            height: 64,
            effect: 'randomNegativeEffect'
        },
        'randomizer': {
            image: new Image(),
            width: 64,
            height: 64,
            effect: 'randomEffect'
        },
        'premium': {
            image: new Image(),
            width: 64,
            height: 64,
            effect: 'unlockViaPurchase'
        },
        'PvPZone': {
            image: new Image(),
            width: 64,
            height: 64,
            effect: 'initiateCombat'
        },
        'resource': {
            image: new Image(),
            width: 64,
            height: 64,
            effect: 'collectResources'
        },
        'seasonal': {
            image: new Image(),
            width: 64,
            height: 64,
            effect: 'seasonalChange'
        },
        'arena': {
            image: new Image(),
            width: 64,
            height: 64,
            effect: 'miniPvPBattle'
        },
        'analytics': {
            image: new Image(),
            width: 64,
            height: 64,
            effect: 'trackInteractions'
        }
    };

    const distanceLookup = []; // Pre-calculated distances, filled during initialization
    const scaleLookup = []; // Pre-calculated scales, filled during initialization

    function updateGlobalTreeVariables() {
        const cT = Date.now();
        windStrength = Math.sin((cT - startTime) * 0.001);
        windAngle = windStrength * Math.PI / 4;
        cosWindAngle = Math.cos(windAngle) * 10;
    }

    // Call this function at a set interval to update tree-related variables
    setInterval(updateGlobalTreeVariables, 200);

    let gameState = {
        offsetX: 0,
        offsetY: 0,
    };

    // Set the image source for the quicksand tile
    specialTiles['quicksand'].image.src = 'res/sand.jpg';
    let tileProperties = {};
    const enemies = [];

for (let i = 0; i < 50; i++) {
    enemies.push({
        worldX: Math.floor(Math.random() * 250),
        worldY: Math.floor(Math.random() * 250),
        health: 100, // Initial health
        maxHealth: 100 // Maximum health
    });
    enemies[0].worldX = 150;
    enemies[0].worldY = 151;
}

    let portals = [];
    let towers = [];
    towers.push[150,150];
    let showOptionsMenu = !1,
        a_canvas = document.getElementById("a"),
        context = a_canvas.getContext("2d"),
        cursor = new Image(),
        boat = new Image(),
        Tile = function({
            size: [e = 1, t = 1],
            image: n,
            onLoad
        } = {}) {
            this.width = screen.tileWidth * e;
            this.height = screen.tileHeight * t;
            this.image = new Image();
            this.image.src = n;
            this.image.addEventListener('load', () => {
                this.isLoaded = true;
                if (onLoad) onLoad(this);
            });
        };
    cursor.src = "res/swordicon.png";
    boat.src = "res/boat.png";
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
        notificationSpacing: 30,
        numOfInventorySlots: 4,
        get notificationX() {
            return 0.02 * a.width;
        },
        get notificationY() {
            return 0.045 * a.height;
        },
        updateMouseCoords: function(x, y) {
            this.mouseCanvasCoords = [x, y];
        },
        updateSelectionBox: function(x, y) {
            this.oldSelectionBoxCoords = this.selectionBoxCoords;
            this.selectionBoxCoords = [x, y];
        }
    };
    s = screen;
    s.tileWidth = a.width / s.numColumns, s.tileHeight = a.height / s.numRows;
    var sounds = {
        walking: new Audio("res/walking.mp3"),
        music: new Audio("res/backgroundmusic.mp3"),
        attack: new Audio("res/attack.mp3"),
        enemyDefeated: new Audio("res/enemyDefeated.mp3"),
        openOptions: new Audio("res/openOptions.mp3"),
        closeOptions: new Audio("res/closeOptions.mp3"),
        changeItem: new Audio("res/changeitem.mp3"),
        teleport: new Audio("res/teleport.mp3")
        /*inventoryOpen: new Audio("res/inventoryOpen.wav"),
        /*inventoryClose: new Audio("res/inventoryClose.wav"),
        pickupItem: new Audio("res/pickupItem.wav"),
        useItem: new Audio("res/useItem.wav"),
        enemyAlert: new Audio("res/enemyAlert.wav"),
        playerHurt: new Audio("res/playerHurt.wav"),
        playerDeath: new Audio("res/playerDeath.wav"),
        levelUp: new Audio("res/levelUp.wav"),
        questComplete: new Audio("res/questComplete.wav"),
        ambientNature: new Audio("res/ambientNature.mp3"),
        ambientCave: new Audio("res/ambientCave.mp3")
        */
    };
    sounds.music.volume = 0.07; // 1% volume      
    var player = {
        name: "Jordan",
        screenTileX: Math.floor(screen.numRows / 2),
        screenTileY: Math.floor(screen.numColumns / 2),
        worldX: 150,
        worldY: 150,
        currentAction: "none",
        img: document.getElementById("player"),
        imgWidth: screen.tileWidth,
        imgHeight: screen.tileHeight * 2,
        moveSpeed: 1,
        isMoving: false,
        animationFrame: 0,
        movementQueue: [],
        deltaX: 0,
        deltaY: 0,
        hp: 100,
        maxHp: 100,
        attackPower: 10, // The amount of damage the player can deal
        defense: 5, // The amount of damage the player can resist
        level: 1, // Current player level
        xp: 0, // Current experience points
        nextLevelXp: 100, // XP needed for next level
        skills: [], // Skills or abilities the player has
        inventory: [], // Items the player is carrying
        gold: 0, // Currency
        statusEffects: [] // Any status effects applied to the player, like "poisoned" or "stunned"
    };
    player.pixelX = player.screenTileX * screen.tileWidth, player.pixelY = player.screenTileY * screen.tileHeight - screen.tileHeight;
    var gameInterface = {
        inventorySlotSelected: 0,
        icons: {},
        miniMap: {}, // Mini-map display settings
        actionBar: [], // Quick action buttons for skills or items
        notifications: [], // In-game notifications queue
        chat: {
            messages: [],
            muteList: []
        }, // Chat features
        playerStats: {}, // Real-time display of player stats like HP, MP, etc.
        questLog: [], // List of active and completed quests
        settings: { // Customizable UI settings
            theme: 'dark', // UI theme
            language: 'en', // Game language
            audioVolume: 0.5 // Audio settings
        },
        social: { // Social features like friend list, party, etc.
            friends: [],
            party: {}
        },
        optionsMenuSelected: 3
    };
    var elements = ["hatchet", "potion", "sword", "shield", "bow", "scroll", "apple", "dagger", "sword", "bow", "arrow", "wood", "stone", "iron", "gold", "diamond", "coal", "fish", "fishingspear"];
    for (var i = 0; i < elements.length; i++) {
        gameInterface.icons[elements[i]] = document.getElementById(elements[i]);
    }
    let startTime = Date.now();
    //drawnotifications setup
    let imperfections = [];

   
    let enemyImg;
    if (!enemyImg) {
        enemyImg = new Image();
        enemyImg.src = "res/enemy.png";
    }
    let trailFrames = [];

    let enemyHealthBarGradient = null,
        enemyGlossyGradient = null;
    const itemMapping = {
        0: "hatchet",
        1: "potion",
        2: "sword",
        3: "shield",
        4: "bow",
        5: "scroll"
    };

    let fade = 0;
    var graphics = {
        drawMinimap: () => {
            const scale = 0.2; // scale factor for the minimap
            const offsetX = a_canvas.width - a_canvas.width * scale; // position the minimap at the right corner
            const offsetY = 0; // position at the top

            const scaledW = w * scale;
            const scaledH = h * scale;

            for (let xI = 0; xI < map.tileMap.length; xI += 5) {
                for (let yI = 0; yI < map.tileMap[0].length; yI += 5) {
                    const tV = map.tileMap[xI][yI];
                    const tk = tileTypes[tV] || 'skip';

                    if (tk === 'skip') continue;

                    const x = scaledW * xI + offsetX;
                    const y = scaledH * yI + offsetY;
                    const tileImage = tileImages[tk];

                    if (tileImage) {
                        context.drawImage(tileImage, x, y, scaledW, scaledH);
                    }
                }
            }
        },
        drawMap: () => {
            context.save();
          
            const {
                tileWidth: tileW,
                tileHeight: tileH,
                offsetX: offset_X,
                offsetY: offset_Y,
                numColumns: num_Cols,
                numRows: num_Rows
            } = screen;
          
            const { tileMap } = map;
            const { worldX, worldY } = player;
            const leftEdge = worldX - (num_Cols - 1) / 2;
            const topEdge = worldY - (num_Rows - 1) / 2;
            const min_X_Index = Math.max(0, leftEdge - 6);
            const max_X_Index = Math.min(tileMap.length, leftEdge + num_Cols + 6);
            const min_Y_Index = Math.max(0, topEdge - 6);
            const max_Y_Index = Math.min(tileMap[0].length, topEdge + num_Rows + 6);
            const tileTypes = ['grass', 'water', 'dirt', 'wood_wall', 'treasure', 'event_tile', 'portal', 'NPC_tile', 'story_tile'];
            const tileImages = {};
            tileTypes.forEach((tileKey) => {
                tileImages[tileKey] = tiles[tileKey]?.image;
            });
            context.shadowColor = 'rgba(0, 0, 0, 0.2)';
            context.shadowBlur = 5;
            for (let x_Index = min_X_Index; x_Index < max_X_Index; x_Index++) {
                for (let y_Index = min_Y_Index; y_Index < max_Y_Index; y_Index++) {
                    const [i, j, tileValue] = [x_Index - leftEdge, y_Index - topEdge, tileMap[x_Index][y_Index]];
                    const tileKey = tileTypes[tileValue] || 'skip';
          
                    if (tileKey === 'skip') continue;
          
                    const [x, y] = [tileW * i + offset_X, tileH * j + offset_Y];
                    const tileImage = tileImages[tileKey];
if (tileImage) {
    // Draw grass tile first as background
    context.drawImage(tileImages['grass'], x, y, tileW, tileH);

    if (tileKey === 'portal') {
        // Save the current context state
        context.save();

        // Draw a circular gradient effect as a background
        const grd = context.createRadialGradient(x + tileW / 2, y + tileH / 2, tileW / 4, x + tileW / 2, y + tileH / 2, tileW / 2);
        grd.addColorStop(0, 'purple');
        grd.addColorStop(0.5, 'violet');
        grd.addColorStop(1, 'black');
        context.fillStyle = grd;
        context.beginPath();
        context.arc(x + tileW / 2, y + tileH / 2, tileW / 2, 0, Math.PI * 2);
        context.fill();

        // Clip to a rounded region
        context.beginPath();
        context.arc(x + tileW / 2, y + tileH / 2, tileW / 2, 0, Math.PI * 2);
        context.clip();

        const time = Date.now() * 0.005;  // Increased time multiplier for faster rotation
        const numLayers = 4;  // Increased to 4 layers

        for (let i = 0; i < numLayers; i++) {
            const rotationAngle = Math.sin(time + i) * Math.PI;
            const layerOpacity = (i + 1) / numLayers;

            // Translate and rotate
            context.translate(x + tileW / 2, y + tileH / 2);
            context.rotate(rotationAngle);

            // Apply opacity
            context.globalAlpha = layerOpacity;

            // Draw the portal image, but offset it so that it's centered
            context.drawImage(tileImage, -tileW / 2, -tileH / 2, tileW, tileH);

            // Reverse transformations for the next iteration
            context.rotate(-rotationAngle);
            context.translate(-(x + tileW / 2), -(y + tileH / 2));
        }

        // Restore the original context state
        context.restore();
        context.globalAlpha = 1;  // Reset opacity
    } else {
        // Draw normally for other tiles
        context.drawImage(tileImage, x, y, tileW, tileH);
    }
}


                }
            }
          
            context.shadowColor = 'transparent';
            context.shadowBlur = 0;
            context.restore();
        },
        drawSelectionBox: function(nC, playerAction) {
            function setGradient(tN, pF, x, y, w, h) {
                const gS = context.createLinearGradient(x, y, x + w, y + h);
                gS.addColorStop(0, `hsla(${tN*360},100%,50%,${.5+.5*pF})`);
                gS.addColorStop(1, `hsla(${(tN*360+180)%360},100%,50%,${.5+.5*pF})`);
                context.strokeStyle = gS;
            }

            function setStrokes(pF, t) {
                context.lineWidth = 3 + 5 * pF;
                context.lineJoin = "round";
                context.setLineDash([8 + 5 * pF, (8 + 5 * pF) * (1 + 0.2 * Math.sin(t / 500))]);
            }

            function setRotation(angle, x, y, w, h) {
                context.translate(x + w / 2, y + h / 2);
                context.rotate(angle);
                context.translate(-(x + w / 2), -(y + h / 2));
            }

            function drawBox(x, y, w, h, dR) {
                context.beginPath();
                context.moveTo(x + dR, y);
                context.arcTo(x + w, y, x + w, y + h, dR);
                context.arcTo(x + w, y + h, x, y + h, dR);
                context.arcTo(x, y + h, x, y, dR);
                context.arcTo(x, y, x + w, y, dR);
                context.stroke();
            }

            function drawCircle(circleX, circleY, circleRadius, pF) {
                context.setLineDash([]);
                context.beginPath();
                context.arc(circleX, circleY, circleRadius * pF, 0, Math.PI * 2);
                context.stroke();
            }

            const drawSelectionBox = function(nC, playerAction) {
                const t = Date.now(),
                    f = 2000,
                    tN = (t % f) / f,
                    pF = Math.sin(tN * Math.PI),
                    w = screen.tileWidth,
                    h = screen.tileHeight,
                    x = nC[0],
                    y = nC[1];

                context.save();

                setGradient(tN, pF, x, y, w, h);
                setStrokes(pF, t);

                if (playerAction === 'attack') {
                    setRotation(Math.PI / 4, x, y, w, h);
                }

                drawBox(x, y, w, h, 5 + Math.sin((t % 5000 / 5000) * Math.PI) * 10);
                drawCircle(x + w / 2, y + h / 2, w / 4, pF);

                context.restore();
            };
            const t = Date.now(),
                f = 2000,
                tN = (t % f) / f,
                pF = Math.sin(tN * Math.PI),
                w = screen.tileWidth,
                h = screen.tileHeight,
                x = nC[0],
                y = nC[1];

            context.save();

            setGradient(tN, pF, x, y, w, h);
            setStrokes(pF, t);

            if (playerAction === 'attack') {
                setRotation(Math.PI / 4, x, y, w, h);
            }

            drawBox(x, y, w, h, 5 + Math.sin((t % 5000 / 5000) * Math.PI) * 10);
            drawCircle(x + w / 2, y + h / 2, w / 4, pF);

            context.restore();
        },

        drawPlayer: () => {
            const animationFrames = [8, 7, 55, 2, 102, 2, 153, 2, 8, 150, 51, 150, 104, 150, 155, 150, 8, 76, 51, 76, 104, 76, 155, 76, 8, 220, 51, 220, 104, 220, 155, 220];
            const currentFrameIndex = player.animationFrame << 1;
            let dustParticles = [];
            function clearShadowSettings() {
                context.shadowColor = 'transparent';
                context.shadowBlur = 0;
                context.shadowOffsetX = 0;
                context.shadowOffsetY = 0;
            }
        
            function drawDustCloud() {
                // Generate 10 dust particles with random attributes
                for (let i = 0; i < 10; i++) {
                    let dustX = player.pixelX + (Math.random() - 0.5) * 40;
                    let dustY = player.pixelY + player.imgHeight + (Math.random() - 0.5) * 20;
                    let dustSize = Math.random() * 8 + 2;
                    let dustOpacity = Math.random() * 0.6 + 0.2;
        
                    dustParticles.push({
                        x: dustX,
                        y: dustY,
                        size: dustSize,
                        opacity: dustOpacity
                    });
                }
        
                // Draw dust particles
                context.globalAlpha = 1;
                dustParticles.forEach(particle => {
                    context.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
                    context.beginPath();
                    context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                    context.fill();
                });
            }
        
            function drawCombatIcon() {
                context.drawImage(sweatDropImg, player.pixelX, player.pixelY - 10, 8, 8);
            }
        
            function drawPlayerAndTrail() {
                trailFrames.forEach((frame, index) => {
                    const alpha = (5 - index) / 10;
                    context.globalAlpha = alpha;
                    context.drawImage(player.img, animationFrames[currentFrameIndex], animationFrames[currentFrameIndex + 1], 32, 64, frame.x, frame.y, player.imgWidth, player.imgHeight);
                });
        
                context.globalAlpha = 1;
                context.drawImage(player.img, animationFrames[currentFrameIndex], animationFrames[currentFrameIndex + 1], 32, 64, player.pixelX, player.pixelY, player.imgWidth, player.imgHeight);
            }
        
            function drawAdditionalAnimations() {
                if (player.hasCape) {
                    context.drawImage(cloakImg, player.pixelX, player.pixelY, 32, 64);
                }
            }
        
            // Function Body
            clearShadowSettings();
        
            if (player.isMoving) {
                drawDustCloud();  // New feature
            }
        
            if (player.inCombat) {
                drawCombatIcon();
            }
        
            drawPlayerAndTrail();
        
            drawAdditionalAnimations();
        },
        
        drawEnemies: () => {
            // The logic you used to calculate the world coordinates of clicked trees
            const lR = Math.floor(screen.numColumns / 2);
            const tB = Math.floor(screen.numRows / 2);
          
            // Iterate through all enemies
            for (const enemy of enemies) {
              // Calculate relative coordinates
              const i = enemy.worldX - player.worldX;
              const j = enemy.worldY - player.worldY;
              
              // Only draw if the enemy is within the visible window
              if (Math.abs(i) <= lR && Math.abs(j) <= tB) {
                // Calculate the drawing coordinates
                const drawX = (i + lR) * screen.tileWidth + screen.offsetX;
                const drawY = (j + tB) * screen.tileHeight + screen.offsetY;
                
                context.drawImage(enemyImg, drawX, drawY, screen.tileWidth, screen.tileHeight);
              }
            }
          },
          
          
          
          
              
        drawCursor: function() {
            const [mX, mY] = screen.mouseCanvasCoords;
            const tX = Math.floor((mX - screen.offsetX) / screen.tileWidth),
                tY = Math.floor((mY - screen.offsetY) / screen.tileHeight);

            const tileValue = map.tileMap?.[tY]?.[tX];
            if (tileValue !== undefined) {
                const tileNames = ['Grass', 'Water', 'Dirt', 'Unknown'];
                context.drawImage(cursor, mX, mY, 100, 100);
                if(!showOptionsMenu){
                    context.font = "18px Arial";
                    context.fillStyle = 'white';
                    context.fillText(tileNames[tileValue] || 'Unknown', mX + 10, mY - 10);
                }
            }
        },
        drawInterface: function() {
            const drawInterfaceBackground = (context, iX, iY, iW, iH, r) => {
                const g = context.createLinearGradient(iX, iY, iX + iW, iY);
                g.addColorStop(0, "rgba(46, 43, 95, 0.6)");
                g.addColorStop(1, "rgba(0, 12, 36, 0.8)");

                context.fillStyle = g;
                context.strokeStyle = "#5F9EA0";
                context.lineWidth = 5;
                context.shadowColor = 'black';
                context.shadowBlur = 20;
                context.shadowOffsetX = 10;
                context.shadowOffsetY = 10;

                context.beginPath();
                context.moveTo(iX + r, iY);
                context.lineTo(iX + iW - r, iY);
                context.arcTo(iX + iW, iY, iX + iW, iY + r, r);
                context.lineTo(iX + iW, iY + iH - r);
                context.arcTo(iX + iW, iY + iH, iX + iW - r, iY + iH, r);
                context.lineTo(iX + r, iY + iH);
                context.arcTo(iX, iY + iH, iX, iY + iH - r, r);
                context.lineTo(iX, iY + r);
                context.arcTo(iX, iY, iX + r, iY, r);
                context.closePath();
                context.fill();
                context.stroke();
            };
            const drawItemSlots = (context, iX, iY, sW, sH, sp, icons, qtys) => {
                for (let i = 0, x, y, w, h; i < qtys.length; i++) {
                    x = iX + sW * i + sp;
                    y = iY + sp;
                    w = sW - 2 * sp;
                    h = sH - 2 * sp;
                    context.shadowColor = "black";
                    context.drawImage(icons[["hatchet", "potion", "sword", "shield", "bow", "scroll"][i]], x, y, w, h);
                    context.fillStyle = "black";
                    context.font = "20px 'Times New Roman'";
                    context.fillText(qtys[i], x + w - 30, y + h - 10);
                }
            };
            function renderInventorySlots(context, tG, slots, iX, iY, sW, sH, gameInterface) {
                context.fillStyle = tG;
                context.font = "50px 'Impact'";
                context.textAlign = "center";
                context.textBaseline = "middle";
                context.shadowColor = 'black';
                context.shadowBlur = 10;
                context.lineWidth = 6;
                context.textShadowColor = 'rgba(0, 0, 0, 0.3)';
                context.textShadowBlur = 2;
              
                for (let i = 0, x, y; i < slots; i++) {
                  x = iX + sW * i + sW / 2;
                  y = iY + sH / 2;
                  if (i === gameInterface.inventorySlotSelected) {
                    context.fillStyle = "#FF4500";
                  }
                  context.strokeText(i + 1, x, y);
                  context.fillText(i + 1, x, y);
                  context.fillStyle = tG;
                }
              
                context.shadowColor = "transparent";
                context.textShadowBlur = 0;
              }

            const [iW, iH, iX, iY] = [a_canvas.width * 0.7, a_canvas.height * 0.15, (a_canvas.width - a_canvas.width * 0.7) / 2, a_canvas.height * 0.85];
            const slots = 6,
                sW = iW / slots,
                sH = iH,
                r = 20,
                sp = 10;
            drawInterfaceBackground(context, iX, iY, iW, iH, r);
            const tG = context.createLinearGradient(0, 0, a_canvas.width, 0);
            tG.addColorStop(0, "#fff");
            tG.addColorStop(1, "#aaa");
            const icons = gameInterface.icons,
                qtys = [5, 2, 1, 3, 4, 7];
            drawItemSlots(context, iX, iY, sW, sH, sp, icons, qtys);
            renderInventorySlots(context, tG, slots, iX, iY, sW, sH, gameInterface);
        },

        drawTrees: () => {
            const calculateVariables = () => {
              const cT = Date.now();
              const windStrength = Math.sin((cT - startTime) * 0.001);
              const lR = (screen.numColumns - 1) / 2 + 6;
              const tB = (screen.numRows - 1) / 2 + 6;
              const m = [null, tiles.tree1.image, tiles.tree2.image];
              const focalPoint = {
                x: screen.tileWidth * lR,
                y: screen.tileHeight * tB
              };
              const windAngle = windStrength * Math.PI / 4;
              const cosWindAngle = Math.cos(windAngle) * 10;
          
              return {
                cT,
                windStrength,
                lR,
                tB,
                m,
                focalPoint,
                windAngle,
                cosWindAngle
              };
            };
          
            const drawTreeImages = (vars) => {
              const { lR, tB, m, focalPoint, cosWindAngle } = vars;
          
              for (let i = -lR, mI = screen.numColumns + 6; i < mI; i++) {
                for (let j = -tB, mJ = screen.numRows + 6; j < mJ; j++) {
                  const xI = Math.floor(player.worldX + i - lR);
                  const yI = Math.floor(player.worldY + j - tB);
                  const tV = map.treeMap[xI][yI];
                  const tI = m[tV];
          
                  if (tI) {
                    const tX = screen.tileWidth * i - screen.tileWidth / 2 + screen.offsetX;
                    const tY = screen.tileHeight * j + screen.offsetY;
                    const distance = Math.sqrt(Math.pow(focalPoint.x - tX, 2) + Math.pow(focalPoint.y - tY, 2));
                    const scale = Math.max(1.5, Math.min(2, 1 - distance / 1000));
          
                    context.globalAlpha = (yI % 3 === 0 && xI % 3 === 0) ? 0.7 : 1;
                    const bottomY = tY + tI.height * scale;
                    context.drawImage(tI, tX, bottomY, tI.width * scale, tI.height * scale);
                    context.drawImage(tI, tX, tY + cosWindAngle, tI.width * scale, tI.height * scale);
                    context.globalAlpha = 1;
                  }
                }
              }
            };
          
            const vars = calculateVariables();
            drawTreeImages(vars);
          },
          
          drawNotifications: () => {
            const drawBackground = () => {
              const w = a_canvas.width * 0.6,
                  h = 260;
              const x = (a_canvas.width - w) / 2,
                  y = a_canvas.height * 0.07;
              fade = Math.min(1, fade + 0.01);
              
              context.fillStyle = `rgba(0, 0, 0, ${0.7 * fade})`;
              context.roundRect(x, y, w, h, 15);
              context.fill();
              return {x, w};
            };
            const drawText = (drawBgVars) => {
              const textX = drawBgVars.x + drawBgVars.w / 2,
                  fixedY = a_canvas.height * 0.07 + 260 - 20;
              const lineHeight = 40;
              const maxLines = 6;
          
              context.font = "bold 30px 'Lucida Console'";
              context.fillStyle = "#fff";
              context.textAlign = 'center';
              context.textBaseline = 'middle';
          
              const startIndex = Math.max(0, notifications.length - maxLines);
              for (let n = startIndex; n < notifications.length; n++) {
                const tY = fixedY - ((n - startIndex + 0.5) * lineHeight);
                context.fillText(`• ${notifications[n]}`, textX, tY);
              }
          
              context.shadowColor = "transparent";
            };
            const drawBgVars = drawBackground();
            drawText(drawBgVars);
          },
          
        drawOptionsMenu: () => {
            const drawOptionsMenuLayout = (x, y, w, h, options = {}) => {
                const {
                    imageSrc = 'res/optionsbackground.jpg',
                    color1 = 'rgba(50, 50, 50, 0.6)',
                    color2 = 'rgba(0, 0, 0, 0.9)',
                    boxShadowColor = 'rgba(0, 0, 0, 0.5)' // New: Shadow Color
                } = options;
            
                if (typeof context === 'undefined') {
                    console.error("No valid context provided");
                    return;
                }
            
                // New: Rounded corners with box shadow for depth
                context.beginPath();
                context.moveTo(x + 10, y);
                context.lineTo(x + w - 10, y);
                context.quadraticCurveTo(x + w, y, x + w, y + 10);
                context.lineTo(x + w, y + h - 10);
                context.quadraticCurveTo(x + w, y + h, x + w - 10, y + h);
                context.lineTo(x + 10, y + h);
                context.quadraticCurveTo(x, y + h, x, y + h - 10);
                context.lineTo(x, y + 10);
                context.quadraticCurveTo(x, y, x + 10, y);
                context.closePath();
            
                // New: Add box shadow for depth
                context.shadowColor = boxShadowColor;
                context.shadowBlur = 15;
            
                const drawGradient = () => {
                    let gradient = context.createRadialGradient(x + w / 2, y + h / 2, 0, x + w / 2, y + h / 2, w / 2);
                    gradient.addColorStop(0, color1);
                    gradient.addColorStop(1, color2);
                    context.fillStyle = gradient;
                    context.fill();
                };
            
                // Draw Gradient First
                drawGradient();
            
                // Reset shadow properties so it doesn't affect other elements
                context.shadowColor = 'transparent';
                context.shadowBlur = 0;
            
                if (cachedDynamicBackground.src !== imageSrc) {
                    cachedDynamicBackground.src = imageSrc;
                    cachedDynamicBackground.onload = () => {
                        context.drawImage(cachedDynamicBackground, x, y, w, h);
                    };
                    cachedDynamicBackground.onerror = () => {
                        drawGradient(); // If image fails to load, draw gradient
                    };
                } else {
                    context.drawImage(cachedDynamicBackground, x, y, w, h);
                }
            };
            const drawOptionsMenuItems = (textX, fixedY, lineHeight, options, subOptions) => {
                const HIGHLIGHT_OFFSET_X = 10;
                const HIGHLIGHT_OFFSET_Y = 5;
                const BG_WIDTH = 200;
                const BG_HEIGHT = 20;
                const DEFAULT_TEXT_COLOR = '#3498db';
                const SUBOPTION_TEXT_COLOR = '#7f8c8d';
                
                const drawElement = (text, x, y, width, height, isHighlighted, isSubOption = false) => {
                    const fillColor = isHighlighted ? currentHighlight : (isSubOption ? SUBOPTION_TEXT_COLOR : DEFAULT_TEXT_COLOR);
            
                    // Draw background with rounded corners
                    context.fillStyle = isHighlighted ? currentHighlight : '#222';
                    context.beginPath();
                    context.moveTo(x - HIGHLIGHT_OFFSET_X + 5, y - height + HIGHLIGHT_OFFSET_Y);
                    context.lineTo(x + width - 5, y - height + HIGHLIGHT_OFFSET_Y);
                    context.quadraticCurveTo(x + width, y - height + HIGHLIGHT_OFFSET_Y, x + width, y - height + HIGHLIGHT_OFFSET_Y + 5);
                    context.lineTo(x + width, y + 5);
                    context.quadraticCurveTo(x + width, y, x + width - 5, y);
                    context.lineTo(x - HIGHLIGHT_OFFSET_X + 5, y);
                    context.quadraticCurveTo(x - HIGHLIGHT_OFFSET_X, y, x - HIGHLIGHT_OFFSET_X, y - 5);
                    context.lineTo(x - HIGHLIGHT_OFFSET_X, y - height + HIGHLIGHT_OFFSET_Y + 5);
                    context.quadraticCurveTo(x - HIGHLIGHT_OFFSET_X, y - height + HIGHLIGHT_OFFSET_Y, x - HIGHLIGHT_OFFSET_X + 5, y - height + HIGHLIGHT_OFFSET_Y);
                    context.fill();
                    
                    // Draw text
                    context.fillStyle = fillColor;
                    context.fillText(text, x, y);
                };
            
                // Draw main options
                options.forEach((option, i) => {
                    const y = fixedY - ((i + 1) * lineHeight);
                    const isHighlighted = (i === gameInterface.optionsMenuSelected);
                    drawElement(`${i + 1}. ${option}`, textX, y, BG_WIDTH, BG_HEIGHT, isHighlighted);
                });
            
                // Draw sub-options, if any
                const selectedOption = options[gameInterface.optionsMenuSelected];
                if (subOptions[selectedOption]) {
                    subOptions[selectedOption].forEach((subOption, j) => {
                        const y = fixedY - ((j + options.length + 2) * lineHeight);
                        const isHighlighted = (j === gameInterface.optionsMenuSelectedSub);
                        drawElement(`--- ${subOption}`, textX, y, BG_WIDTH, BG_HEIGHT, isHighlighted, true);
                    });
                }
                
                // Update the current highlight color for the next loop iteration
                currentHighlight = transitionColor(currentHighlight, targetHighlight);
            };
            const transitionColor = (current, target) => {
                const currentRGB = current.match(/\d+/g).map(Number);
                const targetRGB = target.match(/\d+/g).map(Number);
                const step = [0, 0, 0].map((_, i) => (targetRGB[i] - currentRGB[i]) / 10);
                return `rgb(${currentRGB.map((v, i) => Math.min(255, Math.max(0, Math.round(v + step[i])))).join(',')})`;
            };
            let cachedDynamicBackground = new Image();
            let currentHighlight = '#3498db'; // Primary color
            const targetHighlight = '#f1c40f'; // Highlight color
            function renderMenu() {
                // Define dimensions
                const MENU_DIMENSION_RATIO = 0.95;
                const w = a_canvas.width * MENU_DIMENSION_RATIO,
                    h = a_canvas.height * MENU_DIMENSION_RATIO;
                const x = (a_canvas.width - w) / 2,
                    y = (a_canvas.height - h) / 2;
                const TEXT_OFFSET_RATIO = 0.1;
                const textX = x + w * TEXT_OFFSET_RATIO,
                    fixedY = y + h - 50;
                const lineHeight = 60;
            
                // Menu items
                const options = loadOptionsFromJSON(); // Assume this function fetches options from a JSON file
                const subOptions = loadSubOptionsFromJSON(); // Assume this function fetches sub-options from a JSON file
            
                // TODO: Implement Dynamic UI, Microtransactions, Analytics
                drawOptionsMenuLayout(x, y, w, h);
                drawOptionsMenuItems(textX, fixedY, lineHeight, options, subOptions);
            }
            // Dummy functions to simulate the loading of options and sub-options from JSON files
            function loadOptionsFromJSON() {
                return ["Quick Access", "General", "Services", "Graphics & Performance", "Shop", "Advanced Features", "Social & Multiplayer", "Accessibility"];
            }
            function loadSubOptionsFromJSON() {
                return {
                    "Quick Access": ["Favorites"],
                    "General": ["Controls", "Audio"],
                    "Services": ["EA Play", "Game Pass"],
                    "Graphics & Performance": ["Graphics", "Power Save"],
                    "Shop": ["Store", "Featured Items"],
                    "Advanced Features": ["Language", "Cloud Save", "Advanced"],
                    "Social & Multiplayer": ["Multi-User", "Cross-Play"],
                    "Accessibility": ["Color-blind Mode", "Text-to-Speech", "Speech-to-Text", "Sign Language"]
                };
            }
            renderMenu();
        }


    };
    CanvasRenderingContext2D.prototype.fillRoundRect = function(x, y, w, h, r) {
        const minW = w / 2,
            minH = h / 2;
        r = (r > minW ? minW : r > minH ? minH : r);
        const xw = x + w,
            yh = y + h;
        this.beginPath();
        this.moveTo(x + r, y);
        this.arcTo(xw, y, xw, yh, r);
        this.arcTo(xw, yh, x, yh, r);
        this.arcTo(x, yh, x, y, r);
        this.arcTo(x, y, xw, y, r);
        this.closePath();
        this.fill();
    };
    var math = {
        calculateTileClicked: (c) => [Math.floor(c[0] / screen.tileWidth) * screen.tileWidth, Math.floor(c[1] / screen.tileHeight) * screen.tileHeight],
        calculateCanvasCoordsFromWindowCoords: (x, y) => {
            const r = context.canvas.getBoundingClientRect(),
                c = (x - r.left) / (r.right - r.left) * context.canvas.width,
                d = (y - r.top) / (r.bottom - r.top) * context.canvas.height;
            return [Math.round(c), Math.round(d)]
        },
        calculateOptimalLootPosition: (playerPosition) => {
            // Some logic to calculate optimal loot position based on player position
        },
        calculateDistance: (x1, y1, x2, y2) => Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)),
        calculateAssetValue: (asset) => {
            // Logic to calculate the value of the asset in real-world currency
        },
        calculateAngle: (x1, y1, x2, y2) => Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI,
        calculateMeetupLikelihood: (player1Position, player2Position) => {
            // Some complex logic to calculate the likelihood of two players meeting
        },
        calculateEfficiency: (timeSpent, resourcesGained) => {
            // Logic to calculate efficiency based on time and resources
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
            wood_wall: [1, 1, "res/wood_wall.png"],
            treasure: [1, 1, "res/treasure.jpg"],
            stump: [2, 5, "res/stump.png"],
            portal: [1,1,"res/portal.png"],
            tower: [1,1,"res/tower.png"]
        },
        tiles = {};

    for (var k in tileData) {
        var d = tileData[k];
        tiles[k] = new Tile({
            size: d.slice(0, 2),
            image: d[2]
        });
    }
    var config = {
        fps: 60
    };
    let c = 500; // Move this to a higher scope to make it accessible by both functions
    var generator = {
        generateChunk: () => {
            const initMapTiles = () => {
                for (let r = 0; r < c; r++) {
                    for (let j = 0; j < c; j++) {
                        mT[r][j] = Math.floor(Math.random() * 3);
                    }
                }
            };
        
            const updateTiles = () => {
                for (let i = 0; i < 150; i++) {
                    for (let r = 1; r < c - 1; r++) {
                        for (let j = 1; j < c - 1; j++) {
                            neighborhood.fill(0);
                            for (let o = r - 1; o <= r + 1; o++) {
                                for (let u = j - 1; u <= j + 1; u++) {
                                    if (o !== r || u !== j) neighborhood[mT[o][u]]++;
                                }
                            }
                            const maxVal = Math.max(...neighborhood);
                            const candidates = maxValTiles.filter(val => neighborhood[val] === maxVal);
                            mT[r][j] = candidates[(Math.random() * candidates.length) | 0];
                        }
                    }
                }
            };
        
            const addSpecialTiles = () => {
                addTiles(4, 3, 2);
                addTiles(3, 100, 2);
                addTiles(5, 10, 2);
            };
        
            const mT = Array.from({
                length: c
            }, () => new Array(c).fill(0));
            const maxValTiles = [0, 1, 2];
            const neighborhood = new Array(3).fill(0);
        
            const addTiles = (tileValue, numTilesToAdd, range) => {
                for (let i = 0; i < numTilesToAdd; i++) {
                    const x = (Math.random() * (c - range * 2) + range) | 0;
                    const y = (Math.random() * (c - range * 2) + range) | 0;
                    for (let dx = -range; dx <= range; dx++) {
                        for (let dy = -range; dy <= range; dy++) {
                            const squaredDistance = dx * dx + dy * dy;
                            if (squaredDistance <= range * range) mT[x + dx][y + dy] = tileValue;
                        }
                    }
                }
            };
        
            const addPortalTiles = () => {
                for(var i = 0; i < 1000; i++){
                    let x = (Math.random() * (c - 10) + 5) | 0;
                    let y = (Math.random() * (c - 10) + 5) | 0;
                    portals.push([x,y]);
                    mT[x][y] = 6;
                }
            };

            initMapTiles();
            updateTiles();
            addSpecialTiles();
            addPortalTiles();
        
            map.tileMap = mT;
            map.treeMap = Array.from({
                length: c
            }, () => new Array(c).fill(0));
            numTiles = mT.length * mT[0].length;
        },
        

        generateSpecial: () => {
            const sT = Array.from({
                length: c
            }, () => new Array(c).fill(null)); // special tile map

            const placeTile = (tileType, conditionFunction) => {
                for (let x = 0; x < c; x++) {
                    for (let y = 0; y < c; y++) {
                        if (conditionFunction(x, y)) {
                            sT[x][y] = tileType;
                        }
                    }
                }
            };

            // EA's rewarding exploration approach
            placeTile('bonus', (x, y) => {
                return (x + y) % 50 === 0; // place at some interval to reward exploration
            });

            // Zynga's social gameplay approach
            placeTile('boost', (x, y) => {
                return x % 10 === 0 && y % 10 === 0; // place in high-traffic areas
            });

            // Take-Two's contextual placement
            placeTile('resource', (x, y) => {
                return map.tileMap[x][y] === 2; // place near some existing contextual feature like water
            });

            // Sony's story-driven triggers
            placeTile('cutsceneTrigger', (x, y) => {
                return (x === 50 && y === 50); // place at a significant story location
            });

            // Microsoft's accessibility approach
            placeTile('questObjective', (x, y) => {
                return (x % 5 === 0 && y % 5 === 0); // place to be approachable by different types of players
            });

            // Konami's challenging gameplay approach
            placeTile('trap', (x, y) => {
                return (x + y) % 100 === 1; // place sparingly to surprise and challenge the player
            });

            // Ubisoft's dynamic world concept
            placeTile('seasonal', (x, y) => {
                return (x + y) % 80 === 0 && x % 2 === 0; // sporadically place to change with real-world seasons
            });

            // Rovio's casual gameplay
            placeTile('PvPZone', (x, y) => {
                return (x % 20 === 0 && y % 20 === 0); // frequent zones to dip into casual PvP
            });

            // Bandai Namco's fan-service approach
            placeTile('arena', (x, y) => {
                return (x === 25 && y === 25); // specific placement for a fan-favorite mini-game or battle
            });

            // CD Projekt's immersion concept
            placeTile('analytics', (x, y) => {
                return x % 50 === 0; // track interaction to later make more immersive changes
            });

            // Jagex's MMO approach
            placeTile('questObjective', (x, y) => {
                return (x % 25 === 0 && y % 15 === 0); // multiple objectives spread across the map
            });

            // Capcom's narrative drive
            placeTile('cutsceneTrigger', (x, y) => {
                return (x === 10 && y === 40); // another significant narrative location
            });

            // SEGA's legacy features
            placeTile('power-up', (x, y) => {
                return x % 30 === 0 && y % 30 === 0; // place in a pattern to reminisce about classic games
            });

            // NetEase's eastern approach
            placeTile('resource', (x, y) => {
                return map.tileMap[x][y] === 1; // place near mountains or other eastern iconic features
            });

            // Glu Mobile's mobile-centric design
            placeTile('premium', (x, y) => {
                return (x + y) % 55 === 0; // place with less frequency, aimed at mobile limitations
            });

            // Square Enix's RPG depth
            placeTile('randomizer', (x, y) => {
                return x % 25 === 0; // adds a layer of unpredictability to the RPG landscape

            });

            // Adding these to the function would expand the variety and intentionality behind tile placement, thereby offering a rich user experience that takes cues from top industry names.
            map.specialTileMap = sT; // Assuming map.specialTileMap is where you store these
        },
        generateTrees: () => {
            const WATER_TILE = 3; // Assuming water tiles are represented by the value 2
            const totalCells = c * c,
                sampleSize = totalCells / 2 | 0;
            const sampledIndices = new Uint32Array(sampleSize);
            const tileMap = map.tileMap,
                treeMap = map.treeMap;

            for (let index = 0; index < sampleSize; ++index) {
                sampledIndices[index] = Math.random() * totalCells | 0;
            }

            let i, j, idx, tm, trm, calc;
            for (let index = 0; index < sampleSize; index += 32) {
                for (let subIndex = 0; subIndex < 32; ++subIndex) {
                    idx = sampledIndices[index + subIndex];
                    i = idx / c | 0;
                    j = idx % c;
                    tm = tileMap[i][j];
                    trm = treeMap[i][j];

                    if (tm !== WATER_TILE && !trm) {
                        treeMap[i][j] = (((Math.random() * 100 | 0) < 1 ? 2 : (Math.random() * 100 | 0) < 3 ? 1 : 0) | 0);
                    }
                }
            }
        }

    };

    const waterFrames = ["res/water1.png", "res/water2.png"].map(src => {
        const img = new Image();
        img.src = src;
        return img;
    });

    let frameIndex = 0,
        intervalTime = 300,
        intervalId;

    function startAnimation() {
        if (intervalId) clearInterval(intervalId);

        intervalId = setInterval(() => {
            tiles.water.image = waterFrames[frameIndex];
            frameIndex = (frameIndex + 1) % waterFrames.length;
        }, intervalTime);
    }


    generator.generateChunk(), generator.generateTrees();
    const createDirection = (sound, animationFrame, x, y, offsetX, offsetY, speedFactor) => ({
        sound,
        animationFrame,
        x,
        y,
        offsetX,
        offsetY,
        speedFactor
    });

    const screenTileHeightFactor = screen.tileHeight / 15;
    const screenTileWidthFactor = screen.tileWidth / 15;
    const directions = {
        north: createDirection(sounds.walking, [12, 13, 14, 15], 0, -1, 0, screenTileHeightFactor),
        south: createDirection(sounds.walking, [0, 1, 2, 3], 0, 1, 0, -screenTileHeightFactor),
        east: createDirection(sounds.walking, [4, 5, 6, 7], 1, 0, -screenTileWidthFactor, 0),
        west: createDirection(sounds.walking, [8, 9, 10, 11], -1, 0, screenTileWidthFactor, 0),
        northwest: createDirection(sounds.walking, [16, 17, 18, 19], -1, -1, screenTileWidthFactor, screenTileHeightFactor, 0.9),
        northeast: createDirection(sounds.walking, [20, 21, 22, 23], 1, -1, -screenTileWidthFactor, screenTileHeightFactor, 0.9),
        southwest: createDirection(sounds.walking, [24, 25, 26, 27], -1, 1, screenTileWidthFactor, -screenTileHeightFactor, 0.9),
        southeast: createDirection(sounds.walking, [28, 29, 30, 31], 1, 1, -screenTileWidthFactor, -screenTileHeightFactor, 0.9)
    };

    function move(direction) {
        function canMoveToTile(x, y) {
            return !(x < 0 || y < 0 || x >= c || y >= c || map.tileMap[x][y] === 1 || map.treeMap[x][y] === 3);
        }
    
        function initialChecks() {
            if (player.isMoving || !directions[direction]) return false;
            return true;
        }
    
        function calculateNewPosition() {
            const { worldX, worldY } = player;
            const dir = directions[direction];
            const nx = worldX + dir.x;
            const ny = worldY + dir.y;
            return { nx, ny, dir };
        }
    
        function handleAnimationAndSound(dir) {
            const { animationFrame } = player;
            dir.sound.play();
            player.isMoving = true;
            player.animationFrame = dir.animationFrame[(animationFrame + 1) % 4];
        }
    
        function updateFunction(nx, ny, offsetX, offsetY, moveSpeed) {
            let elapsed = 0;
            const upd = () => {
                screen.offsetX += offsetX;
                screen.offsetY += offsetY;
                elapsed += 16.67;
                if (elapsed < 250 * (Math.abs(dir.x) + Math.abs(dir.y)) / moveSpeed) return requestAnimationFrame(upd);
                player.worldX = nx;
                player.worldY = ny;
                player.isMoving = false;
                screen.offsetX = screen.offsetY = 0;
            };
            requestAnimationFrame(upd);
        }
    
        if (!initialChecks()) return;
    
        const { worldX, worldY, moveSpeed } = player;
        const { nx, ny, dir } = calculateNewPosition();
    
        if (!canMoveToTile(nx, ny)) {
            return notifications.push("You can't walk there!");
        }
    
        handleAnimationAndSound(dir);
    
        let offsetX = dir.offsetX * moveSpeed;
        let offsetY = dir.offsetY * moveSpeed;
    
        updateFunction(nx, ny, offsetX, offsetY, moveSpeed);
    }
    


    CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
        this.save();
        const g = this.createLinearGradient(x, y, x, y + h);
        g.addColorStop(0, "#5d9cec");
        g.addColorStop(1, "#4a90e2");
        this.fillStyle = g;
        this.shadowColor = "#333";
        this.shadowBlur = 10;
        this.shadowOffsetX = this.shadowOffsetY = 2;

        const q = this.quadraticCurveTo.bind(this),
            l = this.lineTo.bind(this),
            m = this.moveTo.bind(this);
        this.beginPath();
        m(x + r, y);
        l(x + w - r, y);
        q(x + w, y, x + w, y + r);
        l(x + w, y + h - r);
        q(x + w, y + h, x + w - r, y + h);
        l(x + r, y + h);
        q(x, y + h, x, y + h - r);
        l(x, y + r);
        q(x, y, x + r, y);
        this.closePath();
        this.fill();
        this.restore();
    };
    a_canvas.addEventListener('mousemove', e => {
        screen.mouseCanvasCoords = math.calculateCanvasCoordsFromWindowCoords(e.clientX, e.clientY);
        screen.oldSelectionBoxCoords = screen.selectionBoxCoords;
        screen.selectionBoxCoords = math.calculateTileClicked(screen.mouseCanvasCoords)
    }, false);


    a_canvas.addEventListener('click', e => {
        const [x, y] = math.calculateCanvasCoordsFromWindowCoords(e.clientX, e.clientY);
        const tileX = Math.floor(x / screen.tileWidth);
        const tileY = Math.floor(y / screen.tileHeight);
        const {
            worldX,
            worldY
        } = player;

        const clickedTree = map.treeMap[worldX + tileX - Math.floor(screen.numColumns / 2)][worldY + tileY - Math.floor(screen.numRows / 2)];

        if (clickedTree === 1) {
            map.treeMap[worldX + tileX - Math.floor(screen.numColumns / 2)][worldY + tileY - Math.floor(screen.numRows / 2)] = 2;
            return;
        }

        const dlr = (screen.numColumns - 1) / 2 + 6;
        const dtb = (screen.numRows - 1) / 2 + 6;

        const clickedEnemyIndex = enemies.findIndex(enemy => enemy.worldX === worldX + tileX - Math.floor(screen.numColumns / 2) && enemy.worldY === worldY + tileY - Math.floor(screen.numRows / 2));

        if (clickedEnemyIndex !== -1) {
            player.currentAction = 'attack';
            const clickedEnemy = enemies[clickedEnemyIndex];
            // Lower the enemy's health
            clickedEnemy.health -= 25; // Adjust the amount as needed

            // Play the attack animation (animate fireball)
            animateFireball(worldX, worldY, clickedEnemy.worldX, clickedEnemy.worldY);

            // Check if the enemy is defeated
            if (clickedEnemy.health <= 0) {
                // Remove the defeated enemy from the array
                enemies.splice(clickedEnemyIndex, 1);
            }

            return;
        }

        // If there's no enemy on the clicked tile, move the player
        player.movementQueue.length = 0;
        const xQueue = [];
        const yQueue = [];

        ['X', 'Y'].forEach((axis, i) => {
            const target = i === 0 ? tileX : tileY;
            const direction = target < player[`screenTile${axis}`] ? ['west', 'north'][i] : ['east', 'south'][i];
            const steps = Math.abs(target - player[`screenTile${axis}`]);
            const queue = i === 0 ? xQueue : yQueue;

            for (let j = 0; j < steps; j++) {
                queue.push(direction);
            }
        });

        while (xQueue.length || yQueue.length) {
            if (xQueue.length) {
                player.movementQueue.push(xQueue.shift());
            }
            if (yQueue.length) {
                player.movementQueue.push(yQueue.shift());
            }
        }
    });

    const fireballImg = new Image();
    fireballImg.src = "res/fireball.png";
    let lastFireTime = 0;

    function animateFireball(sx, sy, ex, ey) {
        sounds.attack.play();
        const cT = Date.now();
        if (cT - lastFireTime < 1e3) return;
        lastFireTime = cT;
        const dT = 1e3,
            tW = screen.tileWidth,
            tH = screen.tileHeight,
            fbImg = new Image(),
            cA = .25;
        fbImg.src = "res/fireball.png";
        let sT = cT,
            lE = player.worldX - (screen.numColumns - 1) / 2,
            tE = player.worldY - (screen.numRows - 1) / 2,
            cAng = 0;
        const r = () => {
            const nT = Date.now(),
                e = nT - sT,
                t = Math.min(e / dT, 1),
                u = 1 - t,
                h = -4 * u * t,
                aY = sy + t * (ey - sy) + h * 3,
                aX = sx + t * (ex - sx),
                sX = (aX - lE) * tW,
                sY = (aY - tE) * tH;
            context.save();
            context.translate(sX + tW / 2, sY + tH / 2);
            context.rotate(cAng);
            context.drawImage(fbImg, -tW / 2, -tH / 2, tW, tH);
            context.restore();
            cAng += cA;
            e < dT ? requestAnimationFrame(r) : 0;
        };
        r();
    }
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
        27: "toggle options menu",
        123: "keybinding reset",
        77: "toggle map",
        78: "toggle minimap",
        66: "hide map"
    };

    function handleKeyDown(e) {
        console.log('Key down:', e.keyCode); // Debug log
    
        const action = KEY_CODE_ACTIONS[e.keyCode];
        if (!action) return;
    
        // Special handling for the options menu toggle
        if (e.keyCode === 27) { 
            console.log(showOptionsMenu ? 'Closing options menu' : 'Opening options menu'); 
            showOptionsMenu = !showOptionsMenu; 
            return; 
        }
    
        if (showOptionsMenu) {
            console.log('Options menu is open'); // Debug log
            switch (action) {
                case 'south':
                    sounds.changeItem.play();
                    console.log('Moving up in menu');
                    gameInterface.optionsMenuSelected = Math.max(gameInterface.optionsMenuSelected - 1, 0);
                    return;
                case 'north':
                    sounds.changeItem.play();
                    console.log('Moving down in menu');
                    gameInterface.optionsMenuSelected = gameInterface.optionsMenuSelected + 1;
                    return;
                case 'east':
                    sounds.changeItem.play();
                    console.log('Moving right in submenu');
                    gameInterface.optionsMenuSelectedSub = Math.min(gameInterface.optionsMenuSelectedSub + 1, subOptions[options[gameInterface.optionsMenuSelected]].length - 1);
                    return;
                case 'west':
                    sounds.changeItem.play();
                    console.log('Moving left in submenu');
                    gameInterface.optionsMenuSelectedSub = Math.max(gameInterface.optionsMenuSelectedSub - 1, 0);
                    return;
                default:
                    return;  // Do nothing for other keys
            }
        }
    
        if (['north', 'south', 'west', 'east'].includes(action)) {
            console.log('Moving player'); // Debug log
            player.movementQueue.push(action);
            return;
        }
    
        if (action.startsWith('select inventory slot ')) {
            console.log('Selecting inventory slot'); // Debug log
            sounds.changeItem.play();
            gameInterface.inventorySlotSelected = Number(action.slice(-1));
            return;
        }
    
        switch (action) {
            case 'clear notifications':
                console.log('Clearing notifications'); // Debug log
                notifications = [];
                break;
            case 'zoom out':
                console.log('Zooming out'); // Debug log
                screen.zoom(-2);
                break;
            case 'zoom in':
                console.log('Zooming in'); // Debug log
                screen.zoom(2);
                break;
            case 'rotate clockwise':
                console.log('Rotating clockwise'); // Debug log
                screen.rotate(5);
                break;
            case 'rotate counter-clockwise':
                console.log('Rotating counter-clockwise'); // Debug log
                screen.rotate(-5);
                break;
            case 'keybinding reset':
                console.log('Resetting keybindings'); // Debug log
                // Logic for keybinding reset here
                break;
            case 'toggle map':
                console.log('Toggling map'); // Debug log
                // Logic for map toggle here
                break;
            case 'toggle minimap':
                console.log('Toggling minimap'); // Debug log
                // Logic for minimap toggle here
                break;
            case 'hide map':
                console.log('Hiding map'); // Debug log
                // Logic for hiding both maps here
                break;
            default:
                console.log('Unhandled action:', action); // Debug log
                break;
        }
    }

    const keyActionFunctions = {
        'north': function() {
            console.log('Moving player north');
            player.movementQueue.push('north');
        },
        'south': function() {
            console.log('Moving player south');
            player.movementQueue.push('south');
        },
        // ... Add other directional functions
        'toggle options menu': function() {
            console.log(showOptionsMenu ? 'Closing options menu' : 'Opening options menu');
            showOptionsMenu = !showOptionsMenu;
        },
        'zoom out': function() {
            console.log('Zooming out');
            screen.zoom(-2);
        },
        'zoom in': function() {
            console.log('Zooming in');
            screen.zoom(2);
        },
        // ... Add other functions for different actions
    };

    function processPlayerMovement() {
        if (player.movementQueue.length > 0 && !player.isMoving) move(player.movementQueue.shift());
    }
    window.addEventListener("keydown", handleKeyDown, false);
    sounds.music.play();

   const updateEnemyPosition = () => {
  for (const enemy of enemies) {
    // Check if the enemy is on a portal
    const isOnPortal = portals.some(portal => portal[0] === enemy.worldX && portal[1] === enemy.worldY);
    
    if (isOnPortal) {
      // Teleport to a random portal
      const randomPortal = portals[Math.floor(Math.random() * portals.length)];
      enemy.worldX = randomPortal[0] + 1; // Add one to avoid infinite loop
      enemy.worldY = randomPortal[1];
    } else {
      // Calculate the distance to the player in both dimensions
      const distX = enemy.worldX - player.worldX;
      const distY = enemy.worldY - player.worldY;

      // Determine the axis on which to move
      if (Math.abs(distX) > Math.abs(distY)) {
        // Move horizontally towards the player
        enemy.worldX += distX > 0 ? -1 : 1;
      } else {
        // Move vertically towards the player
        enemy.worldY += distY > 0 ? -1 : 1;
      }
    }
  }
};

// Run the function every second
setInterval(updateEnemyPosition, 500);

function fireAtNearestEnemy() {
    // Find the nearest enemy within a 10-tile radius
    let nearestEnemy = null;
    let nearestDistance = Infinity;
    const radius = 10;

    for (const enemy of enemies) {
        const distance = Math.sqrt(Math.pow(enemy.worldX - player.worldX, 2) + Math.pow(enemy.worldY - player.worldY, 2));
        
        if (distance < nearestDistance && distance <= radius) {
            nearestEnemy = enemy;
            nearestDistance = distance;
        }
    }

    if (nearestEnemy) {
        player.currentAction = 'attack';

        // Lower the enemy's health
        nearestEnemy.health -= 25;  // Adjust the amount as needed

        // Play the attack animation (animate fireball)
        animateFireball(player.worldX, player.worldY, nearestEnemy.worldX, nearestEnemy.worldY);

        // Check if the enemy is defeated
        if (nearestEnemy.health <= 0) {
            const index = enemies.indexOf(nearestEnemy);
            if (index > -1) {
                // Remove the defeated enemy from the array
                enemies.splice(index, 1);
            }
        }
    }
}


// Call fireAtNearestEnemy every 0.25 seconds
setInterval(fireAtNearestEnemy, 250);

    function gameLoop() {
        if(!showOptionsMenu){
            graphics.drawMap();
            const start = performance.now();
            const [distLeftRight, distTopBot] = [(screen.numColumns - 1) / 2 + 6, (screen.numRows - 1) / 2 + 6];
            enemies.forEach(e => {
                e.screenTileX = e.worldX - player.worldX + distLeftRight;
                e.screenTileY = e.worldY - player.worldY + distTopBot;
            });
            processPlayerMovement();
            graphics.drawSelectionBox(screen.oldSelectionBoxCoords, screen.selectionBoxCoords);
            graphics.drawPlayer();
            graphics.drawTrees();
            graphics.drawEnemies();
            graphics.drawNotifications();
            //graphics.drawMiniMap();
            graphics.drawInterface();
        } else {
            graphics.drawOptionsMenu();
        }
        graphics.drawCursor();
        graphics.drawEnemies();
        notifications.push(player.worldX + "," + player.worldY);
        notifications.push("player is standing on: " + map.tileMap[player.worldX][player.worldY]);
        if(map.tileMap[player.worldX][player.worldY] == 6){
            const randomIndex = Math.floor(Math.random() * portals.length);
            const selectedPortal = portals[randomIndex];
            player.worldX = selectedPortal[0] + 1;
            player.worldY = selectedPortal[1];
            sounds.teleport.play();
        }
        if(1 == 2) map.tileMap[player.worldX][player.worldY] = 0; // we could leave a trail of any tile type
        requestAnimationFrame(gameLoop);
    }

    // Start the game loop
    requestAnimationFrame(gameLoop);

    

}