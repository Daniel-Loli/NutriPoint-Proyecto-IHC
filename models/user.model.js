import { db } from '../database/connection.database.js'

// Crea un nuevo usuario en la base de datos
const create = async ({ email, password, username }) => {
    const query = {
        text: `
        INSERT INTO users (email, password, username)
        VALUES ($1, $2, $3)
        RETURNING email, username, uid, role_id
        `,
        values: [email, password, username]
    }

    const { rows } = await db.query(query)
    return rows[0]
}

// Encuentra un usuario por su dirección de correo electrónico
const findOneByEmail = async (email) => {
    const query = {
        text: `
        SELECT * FROM users
        WHERE email = $1
        `,
        values: [email]
    }

    const { rows } = await db.query(query)
    return rows[0]
}

// Obtiene todos los usuarios de la base de datos
const findAll = async () => {
    const query = {
        text: `
        SELECT * FROM users
        `
    }

    const { rows } = await db.query(query)
    return rows
}

// Encuentra un usuario por su UID único
const findOneByUid = async (uid) => {
    const query = {
        text: `
        SELECT * FROM users
        WHERE uid = $1
        `,
        values: [uid]
    }

    const { rows } = await db.query(query)
    return rows[0]
}

// Actualiza el rol de un usuario a "Veterinario" basado en su UID
const updateRoleVet = async (uid) => {
    const query = {
        text: `
        UPDATE users
        SET role_id = 2
        WHERE uid = $1
        RETURNING *
        `,
        values: [uid]
    }

    const { rows } = await db.query(query)
    return rows[0]
}

export const UserModel = {
    create,
    findOneByEmail,
    findAll,
    findOneByUid,
    updateRoleVet
}
