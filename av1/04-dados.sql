USE bd_doencas;

INSERT INTO patogeno (nome_cientifico, tipo) VALUES
('Mycobacterium tuberculosis', 'Bactéria'),
('Influenza virus', 'Vírus'),
('Plasmodium spp.', 'Parasita'),
('Dengue virus', 'Vírus'),
('Hepatitis B virus', 'Vírus'),
('Treponema pallidum', 'Bactéria'),
('Candida albicans', 'Fungo'),
('Varicella-zoster virus', 'Vírus'),
('Leptospira spp.', 'Bactéria'),
('Toxoplasma gondii', 'Parasita'),
('Neisseria meningitidis', 'Bactéria'),
('Yellow fever virus', 'Vírus'),
('Zika virus', 'Vírus'),
('Chikungunya virus', 'Vírus'),
('Rubella virus', 'Vírus'),
('Measles virus', 'Vírus'),
('Clostridium tetani', 'Bactéria'),
('Mycobacterium leprae', 'Bactéria'),
('Vibrio cholerae', 'Bactéria'),
('Salmonella typhi', 'Bactéria'),
('Poliovirus', 'Vírus'),
('Rabies virus', 'Vírus'),
('Schistosoma spp.', 'Parasita'),
('Giardia lamblia', 'Parasita'),
('Entamoeba histolytica', 'Parasita'),
('Trichomonas vaginalis', 'Parasita'),
('Trypanosoma cruzi', 'Parasita'),
('Leishmania spp.', 'Parasita'),
('Hepatitis A virus', 'Vírus'),
('Hepatitis C virus', 'Vírus'),
('Herpes simplex virus', 'Vírus'),
('Variola virus', 'Vírus'),
('Epstein-Barr virus', 'Vírus'),
('Mumps virus', 'Vírus');

INSERT INTO doenca (patogeno_id, CID, nomes_tecnicos) VALUES
(1, 'A15-A19', 'Tuberculose'),
(2, 'J10-J11', 'Gripe'),
(3, 'B50-B54', 'Malária'),
(4, 'A90', 'Dengue'),
(5, 'B16', 'Hepatite B'),
(6, 'A50-A53', 'Sífilis'),
(7, 'B37', 'Candidíase'),
(8, 'B01', 'Varicela'),
(9, 'A27', 'Leptospirose'),
(10, 'B58', 'Toxoplasmose'),
(11, 'G00-G03', 'Meningite'),
(12, 'A95', 'Febre Amarela'),
(13, 'A92.5', 'Zika'),
(14, 'A92.0', 'Chikungunya'),
(15, 'B06', 'Rubéola'),
(16, 'B05', 'Sarampo'),
(17, 'A33-A35', 'Tétano'),
(18, 'A30', 'Hanseníase'),
(19, 'A00', 'Cólera'),
(20, 'A01.0', 'Tifoide'),
(21, 'A80', 'Poliomielite'),
(22, 'A82', 'Raiva'),
(23, 'B65', 'Esquistossomose'),
(24, 'A07.1', 'Giardíase'),
(25, 'A06', 'Amebíase'),
(26, 'A59', 'Tricomoníase'),
(27, 'B57', 'Doença de Chagas'),
(28, 'B55', 'Leishmaniose'),
(17, 'A33', 'Tétano Neonatal'),
(29, 'B15', 'Hepatite A'),
(30, 'B17.1', 'Hepatite C'),
(31, 'B00', 'Herpes Simples'),
(32, 'B03', 'Varíola'),
(33, 'B27', 'Mononucleose'),
(34, 'B26', 'Caxumba');

INSERT INTO sintoma (doenca_id, nome, nivel_de_ocorrencia) VALUES
(1, 'Tosse', 'Muito Comum'),
(1, 'Febre', 'Comum'),
(1, 'Perda de peso', 'Comum'),
(2, 'Febre', 'Muito Comum'),
(2, 'Dor de cabeça', 'Comum'),
(2, 'Fadiga', 'Comum'),
(3, 'Febre', 'Muito Comum'),
(3, 'Calafrios', 'Muito Comum'),
(3, 'Dor de cabeça', 'Comum'),
(4, 'Febre', 'Muito Comum'),
(4, 'Dor muscular', 'Comum'),
(4, 'Erupção cutânea', 'Comum'),
(5, 'Icterícia', 'Comum'),
(5, 'Fadiga', 'Comum'),
(5, 'Dor abdominal', 'Comum'),
(6, 'Úlceras', 'Comum'),
(6, 'Erupção cutânea', 'Comum'),
(6, 'Febre', 'Pouco Comum'),
(7, 'Coceira', 'Muito Comum'),
(7, 'Corrimento', 'Comum'),
(7, 'Dor ao urinar', 'Pouco Comum'),
(8, 'Erupção cutânea', 'Muito Comum'),
(8, 'Febre', 'Comum'),
(8, 'Coceira', 'Comum'),
(9, 'Febre', 'Muito Comum'),
(9, 'Dor muscular', 'Comum'),
(9, 'Icterícia', 'Pouco Comum'),
(10, 'Febre', 'Pouco Comum'),
(10, 'Dor muscular', 'Pouco Comum'),
(10, 'Ínguas', 'Pouco Comum'),
(11, 'Febre', 'Muito Comum'),
(11, 'Dor de cabeça', 'Muito Comum'),
(11, 'Rigidez de nuca', 'Comum'),
(12, 'Febre', 'Muito Comum'),
(12, 'Icterícia', 'Comum'),
(12, 'Dor muscular', 'Comum'),
(13, 'Febre', 'Comum'),
(13, 'Erupção cutânea', 'Comum'),
(13, 'Dor articular', 'Comum'),
(14, 'Febre', 'Muito Comum'),
(14, 'Dor articular', 'Muito Comum'),
(14, 'Erupção cutânea', 'Comum'),
(15, 'Erupção cutânea', 'Muito Comum'),
(15, 'Febre', 'Comum'),
(15, 'Ínguas', 'Comum'),
(16, 'Erupção cutânea', 'Muito Comum'),
(16, 'Febre', 'Muito Comum'),
(16, 'Tosse', 'Comum'),
(17, 'Espasmos musculares', 'Muito Comum'),
(17, 'Rigidez', 'Muito Comum'),
(17, 'Febre', 'Pouco Comum'),
(18, 'Manchas na pele', 'Muito Comum'),
(18, 'Perda de sensibilidade', 'Comum'),
(18, 'Fraqueza muscular', 'Pouco Comum'),
(19, 'Diarreia', 'Muito Comum'),
(19, 'Vômito', 'Comum'),
(19, 'Desidratação', 'Comum'),
(20, 'Febre', 'Muito Comum'),
(20, 'Dor abdominal', 'Comum'),
(20, 'Erupção cutânea', 'Pouco Comum'),
(21, 'Paralisia', 'Muito Comum'),
(21, 'Febre', 'Comum'),
(21, 'Dor muscular', 'Comum'),
(22, 'Febre', 'Muito Comum'),
(22, 'Dor de cabeça', 'Comum'),
(22, 'Espasmos musculares', 'Comum'),
(23, 'Febre', 'Comum'),
(23, 'Dor abdominal', 'Comum'),
(23, 'Diarreia', 'Pouco Comum'),
(24, 'Diarreia', 'Muito Comum'),
(24, 'Dor abdominal', 'Comum'),
(24, 'Náusea', 'Comum'),
(25, 'Diarreia', 'Muito Comum'),
(25, 'Dor abdominal', 'Comum'),
(25, 'Febre', 'Pouco Comum'),
(26, 'Corrimento', 'Muito Comum'),
(26, 'Coceira', 'Comum'),
(26, 'Dor ao urinar', 'Pouco Comum'),
(27, 'Febre', 'Comum'),
(27, 'Inchaço no local da picada', 'Comum'),
(27, 'Dor abdominal', 'Pouco Comum'),
(28, 'Feridas na pele', 'Muito Comum'),
(28, 'Febre', 'Comum'),
(28, 'Perda de peso', 'Comum'),
(29, 'Icterícia', 'Comum'),
(29, 'Fadiga', 'Comum'),
(29, 'Dor abdominal', 'Comum'),
(30, 'Icterícia', 'Comum'),
(30, 'Fadiga', 'Comum'),
(30, 'Dor abdominal', 'Comum'),
(31, 'Feridas', 'Muito Comum'),
(31, 'Coceira', 'Comum'),
(31, 'Dor ao urinar', 'Pouco Comum'),
(32, 'Erupção cutânea', 'Muito Comum'),
(32, 'Febre', 'Muito Comum'),
(32, 'Dor muscular', 'Comum'),
(33, 'Febre', 'Muito Comum'),
(33, 'Dor de garganta', 'Comum'),
(33, 'Fadiga', 'Comum'),
(34, 'Inchaço das glândulas', 'Muito Comum'),
(34, 'Febre', 'Comum'),
(34, 'Dor de cabeça', 'Comum');

INSERT INTO nomes_populares (doenca_id, nome) VALUES
(7, 'Sapinho'),
(8, 'Catapora'),
(18, 'Lepra'),
(23, 'Barriga d’água'),
(33, 'Doença do Beijo'),
(34, 'Papeira');
