import { Hono } from "hono";
import { getAllBattles } from "@/services/battle";
const app = new Hono()
    .basePath("/api") // /api 以下のリクエストを処理するため、basePath を設定
    .get("/battles", async (c) => {
        return c.json(await getAllBattles());
    })

export type App = typeof app; // hc に渡す型

export const GET = app.fetch; // GET リクエストを Hono に渡す