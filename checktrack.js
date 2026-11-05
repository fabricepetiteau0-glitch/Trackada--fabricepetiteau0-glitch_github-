import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { homedir } from "os";
import readline from "readline"
//----Chargement-----//

//1-afficher le projet //

const track = JSON.parse(readFileSync("track.json", "utf-8"))//Récupère (parser) ou charge le fichier JSON
const dossierProjet = join(homedir(), "Documents", "ADA", "ada-tech" ,"bloc1" ,"projets" ,"trackada") // possible problème 
//readline pose la question
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

rl.question("Lancer la vérification ? (o/n) " , (reponse) => {
 console.log(`Tu as répondu : ${reponse}` )
 rl.close()
})

//2-Vérifier que le dossier existe.S'il n'existe pas

function verifierProjet(project) {
 const erreurs = []
    //on récupère le chemin de chaque projet
 const cheminProjet = join (dossierProjet, project.name)
 // Condition pour savoir si le projet existe dans mon dossier ou non

 if (!existsSync(cheminProjet)) {
    erreurs.push("Le dossier existe pas ou est mal nommé")
    return erreurs
 }
 if (!existsSync(join(cheminProjet, ".git")))  {
    erreurs.push("le repository git n'est pas initialisé")
 }

 const manquants = []
 project.required.forEach((file) => {
    if (!existsSync(join(cheminProjet, file))) {
        manquants.push(file)
    }
 }) 
 
    // -> il manque a, b et c
  erreurs.push(manquants)
  return erreurs
}
// Ici il faut reformater l'array manquant pour avoir un affichage correct
track.projects.forEach((project) => {
    const erreurs = verifierProjet(project)
    if (erreurs.length === 0){
       console.log(`✅ dossier du projet $ {projet.ada}`) 
       erreurs.forEach((erreur) => console.log(`- ${erreur}`))
    } 
})
    console.log("")

// -> il manque a, b et c

function formaterListe(elements) {
    if (elements.length === 1){
        return elements [0]
    }
    const debut = elements.slice(0, -1)
    const dernier = elements [elements.length - 1]
    return `${debut} et ${dernier}`
}

function lancerVerification() {
    // On vérifie si le dossier Ada existe et on affiche
    if(existsSync(dossierProjet)) {
        console.log("✅dossier ada")
    } else {
        console.log("❌dossier ada")
    }
}

//3 récupérer tout les projets dans le json

const projects = track.projects
//on prend les projets un par un

track.projects.forEach((project) => {
    const cheminProjet = join(dossierProjet, project.name)
    if (existsSync(cheminProjet)){
        console.log(`✅ dossier du projet ${project.name}`)
    } else {
        console.log(`❌ dossier du projet ${project.name}`)
    }
    console.log("")
});
// 
const total = track.projects.length
const pourcentage = Math.round((projetsCorrects / total)* 100)
const symnbole = projetsCorrects === total ?"✅" : "❌"

const message = '${pourcentage}% des projets sont initialisés correctement'


