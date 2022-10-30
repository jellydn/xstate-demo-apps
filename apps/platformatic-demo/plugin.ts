/// <reference path="./global.d.ts" />
import { FastifyInstance } from "fastify";
import S from "fluent-json-schema";
import Ajv from "ajv";

import { counterService } from "./machines/counterMachine";

export default async function (app: FastifyInstance) {
  app.log.info("plugin loaded");
  // setup validator
  const ajv = new Ajv({
    removeAdditional: "all",
    useDefaults: true,
    coerceTypes: "array",
  });
  app.setValidatorCompiler(({ schema }) => ajv.compile(schema));

  app.get("/counter", {}, async function (_request, _response) {
    return counterService.state;
  });

  const schema = {
    querystring: S.object().prop(
      "type",
      S.string().enum(["increase", "descrease"]).required(),
    ),
  };
  app.post<{
    Querystring: {
      type: string;
    };
  }>("/counter", {
    schema,
  }, async function (request, _reply) {
    if (request.query.type === "increase") {
      counterService.send("INC");
    } else {
      counterService.send("DEC");
    }

    return counterService.state;
  });
}
