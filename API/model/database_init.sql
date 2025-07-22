-- Tables de base
CREATE TABLE lieux (
                       id SERIAL PRIMARY KEY,
                       nom VARCHAR(255) NOT NULL
);

CREATE TABLE images (
                        id SERIAL PRIMARY KEY,
                        uri VARCHAR(255) NOT NULL,
                        description TEXT,
                        date INT -- Tu avais utilisé "date" dans les insert, j'ai rajouté la colonne ici
);

CREATE TABLE mots_cles (
                           id SERIAL PRIMARY KEY,
                           libelle VARCHAR(255) NOT NULL
);

CREATE TABLE themes (
                        id SERIAL PRIMARY KEY,
                        nom VARCHAR(255) NOT NULL
);

CREATE TABLE documents (
                           id SERIAL PRIMARY KEY,
                           titre VARCHAR(255) NOT NULL,
                           uri VARCHAR(500) NOT NULL
);

-- Tables de jointure
CREATE TABLE lieux_images (
                              lieu_id INTEGER REFERENCES lieux(id),
                              image_id INTEGER REFERENCES images(id),
                              PRIMARY KEY (lieu_id, image_id)
);

CREATE TABLE images_mots_cles (
                                  image_id INTEGER REFERENCES images(id),
                                  mot_cle_id INTEGER REFERENCES mots_cles(id),
                                  PRIMARY KEY (image_id, mot_cle_id)
);

CREATE TABLE document_theme (
                                document_id INT NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
                                theme_id INT NOT NULL REFERENCES themes(id) ON DELETE CASCADE,
                                PRIMARY KEY (document_id, theme_id)
);

-- Inserts corrects
INSERT INTO lieux (nom) VALUES
                            ('1 - la défaite de 1870'),
                            ('2 - la place forte de Maubeuge'),
                            ('3 - Le fort de Leveau'),
                            ('4 - La bataille de Maubeuge'),
                            ('5 - Le tunnel des emmurés'),
                            ('6 - Le soldat français de 1914'),
                            ('7 - La chambrée'),
                            ('8 - L''armée bleu horizon'),
                            ('9 - Le corps expéditionnaire américain'),
                            ('10 - Le service de santé'),
                            ('11 - Les prisonniers de guerre'),
                            ('12 - L''artillerie'),
                            ('13 - Le tunnel central'),
                            ('14 - Le ravitaillement et l''alimentation'),
                            ('15 - Le monde des tranchées'),
                            ('16 - Le stockage des munitions'),
                            ('17 - La simple caponière'),
                            ('18 - La double caponière'),
                            ('19 - Le massif bétonné'),
                            ('20 - La stèle commémorative'),
                            ('21 - La matinée de 7 septembre'),
                            ('22 - Le premier obus'),
                            ('23 - Les chambrées effondrées'),
                            ('24 - La chute du fort'),
                            ('A - Feignies et le bassin de la Sambre durant le second conflit mondial'),
                            ('B - Mémorial W.W PATTON');

INSERT INTO themes (nom) VALUES
    ('Réunion')

INSERT INTO documents (titre, uri) VALUES
                                       ('réunion fortif n°3.pdf', '/android_asset/réunion/réunion fortif n°3.pdf'),
                                       ('réunion fortif n°4.pdf', '/android_asset/réunion/Réunion fortif n°4.pdf'),
                                       ('réunion fortif n°5.pdf', '/android_asset/réunion/réunion fortif n°5.pdf'),
                                       ('réunion fortif n°6.pdf', '/android_asset/réunion/réunion fortif n°6.pdf'),
                                       ('réunion fortif n°7.pdf', '/android_asset/réunion/réunion fortif n°7.pdf'),
                                       ('réunion fortif n°8.pdf', '/android_asset/réunion/réunion fortif n°8.pdf'),
                                       ('réunion fortif n°9.pdf', '/android_asset/réunion/réunion fortif n°9.pdf'),
                                       ('réunion n°1.pdf', '/android_asset/réunion/réunion n°1.pdf'),
                                       ('réunion n°2.pdf', '/android_asset/réunion/réunion n°2.pdf'),
                                       ('réunions n°10-11.pdf', '/android_asset/réunion/réunions n°10-11.pdf');

INSERT INTO document_theme (document_id, theme_id) VALUES
                                                       (1, 1),
                                                       (2, 1),
                                                       (3, 1),
                                                       (4, 1),
                                                       (5, 1),
                                                       (6, 1),
                                                       (7, 1),
                                                       (8, 1),
                                                       (9, 1),
                                                       (10, 1);
