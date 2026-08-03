import "dotenv/config";
import express from "express";
import cors from "cors";
import { expressMiddleware } from "@as-integrations/express5";
import createGraphqlServer from "./graphql/index.ts";

async function init() {
    const app = express();

    app.use(express.json());
    app.use(cors());

    app.use(
        "/graphql",
        expressMiddleware(await createGraphqlServer(), {
            // context: () => {
            //     return {};
            // },
        }),
    );

    app.listen(8000, () => console.log("Server running at 8000...."));
}

init();
