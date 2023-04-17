const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
    it("Obteniendo status code 200", async () => {
        const response = await request(server).get("/cafes").send();
        const status = response.statusCode;
        expect(status).toBe(200);
    });
    it("Obteniendo un arreglo con al menos un objeto", async () => {
        const { body } = await request(server).get("/cafes").send();
        const arreglo = body;
        expect(arreglo).toBeInstanceOf(Array);
        expect(arreglo.length).toBeGreaterThan(0);
    });
    it("obtener código 404 al intentar eliminar un café con un id que no existe", async () => {
        const id_a_eliminar = -1;
        const jwt = 'token';
        const response = await request(server)
                                    .delete(`/cafes/${id_a_eliminar}`)
                                    .set('Authorization', jwt)
                                    .send();
        const status = response.statusCode;
        expect(status).toBe(404);
    });
    it("ruta POST/cafes agrega un nuevo café y devuelve un código 201", async () => {
        const id = -1;
        const nombre = "Cafe nuevo!"
        const cafe = {id, nombre}
        const { body: cafes, statusCode: status} = await request(server)
                                    .post("/cafes")
                                    .send(cafe)
        expect(cafes).toContainEqual(cafe);
        expect(status).toBe(201);
    });

    it("ruta PUT/cafes devuelve status code 400 si intentas actualizar un café enviando un id en los parámetros que sea diferente al id dentro del payload.", async () => {
        const id = 1;
        const nombre = "Cafe nuevo!"
        const cafe = {id : -1, nombre}
        const response = await request(server)
                                    .put(`/cafes/${id}`)
                                    .send(cafe)
        const status = response.statusCode;
        expect(status).toBe(400);
    })

});
