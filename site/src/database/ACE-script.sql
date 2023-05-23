CREATE DATABASE ACE;
USE ACE;

CREATE TABLE Noticia(
	idNoticia INT PRIMARY KEY auto_increment,
    dtNoticia DATE,
    titulo VARCHAR(45),
    descNoticia TEXT,
    banner LONGTEXT
);

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

DROP DATABASE ACE;