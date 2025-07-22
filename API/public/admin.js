const apiBase = '';

async function ajouterLieu() {
    const nom = document.getElementById('lieu-nom').value.trim();
    if (!nom) {
        afficherMessage("Le nom du lieu ne peut pas être vide.", "error", "lieu-nom");
        return;
    }
    try {
        const res = await fetch(`${apiBase}/lieux`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nom })
        });
        if (!res.ok) throw new Error('Erreur lors de l\'ajout du lieu');
        const data = await res.json();
        afficherMessage(`Lieu ajouté : ${data.nom}`, "success", "lieu-nom");
        document.getElementById('lieu-nom').value = '';
    } catch (error) {
        console.error('Erreur:', error);
        afficherMessage(`Erreur lors de l'ajout du lieu: ${error.message}`, "error", "lieu-nom");
    }
}

async function ajouterMotCle() {
    const libelle = document.getElementById('mot-cle').value.trim();
    if (!libelle) {
        afficherMessage("Le mot-clé ne peut pas être vide.", "error", "mot-cle");
        return;
    }
    try {
        const res = await fetch(`${apiBase}/motscles`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ libelle })
        });
        if (!res.ok) throw new Error('Erreur lors de l\'ajout du mot-clé');
        const data = await res.json();
        afficherMessage(`Mot-clé ajouté : ${data.libelle}`, "success", "mot-cle");
        document.getElementById('mot-cle').value = '';
    } catch (error) {
        console.error('Erreur:', error);
        afficherMessage(`Erreur lors de l'ajout du mot-clé: ${error.message}`, "error", "mot-cle");
    }
}

async function ajouterImage() {
    const fileInput = document.getElementById('image-file');
    const description = document.getElementById('image-description').value;
    const lieux = document.getElementById('lieux-associes').value.split(',').map(l => l.trim()).filter(l => l);
    const motsCles = document.getElementById('mots-cles-associes').value.split(',').map(m => m.trim()).filter(m => m);

    if (fileInput.files.length === 0) {
        afficherMessage('Veuillez sélectionner une image.', 'error', 'image-file');
        return;
    }

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('image', file);
    formData.append('description', description);

    try {
        const res = await fetch(`${apiBase}/upload`, {
            method: 'POST',
            body: formData
        });

        if (!res.ok) throw new Error('Erreur lors de l\'upload de l\'image');
        const image = await res.json();

        await associerImageLieux(image.id, lieux);
        await associerImageMotsCles(image.id, motsCles);

        afficherMessage('Image ajoutée avec ses associations.', 'success');
        fileInput.value = '';
        document.getElementById('image-description').value = '';
        document.getElementById('lieux-associes').value = '';
        document.getElementById('mots-cles-associes').value = '';
    } catch (error) {
        console.error('Erreur:', error);
        afficherMessage(`Erreur lors de l'ajout de l'image: ${error.message}`, 'error');
    }
}

async function associerImageLieux(imageId, lieux) {
    if (!lieux.length) return;
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

async function associerImageMotsCles(imageId, motsCles) {
    if (!motsCles.length) return;
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

// Fonction à l'extérieur de tout
function afficherMessage(message, type = 'success', inputId = null) {
    const msgDiv = document.getElementById('message');
    msgDiv.textContent = (type === 'success' ? '✅ ' : '❌ ') + message;
    msgDiv.className = 'message show ' + (type === 'success' ? 'success' : 'error');

    if (inputId) {
        const input = document.getElementById(inputId);
        if (input) {
            input.classList.remove('success', 'error');
            input.classList.add(type);
            setTimeout(() => input.classList.remove(type), 3000);
        }
    }

    setTimeout(() => {
        msgDiv.classList.remove('show');
    }, 4000);
}
async function ajouterDocument() {
    const titre = document.getElementById('document-titre').value.trim();
    const theme = document.getElementById('document-theme').value.trim();
    const fileInput = document.getElementById('document-file');

    if (!titre || !theme || fileInput.files.length === 0) {
        afficherMessage('Tous les champs doivent être remplis.', 'error');
        return;
    }

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('document', file);
    formData.append('titre', titre);
    formData.append('theme', theme);

    try {
        const res = await fetch(`${apiBase}/upload/document`, {
            method: 'POST',
            body: formData
        });

        if (!res.ok) throw new Error('Erreur lors de l\'ajout du document');
        const data = await res.json();

        afficherMessage(`Document ajouté : ${data.titre}`, 'success');
        fileInput.value = '';
        document.getElementById('document-titre').value = '';
        document.getElementById('document-theme').value = '';
    } catch (error) {
        console.error('Erreur:', error);
        afficherMessage(`Erreur lors de l'ajout du document: ${error.message}`, 'error');
    }
}

