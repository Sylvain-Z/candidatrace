-- Seeders pour CandidaTrace

USE candidatrace_db;

-- Insertion de utilisateurs de test
INSERT INTO users (firstname, lastname, city, phone, email, password, profile_pic, registration_date) VALUES
('Jean', 'Dupont', 'Paris', '0612345678', 'jean.dupont@email.com', '$2a$10$JEPBdMnvwKl3gVdurtnCy.dUJLPvAdZSoUiez9VQ8BaaPetfzbtmO', 'profilePicUser1.png', NOW()),
('Marie', 'Bernard', 'Lyon', '0687654321', 'marie.bernard@email.com', '$2a$10$JEPBdMnvwKl3gVdurtnCy.dUJLPvAdZSoUiez9VQ8BaaPetfzbtmO', 'profilePicUser2.png', NOW()),
('Pierre', 'Martin', 'Marseille', '0698765432', 'pierre.martin@email.com', '$2a$10$JEPBdMnvwKl3gVdurtnCy.dUJLPvAdZSoUiez9VQ8BaaPetfzbtmO', 'profilePicUser3.png', NOW());

-- Insertion d'applications de test pour Jean Dupont (id=1)
INSERT INTO applications (company_name, website, application_link, application_date, note, first_relaunch, second_relaunch, interview_date, final_response, final_response_date, user_id) VALUES
('Google', 'https://www.google.com', 'https://careers.google.com/jobs/123', '2024-01-15 10:00:00', 'Candidature pour poste de développeur senior', '2024-02-15 10:00:00', '2024-03-15 10:00:00', '2024-04-01 14:00:00', 1, '2024-04-10 09:00:00', 1),
('Microsoft', 'https://www.microsoft.com', 'https://careers.microsoft.com/jobs/456', '2024-01-20 14:30:00', 'Stack Azure', NULL, NULL, NULL, NULL, NULL, 1),
('Amazon', 'https://www.amazon.com', 'https://www.amazon.jobs/789', '2024-02-01 08:00:00', 'Poste backend AWS', '2024-03-01 08:00:00', NULL, NULL, 0, '2024-03-15 10:00:00', 1),
('Apple', 'https://www.apple.com', 'https://www.apple.com/careers/101', '2024-02-10 11:00:00', 'Developpeur iOS', NULL, NULL, NULL, NULL, NULL, 1);

-- Insertion d'applications de test pour Marie Bernard (id=2)
INSERT INTO applications (company_name, website, application_link, application_date, note, first_relaunch, second_relaunch, interview_date, final_response, final_response_date, user_id) VALUES
('Netflix', 'https://www.netflix.com', 'https://jobs.netflix.com/202', '2024-01-25 16:00:00', 'Candidature Data Science', '2024-02-25 16:00:00', NULL, '2024-03-20 10:00:00', 1, '2024-04-05 15:00:00', 2),
('Meta', 'https://www.meta.com', 'https://www.metacareers.com/303', '2024-02-05 09:00:00', 'React Developer', NULL, NULL, NULL, NULL, NULL, 2),
('Airbnb', 'https://www.airbnb.com', 'https://www.airbnb.com/careers/707', '2024-02-08 15:30:00', 'Frontend Developer', NULL, NULL, NULL, NULL, NULL, 2),
('Spotify', 'https://www.spotify.com', 'https://www.spotify.com/careers/808', '2024-02-12 11:00:00', 'DevOps Engineer', '2024-03-12 11:00:00', NULL, NULL, NULL, NULL, 2);

-- Insertion d'applications de test pour Pierre Martin (id=3)
INSERT INTO applications (company_name, website, application_link, application_date, note, first_relaunch, second_relaunch, interview_date, final_response, final_response_date, user_id) VALUES
('Tesla', 'https://www.tesla.com', 'https://www.tesla.com/careers/404', '2024-01-30 12:00:00', 'Ingenieur logiciel', '2024-02-28 12:00:00', '2024-03-28 12:00:00', NULL, NULL, NULL, 3),
('SpaceX', 'https://www.spacex.com', 'https://www.spacex.com/careers/505', '2024-02-15 10:00:00', 'Full Stack Developer', NULL, NULL, NULL, NULL, NULL, 3),
('Uber', 'https://www.uber.com', 'https://www.uber.com/careers/606', '2024-02-20 13:00:00', 'Backend Engineer', '2024-03-20 13:00:00', NULL, '2024-04-15 11:00:00', 0, '2024-04-25 16:00:00', 3),
('LinkedIn', 'https://www.linkedin.com', 'https://www.linkedin.com/careers/909', '2024-02-18 09:00:00', 'Senior Backend Engineer', '2024-03-18 09:00:00', '2024-04-18 09:00:00', '2024-05-10 14:00:00', 1, '2024-05-20 10:00:00', 3),
('GitHub', 'https://www.github.com', 'https://www.github.com/careers/1010', '2024-02-22 14:00:00', 'Solutions Architect', NULL, NULL, NULL, NULL, NULL, 3);