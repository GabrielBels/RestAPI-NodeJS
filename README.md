# Rest-API-NodeJS
Rest API criada com Node.JS, Express, Body-parser, MySQL e HEROKU!

Para testar o consumo da API, disponibilizei uma página para vocês: https://gabrielbels.github.io/

Para consumir a API em sua máquina utilize a seguinte URL para fazer as requisições: 'https://rest-api-gabrielbels.herokuapp.com/produtos/'

CASO VÁ EXECUTAR O SERVIDOR DA API LOCALMENTE EM SUA MÁQUINA:
-> Rode o npm init 

-> npm install 

-> npm start

-> Crie sua conexão com banco de dados MySQL, com os padrões:
	user: root,
	password: root,
	database: ecommerce,
	host: localhost,
	port: 3306;
Caso queira mudar alguma dessas informações, acesse o arquivo ./mysql.js e mude os parâmetros que forem alterados. 
	(OBS: Caso altere o database, deverá ser alterado também no arquivo ./MySQL/SQLCommand.sql o nome do database a ser criado)

