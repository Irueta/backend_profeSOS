-- MySQL Script generated by MySQL Workbench
-- lun 13 nov 2023 16:25:41
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema backend_profes
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `backend_profes` ;

-- -----------------------------------------------------
-- Schema backend_profes
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `backend_profes` ;
USE `backend_profes` ;

-- -----------------------------------------------------
-- Table `backend_profes`.`usuarios`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `backend_profes`.`usuarios` ;

CREATE TABLE IF NOT EXISTS `backend_profes`.`usuarios` (
  `idUsuario` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `apellido` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `rol` VARCHAR(45) NOT NULL DEFAULT '1',
  PRIMARY KEY (`idUsuario`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `backend_profes`.`tema`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `backend_profes`.`tema` ;

CREATE TABLE IF NOT EXISTS `backend_profes`.`tema` (
  `idTema` INT NOT NULL,
  `nombre` VARCHAR(45) NULL,
  PRIMARY KEY (`idTema`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `backend_profes`.`tutoriales`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `backend_profes`.`tutoriales` ;

CREATE TABLE IF NOT EXISTS `backend_profes`.`tutoriales` (
  `idTutorial` INT NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  `descripcion` VARCHAR(45) NULL,
  `repositorio` VARCHAR(150) NULL,
  `idTema` INT NOT NULL,
  `idAutor` INT NOT NULL,
  PRIMARY KEY (`idTutorial`, `idAutor`),
  INDEX `fk_tutoriales_temas_idx` (`idTema` ASC) VISIBLE,
  INDEX `fk_tutoriales_usuarios1_idx` (`idAutor` ASC) VISIBLE,
  CONSTRAINT `fk_tutoriales_temas`
    FOREIGN KEY (`idTema`)
    REFERENCES `backend_profes`.`tema` (`idTema`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_tutoriales_usuarios1`
    FOREIGN KEY (`idAutor`)
    REFERENCES `backend_profes`.`usuarios` (`idUsuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `backend_profes`.`voto`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `backend_profes`.`voto` ;

CREATE TABLE IF NOT EXISTS `backend_profes`.`voto` (
  `idvoto` INT NOT NULL,
  `idUsuario` INT NOT NULL,
  `idTutorial` INT NOT NULL,
  `idAutor` INT NOT NULL,
  PRIMARY KEY (`idvoto`, `idUsuario`, `idTutorial`, `idAutor`),
  INDEX `fk_voto_usuarios1_idx` (`idUsuario` ASC) VISIBLE,
  INDEX `fk_voto_tutoriales1_idx` (`idTutorial` ASC, `idAutor` ASC) VISIBLE,
  CONSTRAINT `fk_voto_usuarios1`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `backend_profes`.`usuarios` (`idUsuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_voto_tutoriales1`
    FOREIGN KEY (`idTutorial` , `idAutor`)
    REFERENCES `backend_profes`.`tutoriales` (`idTutorial` , `idAutor`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
