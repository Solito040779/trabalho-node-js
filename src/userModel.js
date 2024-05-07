const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    nome: String,
    email: String,
    idade: Number,
    genero: { type: String, enum: ['Masculino', 'Feminino', 'Outro'] },
    telefone: String,
    cpf: { type: String, unique: true },
    rg: { type: String, unique: true },
});

module.exports = mongoose.model('User', UserSchema);
