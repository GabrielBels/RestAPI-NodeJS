# Rest-API-NodeJS
Rest API criada com Node.JS, Express, Body-parser, MySQL e HEROKU!

Para consumir a API utilize a URL: 'https://rest-api-gabrielbels.herokuapp.com/produtos/'

CASO VÁ EXECUTAR LOCALMENTE EM SUA MÁQUINA:
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

