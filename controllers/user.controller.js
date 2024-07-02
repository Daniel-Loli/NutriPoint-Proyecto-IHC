import bcryptjs from 'bcryptjs'
import jwt from "jsonwebtoken"
import { UserModel } from '../models/user.model.js'

// Controlador de usuario para gestionar registro, inicio de sesión y perfiles

// Registro de un nuevo usuario
const register = async (req, res) => {
    try {
        const { username, email, password } = req.body

        // Verificar si se proporcionaron todos los campos necesarios
        if (!username || !email || !password) {
            return res.status(400).json({ ok: false, msg: "Missing required fields: email, password, username" })
        }

        // Verificar si el correo electrónico ya está registrado
        const user = await UserModel.findOneByEmail(email)
        if (user) {
            return res.status(409).json({ ok: false, msg: "Email already exists" })
        }

        // Generar hash de la contraseña antes de almacenarla en la base de datos
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        // Crear un nuevo usuario con la contraseña hasheada
        const newUser = await UserModel.create({ email, password: hashedPassword, username })

        // Generar token JWT para autenticación
        const token = jwt.sign({ email: newUser.email, role_id: newUser.role_id },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        )

        // Retornar respuesta de éxito con el token y el rol del usuario
        return res.status(201).json({
            ok: true,
            msg: {
                token, role_id: newUser.role_id
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error server'
        })
    }
}

// Inicio de sesión de usuario existente
const login = async (req, res) => {
    try {
        const { email, password } = req.body

        // Verificar si se proporcionaron correo electrónico y contraseña
        if (!email || !password) {
            return res
                .status(400)
                .json({ error: "Missing required fields: email, password" });
        }

        // Buscar usuario por correo electrónico
        const user = await UserModel.findOneByEmail(email)
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Comparar la contraseña proporcionada con la contraseña almacenada (hasheada) en la base de datos
        const isMatch = await bcryptjs.compare(password, user.password)

        // Verificar si las contraseñas coinciden
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Generar token JWT para autenticación
        const token = jwt.sign({ email: user.email, role_id: user.role_id },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        )

        // Retornar respuesta de éxito con el token y el rol del usuario
        return res.json({
            ok: true, msg: {
                token, role_id: user.role_id
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error server'
        })
    }
}

// Obtener el perfil del usuario autenticado
const profile = async (req, res) => {
    try {
        // Obtener información del usuario basado en el correo electrónico proporcionado en el token de autorización
        const user = await UserModel.findOneByEmail(req.email)
        return res.json({ ok: true, msg: user })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error server'
        })
    }
}

// Obtener todos los usuarios registrados
const findAll = async (req, res) => {
    try {
        // Obtener todos los usuarios desde la base de datos
        const users = await UserModel.findAll()

        // Retornar lista de usuarios
        return res.json({ ok: true, msg: users })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error server'
        })
    }
}

// Actualizar el rol de un usuario a "Veterinario"
const updateRoleVet = async (req, res) => {
    try {
        const { uid } = req.params

        // Buscar usuario por UID
        const user = await UserModel.findOneByUid(uid)
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Actualizar el rol del usuario a "Veterinario" en la base de datos
        const updatedUser = await UserModel.updateRoleVet(uid)

        // Retornar respuesta de éxito con el usuario actualizado
        return res.json({
            ok: true,
            msg: updatedUser
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error server'
        })
    }
}

// Exportar controlador con todas las funciones definidas
export const UserController = {
    register,
    login,
    profile,
    findAll,
    updateRoleVet
}
