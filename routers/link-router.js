import { Router } from "express";
import LinkController from "../controllers/link-controller.js";

const LinkRouter = new Router();

LinkRouter.get("/:shortId", LinkController.getLink);
LinkRouter.post(
  "/",
  (req, res, next) => {
    console.table(req.body);
    next();
  },
  LinkController.createShortLink
);
export default LinkRouter;
