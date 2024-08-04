USE bd_doencas;

SELECT * FROM doenca;
SELECT * FROM nomes_populares;
SELECT * FROM patogeno;
SELECT * FROM sintoma;

# Letra (a) - Apêndice B: Consulta para listar todas as doenças e seus respectivos dados.
SELECT d.id, d.nomes_tecnicos, d.cid, p.tipo FROM doenca AS d
JOIN patogeno AS p ON p.id = d.patogeno_id
ORDER BY d.nomes_tecnicos;

#========================================================================================================================

# Letra (b) - Apêndice B: Consulta para listar os sintomas de uma doença específica. (? => tem que ter (taxa_de_ocorrencia && frequencia) || (taxa_de_ocorrencia))
SELECT s.nome AS nome_do_sintoma, s.nivel_de_ocorrencia AS taxa_de_ocorrencia, COUNT(*) AS frequencia FROM sintoma AS s
GROUP BY nome
ORDER BY frequencia DESC, nome;
# ou (tirar duvida com André)
SELECT s.nome AS nome_do_sintoma, COUNT(*) AS taxa_de_ocorrencia FROM sintoma AS s
GROUP BY nome
ORDER BY taxa_de_ocorrencia DESC, nome;

#========================================================================================================================

# Letra (c) - Apêndice B: Consulta para listar todas as doenças e seus respectivos sintomas.
SELECT d.id AS id_doenca, d.nomes_tecnicos AS nome_doenca, GROUP_CONCAT(s.nome ORDER BY s.nivel_de_ocorrencia SEPARATOR ', ') as sintomas, s.nivel_de_ocorrencia AS taxa_de_ocorrencia 
FROM doenca AS d
JOIN sintoma AS s ON s.doenca_id = d.id
GROUP BY nome_doenca
ORDER BY nome_doenca, FIELD (taxa_de_ocorrencia, 'Muito Comum', 'Comum', 'Pouco Comum', 'Raro', 'Muito Raro');

# (c.2)
SELECT d.id AS id_da_doenca, d.nomes_tecnicos AS nome_da_doenca, GROUP_CONCAT(CONCAT(s.nome, ' (', s.nivel_de_ocorrencia, ')') ORDER BY
        CASE
            WHEN s.nivel_de_ocorrencia = 'Muito Comum' THEN 1
            WHEN s.nivel_de_ocorrencia = 'Comum' THEN 2
            WHEN s.nivel_de_ocorrencia = 'Pouco Comum' THEN 3
            WHEN s.nivel_de_ocorrencia = 'Raro' THEN 4
            WHEN s.nivel_de_ocorrencia = 'Muito Raro' THEN 5
        END ASC
    SEPARATOR ', ') AS sintomas
FROM doenca as d
JOIN sintoma as s ON d.id = s.doenca_id
GROUP BY d.nomes_tecnicos
ORDER BY d.nomes_tecnicos;

#========================================================================================================================

# Letra (d) - Apêndice B: Consulta para calcular o número de doenças cadastradas para cada tipo de patógeno. (? => se nao tivesse order by tipo_do_patogeno nao mudaria nada?)

SELECT p.tipo AS tipo_do_patogeno, COUNT(*) AS quantidade_de_doencas_cadastradas FROM doenca AS d
JOIN patogeno AS p ON p.id = d.patogeno_id
GROUP BY p.tipo
ORDER BY quantidade_de_doencas_cadastradas ASC, tipo_do_patogeno;