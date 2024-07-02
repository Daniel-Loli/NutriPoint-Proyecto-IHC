import { db } from '../database/connection.database.js';
import bcryptjs from 'bcryptjs';

const create = async ({ email, password, nombre, edad, peso, altura, objetivos, biografia, sexo }) => {
    try {
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const query = {
            text: `
            INSERT INTO usuario (email, password, nombre, edad,sexo, peso, altura, objetivos, biografia)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            RETURNING email, nombre, id_usuario
            `,
            values: [email, hashedPassword, nombre, edad,sexo, peso, altura, objetivos, biografia]
        };

        const { rows } = await db.query(query);
        return rows[0];
    } catch (error) {
        console.error('Error in create function:', error);
        throw error; // Propagate the error for handling in the calling code
    }
};

const findOneByEmail = async (email) => {
    try {
        const query = {
            text: `
            SELECT * FROM usuario
            WHERE email = $1
            `,
            values: [email]
        };

        const { rows } = await db.query(query);
        return rows[0];
    } catch (error) {
        console.error('Error in findOneByEmail function:', error);
        throw error; // Propagate the error for handling in the calling code
    }
};

export const UserModel = {
    create,
    findOneByEmail
};
