import multer from "multer";
import path from "path";

export default {
    storage: multer.diskStorage({
        // __dirname = variavel global que retorna o caminho do diretorio atual do arquivo passamos os ".." para voltar duas pastas e usamos assim para evitar problemas com o sistema operacional
        destination: path.resolve(__dirname, "..", "..", "uploads"),
        filename: (req, file, cb) => {
            // altera o nome do arquivo para evitar que o mesmo seja sobrescrito
            const ext = path.extname(file.originalname);
            const name = path.basename(file.originalname, ext);

            // cb = callback, primeiro parametro é o erro, segundo o nome do arquivo
            cb(null, `${name}-${Date.now()}${ext}`);
        },
    }),
};

/**
 * Multer é um middleware para lidar com upload de arquivos no express e nodejs pois o mesmo não suporta esse tipo de operação
 */
