"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("@fastify/cors"));
const fastify_1 = __importDefault(require("fastify"));
// import formBody from "@fastify/formbody";
const fs_1 = __importDefault(require("fs"));
const server = (0, fastify_1.default)();
server.register(cors_1.default);
// server.register(formBody);
// server.addContentTypeParser(
//   "text/plain",
//   { parseAs: "string" },
//   (req, body: any, done) => done(body)
// );
server.get("/prisma", (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    const text = yield fs_1.default.readFileSync("./files/example-schema.prisma", "utf8");
    return { text };
}));
server.put("/prisma", {
    schema: {
        body: {
            type: "object",
            properties: {
                text: {
                    type: "string",
                },
            },
        },
    },
}, (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    yield fs_1.default.writeFileSync("./files/example-schema.prisma", request.body.text);
    return { message: "ok" };
}));
server.put("/schema", {
    schema: {
        body: {
            type: "object",
            properties: {
                name: {
                    type: "string",
                },
                text: {
                    type: "string",
                },
            },
        },
    },
}, (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    yield fs_1.default.writeFileSync(`./files/schemas/${request.body.name}.json`, JSON.stringify(JSON.parse(request.body.text), null, 2));
    return { message: "ok" };
}));
server.put("/schemas", (request, reply) => __awaiter(void 0, void 0, void 0, function* () {
    for (let i = 0; i < request.body.length; i++) {
        yield fs_1.default.writeFileSync(`./files/schemas/${request.body[i].$id.replace(/Schema$/g, "")}.json`, JSON.stringify(request.body[i], null, 2));
    }
    return { message: "ok" };
}));
server.listen({ port: 8080 }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
