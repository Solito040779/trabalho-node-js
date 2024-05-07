const express = require('express');
const mongoose = require('mongoose');
const { getUsers, getUser, createUser, deleteUser, updateUser } = require('./userController');


const app = express();
const port = 3000;

if (mongoose.modelNames().indexOf('User') === -1) {
const User = mongoose.model('User', {
    nome: String,
    email: String,
    idade: Number,
    genero: { type: String, enum: ['Masculino', 'Feminino', 'Outro'] },
    telefone: String,
    cpf: { type: String, unique: true },
    rg: { type: String, unique: true },
});
}

app.get("/", async (request, response) => {
    try {
        const users = await getUsers();
        return response.status(200).send(users);    
    } catch (error) {
        return response.status(500).send(error);
    }
});

app.get("/:id", async (request, response) => {
    try {
        const user = await getUser(req.params.id);
        return response.status(200).send(user);
    } catch (error) {
        return response.status(500).send(error);
    }
});

app.post("/users", async (request, response) => {
    try {
        const user = await createUser(req.body);
        return response.status(201).send(user);
    } catch (error) {
        return response.status(500).send(error);
    }
});

app.delete("/:id", async (request, response) => {
    try {
        await deleteUser(request.params.id);
        return response.status(204).send();
    } catch (error) {
        return response.status(500).send(error);
    }
});

app.put("/:id", async (request, response) => {


    const user = await updateUser(request.params.id, {
        nome: request.body.nome,
        email: request.body.email,
        idade: request.body.idade,
        genero: request.body.genero,
        telefone: request.body.telefone,
        cpf: request.body.cpf,
        rg: request.body.cpf
    })
   
    return response.status(200).send(user)
})

mongoose.connect('mongodb+srv://101537:QsnfNDK9ntAuAeyP@cluster0.u7f72kv.mongodb.net/myDatabase?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log("MongoDB connected");
        console.log(`App running port: ${port}`);
    })
    .catch((e) => console.log(e));

app.listen(port, async () => {
    console.log(`App running in http://localhost:${port}`);
});
