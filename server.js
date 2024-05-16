const express = require('express');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser'); // Importe o body-parser
const app = express();
const port = 8001;

// Configuração do Multer para lidar com o upload de arquivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Use o body-parser para interpretar o corpo da solicitação como um buffer de dados binários
app.use(bodyParser.raw({ type: 'application/octet-stream', limit: '10mb' }));

// Rota para a URL raiz
app.get('/', (req, res) => {
    res.send('Seu servidor está rodando!');
});

// Rota para receber o upload do PDF
app.post('/administrador', upload.single('arquivo_pdf'), (req, res) => {
    const nome_pdf = req.body.nome_pdf;
    const arquivo_pdf = req.file; // Agora o arquivo PDF está disponível como um objeto com informações sobre o arquivo

    if (!nome_pdf || !arquivo_pdf) {
        return res.status(400).json({ error: 'Título e arquivo PDF são obrigatórios' });
    }

    // Aqui você pode fazer o que quiser com o título e o arquivo PDF, como salvá-los em um banco de dados ou em disco
    console.log('Título do PDF:', nome_pdf);
    console.log('Nome do arquivo:', arquivo_pdf.originalname); // Nome original do arquivo
    console.log('Tamanho do arquivo:', arquivo_pdf.size); // Tamanho do arquivo em bytes

    // Por exemplo, você pode salvar o arquivo PDF em disco
    // fs.writeFileSync('caminho/para/salvar/arquivo.pdf', arquivo_pdf.buffer);

    res.status(200).json({ message: 'PDF recebido com sucesso' });
});


app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
