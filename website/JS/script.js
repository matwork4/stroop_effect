/* Conçu par Mathis R.
 * Année 2021/2022
 */

class Mot{
	constructor(mot,couleur,type){
		this.mot=mot;
		this.couleur=couleur;
		this.type=type;
		this.score=-1;
		this.IT = 0; // Initiation time
		this.MT = 0; // Movement time
		this.coordonneeX = [];
        this.coordonneeY = [];
	}

	affiche(){
		console.log("Mot : "+this.mot+", Couleur : "+this.couleur+", Type : "+this.type);
	}
}

/* Types de mots : 
 * 1 : mot = couleur
 * 2 : mot != couleur
 * 3 : zdgzsgz
 */
class ListeMots{
	constructor(nbType1,nbType2,nbType3){

		this.indice = 0;
		let liste = [];
		let random;
		for(let i=0;i<nbType1+nbType2+nbType3;i++){
			random=randomInt(1,4);

			if(i<nbType1){

				if(random==1){
					liste[i] = new Mot("Red","red",1);
				}else if(random==2){
					liste[i] = new Mot("Blue","blue",1);
				}else if(random==3){
					liste[i] = new Mot("Yellow","#ffd633",1);
				}else if(random==4){
					liste[i] = new Mot("Green","green",1);
				}else{
					console.log("Erreur randomInt = "+random);
				}

				
			}else if(i<nbType1+nbType2){

				if(random==1){
					liste[i] = new Mot("Red","green",2);
				}else if(random==2){
					liste[i] = new Mot("Blue","#ffd633",2);
				}else if(random==3){
					liste[i] = new Mot("Yellow","blue",2);
				}else if(random==4){
					liste[i] = new Mot("Green","red",2);
				}else{
					console.log("Erreur randomInt = "+random);
				}

			}else{
				
				if(random==1){
					liste[i] = new Mot("azerty","red",3);
				}else if(random==2){
					liste[i] = new Mot("azerty","blue",3);
				}else if(random==3){
					liste[i] = new Mot("azerty","#ffd633",3);
				}else if(random==4){
					liste[i] = new Mot("azerty","green",3);
				}else{
					console.log("Erreur randomInt = "+random);
				}
			}
		}
		this.liste = shuffle(liste);
	}

	affiche(){
		console.log("ListeMots : ");
		for(let i=0; i<this.liste.length; i++){
			this.liste[i].affiche();
		}
	}

}


/* Training phase : 50% congruents 
 * Première paire : 80% congruents
 * Deuxième paire : 20% congruents
 */

let liste_training = new ListeMots(1,1,0);
let liste_1 = new ListeMots(4,1,0);
let liste_2 = new ListeMots(4,1,0);
let liste_3 = new ListeMots(1,4,0);
let liste_4 = new ListeMots(1,4,0);

let liste_n = 0;
let NB_LISTES = 4;
let enregistre = true;

//let liste1 = new ListeMots(5,5,0);
//liste1.affiche();
let liste1 = null;

let chrono = 0;
let MT = 0;
let IT = 0;
let estSorti = false;
let mousetrack = false;
let dataJSON = { "score": "", "nom": "test", "ListeMot": []}



/* La fonction current_liste() renvoie la liste sur laquelle on travaille 
 * (phase training, 1, 2 etc.)
 */
function current_liste(){
	switch(liste_n){
		case 0:
			return liste_training;
			break;
		case 1:
			return liste_1;
			break;
		case 2:
			return liste_2;
			break;
		case 3:
			return liste_3;
			break;
		case 4:
			return liste_4;
			break;
		default:
			console.log("Erreur : mauvais indice liste_n : "+liste_n);
	}
}


function genere_mot(mot,couleur){
	if(couleur!="black"){
		cache_start();
	}
	console.log("Start pressed");
	//On retire le mot précédent
	let elementExists = document.getElementById("mot")
	if( elementExists != null){
		elementExists.remove();
	}

	//On ajoute un nouveau mot 
	let element = document.createElement("h1");
	element.setAttribute('id', "mot");
	if(couleur=="black"){
		element.setAttribute('style', "color: black; font-size: 1.6em;");
	}else{
		element.setAttribute('style', "color:"+couleur);
	}
	element.innerHTML = mot;

	document.getElementById("content").appendChild(element);
}



function cache_start(){
	document.getElementById("start").style.visibility = "hidden";
	document.getElementById("start").style.opacity = "0";
	//document.getElementById("startButton").disabled = "disabled";
}
function affiche_start(){
	document.getElementById("start").style.visibility = "visible";
	document.getElementById("start").style.opacity = "1";
	//document.getElementById("startButton").removeAttribute("disabled");
}

function cache_fail(){
	document.getElementById("fail").style.visibility = "hidden";
}
function affiche_fail(){
	document.getElementById("fail").style.visibility = "visible";
}

function cache_plus_vite(){
	document.getElementById("plus_vite").style.visibility = "hidden";
}
function affiche_plus_vite(){
	document.getElementById("plus_vite").style.visibility = "visible";
}


/* ===================================
*  Fonction randomInt :
*  Permet de générer un nombre aléatoire entre min et max inclus
*  ===================================
*/
function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min +1)) + min;
}

/* ===================================
*  Fonction shuffle :
*  Melange un tableau (array) et retourne le tableau mélangé
*  ===================================
*/
function shuffle(array) {
  for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

  return array;
}


function mouseLeave(){
	console.log("On sort du bouton (estSorti = true)");
	if(!estSorti){
		IT = parseInt(Date.now())-parseInt(chrono);
		console.log("On sort du bouton, IT = "+IT);
		cache_plus_vite();
	}

	estSorti = true;
}

function plusVite(){
	estSorti = false;
	setTimeout(() => { 
		if(!estSorti){
			console.log("Va plus vite !");
			affiche_plus_vite();
		}else{
			//estSorti = false;
		}		
	}, 500);

}


function suivant(){
	mousetrack = true;
	liste1 = current_liste();
	iL = liste1.indice;
	console.log("indiceListe = "+iL);
	if(iL<liste1.liste.length){
		genere_mot(liste1.liste[iL].mot,liste1.liste[iL].couleur);
		liste1.indice++;
	}else if(liste_n < NB_LISTES){
		liste_n++;
		console.log("Phase "+liste_n);
		genere_mot("Next phase ...","black");
	}else if(enregistre){
		enregistre = false;
		afficheScore();
		//Ici on exporte les données 
		affiche_data(liste_1,"1");
		affiche_data(liste_2,"2");
		affiche_data(liste_3,"3");
		affiche_data(liste_4,"4");
		dataJSON["score"] = getScore();
		savedata(dataJSON);
	}else{
		console.log("Partie terminée.");
	}
	chrono = Date.now();

	plusVite();
	
}

function repondre(couleur){
	mousetrack = false;
	liste1 = current_liste();

	//Calcul le temps de réaction de l'utilisateur en millisecondes 
	MT = parseInt(Date.now())-parseInt(chrono);
	console.log("chrono = "+MT);

	iL = liste1.indice-1;
	if(iL<0){
		console.log("On a pas démarré !");
		return;
	}

	//Permet de voir si on a déjà joué
	if(liste1.liste[iL].score<0){
		if(couleur == liste1.liste[iL].couleur){
			console.log("Bonne réponse : "+couleur);
			liste1.liste[iL].score=1;
			setTimeout(() => { 
				affiche_start();
			}, 300);
		}else{
			console.log("Mauvaise réponse");
			liste1.liste[iL].score=0;
			affiche_fail();
			setTimeout(() => { 
				cache_fail(); 
				affiche_start();
			}, 5000);
		}
		//On ajoute le temps de réaction au mot
		liste1.liste[iL].MT=MT;
		liste1.liste[iL].IT=IT;
	}else{
		console.log("On a déjà joué !");
	}

}

function getScore(){
	//liste1 = current_liste();
	let score = 0;
	for(let i=0;i<liste_1.liste.length;i++){
		score = score + liste_1.liste[i].score;
	}
	for(let i=0;i<liste_2.liste.length;i++){
		score = score + liste_2.liste[i].score;
	}
	for(let i=0;i<liste_3.liste.length;i++){
		score = score + liste_3.liste[i].score;
	}
	for(let i=0;i<liste_4.liste.length;i++){
		score = score + liste_4.liste[i].score;
	}
	let taille = parseInt(liste_1.liste.length)+parseInt(liste_2.liste.length)+parseInt(liste_3.liste.length)+parseInt(liste_4.liste.length);
	console.log("Votre score est : "+score+" / "+taille);
	return score;
}

function afficheScore(){
	//liste1 = current_liste();

	//On retire le mot précédent
	let elementExists = document.getElementById("mot")
	if( elementExists != null){
		elementExists.remove();
	}

	let element = document.createElement("h1");
	element.setAttribute('id', "mot");
	element.setAttribute('style', "font-size: 2em;");
	let taille = parseInt(liste_1.liste.length)+parseInt(liste_2.liste.length)+parseInt(liste_3.liste.length)+parseInt(liste_4.liste.length);
	element.innerHTML = "Score : "+getScore()+" / "+taille;

	document.getElementById("content").appendChild(element);
}

function affiche_data(L,idSequence){
	let congruence;
	let score;

	for(let i=0;i<L.liste.length;i++){
		if(L.liste[i].type == 1){
			congruence = "Congruent";
		}else if(L.liste[i].type == 2){
			congruence = "Non congruent";
		}else{
			congruence = "3";
		}

		if(L.liste[i].score == 1){
			score = "Succès";
		}else{
			score = "Echec";
		}
		dataJSON["ListeMot"].push(L.liste[i]);

		console.log("idSequence : "+idSequence
			+"; Type mot : "+congruence
			+"; Score : "+score
			+"; IT : "+L.liste[i].IT
			+"; MT : "+L.liste[i].MT);
		
	}
	console.log(dataJSON);	
}

document.onmousemove = (event) => {
    if (mousetrack && current_liste().liste[current_liste().indice-1] != null) {
        //console.log("true");
        //console.log(event.clientX);
        //console.log(event.clientY);
        current_liste().liste[current_liste().indice-1].coordonneeX.push(event.clientX);
        current_liste().liste[current_liste().indice-1].coordonneeY.push(event.clientY);
    }

}

function savedata(data) {

  // Creating a XHR object
  let xhr = new XMLHttpRequest();
  let url = "../savedata.php";

  // open a connection
  xhr.open ("POST", url, true);

  // Set the request header i.e. which type of content you are sending
  xhr.setRequestHeader ("Content-Type", "application/json");

  // Sending data with the request
  xhr.send (JSON.stringify (data));

}

