import Properties from "../models/Properties";

class DashboardController {
    async show(req, res) {
        const { user_id } = req.headers;

        const property = await Properties.find({ user: user_id });

        return res.json(property);
    }
}

export default new DashboardController();

/**
 * .find - é um metodo do mongoose que busca todos os registros que atendem a condição
 */
