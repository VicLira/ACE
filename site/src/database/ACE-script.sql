CREATE DATABASE ACE;
USE ACE;

CREATE TABLE TipoUsuario (
	idTipoUsuario INT PRIMARY KEY AUTO_INCREMENT,
	tipoDesc VARCHAR(10)
);

INSERT INTO TipoUsuario VALUES
	(1, 'admin'),
    (2, 'user');

CREATE TABLE Usuario (
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
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

INSERT INTO Usuario VALUES 
	(null, null, 'Lira', 'admin@admin.com', 'admin', '2005-02-14', '11981001289', 1);

CREATE TABLE Colaborador (
	idColaborador INT PRIMARY KEY auto_increment,
    fkUsuario INT,
		CONSTRAINT fkUsuarioColaborador FOREIGN KEY (fkUsuario)
			REFERENCES Usuario(idUsuario)
);

INSERT INTO Colaborador VALUES
	(1, 1);


CREATE TABLE Jogo (
	idJogo INT PRIMARY KEY auto_increment,
    nome VARCHAR(45),
    descJogo TEXT,
    banner LONGTEXT,
    dtCriacao DATETIME,
    statusJogo TINYINT,
		CONSTRAINT chkStatusJogo CHECK(statusJogo IN(0, 1)),
    tamanhoJogo INT,
    qtdCurtida INT,
    qtdSalvo INT,
    fkColaborador INT,
		CONSTRAINT fkColaboradorJogo FOREIGN KEY (fkColaborador)
			REFERENCES Colaborador(idColaborador)
);

INSERT INTO Jogo (nome, descJogo, banner, dtCriacao, statusJogo, tamanhoJogo, fkColaborador) VALUES ('WorldBox', 'WorldBox é um Jogo eletrônico de Sandbox foi lançado em 2012 pelo desenvolvedor indie Maxim Karpenko. O jogo usa diferentes elementos para criar, mudar e destruir mundos virtuais.', 'ddbd68435b82ecb3f677ec96b785eaf2be7a57a037759b5c6f604e272a5e2625df035bd6346829ba2bbb7fdeef90dfb47be1ba6fd1721a95fa519343bf16af9c.png', now(), 0, 123, 1);
SELECT * FROM Jogo;

CREATE TABLE Noticia (
	idNoticia INT PRIMARY KEY AUTO_INCREMENT,
	dtNoticia DATETIME,
	titulo VARCHAR(45),
	descNoticia TEXT,
	bannerJogo TEXT,
	bannerNoticia TEXT
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

CREATE TABLE Categoria (
	idCategoria INT PRIMARY KEY AUTO_INCREMENT,
	nomeCategoria VARCHAR(45)
);

	INSERT INTO Categoria VALUES 
		(null, 'Ação'),
        (null, 'Aventura'),
        (null, 'Estratégia'),
        (null, 'Plataforma'),
        (null, 'Quebra-cabeça'),
        (null, 'Rpg'),
        (null, 'Simulação'),
        (null, 'Terror');

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
	idComentario INT AUTO_INCREMENT,
	fkUsuario INT,
		CONSTRAINT fkUsuarioComentario FOREIGN KEY (fkUsuario)
			REFERENCES Usuario(idUsuario),
	fkNoticia INT,
		CONSTRAINT fkNoticiaComentario FOREIGN KEY (fkNoticia)
			REFERENCES Noticia(idNoticia),
	fkJogo INT,
		CONSTRAINT fkJogoComentario FOREIGN KEY (fkJogo)
			REFERENCES Jogo(idJogo),
	conteudo TEXT,
	dataComentario DATETIME,
	PRIMARY KEY (idComentario)
);

CREATE TABLE InteracaoUsuarioJogo (
    idInteracao INT PRIMARY KEY AUTO_INCREMENT,
    idUsuario INT,
    idJogo INT,
    acao VARCHAR(20),
    dataInteracao DATETIME DEFAULT NOW(),
    FOREIGN KEY (idUsuario) REFERENCES Usuario(idUsuario),
    FOREIGN KEY (idJogo) REFERENCES Jogo(idJogo)
);

SELECT * FROM Jogo;
SELECT * FROM Noticia;

DELIMITER //
CREATE TRIGGER atualizar_qtdCurtida AFTER INSERT ON Interacao
FOR EACH ROW
BEGIN
    UPDATE Jogo SET qtdCurtida = (SELECT COUNT(*) FROM InteracaoUsuarioJogo WHERE idJogo = NEW.idJogo AND acao = 'curtida') WHERE idJogo = NEW.idJogo;
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER atualizar_qtdSalvo AFTER INSERT ON InteracaoUsuarioJogo
FOR EACH ROW
BEGIN
    UPDATE Jogo SET qtdSalvo = (SELECT COUNT(*) FROM InteracaoUsuarioJogo WHERE idJogo = NEW.idJogo AND acao = 'salvo') WHERE idJogo = NEW.idJogo;
END //
DELIMITER ;


SELECT  YEAR(jogo.dtCriacao) AS ano,
		MONTHNAME(jogo.dtCriacao) AS mes,
        SUM(jogo.qtdCurtida) as qtdCurtida FROM jogo JOIN colaborador 
			ON idColaborador = fkColaborador
				WHERE idColaborador = 1 GROUP BY ano, mes ORDER BY ano, mes DESC
					LIMIT 7; 
				
				
SELECT 
        Jogo.nome as nomeJogo,
        SUM(Jogo.qtdCurtida) as qtdCurtida FROM Jogo JOIN Colaborador 
                ON idColaborador = fkColaborador
                    WHERE idColaborador = 2 GROUP BY nomeJogo ORDER BY qtdCurtida DESC
                        LIMIT 7;

SELECT 
	SUM(Jogo.qtdCurtida) as qtdCurtida,
	SUM(Jogo.qtdSalvo) as qtdSalvo FROM Jogo JOIN Colaborador 
			ON idColaborador = fkColaborador
				WHERE idColaborador = 1 LIMIT 2;

SELECT 
        Jogo.nome as nomeJogo,
        Jogo.banner as banner,
         SUM(Jogo.qtdSalvo) as qtdSalvo,
        SUM(Jogo.qtdCurtida) as qtdCurtida FROM Jogo JOIN Colaborador 
                ON idColaborador = fkColaborador
					GROUP BY nomeJogo, banner ORDER BY qtdCurtida DESC
                        LIMIT 4;

SELECT nome,
	   imgUser FROM Usuario JOIN Colaborador
	ON idUsuario = fkUsuario ORDER BY idUsuario, fkUsuario LIMIT 5;
    
SELECT * FROM AtividadeUsuarioJogo WHERE fkUsuario = 1 AND fkJogo = 11 AND tipoAcao = 'curtir';
    
SELECT 
	bannerJogo,
	bannerNoticia,
	titulo,
	descNoticia,
	dtNoticia FROM Noticia ORDER BY dtNoticia DESC
					LIMIT 7;

DROP DATABASE ACE;