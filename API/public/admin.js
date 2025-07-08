const apiBase = '';

// Ajouter un lieu
async function ajouterLieu() {
    const nom = document.getElementById('lieu-nom').value;
    const res = await fetch(`${apiBase}/lieux`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nom })
    });
    const data = await res.json();
    afficherMessage(`Lieu ajouté : ${data.nom}`);
}

// Ajouter un mot-clé
async function ajouterMotCle() {
    const libelle = document.getElementById('mot-cle').value;
    const res = await fetch(`${apiBase}/motscles`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ libelle })
    });
    const data = await res.json();
    afficherMessage(`Mot-clé ajouté : ${data.libelle}`);
}

// Ajouter une image et ses associations
async function ajouterImage() {
    const uri = document.getElementById('image-uri').value;
    const description = document.getElementById('image-description').value;
    const lieux = document.getElementById('lieux-associes').value.split(',').map(l => l.trim());
    const motsCles = document.getElementById('mots-cles-associes').value.split(',').map(m => m.trim());

    // Création de l'image
    const res = await fetch(`${apiBase}/images`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uri, description })
    });

    const image = await res.json();

    // Récupérer tous les lieux et mots-clés pour association
    const lieuxRes = await fetch(`${apiBase}/lieux`);
    const lieuxData = await lieuxRes.json();

    const motsRes = await fetch(`${apiBase}/motscles`);
    const motsData = await motsRes.json();

    // Associer l’image aux lieux
    for (const nom of lieux) {
        const lieu = lieuxData.find(l => l.nom.toLowerCase() === nom.toLowerCase());
        if (lieu) {
            await fetch(`${apiBase}/associer/image-lieu`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ lieu_id: lieu.id, image_id: image.id })
            });
        } else {
            console.warn(`Lieu non trouvé : ${nom}`);
        }
    }

    // Associer l’image aux mots-clés
    for (const mot of motsCles) {
        const motCle = motsData.find(m => m.libelle.toLowerCase() === mot.toLowerCase());
        if (motCle) {
            await fetch(`${apiBase}/associer/image-motcle`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ image_id: image.id, mot_cle_id: motCle.id })
            });
        } else {
            console.warn(`Mot-clé non trouvé : ${mot}`);
        }
    }

    afficherMessage('Image ajoutée avec ses associations.');
}

// Afficher un message à l'admin
function afficherMessage(msg) {
    document.getElementById('message').innerText = msg;
}
async function afficherContenuBDD() {
    try {
        const response = await fetch('http://votre-api/lieux'); // Remplacez par l'URL de votre API
        const data = await response.json();

        const contenuBDD = document.getElementById('contenu-bdd');
        contenuBDD.innerHTML = '<h3>Lieux</h3><table><tr><th>ID</th><th>Nom</th></tr>' +
            data.map(lieu => `<tr><td>${lieu.id}</td><td>${lieu.nom}</td></tr>`).join('') +
            '</table>';

        // Ajoutez d'autres appels pour afficher les images et les mots-clés si nécessaire
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        document.getElementById('message').innerHTML = 'Erreur lors de la récupération des données.';
        document.getElementById('message').className = 'message error';
    }
}
