import Users from "../models/Users.js";
import generarId from "../helpers/generarId.js";
import GenerarJWT from "../helpers/generarJWT.js";
import { EmailRegister, EmailOlvidePassword } from '../helpers/email.js'

const registrar = async (req, res) => {
    // Evitar registros duplicados
    const { email } = req.body
    const ifExist = await Users.findOne({ email: email })

    if (ifExist) {
        const error = new Error('Usuario Ya ha sido registrado')
        return res.status(400).json({ msg: error.message })
    }
    try {
        const newUser = new Users(req.body);
        newUser.token = generarId();
        const addUser = await newUser.save();

        //Enviar el Email de Confirmación
        EmailRegister({
            email:addUser.email,
            name:addUser.name,
            token:addUser.token
        })

        res.json({ msg: 'Revisa tu email para confirmar tu cuenta' })
    } catch (error) {
        console.log(error)
    }

};

const autenticar = async (req, res) => {
    const { email, password } = req.body;
    // Comprobar Usuario exist
    const user = await Users.findOne({ email })
    if (!user) {
        const error = new Error('Usuario no existe');
        return res.status(404).json({ msg: error.message });
    }
    // Comprobar si esta confirmado
    if (!user.result) {
        const error = new Error('Tu cuenta no ha sido Confirmada');
        return res.status(403).json({ msg: error.message });
    }
    // Comprobar password
    if (await user.comprobarPassword(password)) {
        res.json({
            _id: user._id,
            nombre: user.nombre,
            email: user.email,
            token: GenerarJWT(user._id)
        });
    } else {
        const error = new Error('El password es incorrecto');
        return res.status(403).json({ msg: error.message });
    }
};

const confirmar = async (req, res) => {
    const { token } = req.params
    const userConfirm = await Users.findOne({ token })
    if (!userConfirm) {
        const error = new Error('Token No Valido');
        return res.status(403).json({ msg: error.message });
    }
    try {
        userConfirm.result = true
        userConfirm.token = ''
        await userConfirm.save()
        res.json({ msg: 'Usuario Confirmado Correctamente' })
    } catch (error) {
        console.log(error);
    }
}

const olvidePassword = async (req, res) => {
    const { email } = req.body
    const user = await Users.findOne({ email })
    if (!user) {
        const error = new Error('Usuario no existe');
        return res.status(404).json({ msg: error.message });
    }
    try {
        user.token = generarId()
        await user.save()
        //Enviar al email
        EmailOlvidePassword({
            email:user.email,
            name:user.name,
            token:user.token
        })
        res.json({ msg: "Hemos enviado un email con las Instrucciones" })
    } catch (error) {
        console.log(error)
    }
}

const comprobarToken = async (req, res) => {
    const { token } = req.params
    const tokenValido = await Users.findOne({ token })

    if (tokenValido) {
        res.json({ msg: 'Token valido y el Usuario Exite' })
    } else {
        const error = new Error('Token No Válio');
        return res.status(403).json({ msg: error.message });
    }
}

const nuevoPassword = async (req, res) => {
    const { token } = req.params
    const { password } = req.body

    const user = await Users.findOne({ token })

    if (user) {
        user.password = password
        user.token = ''
        try {
            await user.save()
            res.json({ msg: 'Password Modificado Correctamente' })
        } catch (error) {
            console.log(error)
        }
    } else {
        const error = new Error('Token No Válio');
        return res.status(403).json({ msg: error.message });
    }
}

const perfil = async (req, res) => {
    const { user } = req
    res.json(user)
}

export { registrar, autenticar, confirmar, olvidePassword, comprobarToken, nuevoPassword, perfil };