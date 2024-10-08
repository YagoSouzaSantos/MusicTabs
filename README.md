# MusicTab

Este é um projeto Angular chamado **MusicTabs**. O site é um protótipo de uma plataforma para professores de música postarem aulas para divulgarem seus trabalhos.
No projeto é possivel visualizar aulas disponíveis no site, aplicar filtros, cadastrar novos usuários e enviar mensagens ao professor que divulgou a aula.

## Pré-requisitos

Verifique se você possui os seguintes softwares instalados:

- [Node.js](https://nodejs.org/) (v14 ou superior)
- [Angular CLI](https://angular.io/cli) (se ainda não tiver, você pode instalá-lo globalmente com o comando `npm install -g @angular/cli`)

O projeto foi desenvolvido na versão do Angular 18.2.4

## Instalação

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/YagoSouzaSantos/MusicTabs.git
   cd MusicTab
   ```

2. **Instale as dependências**:

   Execute o seguinte comando para instalar todas as dependências necessárias do projeto:

   ```bash
   npm install
   ```

3. **Instale o Angular Material**:

   Para instalar o Angular Material, execute o comando:

   ```bash
   ng add @angular/material
   ```

   Siga as instruções para escolher o tema e a configuração.

4. **Instale o JSON Server**:

   Se você ainda não instalou o JSON Server, você pode instalá-lo globalmente com o comando:

   ```bash
   npm install -g json-server
   ```

## Executando o Projeto

Para iniciar o servidor de desenvolvimento e executar o projeto, use o comando:

```bash
ng serve
```

O aplicativo estará disponível em [http://localhost:4200](http://localhost:4200).

## Executando o JSON Server

Para iniciar o JSON Server e simular a API, use o seguinte comando:

```bash
json-server --watch public/db.json
```

Isso fará com que o JSON Server escute as alterações no arquivo `db.json` e disponibilize os dados em [http://localhost:3000](http://localhost:3000).
No projeto, o banco de dados está na em public/db.json

## Tecnologias utilizadas
- Angular versão 18.2.4
- Angular Material
- Json Server

## Melhorias futuras
- Desenvolver a área do Professor, podendo visualizar mensagens e perguntas de alunos separadamente e com uma area específica para a postagem de novos conteúdos;
- Chat em tempo real para conversas de professor e alunos;
- Planos Premium para alunos que gostarem das aulas gratuítas pagem para ter conteúdos exclusivos com o professor;
- Substituição do player do youtube para facilitar a postagem de video-aulas.



