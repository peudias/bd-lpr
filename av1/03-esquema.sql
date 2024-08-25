CREATE DATABASE bd_doencas;

USE bd_doencas;

CREATE TABLE patogeno (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_cientifico VARCHAR(255) NOT NULL,
    tipo VARCHAR(255) NOT NULL
);

CREATE TABLE doenca (
    id INT AUTO_INCREMENT PRIMARY KEY,
    patogeno_id INT,
    CID VARCHAR(7) UNIQUE NOT NULL,
    nomes_tecnicos VARCHAR(255) NOT NULL,
    FOREIGN KEY (patogeno_id) REFERENCES patogeno(id)
);

CREATE TABLE sintoma (
    id INT AUTO_INCREMENT PRIMARY KEY,
    doenca_id INT,
    nome VARCHAR(32) NOT NULL,
    nivel_de_ocorrencia ENUM('Muito Comum', 'Comum', 'Pouco Comum', 'Raro', 'Muito Raro') NOT NULL,
    FOREIGN KEY (doenca_id) REFERENCES doenca(id)
);

CREATE TABLE nomes_populares (
    doenca_id INT,
    nome VARCHAR(255) NOT NULL,
    PRIMARY KEY (doenca_id, nome),
    FOREIGN KEY (doenca_id) REFERENCES doenca(id)
);


