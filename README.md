# Socket Chat

Este é um projeto para estudar o uso de `socket.io` e `RabbitMQ` em um ambiente Dockerizado. O projeto consiste em uma aplicação de chat em tempo real que utiliza `socket.io` para comunicação em tempo real e `RabbitMQ` para processamento assíncrono de mensagens.

### Descrição dos Arquivos e Diretórios

- **src/**: Contém o código-fonte da aplicação.
  - **consumer.ts**: Script responsável por consumir mensagens da fila RabbitMQ.
  - **index.ts**: Ponto de entrada da aplicação Node.js.
  - **rabbitMQService.ts**: Serviço para interação com RabbitMQ.
- **Dockerfile**: Define a imagem Docker para a aplicação.
- **docker-compose.yml**: Define e orquestra os contêineres Docker.
- **ecosystem.config.js**: Configuração do PM2 para gerenciar processos Node.js.
- **package.json**: Define as dependências e scripts do projeto.
- **README.md**: Documentação do projeto.

## Bibliotecas e Ferramentas Utilizadas

### socket.io

- `socket.io` é uma biblioteca que permite comunicação em tempo real entre clientes e servidores. É usada para implementar o chat em tempo real na aplicação.

### RabbitMQ

- `RabbitMQ` é um servidor de mensagens que facilita a comunicação assíncrona entre diferentes partes da aplicação. É usado para enfileirar e processar mensagens de forma assíncrona.

### Docker

- `Docker` é uma plataforma para desenvolver, enviar e executar aplicações em contêineres. O projeto utiliza Docker para criar um ambiente isolado e consistente para a aplicação.

### Docker Compose

- `Docker Compose` é uma ferramenta para definir e gerenciar aplicativos Docker multi-contêiner. É usado para orquestrar os contêineres da aplicação, incluindo o servidor RabbitMQ e a aplicação Node.js.

### PM2

- `PM2` é um gerenciador de processos para aplicações Node.js. É usado para gerenciar e monitorar os processos da aplicação e do consumidor.

## Configuração e Execução

### Pré-requisitos

- Docker
- Docker Compose

### Passos para Executar

1. **Clone o repositório**:

```bash
git clone https://github.com/seu-usuario/socket-chat.git
cd socket-chat
```

2. **Construa e inicie os contêineres**:
   `npm run compose:up`

3. **Acesse a aplicação**:

   - A aplicação estará disponível em http://localhost:3000.
   - A interface de gerenciamento do RabbitMQ estará disponível em http://localhost:15672 (usuário: guest, senha: guest).

4. **Encerre os contêineres**:
   `npm run compose:down`

### Comandos Disponíveis

- `npm run start`: Inicia a aplicação Node.js.
- `npm run start:consumer`: Inicia o consumidor de mensagens.
- `npm run compose:up`: Constrói e inicia os contêineres Docker.
- `npm run compose:down`: Encerra os contêineres Docker.
- `npm run compose:logs`: Exibe os logs dos contêineres Docker.

## Caso queira executar o projeto em sua máquina, siga os passos abaixo:

- `sudo apt-get install docker.io`
- `sudo apt-get install docker-compose`
- `sudo apt-get-install redis-server`
