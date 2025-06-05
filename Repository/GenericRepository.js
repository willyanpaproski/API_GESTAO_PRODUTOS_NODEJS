class GenericRepository
{
    constructor(model)
    {
        this.model = model;
    }

    async findAll({
        filter = {},
        page = 1,
        limit = 10,
        sort = {}
    } = {})
    {
        const skip = (page - 1) * limit;
        const [items, total] = await Promise.all([
            this.model.find(filter).sort(sort).skip(skip).limit(limit),
            this.model.countDocuments(filter)
        ]);

        return {
            data: items,
            total,
            page,
            limit,
            totalPerPage: Math.ceil(total / limit)
        }
    }

    async findById(id)
    {
        return await this.model.findById(id);
    }

    async findOne(data = {})
    {
        return await this.model.findOne(data);
    }

    async create(data)
    {
        return await this.model.create(data);
    }

    async update(id, data)
    {
        return await this.model.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id)
    {
        return await this.model.findByIdAndDelete(id);
    }
}

module.exports = GenericRepository;