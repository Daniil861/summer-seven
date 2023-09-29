(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    function addLoadedClass() {
        window.addEventListener("load", (function() {
            if (document.querySelector("body")) setTimeout((function() {
                document.querySelector("body").classList.add("_loaded");
            }), 200);
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    if (sessionStorage.getItem("preloader")) {
        if (document.querySelector(".preloader")) document.querySelector(".preloader").classList.add("_hide");
        document.querySelector(".wrapper").classList.add("_visible");
    }
    if (sessionStorage.getItem("money")) {
        if (document.querySelector(".score")) document.querySelectorAll(".score").forEach((el => {
            el.textContent = sessionStorage.getItem("money");
        }));
    } else {
        sessionStorage.setItem("money", 1e3);
        if (document.querySelector(".score")) document.querySelectorAll(".score").forEach((el => {
            el.textContent = sessionStorage.getItem("money");
        }));
    }
    if (sessionStorage.getItem("resource")) {
        if (document.querySelector(".resource")) document.querySelectorAll(".resource").forEach((el => {
            el.textContent = sessionStorage.getItem("resource");
        }));
    } else {
        sessionStorage.setItem("resource", 50);
        if (document.querySelector(".resource")) document.querySelectorAll(".resource").forEach((el => {
            el.textContent = sessionStorage.getItem("resource");
        }));
    }
    const preloader = document.querySelector(".preloader");
    const wrapper = document.querySelector(".wrapper");
    const window_width = document.documentElement.clientWidth;
    document.documentElement.clientHeight;
    function deleteMoney(count, block, storrName) {
        let money = +sessionStorage.getItem(storrName);
        sessionStorage.setItem(storrName, money - count);
        setTimeout((() => {
            document.querySelectorAll(block).forEach((el => el.classList.add("_delete-money")));
            document.querySelectorAll(block).forEach((el => el.textContent = sessionStorage.getItem(storrName)));
        }), 500);
        setTimeout((() => {
            document.querySelectorAll(block).forEach((el => el.classList.remove("_delete-money")));
        }), 1900);
    }
    function noMoney(block) {
        document.querySelectorAll(block).forEach((el => el.classList.add("_no-money")));
        setTimeout((() => {
            document.querySelectorAll(block).forEach((el => el.classList.remove("_no-money")));
        }), 1400);
    }
    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    function addMoney(count, block, delay, delay_off) {
        let money = Math.floor(+sessionStorage.getItem("money") + count);
        setTimeout((() => {
            sessionStorage.setItem("money", money);
            document.querySelectorAll(block).forEach((el => el.textContent = sessionStorage.getItem("money")));
            document.querySelectorAll(block).forEach((el => el.classList.add("_anim-add-money")));
        }), delay);
        setTimeout((() => {
            document.querySelectorAll(block).forEach((el => el.classList.remove("_anim-add-money")));
        }), delay_off);
    }
    function addResource(count, block, delay, delay_off) {
        let money = Math.floor(+sessionStorage.getItem("resource") + count);
        setTimeout((() => {
            sessionStorage.setItem("resource", money);
            document.querySelectorAll(block).forEach((el => el.textContent = sessionStorage.getItem("resource")));
            document.querySelectorAll(block).forEach((el => el.classList.add("_anim-add-money")));
        }), delay);
        setTimeout((() => {
            document.querySelectorAll(block).forEach((el => el.classList.remove("_anim-add-money")));
        }), delay_off);
    }
    function saveArrStorrage(arr, name) {
        sessionStorage.setItem(name, JSON.stringify(arr));
    }
    function addNumberStorrage(name, number) {
        let arr = getArrStorrage(name);
        arr.push(number);
        saveArrStorrage(arr, name);
    }
    function getArrStorrage(name) {
        let arr = JSON.parse(sessionStorage.getItem(name));
        let numbers = arr;
        numbers.sort((function(a, b) {
            return a - b;
        }));
        return numbers;
    }
    let anim_items = document.querySelectorAll(".icon-anim img");
    function getRandomAnimate() {
        let number = getRandom(0, 3);
        let arr = [ "jump", "scale", "rotate" ];
        let random_item = getRandom(0, anim_items.length);
        anim_items.forEach((el => {
            if (el.classList.contains("_anim-icon-jump")) el.classList.remove("_anim-icon-jump"); else if (el.classList.contains("_anim-icon-scale")) el.classList.remove("_anim-icon-scale"); else if (el.classList.contains("_anim-icon-rotate")) el.classList.remove("_anim-icon-rotate");
        }));
        setTimeout((() => {
            anim_items[random_item].classList.add(`_anim-icon-${arr[number]}`);
        }), 100);
    }
    if (document.querySelector(".icon-anim img")) setInterval((() => {
        getRandomAnimate();
    }), 2e4);
    const prices = {
        airplane_1: 1200,
        airplane_2: 3e3,
        airplane_3: 65,
        airplane_4: 100
    };
    if (document.querySelector(".main") && document.querySelector(".preloader").classList.contains("_hide")) {
        document.querySelector(".main").classList.add("_active");
        writeStartAirplane();
        drawPriceAirplanes();
        chekBoughtAirplanes();
        chekcCurrentAirplane();
    }
    function writeStartAirplane() {
        if (!sessionStorage.getItem("airplanes")) {
            let airplanes = [ "0" ];
            saveArrStorrage(airplanes, "airplanes");
        }
    }
    function drawPriceAirplanes() {
        document.querySelector('[data-price="1"]').textContent = prices.airplane_1;
        document.querySelector('[data-price="2"]').textContent = prices.airplane_2;
        document.querySelector('[data-price="3"]').textContent = prices.airplane_3;
        document.querySelector('[data-price="4"]').textContent = prices.airplane_4;
        document.querySelector('[data-airplane="1"]').setAttribute("data-count", prices.airplane_1);
        document.querySelector('[data-airplane="2"]').setAttribute("data-count", prices.airplane_2);
        document.querySelector('[data-airplane="3"]').setAttribute("data-count", prices.airplane_3);
        document.querySelector('[data-airplane="4"]').setAttribute("data-count", prices.airplane_4);
    }
    function buyWeapon(element) {
        let price = element.dataset.count;
        let number = element.dataset.airplane;
        if (number < 3) if (+sessionStorage.getItem("money") >= price) {
            setTimeout((() => {
                element.classList.add("_bought");
            }), 0);
            deleteMoney(price, ".score", "money");
            addNumberStorrage("airplanes", number);
        } else noMoney(".score"); else if (number >= 3) if (+sessionStorage.getItem("resource") >= price) {
            setTimeout((() => {
                element.classList.add("_bought");
            }), 0);
            deleteMoney(price, ".resource", "resource");
            addNumberStorrage("airplanes", number);
        } else noMoney(".resource");
    }
    function chekBoughtAirplanes() {
        let boughtAirplanes = getArrStorrage("airplanes");
        let items = document.querySelectorAll(".item-store");
        boughtAirplanes.forEach((airplane => {
            items.forEach((item => {
                if (item.dataset.airplane == airplane) setTimeout((() => {
                    item.classList.add("_bought");
                }), 0);
            }));
        }));
    }
    function chekcCurrentAirplane() {
        if (sessionStorage.getItem("current-airplane")) {
            let airplane = +sessionStorage.getItem("current-airplane");
            document.querySelectorAll(".item-store").forEach((item => {
                if (item.dataset.airplane == airplane) item.classList.add("_selected");
            }));
        }
    }
    function removeSelectedPriceBox() {
        let items = document.querySelectorAll(".item-store");
        items.forEach((item => {
            if (item.classList.contains("_selected")) item.classList.remove("_selected");
        }));
    }
    const screenSize = {
        window_width: document.documentElement.clientWidth,
        window_height: document.documentElement.clientHeight
    };
    const config = {
        secondAirplane: "",
        level: 1,
        win_money: 0,
        win_diamonds: 0,
        win_resource: 0,
        win: false,
        timerIdBonus: false,
        timerCl: false,
        createGunPilotTimer: false
    };
    const enemys = {
        count: 10,
        currentCount: 0,
        healthEnemy_1: 1,
        healthEnemy_2: 2,
        healthEnemy_3: 4,
        healthEnemy_4: 6
    };
    const player = {
        airWidth: 100,
        currentPosition: 0,
        speed: 5,
        gunSpeed: 30,
        x: 0
    };
    if (document.querySelector(".game") && document.querySelector(".preloader").classList.contains("_hide")) {
        checkBoughtSecondAirolane();
        drawStartPositionHeroAir();
        drawStartPositionSecondAirplane();
        checkLevel();
        setTimeout((() => {
            startGame();
            checkCollisionAirplane();
        }), 500);
    }
    function checkBoughtSecondAirolane() {
        if (sessionStorage.getItem("current-airplane")) config.secondAirplane = +sessionStorage.getItem("current-airplane");
    }
    function drawStartPositionHeroAir() {
        if ("" !== config.secondAirplane) player.currentPosition = 30 * screenSize.window_width / 100; else player.currentPosition = 47 * screenSize.window_width / 100;
        document.querySelector(".field__player").style.left = `${player.currentPosition}px`;
    }
    function drawStartPositionSecondAirplane() {
        if ("" !== config.secondAirplane) {
            document.querySelector(".field__pilot").style.backgroundImage = `url("img/airplans/air-${config.secondAirplane + 1}.svg")`;
            document.querySelector(".field__pilot").style.left = "60%";
        } else {
            document.querySelector(".field__pilot").style.display = "none";
            document.querySelector(".field__pilot").classList.add("_target");
        }
    }
    function checkLevel() {
        if (1 == config.level) enemys.count = 10; else if (2 == config.level) enemys.count = 15; else if (3 == config.level) enemys.count = 20; else if (4 == config.level) enemys.count = 25;
        enemys.currentCount = enemys.count;
    }
    function startGame() {
        deleteMoney(+sessionStorage.getItem("current-bet"), ".score", "money");
        generateEnemys();
        getRandomShotSecondPilot();
        if (!document.querySelector(".field__pilot").classList.contains("_move")) document.querySelector(".field__pilot").classList.add("_move");
    }
    function stopGame() {
        document.querySelector(".field__pilot").classList.remove("_move");
        writeDataFinalyScreen();
        setTimeout((() => {
            showFinalyScreen();
        }), 500);
    }
    function createEnemy() {
        let enemy_speed = 0;
        let rand_num = getRandom(1, 5);
        let randNumberAnim = getRandom(1, 5);
        if (1 == config.level) enemy_speed = getRandom(10, 60); else if (2 == config.level) enemy_speed = getRandom(10, 40); else if (3 == config.level) enemy_speed = getRandom(7, 30); else if (4 == config.level) enemy_speed = getRandom(5, 20);
        let num_width = +screenSize.window_width - 150;
        let start_position = getRandom(0, num_width);
        let enemy = document.createElement("div");
        enemy.classList.add("field__enemy");
        enemy.setAttribute("data-value", rand_num);
        enemy.setAttribute("data-target", 0);
        let image = document.createElement("img");
        image.setAttribute("src", `img/enemys/bugz-${rand_num}.svg`);
        image.setAttribute("alt", `Image`);
        image.setAttribute("data-whole", "");
        image.classList.add(`_anim-${randNumberAnim}`);
        enemy.append(image);
        enemy.style.left = `${start_position}px`;
        document.querySelector(".field__enemies").append(enemy);
        let timerId = false;
        let top_position = 0;
        timerId = setInterval((() => {
            top_position += .5;
            enemy.style.transform = `translateY(${top_position}px)`;
            if (top_position + 70 > screenSize.window_height - 50) {
                enemy.classList.add("_hold");
                setTimeout((() => {
                    clearInterval(timerId);
                    enemy.remove();
                }), 700);
            }
        }), enemy_speed);
    }
    function generateEnemys() {
        let speed = 1500;
        setTimeout((() => {
            let num = 15;
            config.timerIdBonus = setInterval((() => {
                createEnemy();
                enemys.currentCount--;
                num = enemys.currentCount;
                if (enemys.currentCount <= 0) clearInterval(config.timerIdBonus);
            }), speed);
            let checkInt = setInterval((() => {
                let enemys = document.querySelectorAll(".field__enemy");
                if (enemys.length <= 0 && num <= 0) {
                    config.win = true;
                    clearInterval(checkInt);
                    if (config.level < 4 && config.win) config.level++;
                    stopGame();
                }
            }), 100);
        }), 200);
    }
    function writeDataFinalyScreen() {
        if (config.win) {
            config.win_money = config.win_money * +sessionStorage.getItem("current-bet");
            document.querySelector(".win__sub-text").textContent = "Win";
            document.querySelector(".score-finaly").textContent = config.win_money;
            document.querySelector(".resource-finaly").textContent = config.win_diamonds;
            document.querySelectorAll(".win__star").forEach((item => {
                if (item.classList.contains("_transparent")) item.classList.remove("_transparent");
            }));
        } else {
            document.querySelector(".win__sub-text").textContent = "Loose";
            document.querySelector(".score-finaly").textContent = config.win_money;
            document.querySelector(".resource-finaly").textContent = config.win_diamonds;
            document.querySelectorAll(".win__star").forEach((item => item.classList.add("_transparent")));
        }
    }
    function createGuns(block) {
        let air = document.querySelector(block);
        let xPos = air.getBoundingClientRect().left;
        let yPos = air.getBoundingClientRect().top;
        let xOffsetGuns = air.clientWidth - 30;
        let box_gun = document.createElement("div");
        box_gun.classList.add("field__box-gun");
        let gun_one = document.createElement("span");
        gun_one.classList.add("field__gun-one");
        gun_one.style.left = `${xPos}px`;
        gun_one.style.top = `${yPos}px`;
        let gun_two = document.createElement("span");
        gun_two.classList.add("field__gun-two");
        gun_two.style.left = `${xPos + xOffsetGuns}px`;
        gun_two.style.top = `${yPos}px`;
        box_gun.append(gun_one, gun_two);
        document.querySelector(".game__body").append(box_gun);
        let speedGun = 1;
        let gunTimer = setInterval((() => {
            speedGun += player.gunSpeed;
            gun_one.style.transform = `translateY(${-speedGun}px)`;
            gun_two.style.transform = `translateY(${-speedGun}px)`;
            if (speedGun > screenSize.window_height) {
                box_gun.remove();
                gun_one.remove();
                gun_two.remove();
                clearInterval(gunTimer);
            }
        }), 60);
        checkGunCollision(gun_one, gun_two, xOffsetGuns);
    }
    function checkGunCollision(gun_one, gun_two, xOffsetGuns) {
        let health_1 = enemys.healthEnemy_1;
        let health_2 = enemys.healthEnemy_2;
        let health_3 = enemys.healthEnemy_3;
        let health_4 = enemys.healthEnemy_4;
        let timer = setInterval((() => {
            let enemys = document.querySelectorAll(".field__enemy");
            enemys.forEach((enemy => {
                let enemyWidth = enemy.clientWidth;
                let enemyHeight = enemy.clientHeight;
                if (gun_one.getBoundingClientRect().left > enemy.getBoundingClientRect().left && gun_one.getBoundingClientRect().left < enemy.getBoundingClientRect().left + enemyWidth && gun_one.getBoundingClientRect().top < enemy.getBoundingClientRect().top + enemyHeight && !enemy.classList.contains("_caput") || gun_two.getBoundingClientRect().left > enemy.getBoundingClientRect().left && gun_one.getBoundingClientRect().left + xOffsetGuns < enemy.getBoundingClientRect().left + enemyWidth && gun_two.getBoundingClientRect().top < enemy.getBoundingClientRect().top + enemyHeight && !enemy.classList.contains("_caput")) {
                    let target = enemy.dataset.target;
                    if (1 == enemy.dataset.value && enemy.dataset.target > health_1) {
                        enemy.classList.add("_caput");
                        countWin(enemy);
                        setTimeout((() => {
                            enemy.remove();
                        }), 2500);
                    } else if (2 == enemy.dataset.value && enemy.dataset.target > health_2) {
                        enemy.classList.add("_caput");
                        countWin(enemy);
                        setTimeout((() => {
                            enemy.remove();
                        }), 2500);
                    } else if (3 == enemy.dataset.value && enemy.dataset.target > health_3) {
                        enemy.classList.add("_caput");
                        countWin(enemy);
                        setTimeout((() => {
                            enemy.remove();
                        }), 2500);
                    } else if (4 == enemy.dataset.value && enemy.dataset.target > health_4) {
                        enemy.classList.add("_caput");
                        countWin(enemy);
                        setTimeout((() => {
                            enemy.remove();
                        }), 2500);
                    } else enemy.classList.add("_target");
                    target++;
                    enemy.dataset.target = target;
                    gun_one.remove();
                    gun_two.remove();
                    clearInterval(timer);
                    setTimeout((() => {
                        enemy.classList.remove("_target");
                    }), 500);
                }
            }));
        }), 10);
    }
    function countWin(enemy) {
        if (1 == enemy.dataset.value) config.win_money += 1; else if (2 == enemy.dataset.value) config.win_money += 2; else if (3 == enemy.dataset.value) {
            config.win_money += 3;
            config.win_diamonds += 10;
        } else if (4 == enemy.dataset.value) {
            config.win_money += 4;
            config.win_diamonds += 20;
        }
    }
    function showFinalyScreen() {
        document.querySelector(".win").classList.add("_active");
        addMoney(config.win_money, ".score", 500, 1500);
        addResource(config.win_diamonds, ".resource", 500, 1500);
    }
    function getRandomShotSecondPilot() {
        let int = 1200;
        let pilot = +sessionStorage.getItem("current-airplane");
        if (pilot) {
            setInterval((() => {
                if (1 == pilot) int = 1200; else if (2 == pilot) int = 1e3; else if (3 == pilot) int = 700; else if (4 == pilot) int = 500;
            }), 100);
            config.createGunPilotTimer = setInterval((() => {
                if (!document.querySelector(".field__pilot").classList.contains("_target") && document.querySelector(".field__pilot").classList.contains("_move")) createGuns(".field__pilot");
            }), int);
        }
    }
    function moveAirplane() {
        if (document.querySelector(".field__player")) document.querySelector(".field__player").style.left = `${player.currentPosition}px`;
    }
    function checkCollisionAirplane() {
        let airplane = document.querySelector(".field__player");
        let pilot = document.querySelector(".field__pilot");
        let airplaneWidth = airplane.clientWidth;
        let pilotWidth = pilot.clientWidth;
        let timer = setInterval((() => {
            if (airplane.classList.contains("_target") && pilot.classList.contains("_target")) {
                config.win = false;
                clearInterval(timer);
                clearInterval(config.timerIdBonus);
                document.querySelectorAll(".field__enemy").forEach((enemy => {
                    enemy.classList.add("_hold");
                    setTimeout((() => {
                        enemy.remove();
                    }), 500);
                }));
                stopGame();
            }
            let enemys = document.querySelectorAll(".field__enemy");
            enemys.forEach((enemy => {
                let enemyWidth = enemy.clientWidth;
                let enemyHeight = enemy.clientHeight;
                if (airplane.getBoundingClientRect().left + airplaneWidth > enemy.getBoundingClientRect().left && airplane.getBoundingClientRect().left < enemy.getBoundingClientRect().left + enemyWidth && airplane.getBoundingClientRect().top < enemy.getBoundingClientRect().top + enemyHeight && !enemy.classList.contains("_caput")) airplane.classList.add("_target");
                if (pilot.getBoundingClientRect().left + pilotWidth > enemy.getBoundingClientRect().left && pilot.getBoundingClientRect().left < enemy.getBoundingClientRect().left + enemyWidth && pilot.getBoundingClientRect().top < enemy.getBoundingClientRect().top + enemyHeight && !enemy.classList.contains("_caput")) pilot.classList.add("_target");
            }));
        }), 100);
    }
    function restartGame() {
        clearInterval(config.createGunPilotTimer);
        resetData();
        checkLevel();
        if (document.querySelector(".field__player").classList.contains("_target")) document.querySelector(".field__player").classList.remove("_target");
        if (document.querySelector(".field__pilot").classList.contains("_target")) document.querySelector(".field__pilot").classList.remove("_target");
        drawStartPositionHeroAir();
        drawStartPositionSecondAirplane();
        startGame();
        checkCollisionAirplane();
    }
    function resetData() {
        config.win_diamonds = 0;
        config.win_money = 0;
    }
    document.addEventListener("click", (e => {
        let targetElement = e.target;
        if (targetElement.closest(".preloader__button")) setTimeout((() => {
            sessionStorage.setItem("preloader", true);
            preloader.classList.add("_hide");
            wrapper.classList.add("_visible");
            if (document.querySelector(".main") && document.querySelector(".preloader").classList.contains("_hide")) {
                document.querySelector(".main").classList.add("_active");
                writeStartAirplane();
                drawPriceAirplanes();
                chekBoughtAirplanes();
                chekcCurrentAirplane();
            }
        }), 300);
        if (targetElement.closest(".footer__button ")) document.querySelector(".main__body").classList.add("_bet");
        if (targetElement.closest(".footer__btn-card ")) document.querySelector(".main__body").classList.add("_store");
        if (targetElement.closest(".bet-box__button-back")) document.querySelector(".main__body").classList.remove("_bet");
        if (targetElement.closest(".store__btn-back")) document.querySelector(".main__body").classList.remove("_store");
        if (targetElement.closest(".bet-box__button")) {
            let bet = +targetElement.closest(".bet-box__button").dataset.bet;
            sessionStorage.setItem("current-bet", bet);
            setTimeout((() => {
                location.href = "game.html";
            }), 500);
        }
        if (targetElement.closest(".item-store") && !targetElement.closest(".item-store").classList.contains("_bought")) {
            buyWeapon(targetElement.closest(".item-store"));
            chekBoughtAirplanes();
        }
        if (targetElement.closest(".item-store") && targetElement.closest(".item-store").classList.contains("_bought")) {
            removeSelectedPriceBox();
            sessionStorage.setItem("current-airplane", targetElement.closest(".item-store").dataset.airplane);
            setTimeout((() => {
                targetElement.closest(".item-store").classList.add("_selected");
            }), 300);
        }
        if (targetElement.closest(".field")) createGuns(".field__player");
        if (targetElement.closest(".win__button")) {
            document.querySelector(".win").classList.remove("_active");
            restartGame();
        }
    }));
    document.addEventListener("touchstart", (e => {
        let targetElement = e.target;
        if (targetElement.closest(".field__player")) {
            let firstTouch = e.touches[0];
            player.x = firstTouch.clientX;
        }
    }));
    document.addEventListener("touchmove", (e => {
        let targetElement = e.target;
        if (targetElement.closest(".field__player")) {
            if (!player.x) return false;
            let playerCoord_2 = e.touches[0].clientX;
            let xDiff = playerCoord_2 - player.x;
            const element = document.querySelector(".field__player");
            const style = window.getComputedStyle(element);
            let coord_left = parseInt(style.left, 10);
            if (xDiff > 0) {
                if (player.currentPosition < window_width - 130) {
                    player.currentPosition += player.speed;
                    moveAirplane();
                }
            } else if (coord_left > 0) {
                player.currentPosition -= player.speed;
                moveAirplane();
            }
        }
    }));
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ; else document.addEventListener("mousemove", (e => {
        player.currentPosition = e.clientX - 50;
        moveAirplane();
    }));
    window["FLS"] = true;
    isWebp();
    addLoadedClass();
})();