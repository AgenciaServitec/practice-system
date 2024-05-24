import express from "express";
import cors from "cors";
import { errorHandler, hostingToApi } from "./_middlewares";
import { body } from "express-validator";
import { patchUser, postUser, putUser } from "./users";
import { getEntityDataByDni, getEntityDataByRuc } from "./consults";

const app: express.Application = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(hostingToApi);

app.get("/", (req, res) => res.status(200).send("Welcome!").end());

app.post("/user", [body("email").exists(), body("phone").exists()], postUser);
app.put(
  "/users/:userId",
  [body("id").exists(), body("email").exists(), body("phone").exists()],
  putUser
);
app.patch("/users/:userId", [body("updateBy").exists()], patchUser);

app.get("/consults/dni/:dni", getEntityDataByDni);
app.get("/consults/ruc/:ruc", getEntityDataByRuc);

app.use(errorHandler);

export { app };
