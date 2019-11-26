import expressLoader from "./express";
import LoggerInstance from "./logger";

export default async ({ expressApp }) => {
  await expressLoader({ app: expressApp });
  LoggerInstance.info("✌️ Express loaded");
};
