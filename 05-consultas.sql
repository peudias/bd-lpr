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

# Letra (b) - Apêndice B: Consulta para listar os sintomas de uma doença específica.

# passar uma doença e retornar seus sintomas (os sintomas dever estar ordenados crescente => muito comum, comum, raro... nessa ordem)
SELECT s.nome AS nome_sintoma, s.nivel_de_ocorrencia FROM sintoma AS s
JOIN doenca AS d ON s.doenca_id = d.id
WHERE d.nomes_tecnicos = 'Chikungunya'  # Insira aqui o nome da doença 
ORDER BY 
  CASE s.nivel_de_ocorrencia
    WHEN 'Muito Comum' THEN 1
    WHEN 'Comum' THEN 2
    WHEN 'Pouco Comum' THEN 3
    WHEN 'Raro' THEN 4
    WHEN 'Muito Raro' THEN 5
    ELSE 6
  END,
  s.nome;
  
SELECT * FROM doenca AS d WHERE d.nomes_tecnicos = 'Chikungunya';
SELECT * FROM sintoma AS s WHERE s.doenca_id = 14;

#========================================================================================================================

# Letra (c) - Apêndice B: Consulta para listar todas as doenças e seus respectivos sintomas.
SELECT d.id AS id_da_doenca, d.nomes_tecnicos AS nome_da_doenca, GROUP_CONCAT(CONCAT(s.nome, ' (', s.nivel_de_ocorrencia, ')') ORDER BY
        CASE
            WHEN s.nivel_de_ocorrencia = 'Muito Comum' THEN 1
            WHEN s.nivel_de_ocorrencia = 'Comum' THEN 2
            WHEN s.nivel_de_ocorrencia = 'Pouco Comum' THEN 3
            WHEN s.nivel_de_ocorrencia = 'Raro' THEN 4
            WHEN s.nivel_de_ocorrencia = 'Muito Raro' THEN 5
        END ASC
    SEPARATOR ', ') AS sintomas
FROM doenca AS d
JOIN sintoma as s ON d.id = s.doenca_id
GROUP BY d.nomes_tecnicos
ORDER BY d.nomes_tecnicos;

#========================================================================================================================

# Letra (d) - Apêndice B: Consulta para calcular o número de doenças cadastradas para cada tipo de patógeno.

SELECT p.tipo AS tipo_do_patogeno, COUNT(*) AS quantidade_de_doencas_cadastradas FROM doenca AS d
JOIN patogeno AS p ON p.id = d.patogeno_id
GROUP BY p.tipo
ORDER BY quantidade_de_doencas_cadastradas ASC, tipo_do_patogeno;

#========================================================================================================================

# Letra (e) - Apêndice B: Consulta para obter algumas estatísticas sobre os dados armazenados no sistema.
SELECT
    (SELECT COUNT(*) FROM doenca) AS numero_de_doencas,
    (SELECT COUNT(*) FROM sintoma) AS numero_de_sintomas,
    sintomas_estatisticas.media_sintomas_por_doenca,
	 sintomas_estatisticas.menor_numero_de_sintomas,
	 sintomas_estatisticas.maior_numero_de_sintomas
	FROM (
		SELECT
			AVG(sintomas_por_doenca.contagem_sintomas) AS media_sintomas_por_doenca,
    		MIN(sintomas_por_doenca.contagem_sintomas) AS menor_numero_de_sintomas,
    		MAX(sintomas_por_doenca.contagem_sintomas) AS maior_numero_de_sintomas
		FROM (
    		SELECT d.id AS id_da_doenca, COUNT(s.id) AS contagem_sintomas FROM doenca AS d JOIN sintoma AS s ON d.id = s.doenca_id
    		GROUP BY d.id
		) AS sintomas_por_doenca
	) AS sintomas_estatisticas;
	
# Testando MinMax
# SELECT * FROM sintoma;
# DELETE FROM sintoma WHERE sintoma.id = 2;
# INSERT INTO sintoma (doenca_id, nome, nivel_de_ocorrencia) VALUES (3, 'Facada', 'Muito Comum');

#========================================================================================================================

# Letra (f) - Apêndice B: Consulta com estatísticas sobre os sintomas.

SELECT
    s.nome AS nome_do_sintoma,
    COUNT(DISTINCT d.id) AS numero_total_doencas_que_apresenta_o_sintoma,
    SUM(CASE WHEN s.nivel_de_ocorrencia = 'Muito Comum' THEN 1 ELSE 0 END) AS numero_de_doencas_em_que_o_sintoma_eh_muito_comum,
    SUM(CASE WHEN s.nivel_de_ocorrencia = 'Comum' THEN 1 ELSE 0 END) AS numero_de_doencas_em_que_o_sintoma_eh_comum,
    SUM(CASE WHEN s.nivel_de_ocorrencia = 'Pouco Comum' THEN 1 ELSE 0 END) AS numero_de_doencas_em_que_o_sintoma_eh_pouco_comum,
    SUM(CASE WHEN s.nivel_de_ocorrencia = 'Raro' THEN 1 ELSE 0 END) AS numero_de_doencas_em_que_o_sintoma_eh_raro,
    SUM(CASE WHEN s.nivel_de_ocorrencia = 'Muito Raro' THEN 1 ELSE 0 END) AS numero_de_doencas_em_que_o_sintoma_eh_muito_raro
FROM
    sintoma AS s
JOIN
    doenca AS d ON s.doenca_id = d.id
GROUP BY
    s.nome
ORDER BY
    numero_total_doencas_que_apresenta_o_sintoma DESC,
    numero_de_doencas_em_que_o_sintoma_eh_muito_comum DESC,
    numero_de_doencas_em_que_o_sintoma_eh_comum DESC,
    numero_de_doencas_em_que_o_sintoma_eh_pouco_comum DESC,
    numero_de_doencas_em_que_o_sintoma_eh_raro DESC,
    numero_de_doencas_em_que_o_sintoma_eh_muito_raro DESC,
    s.nome ASC;
    
#========================================================================================================================

# Letra (g) - Apêndice B: Consulta para listar todas as doenças que possuem um determinado conjunto de sintomas.

SELECT d.id, d.nomes_tecnicos 
FROM doenca AS d 
JOIN sintoma AS s ON s.doenca_id = d.id 
WHERE s.nome = 'Febre' OR s.nome = 'Diarreia' 
GROUP BY d.nomes_tecnicos
ORDER BY d.nomes_tecnicos;

#========================================================================================================================

# Letra (h) - Apêndice B: Consulta para listar as doenças mais prováveis para uma lista de sintomas analisada.

SELECT
  d.id,
  d.nomes_tecnicos,
  SUM(
    CASE
      WHEN s.nome IN ('Febre') THEN
        CASE s.nivel_de_ocorrencia
          WHEN 'Muito Comum' THEN 5
          WHEN 'Comum' THEN 4
          WHEN 'Pouco Comum' THEN 3
          WHEN 'Raro' THEN 2
          WHEN 'Muito Raro' THEN 1
        END
      ELSE -1
    END
  ) AS pontuacao
FROM
  doenca AS d
LEFT JOIN sintoma AS s ON d.id = s.doenca_id
GROUP BY
  d.id,
  d.nomes_tecnicos
ORDER BY
  pontuacao DESC;
  
  # Malária = 2
  # Hepatite B/A = -3
  # Herpes = 3
  # Leptospirose = 3
