![github-header-image (2)](https://github.com/user-attachments/assets/d12a5257-505a-4007-ab5f-e7f9cfc31660)


# Sistema de Apoio ao Diagnóstico de Doenças (SADD)

Este projeto é um Sistema de Apoio ao Diagnóstico de Doenças, desenvolvido para auxiliar na análise e diagnóstico de condições de saúde. Ele está disponível tanto para uso online quanto local, com instruções claras para configuração e execução.

## Como Rodar o Projeto

### 1. **Online**

Acesse o sistema diretamente no link abaixo, sem necessidade de configuração local:

👉 [MeuSADD Online](https://www.meusadd.com.br/home)

⚠️ **Observação**: Recomenda-se testar o projeto localmente, pois podem ocorrer **inconsistências na versão online** devido à limitada experiência com os **servidores da AWS e da Vercel**, onde a aplicação e o banco de dados foram hospedados.

⚠️ **Observação**: A aplicação estará disponível enquanto os servidores estiverem ativos.

---

### 2. **Localmente**

Siga as instruções abaixo para rodar o projeto no seu ambiente local:

#### Frontend
1. Acesse a pasta `sadd-app` no diretório do projeto.
2. Instale as dependências:
   ```bash
   npm install
   ```
3.Inicie o servidor de desenvolvimento:
   ```bash
   npm start
   ```
4.O navegador será aberto automaticamente, exibindo a aplicação.

## Scripts do Banco de Dados

Os scripts necessários para configurar o banco de dados estão disponíveis no seguinte repositório: 

👉 [Scripts do Banco de Dados](https://github.com/peudias/bd-lpr/tree/main/av1)

## Funcionalidades Implementadas

Você pode conferir todas as funcionalidades implementadas até o momento acessando o milestone concluído no GitHub: 

👉 [Funcionalidades Implementadas](https://github.com/peudias/bd-lpr/milestone/3?closed=1)

## Tecnologias Utilizadas

* Frontend: React.js, HTML, CSS
* Backend: Node.js, Express

   👉 [Backend](https://github.com/peudias/meusadd-back)
* Banco de Dados: MySQL
* Ferramentas: Git, GitHub, npm

## Como Contribuir

1.Clone o repositório:
  ```bash
    git clone https://github.com/peudias/meusadd.git
  ```
2.Crie uma branch para sua feature/correção:
  ```bash
    git checkout -b minha-nova-feature
  ```
3.Faça commit das suas alterações:
  ```bash
  git commit -m 'Adiciona nova feature'
  ```
4.Envie sua branch:
  ```bash
  git push origin minha-nova-feature
  ```
5.Abra um Pull Request.
