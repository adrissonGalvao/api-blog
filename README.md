# API BLOG
> Repositório com o código _JavaScript_ da API BLOG.

## Instalação
```
$ npm install 
```
## Execução

```sh
$ npm start # produção
$ npm run dev # desenvolvimento
$ npm run extract # Extração dos dados do JSON para o MongoDB
```
## Variáveis de ambiente
Para o funcionamento da API, é necessário definir as variáveis de ambiente abaixo. Em ambiente de desenvolvimento, as mesmas podem ser atribuídas em um arquivo denominado `.env` na pasta raiz do projeto.

- DB_USER: Usuário para acessar o MongoDB
- DB_PASS: Senha para acessar o MongoDB
- KEY_JWT: Chave para validar assinatura do JWT informado no Authorization das requisições
- URL_MONGO: Endereço correspondente ao MongoDB (ex.: urlmongo.com:28017)
- KEY_OMDB: Chave para consultar dados dos filmes na API OMDb (http://www.omdbapi.com/)

## Extração de dados para o MongoDB
Para realizar a extração e a inserção dos dados no MongoDb, é necessário que os dados estejam nesse formato, a parte de comentários suporta *N* comentários na hora da inserção do post. O arquivo deve ser salvo com o nome `mock.json` ou mudar em `/src/lib/extractData.js` para o nome desejado.
```json
{
	"title": "Um pouco sobre Jornada nas Estrelas",
	"content": "Filme que retrata a vida de XYz e sobre o universo ABC",
	"author": "Ardelis Deniske",
	"dateCreation": "2017-12-02T05:44:03Z",
	"movie": "Jornada nas estrelas",
	"comments": [{
		"author": "Leland Doughartie",
		"content": "Assiste e filme e concordo com você, foi incrível a parte do jlkop",
		"date": "2018-02-16T03:58:19Z"
	}]
}
```
## Exemplos para testar as requisições
#### Criar post para o Blog
```curl
curl -X POST \
  http://localhost:3000/post \
  -H 'authorization: chaveapi' \
  -H 'content-type: application/json' \
  -d '{
	"title": "Um pouco sobre Jornada nas Estrelas",
	"content": "Filme que retrata a vida de XYz e sobre o universo ABC",
	"author": "Ardelis Deniske",
	"dateCreation": "2017-12-02T05:44:03Z",
	"movie": "Jornada nas estrelas"
}'
```
#### Criar comentário para o post no Blog
```curl
curl -X POST \
  http://localhost:3000/comment/$post_id \
  -H 'authorization: chaveapi' \
  -H 'content-type: application/json' \
  -d '{
		"author": "Leland Doughartie",
		"content": "Assiste e filme e concordo com você, foi incrível a parte ",
		"date": "2018-02-16T03:58:19Z"
	}'
```
#### Listando todos os posts criados
```curl
curl -X GET \
  http://localhost:3000/posts \
  -H 'authorization: chaveapi' \
  -H 'cache-control: no-cache' \
```
#### Mostrando post específico
```curl
curl -X GET \
  http://localhost:3000/post/$post_id \
  -H 'authorization: chaveapi' \
  -H 'cache-control: no-cache' \
```
#### Deletando post específico
```curl
curl -X DELETE \
  http://localhost:3000/post/$post_id \
  -H 'authorization: chaveapi' \
  -H 'content-type: application/json' \
```
#### Atualizando post específico, necessário passar apenas campo e o dado
```curl
curl -X PATCH \
  http://localhost:3000/post/$post_id \
  -H 'authorization: chaveapi' \
  -H 'content-type: application/json' \
  -d '{
	"title": "Jornada nas Estrelas II"
}'
```
