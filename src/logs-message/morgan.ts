import chalk from "chalk";
import morgan from "morgan";

morgan.token("status", (req, res) => {
    const status = res.statusCode;
    if (status == 500) return chalk.red(status.toString());
    else if (status >= 400) return chalk.redBright(status.toString());
    else if (status >= 200) return chalk.green(status.toString());
    else return status.toString();
});
morgan.token("method", (req, res) => {
    const method = req.method;
    return chalk.underline.bgBlue(method);
});
export const morganFormat = ":date[web] - :method:url :status - :response-time ms";
