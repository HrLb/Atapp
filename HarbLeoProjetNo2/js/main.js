/*
Auteur : Leo Harb
date de début : 26.04.2021

Script de jeu

sources : 
https://www.w3schools.com
https://stackoverflow.com/questions
*/

//déclaration des objets
let body = document.getElementById("body");
let joueur = document.createElement("img");
let barreVie = document.getElementById("barreVie");
let barreProgress = document.getElementById("barreProgress");
let pause = document.getElementById("pause");
let divScore = document.getElementById("score");
body.style.height = window.innerHeight + "px";
body.style.width = window.innerWidth + "px";

//déclaration des variables
let playing = false;

let isGameOver = false;

let score = 0;

let haut = false;
let bas = false;
let droite = false;
let gauche = false;

const VITESSE = 5;
const VITESSEPROJECTILE = 10;
const VITESSENNEMI = 7.5;

let nombreProjectiles = 0;

function init() {
    // (ré)initialisation des variables
    nombreProjectiles = 0;

    score = 0;

    divScore.innerHTML = "Score : " + score;

    haut = false;
    bas = false;
    droite = false;
    gauche = false;

    body.draggable = false;

    //position et taille barre de vie et de ses propriétés
    barreVie.style.width = 120 + "px";
    barreVie.style.height = 30 + "px";
    barreVie.style.left = ((window.innerWidth / 2) - (parseFloat(barreVie.style.width.slice(0, -2)) / 2)) + "px";

    barreProgress.style.width = 120 + "px";
    barreProgress.style.height = 30 + "px";
    barreProgress.style.left = ((window.innerWidth / 2) - (parseFloat(barreProgress.style.width.slice(0, -2)) / 2)) + "px";

    //création du joueur et de ses propriétés
    joueur.style.height = "50px";
    joueur.style.width = "50px";
    joueur.src = "./images/surplace.gif";
    joueur.style.position = "absolute";
    joueur.style.top = ((window.innerHeight / 2) - (parseFloat(joueur.style.height.slice(0, -2)) / 2)) + "px";
    joueur.style.left = ((window.innerWidth / 2) - (parseFloat(joueur.style.width.slice(0, -2)) / 2)) + "px";
    joueur.id = "joueur";
    joueur.draggable = false;

    body.appendChild(joueur);

    for (let i = 0; i < 10; i++) {
        creerEnnemi();
    }
}

//fonction du boutton start lance le jeu, met le jeu en pause et le résume
function start() {
    if (!isGameOver) {


        if (playing) {
            playing = false;
            pause.value = "play";

            //création du menu de pause
            let pauseMenu = document.createElement("div");
            body.appendChild(pauseMenu);
            pauseMenu.style.position = "absolute";
            pauseMenu.style.backgroundColor = "gray";
            pauseMenu.style.opacity = 50 + "%";
            pauseMenu.style.width = 100 + "%";
            pauseMenu.style.height = 100 + "%";
            pause.style.left = 0 + "px";
            pause.style.top = 0 + "px";
            pauseMenu.id = "pauseMenu";
            pauseMenu.style.textAlign = "center";
            pauseMenu.innerHTML = "Jeu en pause";
            pauseMenu.style.fontSize = 50 + "px";

            //boutton résumer
            let pauseButton = document.createElement("input");
            body.appendChild(pauseButton);
            pauseButton.type = "button";
            pauseButton.style.position = "absolute";
            pauseButton.style.width = 100 + "px";
            pauseButton.className = "btn btn-light btn-lg align-self-center";
            pauseButton.style.height = 50 + "px";
            pauseButton.style.top = ((window.innerHeight / 2) - (parseFloat(pauseButton.style.height.slice(0, -2)) / 2)) + "px";
            pauseButton.style.left = ((window.innerWidth / 2) - (parseFloat(pauseButton.style.width.slice(0, -2)) / 2)) + "px";
            pauseButton.id = "pauseButton";
            pauseButton.value = "resume";
            pauseButton.addEventListener("click", function () {
                start();
            })

        } else {
            playing = true;
            pause.value = "pause";
            if (joueur.id == "") {
                init();
            } else {
                document.getElementById("pauseMenu").remove();
                document.getElementById("pauseButton").remove();
            }

            //averti l'utilisateur que la page s'apprête à etre rechargée
            window.onbeforeunload = function () {
                start();
                return "Votre partie sera perdu. Voulez-vous vraiment quitter cette page";
            }
        }
    }
}

//fonction de création d'un ennemi
function creerEnnemi() {
    //propriétés de l'ennemi
    let ennemi = document.createElement("img");
    body.appendChild(ennemi);
    let ennemiVitX = Math.random()
    let ennemiVitY = 1 - ennemiVitX;
    ennemi.id = (ennemiVitX * VITESSENNEMI) + ";" + (ennemiVitY * VITESSENNEMI);
    ennemi.style.position = "absolute";
    ennemi.style.width = 50 + "px";
    ennemi.style.height = 50 + "px";
    ennemi.src = "./images/ennemi.gif";
    ennemi.draggable = false;

    //fait apparaitre l'ennemi dans une certaine distance par rapport au joueur
    ennemi.style.top = ((Math.random() * window.innerHeight) - parseFloat(ennemi.style.height.slice(0, -2))) + "px";
    ennemi.style.left = ((Math.random() * window.innerWidth) - parseFloat(ennemi.style.width.slice(0, -2))) + "px";
    while (Math.sqrt(Math.pow(parseFloat(ennemi.style.top.slice(0, -2)) - parseFloat(joueur.style.top.slice(0, -2)), 2)) < 400) {
        ennemi.style.top = (Math.random() * window.innerHeight - parseFloat(ennemi.style.height.slice(0, -2))) + "px";
    }
    while (Math.sqrt(Math.pow(parseFloat(ennemi.style.top.slice(0, -2)) - parseFloat(joueur.style.top.slice(0, -2)), 2)) < 400) {
        ennemi.style.left = (Math.random() * window.innerWidth - parseFloat(ennemi.style.width.slice(0, -2))) + "px";
    }
}

//event listener touche pressée
body.addEventListener("keydown", event => {

    if (playing) {
        if (event.keyCode == 87) {
            //touche W down
            haut = true;
        } else if (event.keyCode == 83) {
            //touche S down
            bas = true;
        } else if (event.keyCode == 65) {
            //touche A down
            gauche = true;
        } else if (event.keyCode == 68) {
            //touche D down
            droite = true;
        }
    }
    if (event.keyCode == 27 && joueur.id != "") {
        //touche escape down
        start();
    }
});

//event listener fenetre resizée
window.addEventListener('resize', function (event) {
    if (!isGameOver) {
        if (playing) {
            start();
        }
    }
}, true);


//event listener touche relachée
body.addEventListener("keyup", event => {
    if (playing) {
        if (event.keyCode == 87) {
            //touche W down
            haut = false;
        } else if (event.keyCode == 83) {
            //touche S down
            bas = false;
        } else if (event.keyCode == 65) {
            //touche A down
            gauche = false;
        } else if (event.keyCode == 68) {
            //touche D down
            droite = false;
        }
    }
});

function tire(event) {
    if (playing && !isGameOver) {
        //calcule les vitesses X et Y du projectile en fonction de la position du click par rapport au joueur
        let clickX = event.clientX;
        let clickY = event.clientY;

        let posJoueurX = parseInt(joueur.style.left.slice(0, -2)) + (parseInt(joueur.style.width.slice(0, -2)) / 2);
        let posJoueurY = parseInt(joueur.style.top.slice(0, -2)) + (parseInt(joueur.style.height.slice(0, -2)) / 2);

        let resX = clickX - posJoueurX;
        let resY = clickY - posJoueurY;

        let tot = Math.sqrt(resX * resX) + Math.sqrt(resY * resY);

        let pourcentX = resX / tot;
        pourcentX = pourcentX * (Math.sqrt(resX * resX) / resX);

        let pourcentY = 1 - pourcentX;
        pourcentY = pourcentY * (Math.sqrt(resY * resY) / resY);

        if (resX && resY)

            if (pourcentX > 0 && resX < 0) {
                pourcentX = pourcentX * -1;
            }

        if (pourcentX < 0 && resX > 0) {
            pourcentX = pourcentX * -1;
        }

        if (pourcentY > 0 && resY < 0) {
            pourcentY = pourcentY * -1;
        }

        if (pourcentY < 0 && resY > 0) {
            pourcentY = pourcentY * -1;
        }

        //objet temporaire de projectile
        let projectile = { objet: document.createElement("img"), vitX: VITESSEPROJECTILE * pourcentX, vitY: VITESSEPROJECTILE * pourcentY };

        //applique les propriété au projectile créé
        body.appendChild(projectile.objet);

        projectile.objet.id = String(projectile.vitX).slice(0, 5) + ";" + String(projectile.vitY).slice(0, 5);

        projectile.objet.style.position = "absolute";

        projectile.objet.style.height = 10 + "px";
        projectile.objet.style.width = 10 + "px";

        projectile.objet.src = "./images/projectile.gif";

        projectile.objet.draggable = false;

        projectile.objet.style.top = (parseFloat(joueur.style.top.slice(0, -2)) + (parseFloat(joueur.style.height.slice(0, -2)) / 2) - (parseFloat(projectile.objet.style.height.slice(0, -2)) / 2)) + "px";
        projectile.objet.style.left = (parseFloat(joueur.style.left.slice(0, -2)) + (parseFloat(joueur.style.width.slice(0, -2)) / 2) - (parseFloat(projectile.objet.style.width.slice(0, -2)) / 2)) + "px";

        nombreProjectiles++;
    }
}

function teleportEnnemi(ennemi) {
    //téléporte l'ennemi dans une certaine distance par rapport au joueur
    ennemi.style.top = (Math.random() * window.innerHeight - parseFloat(ennemi.style.height.slice(0, -2))) + "px";
    while (Math.sqrt(Math.pow(parseFloat(ennemi.style.top.slice(0, -2)) - parseFloat(joueur.style.top.slice(0, -2)), 2)) < 400) {
        ennemi.style.top = (Math.random() * window.innerHeight - parseFloat(ennemi.style.height.slice(0, -2))) + "px";
    }
    ennemi.style.left = (Math.random() * window.innerWidth - parseFloat(ennemi.style.width.slice(0, -2))) + "px";
    while (Math.sqrt(Math.pow(parseFloat(ennemi.style.top.slice(0, -2)) - parseFloat(joueur.style.top.slice(0, -2)), 2)) < 400) {
        ennemi.style.left = (Math.random() * window.innerWidth - parseFloat(ennemi.style.width.slice(0, -2))) + "px";
    }
}

function gameOver() {

    //fin du jeu affichage du score et supprimage des éléments
    playing = false;
    isGameOver = true;

    window.onbeforeunload = function () { };

    let allImgs = document.getElementsByTagName("img");
    for (let i = 0; i < allImgs.length; i = 0) {
        const element = allImgs[i];
        element.remove();
    }

    let allDivs = document.getElementsByTagName("div");
    for (let i = 0; i < allDivs.length; i = 0) {
        const element = allDivs[i];
        element.remove();
    }

    let allInputs = document.getElementsByTagName("input");
    for (let i = 0; i < allInputs.length; i = 0) {
        const element = allInputs[i];
        element.remove();
    }


    let allFooters = document.getElementsByTagName("footer");
    for (let i = 0; i < allFooters.length; i = 0) {
        const element = allFooters[i];
        element.remove();
    }


    let endDiv = document.createElement("div");
    body.appendChild(endDiv);
    endDiv.className = "position-absolute top-50 start-50 translate-middle text-center";

    let restart = document.createElement("input");
    endDiv.appendChild(restart);
    restart.type = "button";
    restart.value = "Restart";
    restart.className = "btn btn-secondary btn-lg";

    let goToScore = document.createElement("a");
    endDiv.appendChild(goToScore);
    goToScore.href = "scores.php";
    goToScore.innerHTML = "Go to scores";
    goToScore.className = "btn btn-light btn-lg";

    let gameOverText = document.createElement("h1");
    body.appendChild(gameOverText);
    gameOverText.type = "button";
    gameOverText.innerHTML = "Game Over";
    gameOverText.appendChild(document.createElement("br"));
    gameOverText.innerHTML += "Score : " + score;
    gameOverText.className = "text-center position-absolute bottom-50 start-50 translate-middle"

    restart.addEventListener("click", function () {
        location.reload();
    })
    
        // fetch('./php/functions.SaveScore.php?data=' + JSON.stringify({"score": score}),
        // {
        //     method: "GET",
        //     headers: {
        //         "Content-Type": "application/json"
        //     }
        // }).then(function (response)
        // {
        //     console.log(response);
        //     return response.json();
        // }).then(function (response)
        // {
        //     console.log(response);
        // })

        fetch('./php/functions.SaveScore.php',
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({"score": score}),
        }).then(function (response)
        {
            console.log(response);
            return response.json();
        }).then(function (response)
        {
            console.log(response);
        })



}

function projectileEnnemiMouvement() {
    if (playing) {
        let objets = document.getElementsByTagName("img");
        //pour chaque projectile calcule son mouvement et ses colisions 
        for (let i = 0; i < objets.length; i++) {
            const element = objets[i];
            if (element.src.slice(-6) == "le.gif") {

                let res = element.id.split(";");

                const VX = parseFloat(res[0]);
                const VY = parseFloat(res[1]);

                element.style.left = (parseFloat(element.style.left.slice(0, -2)) + VX) + "px";
                element.style.top = (parseFloat(element.style.top.slice(0, -2)) + VY) + "px";


                //détection de colision avec bords de l'écran

                if (parseFloat(element.style.top.slice(0, -2)) < 0 || parseFloat(element.style.top.slice(0, -2)) > window.innerHeight - parseFloat(element.style.height.slice(0, -2)) || parseFloat(element.style.left.slice(0, -2)) < 0 || parseFloat(element.style.left.slice(0, -2)) > window.innerWidth - parseFloat(element.style.width.slice(0, -2))) {
                    element.parentNode.removeChild(element);
                    element.remove();
                }

                //pour chaque ennemi
                for (let j = 0; j < objets.length; j++) {
                    const OBJ = objets[j];
                    if (OBJ.src.slice(-5) == "i.gif") {
                        //si il y a collision avec un ennemi
                        if ((parseFloat(element.style.left.slice(0, -2)) + parseFloat(element.style.width.slice(0, -2)) > parseFloat(OBJ.style.left.slice(0, -2)) && parseFloat(element.style.left.slice(0, -2)) < parseFloat(OBJ.style.left.slice(0, -2)) + parseFloat(OBJ.style.width.slice(0, -2))) && (parseFloat(element.style.top.slice(0, -2)) + parseFloat(element.style.height.slice(0, -2)) > parseFloat(OBJ.style.top.slice(0, -2)) && parseFloat(element.style.top.slice(0, -2)) < parseFloat(OBJ.style.top.slice(0, -2)) + parseFloat(OBJ.style.height.slice(0, -2)))) {
                            score++;
                            divScore.innerHTML = "Score : " + score;

                            teleportEnnemi(OBJ);


                            let ennemiVitX = Math.random()
                            let ennemiVitY = 1 - ennemiVitX;
                            OBJ.id = (ennemiVitX * VITESSENNEMI) + ";" + (ennemiVitY * VITESSENNEMI);
                        }
                    }
                }

                //Pour les ennemis
            } else if (element.src.slice(-5) == "i.gif") {

                //mouvement de l'ennemi
                let res = element.id.split(";");

                const VX = parseFloat(res[0]);
                const VY = parseFloat(res[1]);

                element.style.left = (parseFloat(element.style.left.slice(0, -2)) + VX) + "px";
                element.style.top = (parseFloat(element.style.top.slice(0, -2)) + VY) + "px";

                //rebond de l'ennemi sur les bords de la fenetre
                if (parseFloat(element.style.left.slice(0, -2)) + VX < 0) {
                    element.style.left = 0 + "px";
                    element.id = (VX * -1) + ";" + VY;
                }
                if (parseFloat(element.style.left.slice(0, -2)) + VX > window.innerWidth - parseFloat(element.style.width.slice(0, -2))) {
                    element.style.left = window.innerWidth - parseFloat(element.style.width.slice(0, -2)) + "px";
                    element.id = (VX * -1) + ";" + VY;
                }

                if (parseFloat(element.style.top.slice(0, -2)) + VY < 0) {
                    element.style.top = 0 + "px";
                    element.id = VX + ";" + (VY * -1);
                }
                if (parseFloat(element.style.top.slice(0, -2)) + VY > window.innerHeight - parseFloat(element.style.height.slice(0, -2))) {
                    element.style.top = window.innerHeight - parseFloat(element.style.height.slice(0, -2)) + "px";
                    element.id = VX + ";" + (VY * -1);
                }

                //si l'ennemi touche le joueur
                if (parseFloat(element.style.left.slice(0, -2)) + parseFloat(element.style.width.slice(0, -2)) > parseFloat(joueur.style.left.slice(0, -2)) && parseFloat(element.style.left.slice(0, -2)) < parseFloat(joueur.style.left.slice(0, -2)) + parseFloat(joueur.style.width.slice(0, -2)) && (parseFloat(element.style.top.slice(0, -2)) + parseFloat(element.style.height.slice(0, -2)) > parseFloat(joueur.style.top.slice(0, -2)) && parseFloat(element.style.top.slice(0, -2)) < parseFloat(joueur.style.top.slice(0, -2)) + parseFloat(joueur.style.height.slice(0, -2)))) {
                    barreProgress.style.width = (parseFloat(barreProgress.style.width.slice(0, -2)) - 40) + "px";
                    if (parseFloat(barreProgress.style.width.slice(0, -2)) <= 0) {
                        gameOver();
                    }
                    teleportEnnemi(element);
                }
            }
        }
    }
}

//fonction de jeu appelée toute les 10 millisecondes
setInterval(game, 10);

//function de jeu
function game() {
    if (playing) {
        //calcule mouvements des ennemis et des projectiles
        projectileEnnemiMouvement();

        //calcule des mouvements du joueur et affichage de la bonne image en fonction de la direction
        if (haut && bas && droite && gauche) {
            if (joueur.src.slice(-11) != "urplace.gif") {
                joueur.src = "./images/surplace.gif";
            }

        } else {
            if (haut && bas && droite) {
                if (joueur.src.slice(-11) != "/droite.gif") {
                    joueur.src = "./images/droite.gif";
                }
                if (parseFloat(joueur.style.left.slice(0, -2)) + VITESSE > window.innerWidth - joueur.style.width.slice(0, -2)) {
                    joueur.style.left = window.innerWidth - joueur.style.width.slice(0, -2) + "px";
                } else {
                    joueur.style.left = (parseFloat(joueur.style.left.slice(0, -2)) + VITESSE) + "px";
                }
            }
            else if (haut && bas && gauche) {
                if (joueur.src.slice(-11) != "/gauche.gif") {
                    joueur.src = "./images/gauche.gif";
                }
                if (parseFloat(joueur.style.left.slice(0, -2)) - VITESSE < 0) {
                    joueur.style.top = 0 + "px";
                } else {
                    joueur.style.left = (parseFloat(joueur.style.left.slice(0, -2)) - VITESSE) + "px";
                }
            }
            else if (haut && droite && gauche) {
                if (joueur.src.slice(-11) != "es/haut.gif") {
                    joueur.src = "./images/haut.gif";
                }
                if (parseFloat(joueur.style.top.slice(0, -2)) - VITESSE < 0) {
                    joueur.style.top = 0 + "px";
                } else {
                    joueur.style.top = (parseFloat(joueur.style.top.slice(0, -2)) - VITESSE) + "px";
                }
            }
            else if (bas && droite && gauche) {
                if (joueur.src.slice(-11) != "ges/bas.gif") {
                    joueur.src = "./images/bas.gif";
                }
                if (parseFloat(joueur.style.top.slice(0, -2)) + VITESSE > window.innerHeight - joueur.style.height.slice(0, -2)) {
                    joueur.style.top = window.innerHeight - joueur.style.height.slice(0, -2) + "px";
                } else {
                    joueur.style.top = (parseFloat(joueur.style.top.slice(0, -2)) + VITESSE) + "px";
                }
            }
            else {
                // 0.7071067811865475 étant la racine carrée de 0.5
                if (haut && bas) {
                    if (joueur.src.slice(-11) != "urplace.gif") {
                        joueur.src = "./images/surplace.gif";
                    }
                } else if (droite && gauche) {
                    if (joueur.src.slice(-11) != "urplace.gif") {
                        joueur.src = "./images/surplace.gif";
                    }
                } else if (haut && gauche) {
                    if (joueur.src.slice(-11) != "tgauche.gif") {
                        joueur.src = "./images/hautgauche.gif";
                    }
                    if (parseFloat(joueur.style.top.slice(0, -2)) - (VITESSE * 0.7071067811865475) < 0) {
                        joueur.style.top = 0 + "px";
                    } else {
                        joueur.style.top = (parseFloat(joueur.style.top.slice(0, -2)) - (VITESSE * 0.7071067811865475)) + "px";
                    }

                    if (parseFloat(joueur.style.left.slice(0, -2)) - (VITESSE * 0.7071067811865475) < 0) {
                        joueur.style.left = 0 + "px";
                    } else {
                        joueur.style.left = (parseFloat(joueur.style.left.slice(0, -2)) - (VITESSE * 0.7071067811865475)) + "px";
                    }

                } else if (haut && droite) {
                    if (joueur.src.slice(-11) != "tdroite.gif") {
                        joueur.src = "./images/hautdroite.gif";
                    }
                    if (parseFloat(joueur.style.top.slice(0, -2)) - (VITESSE * 0.7071067811865475) < 0) {
                        joueur.style.top = 0 + "px";
                    } else {
                        joueur.style.top = (parseFloat(joueur.style.top.slice(0, -2)) - (VITESSE * 0.7071067811865475)) + "px";
                    }

                    if (parseFloat(joueur.style.left.slice(0, -2)) + (VITESSE * 0.7071067811865475) > window.innerWidth - parseFloat(joueur.style.width.slice(0, -2))) {
                        joueur.style.left = window.innerWidth - joueur.style.width.slice(0, -2) + "px";
                    } else {
                        joueur.style.left = (parseFloat(joueur.style.left.slice(0, -2)) + (VITESSE * 0.7071067811865475)) + "px";
                    }

                } else if (bas && gauche) {
                    if (joueur.src.slice(-11) != "sgauche.gif") {
                        joueur.src = "./images/basgauche.gif";
                    }
                    if (parseFloat(joueur.style.top.slice(0, -2)) + (VITESSE * 0.7071067811865475) > window.innerHeight - parseFloat(joueur.style.height.slice(0, -2))) {
                        joueur.style.top = window.innerHeight - joueur.style.height.slice(0, -2) + "px";
                    } else {
                        joueur.style.top = (parseFloat(joueur.style.top.slice(0, -2)) + (VITESSE * 0.7071067811865475)) + "px";
                    }

                    if (parseFloat(joueur.style.left.slice(0, -2)) - (VITESSE * 0.7071067811865475) < 0) {
                        joueur.style.left = 0 + "px";
                    } else {
                        joueur.style.left = (parseFloat(joueur.style.left.slice(0, -2)) - (VITESSE * 0.7071067811865475)) + "px";
                    }

                } else if (bas && droite) {
                    if (joueur.src.slice(-11) != "sdroite.gif") {
                        joueur.src = "./images/basdroite.gif";
                    }
                    if (parseFloat(joueur.style.top.slice(0, -2)) + (VITESSE * 0.7071067811865475) > window.innerHeight - parseFloat(joueur.style.height.slice(0, -2))) {
                        joueur.style.top = window.innerHeight - joueur.style.height.slice(0, -2) + "px";
                    } else {
                        joueur.style.top = (parseFloat(joueur.style.top.slice(0, -2)) + (VITESSE * 0.7071067811865475)) + "px";
                    }

                    if (parseFloat(joueur.style.left.slice(0, -2)) + (VITESSE * 0.7071067811865475) > window.innerWidth - parseFloat(joueur.style.width.slice(0, -2))) {
                        joueur.style.left = window.innerWidth - joueur.style.width.slice(0, -2) + "px";
                    } else {
                        joueur.style.left = (parseFloat(joueur.style.left.slice(0, -2)) + (VITESSE * 0.7071067811865475)) + "px";
                    }

                } else {
                    if (haut) {
                        if (joueur.src.slice(-11) != "es/haut.gif") {
                            joueur.src = "./images/haut.gif";
                        }
                        if (parseFloat(joueur.style.top.slice(0, -2)) - VITESSE < 0) {
                            joueur.style.top = 0 + "px";
                        } else {
                            joueur.style.top = (parseFloat(joueur.style.top.slice(0, -2)) - VITESSE) + "px";
                        }
                    }
                    else if (bas) {
                        if (joueur.src.slice(-11) != "ges/bas.gif") {
                            joueur.src = "./images/bas.gif";
                        }
                        if (parseFloat(joueur.style.top.slice(0, -2)) + VITESSE > window.innerHeight - parseFloat(joueur.style.height.slice(0, -2))) {
                            joueur.style.top = window.innerHeight - joueur.style.height.slice(0, -2) + "px";
                        } else {
                            joueur.style.top = (parseFloat(joueur.style.top.slice(0, -2)) + VITESSE) + "px";
                        }
                    }
                    else if (gauche) {
                        if (joueur.src.slice(-11) != "/gauche.gif") {
                            joueur.src = "./images/gauche.gif";
                        }
                        if (parseFloat(joueur.style.left.slice(0, -2)) - VITESSE < 0) {
                            joueur.style.left = 0 + "px";
                        } else {
                            joueur.style.left = (parseFloat(joueur.style.left.slice(0, -2)) - VITESSE) + "px";
                        }
                    }
                    else if (droite) {
                        if (joueur.src.slice(-11) != "/droite.gif") {
                            joueur.src = "./images/droite.gif";
                        }
                        if (parseFloat(joueur.style.left.slice(0, -2)) + VITESSE > window.innerWidth - parseFloat(joueur.style.width.slice(0, -2))) {
                            joueur.style.left = window.innerWidth - joueur.style.width.slice(0, -2) + "px";
                        } else {
                            joueur.style.left = (parseFloat(joueur.style.left.slice(0, -2)) + VITESSE) + "px";
                        }
                    } else {
                        if (joueur.src.slice(-11) != "urplace.gif") {
                            joueur.src = "./images/surplace.gif";
                        }
                    }
                }
            }
        }
    }
}