import { Request, Response, NextFunction } from "express";
import UAParser from "ua-parser-js";

const captureDeviceInfo = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const parser = new UAParser(req.headers["user-agent"]);
  const result = parser.getResult();

  let deviceType = result.device.type;
  if (!deviceType) {
    if (
      result.os.name &&
      ["Windows", "Mac OS", "Linux"].includes(result.os.name)
    ) {
      deviceType = "desktop";
    } else {
      deviceType = "unknown";
    }
  }


  req.deviceInfo = {
    deviceType,
    deviceModel: result.device.model || "unknown",
    osName: result.os.name || "unknown",
    osVersion: result.os.version || "unknown",
    browserName: result.browser.name || "unknown",
    browserVersion: result.browser.version || "unknown",
    ip: req.ip,
  };

  console.log(req.deviceInfo); // Para depuración

  next();
};

export default captureDeviceInfo;
