import moment from "moment";

function getColorForStatusCode(statusCode: any) {
  if (statusCode >= 200 && statusCode < 400) {
    return "\x1b[32m"; // Green
  } else if (statusCode >= 400 && statusCode < 500) {
    return "\x1b[33m"; // Yellow/Orange
  } else if (statusCode >= 500) {
    return "\x1b[31m"; // Red
  }
}

function logger(req: any, res: any, next: any) {
  const startTime = moment();
  const { method, originalUrl } = req;

  res.on("finish", () => {
    const endTime = moment();
    const elapsedTime = endTime.diff(startTime);
    const statusCode = res.statusCode;
    const color = getColorForStatusCode(statusCode);
    let logMessage = `${color}[${method}]: ${originalUrl} - ${statusCode} - ${elapsedTime}ms`;
    if (statusCode >= 400) {
      logMessage += ` - ${res.statusMessage || "Unknown Error"}`;
    }
    console.log(`${logMessage}\x1b[0m`);
  });

  next();
}

export { logger };
