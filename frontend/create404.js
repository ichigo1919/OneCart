import fs from "fs";

const html = `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=/" /></head></html>`;
fs.writeFileSync("./dist/404.html", html);
console.log("✅ 404.html created successfully");
