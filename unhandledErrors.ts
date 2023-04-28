process.on("uncaughtException", (err: Error) => {
  console.error("Unhandled Exception:", err);
});

process.on("unhandledRejection", (reason: any) => {
  console.error("Unhandled Promise rejection:", reason);
});
