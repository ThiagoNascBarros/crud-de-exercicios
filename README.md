# Academia CRUD

Este é um projeto de um sistema simples de cadastro de exercícios físicos, desenvolvido com **React**, **Vite** e **TailwindCSS**. Ele permite adicionar, editar e excluir exercícios, com persistência de dados no `localStorage`.

## Funcionalidades

- **Adicionar Exercícios**: Insira informações como nome, grupo muscular, tipo, dia da semana e séries/repetições.
- **Editar Exercícios**: Atualize os dados de um exercício existente.
- **Excluir Exercícios**: Remova exercícios da lista.
- **Persistência de Dados**: Os dados são armazenados no `localStorage` do navegador.

## Estrutura do Projeto
O projeto é dividido em componentes para melhor organização e reutilização de código. A estrutura básica é a seguinte:

```
src
├── components
│   ├── ExercicioTable.jsx
├── App.jsx
├── main.jsx
├── App.css
├── styles.css

```

## Pré-requisitos

- Node.js (versão 14 ou superior)
- npm (gerenciador de pacotes do Node.js)

### Principais Arquivos

- **`src/components/ExercicioTable.jsx`**: Componente principal que implementa a tabela de exercícios e as funcionalidades de CRUD.
- **`src/App.jsx`**: Componente raiz que renderiza o `ExercicioTable`.
- **`src/main.jsx`**: Ponto de entrada da aplicação.
- **`vite.config.js`**: Configuração do Vite com suporte a React e TailwindCSS.
- **`src/styles.css` e `src/App.css`**: Estilos globais e específicos da aplicação.

## Tecnologias Utilizadas

- **React**: Biblioteca para construção de interfaces de usuário.
- **Vite**: Ferramenta de build rápida para desenvolvimento web.
- **TailwindCSS**: Framework CSS utilitário para estilização.
- **ESLint**: Ferramenta de linting para manter a qualidade do código.

## Como Executar o Projeto

1. **Acesse o projeto online**:
   O projeto está disponível no Vercel. Você pode acessá-lo diretamente através do link disponível na seção **About** deste repositório no GitHub.

2. **Executar localmente (opcional)**:
   Caso prefira rodar o projeto localmente, siga os passos abaixo:

   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd crud-de-exercicios
   npm install
   npm run dev'
