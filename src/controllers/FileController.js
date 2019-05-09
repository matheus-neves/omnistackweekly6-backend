const Box = require('../models/Box');
const File = require('../models/File');

class FileController {
  async store(req, res) {
    // Criar um arquivo
    console.log(req.file)

    // Efetua um find na box pelo id
    const box = await Box.findById(req.params.id);

    // Cria um file, recuperando o originalName e a key definida no multerConfig
    const file = await File.create({
      title: req.file.originalname,
      path: req.file.key
    })

    // Adiciona o novo file ao array files da Box
    box.files.push(file);

    // Salva a box no banco
    await box.save();

    req.io.sockets.in(box._id).emit('file', file);

    return res.json(file);
  }
}

module.exports = new FileController();