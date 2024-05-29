
require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require ('cors');
const bodyParser= require ('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());
 
app.get('/' , (req, res) => {
    res.json('Hello Word!');
});


app.post('/send-email-contato', async (req,res) => {
    const {nome, email, mensagem} = req.body;
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth:{
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    const mailOptions  = {
        from:"asdrubal@outlook.com",
        to: email,
        subject: 'Submissão via tela de contato',
        text: `Nome: ${nome}\nEmail: ${email}\nMensagem: ${mensagem}`,
        html:`<b>Nome<b>: ${nome}<br> <b>Email:<b> ${email}<br> <b>Mensagem<b>: ${mensagem}`
    };
    
    try{
        await transporter.sendMail(mailOptions,(error,info) => {
            if (error) {return console.error(error);}
        });
        res.json({sucess:true});
    } catch (error) {
        res.status(500).json({ sucess: false , error: error.mensage});
    }
    
});

const randomize1 = require('randomatic');

app.post('/send-email-confirmacao', async (req, res) => {
    const { email } = req.body;
    
    // Gerar um número aleatório de 6 dígitos
    const confirmationCode = randomize1('0', 6); // Use o novo identificador
    
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth:{
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });
    
    const mailOptions = {
        from: "asdrubal@outlook.com",
        to: email,
        subject: 'Confirmação de Cadastro',
        text: `Seu código de confirmação é: ${confirmationCode}`,
        html: `Seu código de confirmação é: <strong>${confirmationCode}</strong>`
    };
    
    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});


app.post('/send-email-boas-vindas', async (req, res) => {
    const { email } = req.body;

    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth:{
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: "asdrubal@outlook.com",
        to: email,
        subject: 'Bem-vindo ao Nosso Sistema',
        text: 'Olá! Bem-vindo(a)',
        html: '<p>Olá!</p><p>Bem-vindo(a)</p>'
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});


const randomize = require('randomatic');

app.post('/send-email-recuperar-a-senha', async (req, res) => {
    const { email } = req.body;

    // Gerar uma senha aleatória de 8 caracteres
    const senhaNova = randomize('*', 8);

    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth:{
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: "asdrubal@outlook.com",
        to: email,
        subject: 'Recuperação de Senha',
        text: `Sua nova senha é: ${senhaNova}. Por favor, altere sua senha após o primeiro login.`,
        html: `<p>Sua nova senha é: <strong>${senhaNova}</strong>. Por favor, altere sua senha após o primeiro login.</p>`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});




const port =5000;
app.listen(5000, () => {
    console.log(`O servidor está rodando na porta http://localhost:${port}`);
});