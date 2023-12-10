import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY;

const GenerarJWT = (id) =>  {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

export default GenerarJWT