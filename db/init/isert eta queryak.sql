use backend_profes;

INSERT INTO usuarios (nombre, apellido, email, password, rol) VALUES
('Admin', 'Admin', 'admin@email.com', '$2a$10$sipMUl1tIuzHwi/tXYvDH.5XKiGz/92zZ/u9mrkKcbLvevEgoU8LC', 3),
('Unai', 'López', 'unai.lopez@example.com', '$2a$10$sipMUl1tIuzHwi/tXYvDH.5XKiGz/92zZ/u9mrkKcbLvevEgoU8LC', 1),
('Ane', 'Martínez', 'ane.martinez@example.com', '$2a$10$sipMUl1tIuzHwi/tXYvDH.5XKiGz/92zZ/u9mrkKcbLvevEgoU8LC', 1),
('Iker', 'González', 'iker.gonzalez@example.com', '$2a$10$sipMUl1tIuzHwi/tXYvDH.5XKiGz/92zZ/u9mrkKcbLvevEgoU8LC', 1),
('Elena', 'Martínez', 'elena.martinez@email.com', '$2a$10$sipMUl1tIuzHwi/tXYvDH.5XKiGz/92zZ/u9mrkKcbLvevEgoU8LC', 1),
('Alejandro', 'López', 'alejandro.lopez@email.com', '$2a$10$sipMUl1tIuzHwi/tXYvDH.5XKiGz/92zZ/u9mrkKcbLvevEgoU8LC', 1),
('María', 'Sánchez', 'maria.sanchez@email.com', '$2a$10$sipMUl1tIuzHwi/tXYvDH.5XKiGz/92zZ/u9mrkKcbLvevEgoU8LC', 1),
('Carlos', 'Hernández', 'carlos.hernandez@email.com', '$2a$10$sipMUl1tIuzHwi/tXYvDH.5XKiGz/92zZ/u9mrkKcbLvevEgoU8LC', 1),
('Ana', 'Rodríguez', 'ana.rodriguez@email.com', '$2a$10$sipMUl1tIuzHwi/tXYvDH.5XKiGz/92zZ/u9mrkKcbLvevEgoU8LC', 1),
('Javier', 'Pérez', 'javier.perez@email.com', '$2a$10$sipMUl1tIuzHwi/tXYvDH.5XKiGz/92zZ/u9mrkKcbLvevEgoU8LC', 1),
('Laura', 'García', 'laura.garcia@email.com', '$2a$10$sipMUl1tIuzHwi/tXYvDH.5XKiGz/92zZ/u9mrkKcbLvevEgoU8LC', 1),
('David', 'Ruiz', 'david.ruiz@email.com', '$2a$10$sipMUl1tIuzHwi/tXYvDH.5XKiGz/92zZ/u9mrkKcbLvevEgoU8LC', 1),
('Sara', 'Fernández', 'sara.fernandez@email.com', '$2a$10$sipMUl1tIuzHwi/tXYvDH.5XKiGz/92zZ/u9mrkKcbLvevEgoU8LC', 1);
select * from usuarios;

INSERT INTO temas (nombre) VALUES
('Matemáticas'),
('Ciencias'),
('Historia'),
('Literatura'),
('Informática'),
('Arte'),
('Educación Física'),
('Idiomas'),
('Geografía'),
('Música');
select * from temas;

INSERT INTO tutoriales (nombre, descripcion, repositorio, idTema, idAutor) VALUES
('Tutorial de Matemáticas Básicas', 'Introducción a conceptos fundamentales de matemáticas.', 'https://github.com/tutoriales/matematicas-basicas', 1, 11),
('Introducción a la Ciencia de Datos', 'Conceptos básicos y herramientas para la ciencia de datos.', 'https://github.com/tutoriales/ciencia-de-datos', 2, 2),
('Historia del Siglo XX', 'Un recorrido por los eventos más destacados del siglo XX.', 'https://github.com/tutoriales/historia-siglo-xx', 3, 3),
('Literatura Clásica en 10 Lecciones', 'Exploración de obras literarias clásicas.', 'https://github.com/tutoriales/literatura-clasica', 4, 4),
('Desarrollo Web con Python y Flask', 'Construcción de aplicaciones web con Flask.', 'https://github.com/tutoriales/desarrollo-web-flask', 5, 5),
('Introducción a la Pintura', 'Principios básicos de la pintura artística.', 'https://github.com/tutoriales/introduccion-pintura', 6, 6),
('Ejercicios y Rutinas de Educación Física', 'Actividades para mantenerse en forma y saludable.', 'https://github.com/tutoriales/educacion-fisica', 7, 7),
('Aprendizaje de Idiomas: Inglés', 'Lecciones para aprender inglés de manera efectiva.', 'https://github.com/tutoriales/aprendizaje-ingles', 8, 8),
('Geografía Mundial en Mapas', 'Exploración de la geografía mundial a través de mapas.', 'https://github.com/tutoriales/geografia-mundial', 9, 9),
('Curso de Teoría Musical', 'Fundamentos y teoría básica de la música.', 'https://github.com/tutoriales/teoria-musical', 10, 10);
select * from tutoriales;


INSERT INTO votos (idUsuario, idTutorial, idAutor) VALUES
(1, 1, 11),
(2, 1, 11),
(3, 2, 2),
(4, 2, 2),
(5, 3, 3),
(6, 3, 3),
(7, 4, 4),
(8, 4, 4),
(9, 5, 5),
(10, 5, 5);
select * from votos;



///Tutoriales con sus datos;
SELECT tutoriales.nombre AS titulo, tutoriales.descripcion, temas.nombre AS tema, CONCAT(usuarios.nombre,' ', usuarios.apellido) AS autor, COUNT(votos.idTutorial) AS totalVotos
FROM tutoriales
JOIN temas ON tutoriales.idTema = temas.idTema
JOIN usuarios ON usuarios.idUsuario = tutoriales.idAutor
LEFT JOIN votos ON votos.idTutorial = tutoriales.idTutorial
GROUP BY tutoriales.idTutorial, tutoriales.nombre, tutoriales.descripcion, temas.nombre, usuarios.nombre, usuarios.apellido;


//tutoriales por autor
select * from tutoriales
join usuarios on idAutor=idUsuario
where email="ane.martinez@example.com";


//buscador;
SELECT 
    tutoriales.nombre AS titulo,
    tutoriales.descripcion,
    temas.nombre AS nombre_tema,
    CONCAT(usuarios.nombre, ' ', usuarios.apellido) AS autor,
    COUNT(votos.idTutorial) AS totalVotos
FROM tutoriales
JOIN temas ON tutoriales.idTema = temas.idTema
JOIN usuarios ON usuarios.idUsuario = tutoriales.idAutor
LEFT JOIN votos ON votos.idTutorial = tutoriales.idTutorial
WHERE 
    tutoriales.nombre LIKE '%a%'
    AND tutoriales.descripcion LIKE '%f%'
    OR temas.nombre LIKE '%%'
    OR CONCAT(usuarios.nombre, ' ', usuarios.apellido) LIKE '%%'
GROUP BY tutoriales.idTutorial, tutoriales.nombre, tutoriales.descripcion, temas.nombre, usuarios.nombre, usuarios.apellido;



SELECT tutoriales.nombre AS titulo, tutoriales.descripcion, temas.nombre AS nombre_tema, CONCAT(usuarios.nombre, ' ', usuarios.apellido) AS autor, COUNT(votos.idTutorial) AS totalVotos FROM tutoriales JOIN temas ON tutoriales.idTema = temas.idTema JOIN usuarios ON usuarios.idUsuario = tutoriales.idAutor LEFT JOIN votos ON votos.idTutorial = tutoriales.idTutorial WHERE tutoriales.nombre LIKE '%%' OR tutoriales.descripcion LIKE '%%' OR temas.nombre LIKE '%%' OR CONCAT(usuarios.nombre, ' ', usuarios.apellido) LIKE '%%' GROUP BY tutoriales.idTutorial, tutoriales.nombre, tutoriales.descripcion, temas.nombre, usuarios.nombre, usuarios.apellido;

SELECT idTema FROM temas WHERE nombre="saf";
select * from tutoriales join usuarios on idAutor=idUsuario where email="1@1";
