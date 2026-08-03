import "dotenv/config";
import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";
import { expressMiddleware } from "@as-integrations/express5";
import createGraphqlServer from "./graphql/index.ts";
import type { JWTUserData } from "./graphql/user/types.ts";

async function init() {
    const app = express();

    app.use(express.json());
    app.use(cors());

    app.use(
        "/graphql",
        expressMiddleware(await createGraphqlServer(), {
            context: async ({ req }) => {
                const token = req.headers["authorization"];
                if (!token || Array.isArray(token)) {
                    return { validAuth: false, id: "", name: "", email: "" };
                }

                const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as JWTUserData;
                return { ...user, validAuth: true };
            },
        }),
    );

    app.listen(8000, () => console.log("Server running at 8000...."));
}

init();
