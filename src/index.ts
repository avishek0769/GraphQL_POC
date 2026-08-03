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
            context: async ({ req, res }) => {
                const token = req.headers["authorization"];
                if (!token || Array.isArray(token)) {
                    res.status(452).json({ message: "Access Token not available" });
                    throw new Error("Access Token not available");
                }

                const user = jwt.verify(token, process.env.ACCESS_TOKEN!) as JWTUserData;
                return user;
            },
        }),
    );

    app.listen(8000, () => console.log("Server running at 8000...."));
}

init();
