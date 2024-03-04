import {createTransport} from 'nodemailer'

const mailerConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.NEXT_PUBLIC_EMAIL,
        pass: process.env.NEXT_PUBLIC_PWD
    }
}

const transporter = createTransport(mailerConfig)


export const sendMail = async (to, subject, html) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.NEXT_PUBLIC_EMAIL,
            to,
            subject,
            html
        })
        console.log('Message sent: %s', info.messageId);
        return info
    } catch (e) {
        console.log(e)
        throw Error(e)
    }
}
