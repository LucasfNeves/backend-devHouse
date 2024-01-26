// metodos: index, show, store, update, destroy
/**
 * index: listagem de sessoes
 * store: criar uma sessao
 * show: listar uma unica sessao
 * update: atualizar uma sessao
 * destroy: deletar uma sessao
 */

import * as Yup from "yup";
import User from "../models/User";

class SessionController {
    async store(req, res) {
        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
        });

        const { email } = req.body;

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "Falha na validação" });
        }

        // verifica se o usuario ja existe
        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({ email });
        }

        return res.json(user);
    }
}

export default new SessionController();

/**
 * req.query = Acessar query params (para filtros)
 * req.params = Acessar route params (para edicao, delete)
 * req.body = Acessar corpo da requisicao (para criacao, edicao)
 *
 * Comandos do mongoose
 * User.findOne = Buscar um unico registro da base de dados
 * User.create = Criar um registro na base de dados
 */
