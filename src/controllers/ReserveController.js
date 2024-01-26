import Reserve from "../models/Reserve";
import User from "../models/User";
import Properties from "../models/Properties";

class ReserveController {
    // lista as reservas
    async index(req, res) {
        const { user_id } = req.headers;

        const reserves = await Reserve.find({ user: user_id }).populate(
            "house",
        );

        return res.json(reserves);
    }

    // cria uma reserva
    async store(req, res) {
        const { user_id } = req.headers;
        const { property_id } = req.params;
        const { date } = req.body;

        const house = await Properties.findById(property_id);
        const user = await User.findById(user_id);

        if (!house) {
            return res
                .status(400)
                .json({ error: "Essa propriedade não existe" });
        }

        if (house.status !== true) {
            return res.status(400).json({ error: "Solicitação indisponivel" });
        }

        if (String(user._id) === String(house.user)) {
            return res.status(401).json({ error: "Reserva não permitida" });
        }

        const reserve = await Reserve.create({
            user: user_id,
            house: property_id,
            date,
        });

        // popula os dados do usuario e da casa
        await reserve.populate(["house", "user"]);

        return res.json(reserve);
    }

    async destroy(req, res) {
        const { reserve_id } = req.body;

        await Reserve.findByIdAndDelete({ _id: reserve_id });

        return res.send();
    }
}

export default new ReserveController();
