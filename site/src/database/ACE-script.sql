CREATE DATABASE ACE;
USE ACE;

CREATE TABLE Noticia(
	idNoticia INT PRIMARY KEY auto_increment,
    dtNoticia DATE,
    titulo VARCHAR(45),
    descNoticia TEXT,
    banner LONGTEXT
);

ALTER TABLE Noticia MODIFY COLUMN dtNoticia DATETIME;

INSERT INTO Noticia (titulo, descNoticia, dtNoticia, bannerJogo, bannerNoticia) VALUES ('TituloNoticia', 'DescNoticia', now(), '86315d5be8dd83fbc2556508b746aa0076d03b7a45228a4bdf5256b5bf93320dea8ae90535680ca410712eb1e880da07ca116c2e44f391a270bd690ea02ca23d.png', '7c462c4a37c74c15d43cef868af2d7caa34c5f227939df98579230926215772204ff6c2d0ca671c9b0be77d642e5f410182b1421e09b70ff970fea4d81a2d642.png');

ALTER TABLE Noticia RENAME COLUMN banner TO bannerNoticia;
ALTER TABLE Noticia MODIFY COLUMN bannerNoticia TEXT;
ALTER TABLE Noticia ADD COLUMN bannerJogo TEXT;

CREATE TABLE TipoUsuario (
	idTipoUsuario INT PRIMARY KEY auto_increment,
    tipoDesc VARCHAR(10)
);

CREATE TABLE Categoria (
	idCategoria INT PRIMARY KEY auto_increment,
    nome VARCHAR(20)
);

CREATE TABLE Usuario (
	idUsuario INT PRIMARY KEY auto_increment,
    imgUser LONGTEXT,
    nome VARCHAR(45),
    email VARCHAR(100),
    senha VARCHAR(45),
    dtNasc DATE,
    telefone CHAR(11),
    fkTipoUsuario INT,
		CONSTRAINT fkTipoUsuario FOREIGN KEY (fkTipoUsuario)
			REFERENCES TipoUsuario(idTipoUsuario)
);

SELECT * FROM Usuario;
SELECT * FROM Noticia;
SELECT * FROM NoticiaUsuario;
SELECT * FROM Colaborador;
SELECT * FROM Jogo;

INSERT INTO Usuario VALUES
	(null, null, 'pedro', 'teste@teste.com', 'teste', '2000-01-01', '11981231223', 2);
    
INSERT INTO Colaborador VALUES
	(null, 3);

CREATE TABLE NoticiaUsuario (
	fkUsuario INT,
		CONSTRAINT fkUsuario FOREIGN KEY (fkUsuario) 
			REFERENCES Usuario(idUsuario),
    fkNoticia INT,
		CONSTRAINT fkNoticia FOREIGN KEY (fkNoticia)	
			REFERENCES Noticia(idNoticia),
	CONSTRAINT pkNoticiaUsuario PRIMARY KEY(fkUsuario, fkNoticia)
);

CREATE TABLE Colaborador (
	idColaborador INT PRIMARY KEY auto_increment,
    fkUsuario INT,
		CONSTRAINT fkUsuarioColaborador FOREIGN KEY (fkUsuario)
			REFERENCES Usuario(idUsuario)
);

CREATE TABLE Jogo (
	idJogo INT PRIMARY KEY auto_increment,
    nome VARCHAR(45),
    descJogo TEXT,
    banner LONGTEXT,
    dtCriacao DATE,
    statusJogo TINYINT,
		CONSTRAINT chkStatusJogo CHECK(statusJogo IN(0, 1)),
    tamanhoJogo INT,
    qtdCurtida INT,
    qtdSalvo INT,
    fkColaborador INT,
		CONSTRAINT fkColaboradorJogo FOREIGN KEY (fkColaborador)
			REFERENCES Colaborador(idColaborador)
);

ALTER TABLE Jogo MODIFY COLUMN dtCriacao DATETIME;

INSERT INTO Jogo (nome, descJogo, banner, dtCriacao, statusJogo, tamanhoJogo, qtdCurtida, qtdSalvo, fkColaborador) VALUES ('perigoJogo', 'perigoDescJogo', 'f4134428de63690e4307869731ab7df126e18e9c154bbc927f6c20f6e25b01180a8ffb193310c09832f1b4f9d403147338fa7a1485b7252b9323f06457a8f5da.png', now(), 0, 123, 92, 5, 1);

CREATE TABLE CategoriaJogo (
	fkJogo INT,
		CONSTRAINT fkJogo FOREIGN KEY (fkJogo)
			REFERENCES Jogo(idJogo),
	fkCategoria INT,
		CONSTRAINT fkCategoria FOREIGN KEY (fkCategoria)
			REFERENCES Categoria(idCategoria),
	CONSTRAINT pkCategoriaJogo PRIMARY KEY(fkJogo, fkCategoria)
);

CREATE TABLE Comentario (
	idComentario INT auto_increment,
    fkUsuario INT,
		CONSTRAINT fkComentarioUsuario FOREIGN KEY (fkUsuario)
			REFERENCES Usuario(idUsuario),
	fkNoticia INT,
		CONSTRAINT fkComentarioNoticia FOREIGN KEY (fkNoticia)
			REFERENCES Noticia(idNoticia),
	fkJogo INT,
		CONSTRAINT fkComentarioJogo FOREIGN KEY (fkJogo)
			REFERENCES Jogo(idJogo),
	CONSTRAINT pkComentario PRIMARY KEY (idComentario, fkUsuario)
);

USE ACE;

SELECT * FROM usuario WHERE idusuario = 1;

SELECT  YEAR(jogo.dtCriacao) AS ano,
		MONTHNAME(jogo.dtCriacao) AS mes,
        SUM(jogo.qtdCurtida) as qtdCurtida FROM jogo JOIN colaborador 
			ON idColaborador = fkColaborador
				WHERE idColaborador = 1 GROUP BY ano, mes ORDER BY ano, mes DESC
					LIMIT 7; 
                  
SELECT * FROM jogo;
				
SELECT 
	jogo.nome as nomeJogo,
	SUM(jogo.qtdCurtida) as qtdCurtida FROM jogo JOIN colaborador 
			ON idColaborador = fkColaborador
				WHERE idColaborador = 1 GROUP BY nomeJogo ORDER BY qtdCurtida DESC
					LIMIT 7;
	
UPDATE jogo SET qtdCurtida = 100 WHERE idJogo = 1;
		

DROP DATABASE ACE;