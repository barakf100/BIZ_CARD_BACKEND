import { RequestHandler } from "express";

const notFound: RequestHandler = (req, res, next) => {
    res.status(404).sendFile("404.html", { root: "public" });
};

export default notFound;
