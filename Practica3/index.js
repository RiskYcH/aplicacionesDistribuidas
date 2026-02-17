const express = require('express');
const crypto = require('crypto');

const app = express();
app.use(express.json());

/* Función auxiliar para validar cadenas */
function validarCadena(valor) {
    return typeof valor === 'string';
}

/* i. mascaracteres */
app.post('/mascaracteres', (req, res) => {
    const { cadena1, cadena2 } = req.body;

    if (!validarCadena(cadena1) || !validarCadena(cadena2)) {
        return res.json({ success: false, error: "Ambos parámetros deben ser cadenas" });
    }

    const resultado = cadena1.length >= cadena2.length ? cadena1 : cadena2;

    res.json({ success: true, resultado });
});


app.post('/menoscaracteres', (req, res) => {
    const { cadena1, cadena2 } = req.body;

    if (!validarCadena(cadena1) || !validarCadena(cadena2)) {
        return res.json({ success: false, error: "Ambos parámetros deben ser cadenas" });
    }

    const resultado = cadena1.length <= cadena2.length ? cadena1 : cadena2;

    res.json({ success: true, resultado });
});


app.post('/numcaracteres', (req, res) => {
    const { cadena } = req.body;

    if (!validarCadena(cadena)) {
        return res.json({ success: false, error: "El parámetro debe ser una cadena" });
    }

    res.json({ success: true, resultado: cadena.length });
});

/* iv. palindroma */
app.post('/palindroma', (req, res) => {
    const { cadena } = req.body;

    if (!validarCadena(cadena)) {
        return res.json({ success: false, error: "El parámetro debe ser una cadena" });
    }

    const limpia = cadena.replace(/\s+/g, '').toLowerCase();
    const invertida = limpia.split('').reverse().join('');

    res.json({ success: true, resultado: limpia === invertida });
});

/* v. concat */
app.post('/concat', (req, res) => {
    const { cadena1, cadena2 } = req.body;

    if (!validarCadena(cadena1) || !validarCadena(cadena2)) {
        return res.json({ success: false, error: "Ambos parámetros deben ser cadenas" });
    }

    res.json({ success: true, resultado: cadena1 + cadena2 });
});

/* vi. applysha256 */
app.post('/applysha256', (req, res) => {
    const { cadena } = req.body;

    if (!validarCadena(cadena)) {
        return res.json({ success: false, error: "El parámetro debe ser una cadena" });
    }

    const hash = crypto.createHash('sha256').update(cadena).digest('hex');

    res.json({
        success: true,
        original: cadena,
        encriptada: hash
    });
});

/* vii. verifysha256 */
app.post('/verifysha256', (req, res) => {
    const { cadenaNormal, cadenaEncriptada } = req.body;

    if (!validarCadena(cadenaNormal) || !validarCadena(cadenaEncriptada)) {
        return res.json({ success: false, error: "Ambos parámetros deben ser cadenas" });
    }

    const hash = crypto.createHash('sha256').update(cadenaNormal).digest('hex');

    res.json({
        success: true,
        resultado: hash === cadenaEncriptada
    });
});

app.listen(3000, () => {
    console.log("Servidor ejecutándose en http://localhost:3000");
});
