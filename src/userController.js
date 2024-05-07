const User = require('./userModel');

const getUsers = async () => {
    return await User.find();
};

const getUser = async (id) => {
    return await User.findById(id);
};

const createUser = async (params) => {
    const user = new User({
        nome: params.nome,
        email: params.email,
        idade: params.idade,
        genero: params.genero,
        telefone: params.telefone,
        cpf: params.cpf,
        rg: params.rg
    });
    await user.save();
    return user;
};

const deleteUser = async (id) => {
    return await User.findByIdAndDelete(id);
};

const updateUser = async (id, params) => {
    const user = await User.findByIdAndUpdate(id, params, {
        new: true
    });
    return user;
};

module.exports = {
    getUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser
};