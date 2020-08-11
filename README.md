# Execução do Projeto Completo 

## `Back-End`

### Requirementos
```
node, npm
```

### Instalação e  Execução
git clone https://github.com/Drone-Radar/drone-api <p>
npm install <p>
npm start <p>
acessar http://localhost:3333/ <p> 
  
### Validação da Fila (RabbitMQ)
Foi criada as chaves no .env do projeto (necessário configuração prórpia) <p> 
CLOUDAMQP_URL=amqp://rjzblehl:4iOzb8P7ZU1noxGZ9LM2S4IEvYNTuWJn@orangutan.rmq.cloudamqp.com/rjzblehl <p> 
CLOUDAMQP_HEARTBEAT=60 <p>
CLOUDAMQP_EXCHANGE=drone <p> 
CLOUDAMQP_QUEUE=comunicado <p>


## `Front-End`

### Requirementos
```
node, npm
```

### Instalação e  Execução
git clone https://github.com/Drone-Radar/drone-radar <p>
npm install <p>
npm start <p>
acessar http://localhost:3000/ <p> 
** executar com o back-end executando em paralelo ** 

## `Execução das Notificações`

Acessando Mailtrap.io:

O Mailtrap fornece um servidor SMTP falso para sua equipe de desenvolvimento testar, visualizar e compartilhar e-mails enviados dos ambientes de pré-produção e testar com dados reais sem o risco de spam de clientes reais. É criado pela Railsware e para muitas tarefas de desenvolvimento, o uso do Mailtrap será gratuito.

Essencialmente, você se inscreve no Mailtrap e envia todo o seu e-mail de ambiente de pré-produção através do seu servidor Falso Mailtrap SMTP.

**URL: https://mailtrap.io/**
* Crie o Cadastro (Possível utilizar o Github);
* Após o login crie uma inbox com o nome: drones;
* Ao acessar a inbox terá na tela principal as credenciais, se atente apenas na questão de usuário e senha e altere o arquivo **.env**

Run:

* **npm run dev (drones-api)**
* **npm run dev (drone-radar-comunicado)** - No arquivo **app.js** existirá o método **setInterval(validateData, (60000));** responsável pela execução de toda a atividade.

Caso utilize o projeto UI, segue a sugestão de dados para teste da aplicação:

```
[Não deve entrar]
Nome:Drone01
Latitude:0
Longitude:100
Temperatura:35
Umidade:15

[Entrar - Temperatura > 35]
Nome:Drone02
Latitude:0
Longitude:100
Temperatura:36
Umidade:16

[Entrar - Temperatura < 0]
Nome:Drone03
Latitude:0
Longitude:100
Temperatura:-20
Umidade:16

[Entrar - Umidade < 0]
Nome:Drone04
Latitude:0
Longitude:100
Temperatura:35
Umidade:14a

[Entrar - Todos os critérios]
Drone05
Latitude:0
Longitude:100
Temperatura:36
Umidade:14

```



