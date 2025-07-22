-- Table pour les lieux
CREATE TABLE lieux (
                       id SERIAL PRIMARY KEY,
                       nom VARCHAR(255) NOT NULL
);

-- Table pour les images
CREATE TABLE images (
                        id SERIAL PRIMARY KEY,
                        uri VARCHAR(255) NOT NULL,
                        description TEXT
);

-- Table pour les mots-clés
CREATE TABLE mots_cles (
                           id SERIAL PRIMARY KEY,
                           libelle VARCHAR(255) NOT NULL
);

-- Table de jointure pour associer les images aux lieux
CREATE TABLE lieux_images (
                              lieu_id INTEGER REFERENCES lieux(id),
                              image_id INTEGER REFERENCES images(id),
                              PRIMARY KEY (lieu_id, image_id)
);

-- Table de jointure pour associer les mots-clés aux images
CREATE TABLE images_mots_cles (
                                  image_id INTEGER REFERENCES images(id),
                                  mot_cle_id INTEGER REFERENCES mots_cles(id),
                                  PRIMARY KEY (image_id, mot_cle_id)
);
CREATE TABLE theme (
                       id SERIAL PRIMARY KEY,
                       nom VARCHAR(255) NOT NULL
);

-- Table pour les documents
CREATE TABLE document (
                          id SERIAL PRIMARY KEY,
                          titre VARCHAR(255) NOT NULL,
                          uri VARCHAR(500) NOT NULL
);

-- Table de jointure pour associer les documents aux thèmes
CREATE TABLE document_theme (
                                document_id INT NOT NULL REFERENCES document(id) ON DELETE CASCADE,
                                theme_id INT NOT NULL REFERENCES theme(id) ON DELETE CASCADE,
                                PRIMARY KEY (document_id, theme_id)
);
