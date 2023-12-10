import nodemailer from 'nodemailer'

export const EmailRegister = async (datos) => {
    const { email, name, token } = datos

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    // Información del Email
    const into = await transport.sendMail({
        from: '"UpTask - Administrador de Proyectos" <cuentas@uptask.com> ',
        to:email,
        subject: "UpTask - Comprueba tu cuenta",
        text: "Comprueba tu cuenta en UpTask",
        html: `<p>Hola: ${name} Comprueba tu cuenta en UpTask</p>
            <p>Tu cuenta esta casi lista, solo tienes que comprobarla en el siguiente enlace: 
                <a href="${process.env.FRONTEND_URL}/confirmar/${token}" >Comprueba tu cuenta.</a>
            </p>
            <p>Si tu no creaste esta cuenta, puedes ignorar este email</p>
        `
    })
}

export const EmailOlvidePassword = async (datos) => {
    const { email, name, token } = datos

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    // Información del Email
    const into = await transport.sendMail({
        from: '"UpTask - Administrador de Proyectos" <cuentas@uptask.com> ',
        to:email,
        subject: "UpTask - Reestablece tu Password",
        text: "Reestablece tu Password",
        html: `<p>Hola: ${name}, has solicitado reestablecer tu Password</p>
            <p>Para poder reestablecer tu Password, solo tienes que clickear en el siguiente enlace: 
                <a href="${process.env.FRONTEND_URL}/olvide-password/${token}" >Reestablecer tu Password.</a>
            </p>
            <p>Si tu no Solicitaste este email, puedes ignorar este Mensaje</p>
        `
    })
}