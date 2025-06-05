class UsuarioDTO
{
    constructor(data)
    {
        Object.assign(this, data);
    }

    static fromModel(model)
    {
        return new UsuarioDTO({
            _id: model._id,
            userName: model.userName,
            password: model.password,
            createdAt: model.createdAt,
            updatedAt: model.updatedAt
        });
    }
}

module.exports = UsuarioDTO;