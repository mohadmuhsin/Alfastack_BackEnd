const { Router } = require('express');
const router = Router();
const Customer = require('../models/EnquiryModel');
const nodemailer = require('nodemailer');
router.post('/cutomer', async (req, res) => {
    const { name, email, company, message } = req.body;

    if (!name || !email || !company || !message) {
        return res.status(401).json({ error: 'Please fill all the fields' });
    }

    const transporter = nodemailer.createTransport({
        service: process.env.SERVICE,
        auth: {
            user: process.env.EMAIL_SENDER,
            pass: process.env.SMTP_PASS
        }
    });


    try {
        await transporter.sendMail({
            from: email,
            to: `${process.env.EMAIL_SENDER}`,
            subject: `${name} has sent an enquiry}`,

            html: `<pName : ${name} \n Email : ${email}\n Company Name : ${company}\n Message : ${message}</p>`,
            replyTo: email
        }
        ).catch(error => {
            res.status(500).json("Something went wrong" + error)
        })
        await Customer.create({
            name,
            email,
            company,
            message
        }).then(customer => {

            const { _id, name } = customer
            res.status(200).json({
                message: "We will be with you shortly. Please wait for a while...",
                customer: {
                    _id,
                    name,
                }

            })
        }).catch(err => res.status(500).json("Something went wrong" + err))

    } catch (error) {

    }

})

module.exports = router;