import 'dotenv/config';  // Cargar las variables de entorno desde el archivo .env
import pg from 'pg';      // Importar el módulo pg para manejar la conexión a PostgreSQL

const { Pool } = pg;      // Desestructurar la clase Pool del paquete pg

// Crear una instancia de Pool utilizando las variables de entorno
export const db = new Pool({
    user: process.env.USER,          // Usuario de la base de datos
    password: process.env.PASSWORD,  // Contraseña del usuario
    database: process.env.DATABASE,  // Nombre de la base de datos
    host: process.env.HOST,          // Dirección del servidor de la base de datos
    port: process.env.PORT,          // Puerto en el que PostgreSQL escucha (por defecto es 5432)
    allowExitOnIdle: true            // Permitir que las conexiones inactivas se cierren automáticamente
});

// Función para probar la conexión a la base de datos
async function testConnection() {
    try {
        // Ejecutar una consulta simple para verificar la conexión
        await db.query('SELECT NOW()');
        console.log('DATABASE connected');
    } catch (error) {
        // Imprimir cualquier error que ocurra durante la conexión
        console.error('Error connecting to the database:', error);
    }
}

// Llamar a la función para probar la conexión
testConnection();
