import cors from "@fastify/cors";
import fastify from "fastify";
// import formBody from "@fastify/formbody";
import fs from "fs";

const server = fastify();
server.register(cors);
// server.register(formBody);
// server.addContentTypeParser(
//   "text/plain",
//   { parseAs: "string" },
//   (req, body: any, done) => done(body)
// );

server.get("/prisma", async (request, reply) => {
  const text = await fs.readFileSync("./files/example-schema.prisma", "utf8");
  return { text };
});

server.put<{ Body: { text: string } }>(
  "/prisma",
  {
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
  },
  async (request, reply) => {
    await fs.writeFileSync("./files/example-schema.prisma", request.body.text);
    return { message: "ok" };
  }
);

server.put<{ Body: { name: string; text: string } }>(
  "/schema",
  {
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
  },
  async (request, reply) => {
    await fs.writeFileSync(
      `./files/schemas/${request.body.name}.json`,
      JSON.stringify(JSON.parse(request.body.text), null, 2)
    );
    return { message: "ok" };
  }
);

server.put<{ Body: any[] }>("/schemas", async (request, reply) => {
  for (let i = 0; i < request.body.length; i++) {
    await fs.writeFileSync(
      `./files/schemas/${request.body[i].$id.replace(/Schema$/g, "")}.json`,
      JSON.stringify(request.body[i], null, 2)
    );
  }
  return { message: "ok" };
});

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
