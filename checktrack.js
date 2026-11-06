import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { homedir } from "os";
import readline from "readline";
//assemblage des éléments
function formaterListe(elements) {
    if (elements.length === 1) {
        return elements[0];
    }
    const dernier = elements.pop()
    return elements.join(", ") + " et " + dernier
        
}
      //----Chargement-----//

        //1-afficher le projet //

const verifierProjet = () => {
           
    const dossierProjet = join(
        homedir(),
        "Documents",
        "ADA",
        "ada-tech",
        "bloc1",
        "projets",
        "trackada" 
    ); 

    if(existsSync(dossierProjet)) {
        const verification = readFileSync(dossierProjet, "utf-8")
        console.log(verification);
            
        //2-Vérifier que le dossier existe.S'il n'existe pas
          
        const track = JSON.parse(verification)
        console.log(track); 
         //Récupère (parser) ou charge le fichier JSON
        
            
           
        //on récupère le chemin de chaque projet
        const cheminProjet = join(homedir(),"ADA","ada-tech","bloc1","projets");
        console.log(cheminProjet);
            // Condition pour savoir si le projet existe dans mon dossier ou non

        if (!existsSync(cheminProjet)) {
            console.log(`❌Le dossier existe pas: ${cheminProjet}`);
        } else { 
            console.log(`✅ Le dossier existe: ${cheminProjet}`); 
        }
            //vérification projet
        let  projetsCorrects = 0
        const total = track.projects.length;

        track.projects.forEach((file) => {
            const erreur = []
            const cheminProjets = join(cheminProjet, file.name)
            if (!existsSync(cheminProjets, )) {
                 erreur.push("Le dossier n'existe pas ou mal nommé")
            } else { 
            
                    //3 Vérifier si le projet est un dépot git
                const routeGit = join(cheminProjets, ".git")
                if (!existsSync(routeGit)) {
                     erreur.push("le repository git n'est pas initialisé"); 
                } 
                    //4 Vérifier chaque projet contient les fichiers requis
                const inexistant = file.required.filter((fichier) => {
                    const routeFin = join(cheminProjets, fichier) 
                    return !existsSync(routeFin)
                });

                if (inexistant.length > 0) {
                    erreur.push(`Il manque ${formaterListe(inexistant)}`)
                
                }
            
            }
                // 5 Afficher les résultats
            if (erreur.length > 0) {
                //  afficher les érreurs
                console.log(`❌ dossier du projet ${file.name}`);
                erreur.forEach((erreur) => { 
                    console.log(`- ${erreur}`) 
                });
            } else {
                console.log(`✅ dossier du projet ${file.name}`)
                projetsCorrects++;
            }
                console.log("");
                
            });
            //Pourcentage de fichier correct
            const pourcentage = Math.round((projetsCorrects / total) * 100);
            console.log(`📊 ${pourcentage}% des projets sont initialisés correctements (${projetsCorrects}/ ${total})`) 
        } else {
            console.log(`❌ le fichier track.json introuvable : ${dossierProjet}`)
            return
        }                       
};

        
//readline pose la question
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.question("Lancer la vérification ? (o/n) ", (reponse) => {
    if (reponse.toLowerCase() === "o") {
        console.log("vérification")
        verifierProjet();
    } else {
        console.log("pas de vérifictation");
    }
    rl.close();
});

 