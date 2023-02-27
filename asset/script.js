let input=document.forms[0].elements;//il s'agit de la grille
let input2=document.forms[1].elements;//il s'agit du clavier
let continuer=0;// la variable sert à interrompre le jeu avec la procédure compter()
let indiceMot=0;// i l
let poste;// variable de travail commune
let p=0;//variable de travail commune
let difficulte=0.41;// variable réglant la difficulté, plus elle est basse plus les mots sont dévoilés
let compteur=10;// limiteur de nombre de tentatives
let tableau=new Array();// déclaration du tableau de mot
let phrase="invincibilités, dépareilleriez, réensemencerai, distendissions, enchaperonnera, déplantassions, molletonnaient, rétrogradation, chrestomathies, dissuaderaient, préjugeassions, terrifiassions, reblanchirions, méthémoglobine, surhaussements, désaimantèrent, scotomiserions, apparaissaient, refroidiraient, pornographique, troussequiniez, lèche-vitrines, contristassiez, pleurobranches, badigeonnasses, dégueulassions, enchaînassions, rédactionnelle, canalisassions, renouvellement, rallongeassent, désemmanchâtes, inéligibilités, cumulativement, cailloutassent, pirouettassiez, affabuleraient, sous-tendaient, chronométrâtes, appesantissons, rempoissonnées, déviriliserais, superfétatoire, déboussolèrent, désinvestirent, sophistiquâmes, démythifierons, synthétisèrent, tranquillisais, désannexassiez, tressaillisses, rigidifierions, resquillassent, réexportassiez, goujonnassions, rémunérassions, embastionneras, émancipatrices, scissionnerons, désynchronisas, minéralisaient, meringuassions, authentifieras, désulfiterions, transcriraient, ronflaguerions, désengorgèrent, tintinnabulais, inflexiblement, translitérasse, visualisassiez, damasquinerait, baragouinasses, décompléterait, challengeaient, amalgameraient, ensorcelassent, échenillassiez, sous-évaluasse, dilacéreraient, déprolétarises, stridulassions, conciliatoires, idéologisèrent, culpabilisante, remue-méninges, hospitaliserez, désensibilisée, réinséreraient, surpopulations, circonscrivons, chaponnassions, effleureraient, désubjectivisa, contremarquait, empercheraient, engazonnements, déséchouassent, compromettriez, repousseraient, gasconnassions, chanfreinerait, conceptualisas, pourchasseront, sandwichassent, treillissèrent, désembraierais, contre-plaquai, débéquetterons, ordonnancèrent, électroménager, complexassions, arc-bouteraies, tuberculineras, représentatifs, ébourgeonneras, ingurgitations, sillonneraient, équivoquerions, théâtralisâtes, paraisonnerait, impréparations, bénéficierions, empapillotâmes, fainéantassiez, engrumelassent, portrait-robot, ébouillanterez, oeilletonnâmes, réapparaissait, rempoissonnant, désenfilassiez, recristallisez, confidentielle, hydrocarbonées, spiritualisent, dégrossissante, remmanchassent, falsificateurs, globalisassiez, connectassions, décavaillonner, polymériserais, automatiseront, municipalisiez, ligatureraient, isolationnisme, dédoubleraient, plaisanterions, recomposassent,"; 
genererTableau();
initialiserClavier();//il s'agit du clavier alphabétique, il récupère la valeur pour comparer avec le mot

let bouton1=document.querySelector("#lancer");//bouton de démarrage
let bouton2=document.querySelector("#verifier");//bouton vérifier ancienne version
let bouton3=document.querySelector("#reinitialiser");//bouton reset
document.querySelector("#solution").addEventListener("click",solutionner,false);//evenement bouton de soluce
bouton1.addEventListener("click",placerMot,false);
bouton3.addEventListener("click",reinitialiser,false);



function genererTableau(){// procédure qui créé automatiquement un tableau à partir d'une série de mots qui ont été copiés du net dans phrase. La structure de "phrase" est ("mot,mot,...,")

    let monReg=/, /gi;//on crée le masque de texte
    phrase=phrase.replace(monReg,',');
    let texte="";
    let fin=0;
    let p=0;
    // on coupe les mots à chaque virgule
    do{
            i=0;
            fin=phrase.indexOf(",");
            texte=phrase.substring(i,fin);
            phrase=phrase.substring(fin+1,phrase.length);
            tableau[p]=texte;
            p++;// on augmente l'indice du tableau à chaque fois pour insérer le prochain mot
    }while(phrase.length!=0);
    // on créé le tableau à deux dimensions
    for (i=0;i<tableau.length;i++){
        let mot=tableau[i];
        let lettre;
        tableau[i]=new Array(mot.length);
        for(p=0;p<14;p++){
            lettre=mot.substring(p,p+1);
            tableau[i][p]=lettre;
        }
    }
    
}
function compter(){//procédure qui crée un compteur qui va définir le nombre de tentatives autorisées et afficher un gif personnalisé
    compteur--;
    document.querySelector("#compteur").innerHTML=" <p>Il vous reste "+compteur+" tentatives</p>";
    switch (compteur){
        case 9:
        document.querySelector(".boite").style.background="url(images/9.gif) no-repeat 100% center";
        break;
        case 7:
        document.querySelector(".boite").style.background="url(images/non.gif) no-repeat 100% center";
        break;
        case 0:
        bouton2.removeEventListener("click",verifierMot,false);
        continuer=0;
        document.querySelector("#compteur").innerHTML="<h2>Perdu! Vous trouverez la prochaine fois</h2>";
    }
}
function placerMot(){// procédure qui va placer une partie du mot dans la grille
    reinitialiser();
    
    bouton2.addEventListener("click",verifierMot,false);

    let aleatoire=Math.random();
    indiceMot=Math.floor(aleatoire*(tableau.length));
    for(i=0;i<(tableau[indiceMot]).length;i++){
        input[i+1].value="";
        aleatoire=Math.random();
        if(aleatoire>difficulte){
            input[i+1].value=tableau[indiceMot][i];
        }
    }
}
function verifierMot(){//procédure qui va verifier la correspondance entre la lettre tapée et les lettres du mots
    
    if(continuer!=0){
        let poursuivre=0;
        for(let a=0;a<tableau[indiceMot].length;a++){
            if(input[a+1].value!=tableau[indiceMot][a]){
                input[a+1].style.color="yellow";
            }else{
                poursuivre++;
            }
        }
        if(poursuivre===tableau[indiceMot].length){
        continuer=0;
        document.querySelector("#compteur").innerHTML="<p>Bravo!! J'y crois pas! Vous avez réussi :(</p>";
        document.querySelector(".boite").style.background="url(images/oui.gif) no-repeat";
        }
    }
}

function initialiserClavier(){
    val=0;
    for(i=1;i<input2.length;i++){
        input2[i].addEventListener("click",
        function(){
        val=this.value;
        poste=this.getAttribute("id");
        placerLettre();
        },false);   
    }

}
function placerLettre(){
    if(continuer!=0){
        let validation=0;
        for(let a=0;a<tableau[indiceMot].length;a++){
            if(val===""+tableau[indiceMot][a]){
                input[a+1].value=val;
                document.getElementById(poste).style.background="green";
                document.getElementById(poste).style.color="white";
                validation=1;
                verifierMot();
            }
        }
        p++;
        if (validation!=1&&p>1){
            compter();
            document.getElementById(poste).style.background="red";
            document.getElementById(poste).style.color="white";
        }
    }
}
function reinitialiser(){
    p=0;
    continuer=1;
    bouton2.removeEventListener("click",verifierMot,false);
    compteur=11;
    document.querySelector("#compteur").innerHTML="<p>!!Il vous reste "+compteur+" tentatives</p>";
    
    for(let element of input){
        element.value="";
        element.style.color="black";
    }
    for(let element of input2){
        element.style.background="#06c";
        element.style.color="white";
        }
    input[0].style.background="unset";
    input2[0].style.background="unset";
    document.querySelector("#compteur").innerHTML="";
}
function solutionner(){

    let monReg=/, /gi;
    phrase=phrase.replace(monReg,',');


    let mot=""+tableau[indiceMot];
    let monReg2=/,/gi;
    mot= mot.replace(monReg2,'');
    document.querySelector("#compteur").innerHTML="<h4>Le mot à trouver est #"+mot+"</h4>";
    continuer=0;
}



