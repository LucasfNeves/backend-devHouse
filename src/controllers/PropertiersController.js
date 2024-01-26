import * as yup from "yup";
import Properties from "../models/Properties";
import User from "../models/User";

class PropertiersController {
    async index(req, res) {
        const { status } = req.query;

        const properties = await Properties.find({ status });

        return res.json(properties);
    }

    async store(req, res) {
        const schema = yup.object().shape({
            description: yup.string().required(),
            price: yup.number().required(),
            location: yup.string().required(),
            status: yup.boolean().required(),
        });

        const { filename } = req.file;
        const { description, price, location, status } = req.body;
        const { user_id } = req.headers;

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "Erro de validação" });
        }

        const house = await Properties.create({
            user: user_id,
            thumbnail: filename,
            description,
            price,
            location,
            status,
        });

        return res.json(house);
    }

    async update(req, res) {
        const { filename } = req.file;
        const { property_id } = req.params;
        const { description, price, location, status } = req.body;
        const { user_id } = req.headers;

        const user = await User.findById(user_id);
        const properties = await Properties.findById(property_id);

        if (String(user._id) !== String(properties.user)) {
            return res.status(401).json({ error: "Não autorizado" });
        }

        await Properties.updateOne(
            {
                _id: property_id,
            },
            {
                thumbnail: filename,
                description,
                price,
                location,
                status,
            },
        );

        return res.send();
    }

    async destroy(req, res) {
        const { property_id } = req.body;
        const { user_id } = req.headers;

        const user = await User.findById(user_id);
        const properties = await Properties.findById(property_id);

        if (String(user._id) !== String(properties.user)) {
            return res.status(401).json({ error: "Não autorizado" });
        }

        await Properties.findByIdAndDelete({ _id: property_id });

        return res.json({ message: "Deletado com sucesso" });
    }
}

export default new PropertiersController();

/**
 * Create serve para criar um registro na base de dados
 */
