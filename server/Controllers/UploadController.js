import db from '../Servers/db.js'

export const getUsers = (req, res) => {
    db.query("SELECT * FROM images ", (err, data) => {
        if (err) return res.status(400).json({
            msg: "Erro ao puxar os dados do banco"
        })
        return res.status(200).json({
            msg: "Sucesso ao encontrar todas as imagens",
            imagens: data,
            url: "http://localhost:8080/files/upload/"
        })
    })
}

export const addUplaod = (req, res) => {
    if (req.file) {
        db.query("INSERT INTO images (`image`) VALUES(?)", [req.file.filename], (err, result, field) => {
            if (err) {
                return res.status(400).json({
                    error: err,
                    msg: "Erro ao fazer o upload"
                })
            }
            return res.status(200).json({
                msg: "Upload feito com sucesso"
            })
        })
    }
}

export const updateUpload = (req, res) => {
    const id = req.params.id
    const files = req.file.filename

    db.query("UPDATE images SET `image` = ? WHERE `id` = ?", [files, id], (err) => {
        if(err) return res.status(400).json({
            error: err,
            msg: "Não foi possivel editar essa imagem"
        })
        return res.status(200).json({
            msg: "Sucesso ao editar a imagem",
        })
    })
}

export const deleteUpload = (req, res) => {

    db.query("DELETE FROM images WHERE `id` = ?", [req.params.id],
        (err) => {
            if (err) return res.status(400).json({
                error: err,
                msg: "Erro ao deletar o produto"
            })
            return res.status(200).json({
                msg: "Usuario deletado"
            })
        })
}

