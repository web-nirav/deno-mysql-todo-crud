import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { green, yellow } from "https://deno.land/std@0.53.0/fmt/colors.ts";
// todo routes
import todoRouter from "./routes/todo.ts";
// not found
import notFound from "./middlewares/notFound.ts";
// logger
import logger from "./middlewares/logger.ts";

const app = new Application();
const port: number = 8080;

/* const router = new Router();
router.get("/", ({ response }: { response: any }) => {
  response.body = {
    message: "Hello World!",
  };
}); */

// order of execution is importan
app.use(logger.logger);
app.use(logger.responseTime);

app.use(todoRouter.routes());
app.use(todoRouter.allowedMethods());

// 404 page
app.use(notFound);

app.use((ctx) => {
  console.log("first request");
});

// console.log("running on port ", port);
app.addEventListener("listen", ({ secure, hostname, port }) => {
  const protocol = secure ? "https://" : "http://";
  const url = `${protocol}${hostname ?? "localhost"}:${port}`;
  //   console.log(`Listening on : ${port}`);
  console.log(`${yellow("Listening on:")} ${green(url)}`);
});
await app.listen({ port });
