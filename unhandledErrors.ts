process.on("uncaughtException", (err: Error) => {
  console.error("Unhandled Exception:", err);
});

process.on("unhandledRejection", (reason: any, promise: Promise<any>) => {
  console.error("Unhandled Rejection:", reason);
});
