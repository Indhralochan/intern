const nodemailer = require("nodemailer");
const sendMail = async (req, res) => {
    const {ma}=req.body
    try {

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: 'sreenidhifeedbackandenquiry@gmail.com',
                pass: 'habiewjhukxbmchm'
            }
        });

        const mailOptions = {
            from: 'sreenidhifeedbackandenquiry@gmail.com',
            to: ma,
            subject: "Blood group requires its urgent",
            html: '<h1>Congratulation</h1> <h1> You successfully sent Email </h2>'
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("Error" + error)
            } else {
                console.log("Email sent:" + info.response);
                res.status(201).json({status:201,info})
            }
        })

    } catch (error) {
        console.log("Error" + error);
        res.status(401).json({status:401,error})
    }
};

module.exports = sendMail;