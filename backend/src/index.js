const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const {errors} = require('celebrate');
const app = express();

//permite requisisão de qualquer dominio
app.use(cors());
//resebe o body das requisições como JOSN
app.use(express.json());
//utiliza as rotas na aplcação
app.use(routes);
//configura formato dos erros
app.use(errors());

app.listen(3333);