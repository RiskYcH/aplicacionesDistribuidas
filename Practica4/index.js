const express = require('express');
const app = express();

app.use(express.json());

// Middleware general de manejo de errores
function respuestaError(res, mensaje) {
    return res.status(400).json({
        estado: "error",
        mensaje: mensaje
    });
}

//heartbit
app.get("/", async function (request, response) {

    r ={
      'message':'Nothing to send'
    };

    response.json(r);
});

//ejercicio 1 servicio saludo basico
app.post('/saludo', (req, res) => {
    try {
        const { nombre } = req.body;

        if (!nombre || typeof nombre !== 'string') {
            return respuestaError(res, "Nombre inválido");
        }

        res.json({
            estado: "ok",
            mensaje: `Hola, ${nombre}`
        });

    } catch (error) {
        respuestaError(res, "Error interno");
    }
});

//ejercicio 2 servicio de calculadora
app.post('/calcular', (req, res) => {
    try {
        const { a, b, operacion } = req.body;

        if (typeof a !== 'number' || typeof b !== 'number') {
            return respuestaError(res, "Valores numéricos inválidos");
        }

        let resultado;

        switch (operacion) {
            case "suma":
                resultado = a + b;
                break;
            case "resta":
                resultado = a - b;
                break;
            case "multiplicacion":
                resultado = a * b;
                break;
            case "division":
                if (b === 0) {
                    return respuestaError(res, "División por cero");
                }
                resultado = a / b;
                break;
            default:
                return respuestaError(res, "Operación no válida");
        }

        res.json({
            estado: "ok",
            resultado: resultado
        });

    } catch (error) {
        respuestaError(res, "Error interno");
    }
});



let tareas = [];

app.post('/tareas', (req, res) => {
    try {
        const { id, titulo, completada } = req.body;

        if (typeof id !== 'number' || !titulo || typeof completada !== 'boolean') {
            return respuestaError(res, "Datos inválidos");
        }

        tareas.push({ id, titulo, completada });

        res.json({
            estado: "ok",
            mensaje: "Tarea creada"
        });

    } catch (error) {
        respuestaError(res, "Error interno");
    }
});

app.get('/tareas', (req, res) => {
    res.json({
        estado: "ok",
        tareas: tareas
    });
});

app.put('/tareas/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const tarea = tareas.find(t => t.id === id);

        if (!tarea) {
            return respuestaError(res, "Tarea no encontrada");
        }

        tarea.titulo = req.body.titulo ?? tarea.titulo;
        tarea.completada = req.body.completada ?? tarea.completada;

        res.json({
            estado: "ok",
            mensaje: "Tarea actualizada"
        });

    } catch (error) {
        respuestaError(res, "Error interno");
    }
});

app.delete('/tareas/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        tareas = tareas.filter(t => t.id !== id);

        res.json({
            estado: "ok",
            mensaje: "Tarea eliminada"
        });

    } catch (error) {
        respuestaError(res, "Error interno");
    }
});



//ejercicio 4 validador de contraseñas
app.post('/validar-password', (req, res) => {
    try {
        const { password } = req.body;
        let errores = [];

        if (!password || typeof password !== 'string') {
            return respuestaError(res, "Password inválido");
        }

        if (password.length < 8) errores.push("Mínimo 8 caracteres");
        if (!/[A-Z]/.test(password)) errores.push("Debe tener una mayúscula");
        if (!/[a-z]/.test(password)) errores.push("Debe tener una minúscula");
        if (!/[0-9]/.test(password)) errores.push("Debe tener un número");

        res.json({
            estado: "ok",
            esValida: errores.length === 0,
            errores: errores
        });

    } catch (error) {
        respuestaError(res, "Error interno");
    }
});


//ejercicio 5 convertir temperatura
app.post('/convertir-temperatura', (req, res) => {
    try {
        const { valor, desde, hacia } = req.body;

        if (typeof valor !== 'number') {
            return respuestaError(res, "Valor inválido");
        }

        const convertirACelsius = {
            C: v => v,
            F: v => (v - 32) * 5 / 9,
            K: v => v - 273.15
        };

        const convertirDesdeCelsius = {
            C: v => v,
            F: v => (v * 9 / 5) + 32,
            K: v => v + 273.15
        };

        if (!convertirACelsius[desde] || !convertirDesdeCelsius[hacia]) {
            return respuestaError(res, "Escala inválida");
        }

        const celsius = convertirACelsius[desde](valor);
        const resultado = convertirDesdeCelsius[hacia](celsius);

        res.json({
            estado: "ok",
            valorOriginal: valor,
            valorConvertido: resultado,
            escalaOriginal: desde,
            escalaConvertida: hacia
        });

    } catch (error) {
        respuestaError(res, "Error interno");
    }
});


//ejercicio 6 buscador de array
app.post('/buscar', (req, res) => {
    try {
        const { array, elemento } = req.body;

        if (!Array.isArray(array)) {
            return respuestaError(res, "Array inválido");
        }

        const indice = array.indexOf(elemento);

        res.json({
            estado: "ok",
            encontrado: indice !== -1,
            indice: indice,
            tipoElemento: typeof elemento
        });

    } catch (error) {
        respuestaError(res, "Error interno");
    }
});


//ejercicio 7 contador de palabras
app.post('/contar-palabras', (req, res) => {
    try {
        const { texto } = req.body;

        if (!texto || typeof texto !== 'string') {
            return respuestaError(res, "Texto inválido");
        }

        const palabras = texto.trim().split(/\s+/);
        const palabrasUnicas = new Set(palabras);

        res.json({
            estado: "ok",
            totalPalabras: palabras.length,
            totalCaracteres: texto.length,
            palabrasUnicas: palabrasUnicas.size
        });

    } catch (error) {
        respuestaError(res, "Error interno");
    }
});


app.listen(3000, function() {
    console.log('Aplicación ejemplo, escuchando el puerto 3000!');
});