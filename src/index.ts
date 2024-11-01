import sqlite3 from 'sqlite3';
import knex from '';

async function criarEpopularDbApi() {
    const db = await open({
        filename: 'meu_banco_de_dados.db',
        driver: sqlite3.Database
    });

    // Queries SQL

    // Criar tabelas
    const createTableQuery = `
    -- Criando tabela Armas

        CREATE TABLE Armas (
            id_arma INT PRIMARY KEY AUTO_INCREMENT,
            nome_arma VARCHAR(255) NOT NULL,
            dano_arma INT NOT NULL,
            tipo_arma VARCHAR(255) NOT NULL,
            danoCritico_arma INT NOT NULL,
            taxaDisparo_arma FLOAT NOT NULL,
            alcance_arma INT NOT NULL
        );
    
        CREATE TABLE Build (
            id_build INT PRIMARY KEY AUTO_INCREMENT,
            nome_build VARCHAR(255) NOT NULL,
            descricao_build TEXT,
            data_criacao DATE NOT NULL
        );
    
        CREATE TABLE Equipamentos (
            id_equipamento INT PRIMARY KEY AUTO_INCREMENT,
            nome_equipamento VARCHAR(255) NOT NULL,
            categoria_equipamento VARCHAR(255) NOT NULL,
            atributoPrim_equipamento VARCHAR(255) NOT NULL,
            valorAtri_equipamento INT NOT NULL
        );
    
        CREATE TABLE Compoem (
            id_build INT,
            id_arma INT,
            PRIMARY KEY (id_build, id_arma),
            FOREIGN KEY (id_build) REFERENCES Build(id_build),
            FOREIGN KEY (id_arma) REFERENCES Armas(id_arma)
        );

        CREATE TABLE Possue (
            id_build INT,
            id_equipamento INT,
            PRIMARY KEY (id_build, id_equipamento),
            FOREIGN KEY (id_build) REFERENCES Build(id_build),
            FOREIGN KEY (id_equipamento) REFERENCES Equipamentos(id_equipamento)
        );
`;

    // Popular tabelas
    const insertDataQuery = `
    -- Armas de Assalto
    INSERT INTO Armas (nome_arma, dano_arma, tipo_arma, danoCritico_arma, taxaDisparo_arma, alcance_arma)
    VALUES ('Rifle de Assalto Alpha', 45, 'Assalto', 90, 0.8, 300),
           ('Rifle de Assalto Bravo', 50, 'Assalto', 100, 0.75, 320),
           ('Rifle de Assalto Charlie', 48, 'Assalto', 95, 0.78, 310);
    
    -- Armas de Sniper
    INSERT INTO Armas (nome_arma, dano_arma, tipo_arma, danoCritico_arma, taxaDisparo_arma, alcance_arma)
    VALUES ('Sniper Delta', 90, 'Sniper', 180, 0.5, 800),
           ('Sniper Echo', 95, 'Sniper', 190, 0.45, 850),
           ('Sniper Foxtrot', 92, 'Sniper', 185, 0.48, 820);
    
    -- Armas de Submetralhadora
    INSERT INTO Armas (nome_arma, dano_arma, tipo_arma, danoCritico_arma, taxaDisparo_arma, alcance_arma)
    VALUES ('SMG Golf', 30, 'Submetralhadora', 60, 1.2, 200),
           ('SMG Hotel', 32, 'Submetralhadora', 64, 1.15, 210),
           ('SMG India', 31, 'Submetralhadora', 62, 1.18, 205);

    -- Equipamentos de Defesa
    INSERT INTO Equipamentos (nome_equipamento, categoria_equipamento, atributoPrim_equipamento, valorAtri_equipamento)
    VALUES ('Colete Tático', 'Defesa', 'Resistência', 50),
           ('Capacete Balístico', 'Defesa', 'Resistência', 40),
           ('Luvas de Combate', 'Defesa', 'Resistência', 30);

    -- Equipamentos de Ataque
    INSERT INTO Equipamentos (nome_equipamento, categoria_equipamento, atributoPrim_equipamento, valorAtri_equipamento)
    VALUES ('Luvas de Ataque', 'Ataque', 'Força', 20),
           ('Botas de Assalto', 'Ataque', 'Força', 25),
           ('Cinto de Munição', 'Ataque', 'Força', 15);

    -- Equipamentos de Suporte
    INSERT INTO Equipamentos (nome_equipamento, categoria_equipamento, atributoPrim_equipamento, valorAtri_equipamento)
    VALUES ('Kit Médico', 'Suporte', 'Cura', 30),
           ('Mochila de Suprimentos', 'Suporte', 'Cura', 25),
           ('Drone de Suporte', 'Suporte', 'Cura', 35);

 `;

    // Execute as queries
    await db.exec(createTableQuery);
    await db.exec(insertDataQuery);

    await db.close();
}

criarEpopularDbApi().then(() => {
    console.log('Banco de dados criado e preenchido com sucesso!');
}).catch((err) => {
    console.error('Erro ao criar e preencher o banco de dados:', err);
});
