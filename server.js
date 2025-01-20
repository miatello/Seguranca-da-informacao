const express = require("express");
const CryptoJS = require("crypto-js");
const path = require("path");

const app = express();
const PORT = 3000;

// Configuração para servir arquivos estáticos
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// Endpoint para criptografar o texto
app.post("/encrypt", (req, res) => {
    const { text, key } = req.body;
    if (!text || !key) {
        return res.status(400).json({ error: "Texto e chave são obrigatórios!" });
    }
    const encryptedText = CryptoJS.AES.encrypt(text, key).toString();
    res.json({ encryptedText });
});

// Endpoint para descriptografar o texto
app.post("/decrypt", (req, res) => {
    const { encryptedText, key } = req.body;
    if (!encryptedText || !key) {
        return res.status(400).json({ error: "Texto criptografado e chave são obrigatórios!" });
    }
    try {
        const bytes = CryptoJS.AES.decrypt(encryptedText, key);
        const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
        res.json({ decryptedText });
    } catch (err) {
        res.status(400).json({ error: "Falha na descriptografia. Verifique a chave e o texto criptografado." });
    }
});

// Inicializando o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
