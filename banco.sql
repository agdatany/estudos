CREATE DATABASE study CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE study;

CREATE TABLE materia(
    id_materia INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(40) NOT NULL UNIQUE
);

CREATE TABLE conteudo(
    id_conteudo INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(40) NOT NULL,
    id_topico INT,
    FOREIGN KEY(id_materia) REFERENCES topico(id_materia)
);

CREATE TABLE estudante(
    id_estudante INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    celular VARCHAR(15) NOT NULL UNIQUE,
    email VARCHAR(50) NOT NULL UNIQUE,
    senha CHAR(60) NOT NULL,
    foto VARCHAR(80),
    serie VARCHAR(10),
    estado CHAR(2),
    cidade VARCHAR(40),
    nascimento DATE
);

CREATE TABLE cronograma(
    id_cronograma INT PRIMARY KEY AUTO_INCREMENT,
    id_estudante INT,
    FOREIGN KEY(id_estudante) REFERENCES estudante(id_estudante)
);

CREATE TABLE evento(
    id_evento INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(20) NOT NULL,
    descricao VARCHAR(120),
    dia_semana CHAR(3) NOT NULL,
    horario TIME NOT NULL,
    receber_notificacao BOOLEAN DEFAULT 0,
    cor VARCHAR(6) DEFAULT '1A508B',
    id_cronograma INT,
    FOREIGN KEY(id_cronograma) REFERENCES cronograma(id_cronograma) 
)ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;

-- CREATE TABLE resumo(
--     id_resumo INT PRIMARY KEY AUTO_INCREMENT,
--     titulo VARCHAR(40) NOT NULL,
--     id_conteudo INT,
--     FOREIGN KEY(id_conteudo) REFERENCES conteudo(id_conteudo)
-- );

INSERT INTO materia VALUES (null, 'Biologia');
INSERT INTO materia VALUES (null, 'Física');
INSERT INTO materia VALUES (null, 'Geografia');
INSERT INTO materia VALUES (null, 'História');
INSERT INTO materia VALUES (null, 'Inglês');
INSERT INTO materia VALUES (null, 'Matemática');
INSERT INTO materia VALUES (null, 'Português');
INSERT INTO materia VALUES (null, 'Química');
INSERT INTO materia VALUES (null, 'Outros');

INSERT INTO conteudo VALUES (null, 'André S.', 1);
INSERT INTO conteudo VALUES (null, 'Cello', 1);
INSERT INTO conteudo VALUES (null, 'Hilton', 1);
INSERT INTO conteudo VALUES (null, 'James J.', 1);
INSERT INTO conteudo VALUES (null, 'Alexandre L.', 1);
INSERT INTO conteudo VALUES (null, 'Daniel L.', 1);
INSERT INTO conteudo VALUES (null, 'Felipe', 1);
INSERT INTO conteudo VALUES (null, 'Thiago', 1);
INSERT INTO conteudo VALUES (null, 'Ícaro', 1);
INSERT INTO conteudo VALUES (null, 'Omar', 1);
INSERT INTO conteudo VALUES (null, 'Alexandre P.', 1);
INSERT INTO conteudo VALUES (null, 'Alfredo', 1);
INSERT INTO conteudo VALUES (null, 'Leandro', 1);
INSERT INTO conteudo VALUES (null, 'Bruno C.', 1);
INSERT INTO conteudo VALUES (null, 'Décio', 1);