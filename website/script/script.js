/* Conçu par Mathis R.
 * Année 2021/2022
 */

class Mot{
	constructor(mot,couleur,type){
		this.mot=mot;
		this.couleur=couleur;
		this.type=type;
		this.score=-1;
		
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

let liste1 = new ListeMots(3,5,4);
liste1.affiche();



function genere_mot(mot,couleur){
	cache_start();
	console.log("Start pressed");
	//On retire le mot précédent
	let elementExists = document.getElementById("mot")
	if( elementExists != null){
		elementExists.remove();
	}

	//On ajoute un nouveau mot 
	let element = document.createElement("h1");
	element.setAttribute('id', "mot");
	element.setAttribute('style', "color:"+couleur);
	element.innerHTML = mot;

	document.getElementById("content").appendChild(element);

}

function cache_start(){
	document.getElementById("start").style.visibility = "hidden";
}
function affiche_start(){
	document.getElementById("start").style.visibility = "visible";
}

function cache_fail(){
	document.getElementById("fail").style.visibility = "hidden";
}
function affiche_fail(){
	document.getElementById("fail").style.visibility = "visible";
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


function suivant(){
	iL = liste1.indice;
	console.log("indiceListe = "+iL);
	if(iL<liste1.liste.length){
		genere_mot(liste1.liste[iL].mot,liste1.liste[iL].couleur);
		liste1.indice++;
	}else{
		console.log("Partie terminée.");
		afficheScore();
	}
}

function repondre(couleur){


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
	}else{
		console.log("On a déjà joué !");
	}

}

function getScore(){
	let score = 0;
	for(let i=0;i<liste1.liste.length;i++){
		score = score + liste1.liste[i].score;
	}
	console.log("Votre score est : "+score+" / "+liste1.liste.length);
	return score;
}

function afficheScore(){

	//On retire le mot précédent
	let elementExists = document.getElementById("mot")
	if( elementExists != null){
		elementExists.remove();
	}

	let element = document.createElement("h1");
	element.setAttribute('id', "mot");
	element.setAttribute('style', "font-size: 2em;");
	element.innerHTML = "Score : "+getScore()+" / "+liste1.liste.length;

	document.getElementById("content").appendChild(element);
}
