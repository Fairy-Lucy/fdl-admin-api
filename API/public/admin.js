// Ajouter un lieu
async function ajouterLieu() {
    const nom = document.getElementById('lieu-nom').value;
    try {
        const res = await fetch(`${apiBase}/lieux`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nom })
        });
        if (!res.ok) {
            throw new Error('Erreur lors de l\'ajout du lieu');
        }
        const data = await res.json();
        afficherMessage(`Lieu ajouté : ${data.nom}`);
    } catch (error) {
        console.error('Erreur:', error);
        afficherMessage(`Erreur lors de l'ajout du lieu: ${error.message}`);
    }
}

// Ajouter un mot-clé
async function ajouterMotCle() {
    const libelle = document.getElementById('mot-cle').value;
    try {
        const res = await fetch(`${apiBase}/motscles`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ libelle })
        });
        if (!res.ok) {
            throw new Error('Erreur lors de l\'ajout du mot-clé');
        }
        const data = await res.json();
        afficherMessage(`Mot-clé ajouté : ${data.libelle}`);
    } catch (error) {
        console.error('Erreur:', error);
        afficherMessage(`Erreur lors de l'ajout du mot-clé: ${error.message}`);
    }
}

// Ajouter une image
async function ajouterImage() {
    const uri = document.getElementById('image-uri').value;
    const description = document.getElementById('image-description').value;
    const lieux = document.getElementById('lieux-associes').value.split(',').map(l => l.trim());
    const motsCles = document.getElementById('mots-cles-associes').value.split(',').map(m => m.trim());

    try {
        const res = await fetch(`${apiBase}/images`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ uri, description })
        });
        if (!res.ok) {
            throw new Error('Erreur lors de l\'ajout de l\'image');
        }
        const image = await res.json();

        // Associer l'image aux lieux et mots-clés
        await associerImageLieux(image.id, lieux);
        await associerImageMotsCles(image.id, motsCles);

        afficherMessage('Image ajoutée avec ses associations.');
    } catch (error) {
        console.error('Erreur:', error);
        afficherMessage(`Erreur lors de l'ajout de l'image: ${error.message}`);
    }
}

// Associer l'image aux lieux
async function associerImageLieux(imageId, lieux) {
    const lieuxRes = await fetch(`${apiBase}/lieux`);
    const lieuxData = await lieuxRes.json();

    for (const nom of lieux) {
        const lieu = lieuxData.find(l => l.nom.toLowerCase() === nom.toLowerCase());
        if (lieu) {
            await fetch(`${apiBase}/associer/image-lieu`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ lieu_id: lieu.id, image_id: imageId })
            });
        } else {
            console.warn(`Lieu non trouvé : ${nom}`);
        }
    }
}

// Associer l'image aux mots-clés
async function associerImageMotsCles(imageId, motsCles) {
    const motsRes = await fetch(`${apiBase}/motscles`);
    const motsData = await motsRes.json();

    for (const mot of motsCles) {
        const motCle = motsData.find(m => m.libelle.toLowerCase() === mot.toLowerCase());
        if (motCle) {
            await fetch(`${apiBase}/associer/image-motcle`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ image_id: imageId, mot_cle_id: motCle.id })
            });
        } else {
            console.warn(`Mot-clé non trouvé : ${mot}`);
        }
    }
}
