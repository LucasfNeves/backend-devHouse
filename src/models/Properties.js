import { Schema, model } from "mongoose";

const PropertiesSchema = new Schema(
    {
        thumbnail: String,
        description: String,
        price: Number,
        location: String,
        status: Boolean,
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        // ToObject e ToJSON sao metodos que permitem que o mongoose retorne o objeto virtual
        toJSON: {
            virtuals: true,
        },
    },
);

// virtuals = propriedades que nao existem no banco de dados,
// mas que podem ser acessadas é usado para criar uma url para acessar a imagem
PropertiesSchema.virtual("thumbnail_url").get(function () {
    return `http://localhost:3333/files/${this.thumbnail}`;
});

export default model("Properties", PropertiesSchema);
