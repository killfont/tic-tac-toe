//////////////////////////////////////////////////
////////////////	VARIABLES	/////////////////
////////////////////////////////////////////////

// stocker les cellules vides du tableau
let cellsEmpty
// stocker toutes les cellules du tableau
let cellsAll;
// letiable qui contiendra le choix de la cellule pour l'ordinateur
let choixIA;
// partie en cours (true) ou partie terminée (false)
let partie = true;
// tour du joueur 1 ou joueur 2
let gameOver = false;
let joueur = 1;
// nombre de joueur
let nbJoueur = 0;
// nom joueur affiché
let joueur1HTML = document.getElementById('nomJoueur1');
let joueur2HTML = document.getElementById('nomJoueur2');
const conditionVictoryMorp = [
	// Horizontale
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	// Verticale
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	// Diagonale
	[0, 4, 8],
	[2, 4, 6]
]
const conditionVictoryPFour = [
	//les victoires horizontales
	[0, 1, 2, 3], [1, 2, 3, 4], [2, 3, 4, 5], [3, 4, 5, 6],
	[7, 8, 9, 10], [8, 9, 10, 11], [9, 10, 11, 12], [10, 11, 12, 13],
	[14, 15, 16, 17], [15, 16, 17, 18], [16, 17, 18, 19], [17, 18, 19, 20],
	[21, 22, 23, 24], [22, 23, 24, 25], [23, 24, 25, 26], [24, 25, 26, 27],
	[28, 29, 30, 31], [29, 30, 31, 32], [30, 31, 32, 33], [31, 32, 33, 34],
	[35, 36, 37, 38], [36, 37, 38, 39], [37, 38, 39, 40], [38, 39, 40, 41],
	//les victoires verticales
	[0, 7, 14, 21], [7, 14, 21, 28], [14, 21, 28, 35],
	[1, 8, 15, 22], [8, 15, 22, 29], [15, 22, 29, 36],
	[2, 9, 16, 23], [9, 16, 23, 30], [16, 23, 30, 37],
	[3, 10, 17, 24], [10, 17, 24, 31], [17, 24, 31, 38],
	[4, 11, 18, 25], [11, 18, 25, 32], [18, 25, 32, 39],
	[5, 12, 19, 26], [12, 19, 26, 33], [19, 26, 33, 40],
	[6, 13, 20, 27], [13, 20, 27, 34], [20, 27, 34, 41],
	//les victoires diagonales haut -> droite
	[0, 8, 16, 24], [1, 9, 17, 25], [2, 10, 18, 26], [3, 11, 19, 27],
	[7, 15, 23, 31], [8, 16, 24, 32], [9, 17, 25, 33], [10, 18, 26, 34],
	[14, 22, 30, 38], [15, 23, 31, 39], [16, 24, 32, 40], [17, 25, 33, 41],
	//les victoires diagonales haut -> gauche
	[6, 12, 18, 24], [5, 11, 17, 23], [4, 10, 16, 22], [3, 9, 15, 21],
	[13, 19, 25, 31], [12, 18, 24, 30], [11, 17, 23, 29], [10, 16, 22, 28],
	[20, 26, 32, 38], [19, 25, 31, 37], [18, 24, 30, 36], [17, 23, 29, 35]
];
let gameModePFour = false
let currentConditionVicory;
// pas de vainqueur
let vainqueur = false;
// les 2 joueurs
let joueur1 = {
	nom: null,
	figure: 'cross',
	point: 0
}
let joueur2 = {
	nom: null,
	figure: 'circle',
	point: 0
}
// stocker score à égalité
let pointEgalite = 0;
// récupérer l'affichage des scores
let pointJoueur1HTML = document.getElementById('pointJoueur1');
let pointJoueur2HTML = document.getElementById('pointJoueur2');
let pointEgaliteHTML = document.getElementById('pointEgalite');
// stocker le bouton nouvelle partie
let btnNouveau = document.getElementById('newGame');
// stocker le bouton recommencer une manche
let btnRecommencer = document.getElementById('recommencer');
// récupérer le bouton réinitialiser les scores
let btnReinitialiser = document.getElementById('reinitialiser');
// récupérer affichage nom tour joueur
let tourJoueur = document.getElementById('tourJoueur');
/*
ajouter une figure sur une cellule donnée
paramètres : 
	cell : la cellule cible
	figure : croix ou cercle
*/
function addFigure(cell, figure) {
	//s'il reste des cellules vides, on ajoute une figure sur celle-ci
	if (cellsEmpty.length > 0) {
		cell.classList.add(figure);
		cell.classList.add("used")
		cell.classList.remove('cell');
		cell.removeEventListener('click', onClick);
		cellsEmpty = document.querySelectorAll('td.cell');
	}
}
// ajout d'une figure sur la cellule choisi par l'ordinateur
function addIA() {
	// choix aléatoire d'une cellule pour l'odinateur
	randomIA = nbr(0, cellsEmpty.length - 1);
	// ajout d'une figure selon son choix
	addFigure(cellsEmpty[randomIA], joueur2.figure);
}
//saisie du jeu 
function choiceGame() {

}
function checkDraw() {
	// égalité si cellules pleines et pas de vainqueur
	if ((cellsEmpty.length == 0) && partie == true && vainqueur == false) {
		document.querySelector("#fini").classList.remove('d-none')
		document.querySelector("#fini").innerHTML = 'EGALITE';
		pointEgalite++;
		// affiche le score
		pointEgaliteHTML.textContent = pointEgalite;
		partie = false;
	}
}
/*
 vérifier si un joueur a gagné
 paramètres :
	  nom : nom du joueur
	  figure : croix ou cercle
 */
function checkWin(nom, figure) {
	for (let i = 0; i < currentConditionVicory.length; i++) {
		let firstCell = document.querySelectorAll('td')[currentConditionVicory[i][0]];
		let secondCell = document.querySelectorAll('td')[currentConditionVicory[i][1]];
		let thirdCell = document.querySelectorAll('td')[currentConditionVicory[i][2]];
		if (gameModePFour) {
			let fourthCell = document.querySelectorAll('td')[currentConditionVicory[i][3]];
			if (!firstCell.classList.contains("used") || !secondCell.classList.contains("used") || !thirdCell.classList.contains("used") || !fourthCell.classList.contains("used")) {
				continue
			}
			if (firstCell.classList.contains("cross") && secondCell.classList.contains("cross") && thirdCell.classList.contains("cross") && fourthCell.classList.contains('cross')) {
				firstCell.style.backgroundColor = "#9ACD32";
				secondCell.style.backgroundColor = "#9ACD32";
				thirdCell.style.backgroundColor = "#9ACD32";
				fourthCell.style.backgroundColor = "#9ACD32";
				truc(joueur1.nom)
				break
			}
			if (firstCell.classList.contains("circle") && secondCell.classList.contains("circle") && thirdCell.classList.contains("circle") && fourthCell.classList.contains('circle')) {
				firstCell.style.backgroundColor = "#9ACD32";
				secondCell.style.backgroundColor = "#9ACD32";
				thirdCell.style.backgroundColor = "#9ACD32";
				fourthCell.style.backgroundColor = "#9ACD32";
				truc(joueur2.nom)
				break
			}
		} else {
			if (!firstCell.classList.contains("used") || !secondCell.classList.contains("used") || !thirdCell.classList.contains("used")) {
				continue
			}
			if (firstCell.classList.contains("cross") && secondCell.classList.contains("cross") && thirdCell.classList.contains("cross")) {
				firstCell.style.backgroundColor = "#9ACD32";
				secondCell.style.backgroundColor = "#9ACD32";
				thirdCell.style.backgroundColor = "#9ACD32";
				truc(joueur1.nom)
				break
			}
			if (firstCell.classList.contains("circle") && secondCell.classList.contains("circle") && thirdCell.classList.contains("circle")) {
				firstCell.style.backgroundColor = "#9ACD32";
				secondCell.style.backgroundColor = "#9ACD32";
				thirdCell.style.backgroundColor = "#9ACD32";
				truc(joueur2.nom)
				break
			}
		}

	}

}
function truc(nom) {
	document.querySelector("#fini").classList.remove('d-none')
	document.querySelector("#fini").innerHTML = `${nom} A GAGNER`;
	gameOver = true
	switch (joueur) {
		// si joueur 1 a gagné, on incrémente point du joueur et l'affiche
		case 1:
			joueur1.point++;
			pointJoueur1HTML.textContent = joueur1.point;
			// joueur 1 vainqueur, prochaine manche le joueur 2 commence
			joueur = 2;
			tourJoueur.textContent = joueur2.nom;
			vainqueur = true;
			break;

		// si joueur 2 a gagné, on incrémente point du joueur et l'affiche
		case 2:

			joueur2.point++;
			pointJoueur2HTML.textContent = joueur2.point;
			// joueur 2 vainqueur, prochaine manche le joueur 1 commence
			joueur = 1;
			tourJoueur.textContent = joueur1.nom;
			vainqueur = true;
			break;
	}
	//partie terminée
	partie = false;
	//si pas de vainqueur, on change de tour de joueur
	switch (joueur) {
		// si joueur 1 a joué, prochain tour joueur 2
		case 1:
			joueur = 2;
			tourJoueur.textContent = joueur2.nom;
			break;
		// si joueur 2 a joué, prochain tour joueur1
		case 2:
			joueur = 1;
			tourJoueur.textContent = joueur1.nom;
			break;
	}

}
function nbr(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
// ajout d'une figure au click
function onClick(elem) {
	if (partie == true && !gameOver) {

		// partie joueur vs ordinateur
		if (nbJoueur == 1 && !elem.classList.contains("used")) {
			// ajout croix sur la case cliquée
			addFigure(elem, joueur1.figure);
			// vérifie si le joueur a gagné ou égalité
			checkWin(joueur1.nom, joueur1.figure);
			checkDraw();
			joueur = 2
			// si la partie continue après tour joueur 1 (pas de vainqueur ou égalité), tour de l'IA
			if (partie == true) {
				roundIA();
			}
		}
		// partie joueur 1 vs joueur 2
		if ((nbJoueur == 2) && (joueur == 1) && !elem.classList.contains("used")) {
			// tour du joueur 1
			document.querySelector('h2').innerText = `tour de ${joueur2.nom}`
			addFigure(elem, joueur1.figure);
			checkWin(joueur1.nom, joueur1.figure);
			checkDraw();
			joueur = 2
		} else if ((nbJoueur == 2) && (joueur == 2) && !elem.classList.contains("used")) {
				document.querySelector('h2').innerText = `tour de ${joueur1.nom}`
				addFigure(elem, joueur2.figure);
				checkWin(joueur2.nom, joueur2.figure);
				checkDraw();
				joueur = 1
		}
	}
}
// Démarrer une nouvelle partie, demander les paramètres de jeu, score à 0
function onClickNew() {
	nbJoueur = 0;
	joueur1.nom = null;
	joueur2.nom = null;
	vainqueur = false;
	choiceGame();
	rematch();
	reset();
	joueur = 1;
}
// efface les figures pour commencer une nouvelle manche
function rematch() {
	cellsAll = document.querySelectorAll('td');
	console.log(cellsAll);
	gameOver = false;
	document.querySelector("#fini").innerHTML = ""
	for (let i = 0; i < cellsAll.length; i++) {
		cellsAll[i].className = ""
		cellsAll[i].classList.add('cell');
		cellsAll[i].style.backgroundColor = 'black'
		cellsEmpty = document.querySelectorAll('td.cell');
		partie = true;
		vainqueur = false;
	}
	// si c'est au tour de l'IA de commencer la nouvelle manche
	if ((nbJoueur == 1) && (joueur == 2)) {
		roundIA();
	}
}
// tour de l'IA avec timer et condition victoire et égalité
function roundIA() {
	partie = false;
	joueur2.nom = "CPU"
	document.querySelector('h2').innerText = `tour de ${joueur2.nom}`
	// ordinateur ajoute un cercle sur une case au hasard après un délais de 2 secondes
	setTimeout(function () {
		addIA();
		// vérifie si l'ordinateur a gagné
		checkWin(joueur2.nom, joueur2.figure);
		partie = true;
		checkDraw();
		joueur = 1
		document.querySelector('h2').innerText = `tour de ${joueur1.nom}`
	}, 800);
}
function createGrid(nmbLine, nmbCell) {
	document.querySelector('h2').innerText = `tour de ${joueur1.nom}`
	let tableContainer = document.querySelector("tbody")
	tableContainer.innerHTML = ""
	for (let i = 0; i < nmbLine; i++) {
		let trElement = document.createElement("tr")
		tableContainer.appendChild(trElement)
		for (let j = 0; j < nmbCell; j++) {
			let tdElement = document.createElement("td")
			trElement.appendChild(tdElement)
			tdElement.classList.add("cell")
			tdElement.addEventListener('click', function () {
				onClick(tdElement)
			})
		}
	}
}
function createPowerFour(elem) {
	document.querySelector("form").innerHTML = ""
	document.querySelector("form").classList.remove('center')
	document.querySelector("#recapitulatif").classList.remove('d-none')
	document.querySelector("#recommencer").classList.remove('d-none')
	document.querySelector("#game").classList.remove('d-none')
	document.querySelector("#h2").classList.remove('d-none')
	document.querySelector('#game').innerHTML = "PUISSANCE 4"
	gameModePFour = true
	currentConditionVicory = conditionVictoryPFour
	if (cellsAll) {
		rematch()
	}
	createGrid(6, 7)
	elem.classList.add("d-none")
	document.querySelector("#buttonMorpion").classList.remove('d-none')
	cellsAll = document.querySelectorAll('td');
	cellsEmpty = document.querySelectorAll('td.cell');
}
function createMorp(elem) {
	document.querySelector("form").innerHTML = ""
	document.querySelector("form").classList.remove('center')
	document.querySelector("#recapitulatif").classList.remove('d-none')
	document.querySelector("#recommencer").classList.remove('d-none')
	document.querySelector("#game").classList.remove('d-none')
	document.querySelector("#h2").classList.remove('d-none')
	document.querySelector('#game').innerHTML = "MORPION"
	gameModePFour = false
	currentConditionVicory = conditionVictoryMorp
	if (cellsAll) {
		rematch()
	}
	createGrid(3, 3)
	elem.classList.add("d-none")
	document.querySelector("#buttonPower").classList.remove('d-none')
	cellsAll = document.querySelectorAll('td');
	cellsEmpty = document.querySelectorAll('td.cell');
}
function addElements() {
	let newTr = document.createElement("tr");
}
function createForm() {
	let form = document.querySelector('form')
	let inputNmbPlayer = document.createElement('select')
	let optionOneplayer = document.createElement('option')
	optionOneplayer.value = 1
	optionOneplayer.innerText = "1 JOUEUR"
	let optionTwoplayer = document.createElement('option')
	optionTwoplayer.value = 2
	optionTwoplayer.innerText = "2 JOUEUR"
	form.appendChild(inputNmbPlayer)
	inputNmbPlayer.appendChild(optionOneplayer)
	inputNmbPlayer.appendChild(optionTwoplayer)
	let inputSubmit = document.createElement('button')
	inputSubmit.innerHTML = "VALIDER NOMBRE DU JOUEUR"
	inputSubmit.type = "button"
	inputSubmit.addEventListener('click', function () {
		choicePlayer(inputNmbPlayer)
	})
	form.appendChild(inputSubmit)
}
function createNameOption() {
	let form = document.querySelector('form')
	form.innerHTML = ""
	for (let i = 0; i < nbJoueur; i++) {
		let label = document.createElement('label')
		label.innerHTML = "NOM : "
		label.for = `playerName${i + 1}`
		let input = document.createElement('input')
		input.type = "text"
		input.id = `playerName${i + 1}`
		form.appendChild(label)
		form.appendChild(input)	
	}
	let inputSubmit = document.createElement('button')
	inputSubmit.innerHTML = "VALIDER NOM DU JOUEUR"
	inputSubmit.type = 'button'
	inputSubmit.addEventListener('click', function () {
		choicePlayerName()
	})
	form.appendChild(inputSubmit)
}
//saisie du nombre de joueur par l'utilisateur (1 ou 2 obligatoire)
function choicePlayer(elem) {
	nbJoueur = elem.value
	createNameOption()
}
function choicePlayerName() {
	document.querySelector("#buttonMorpion").classList.remove('d-none')
	document.querySelector("#buttonPower").classList.remove('d-none')
	joueur1.nom = document.querySelector('#playerName1').value
	if (nbJoueur > 2) {
		joueur1.nom = document.querySelector('#playerName2').value
	}
}
//////////////////////////////////////////////////
//////////////// Initialisation de la partie
////////////////////////////////////////////////////
choiceGame();
// ajout des écouteurs sur les boutons
btnRecommencer.addEventListener('click', rematch);
// ajout écouteur sur les cellules vides à cliquer
createForm()