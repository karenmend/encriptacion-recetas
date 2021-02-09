const { request } = require("https");

const fs = require("fs");
const server = require("fastify")({
    htts : {
        key: fs.readFileSync(__dirname + "/tls/llave-privada.key"),
        cert: fs.readFileSync(__dirname + "/share/tls/certificado-publico.cert")
    }
});


const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || 4000;

console.log(`Proceso pid =${process.pid}`);

server.get('/recetas/:id', async (request, response) => {
    console.log(`Proceso de atencion de dolicitud pid=${process.pid}`);
    const id = Number(request.params.id);
    if (id !== 42) {
        response.statusCode = 404;
        return { error : "No se encontró receta" };
    }
    return {
        pid : process.pid,
        receta : {
            id,
            nombre: "Tacos de pollo",
            pasos: "Agarras la tortlla y le pones pollo",
            ingradientes: [
                {id: 1, nombre: "Tortilla", cantidad: "2 unidades"},
                {id: 2, nombre: "Pollo", cantidad: "80 grs"}
            ]
        }
    };
});

server.listen(PORT, HOST, () =>{
    console.log(`Servidor ejecutandose en https://${HOST}:${PORT}`);
});