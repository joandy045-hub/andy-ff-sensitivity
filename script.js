
const boutonGenerer = document.getElementById("generer");
const boutonCopier = document.getElementById("copier");
const resultat = document.getElementById("resultat");

let echelle = 200;
let valeursActuelles = [];

const noms = [
  "Général",
  "Point rouge",
  "Lunette 2x",
  "Lunette 4x",
  "Lunette sniper",
  "Caméra libre"
];

const profils = {
  redmi: [160, 152, 145, 138, 75, 95],
  oppo: [175, 168, 150, 145, 80, 100],
  poco: [172, 165, 155, 148, 75, 95],
  googlepixel: [142, 135, 128, 122, 75, 95],
  samsung: [165, 160, 150, 145, 90, 120],
  itel: [195, 188, 175, 165, 95, 120],
  autre: [185, 180, 170, 155, 90, 140]
};

const styles = {
  one: [0, 0, 0, 0, 0, 0],
  drag: [-5, -5, -5, -5, 0, -5],
  precision: [-20, -15, -20, -25, -10, -15]
};

document.querySelectorAll(".scale").forEach(bouton => {
  bouton.addEventListener("click", () => {
    echelle = Number(bouton.dataset.scale);

    document.querySelectorAll(".scale").forEach(b => {
      b.classList.remove("active");
    });

    bouton.classList.add("active");
  });
});

boutonGenerer.addEventListener("click", () => {
  const telephone =
    document.getElementById("telephone").value;

  const style =
    document.getElementById("style").value;

  const base = profils[telephone];
  const ajustements = styles[style];

  valeursActuelles = base.map((valeur, i) => {
    const resultat = valeur + ajustements[i];

    return Math.round(
      Math.max(0, Math.min(200, resultat))
      * echelle / 200
    );
  });

  afficherResultat();
});

function afficherResultat() {
  resultat.innerHTML = "";

  noms.forEach((nom, i) => {
    const valeur = valeursActuelles[i];
    const pourcentage = valeur / echelle * 100;

    const ligne = document.createElement("div");
    ligne.className = "sensitivity";

    const entete = document.createElement("div");
    entete.className = "sens-head";

    const titre = document.createElement("span");
    titre.textContent = nom;

    const nombre = document.createElement("strong");
    nombre.textContent = valeur;

    entete.append(titre, nombre);

    const barre = document.createElement("div");
    barre.className = "track";

    const remplissage = document.createElement("div");
    remplissage.className = "fill";
    remplissage.style.width = pourcentage + "%";

    barre.appendChild(remplissage);
    ligne.append(entete, barre);
    resultat.appendChild(ligne);
  });

  document.getElementById("description").textContent =
    "Profil généré • Échelle 0–" + echelle;

  boutonCopier.disabled = false;
}

boutonCopier.addEventListener("click", async () => {
  const texte = noms.map((nom, i) =>
    nom + " : " + valeursActuelles[i]
  ).join("\n");

  try {
    await navigator.clipboard.writeText(texte);
    boutonCopier.textContent = "Copié !";
  } catch {
    const zone = document.createElement("textarea");
    zone.value = texte;
    document.body.appendChild(zone);
    zone.select();

    const copieReussie = document.execCommand("copy");
    zone.remove();

    boutonCopier.textContent =
      copieReussie ? "Copié !" : "Copie impossible";
  }
});


