import { Compiler } from "./AST/Compiler";
import { Parser } from "./AST/Parser";
import fs from "fs";
import { exec } from "child_process";

let updateQue: string[] = [];
let lock = false;

export async function compileAndFormat(source: string, top = true) {
  try {
    if (top && lock) {
      updateQue.push(source);
      return;
    }

    lock = true;
    const parser = new Parser();
    const compiler = new Compiler();

    const ast = parser.parse(source);
    const out = compiler.compile(ast);
    console.log(out);
    fs.writeFileSync("./temp/app.tsx", out, {
      encoding: "utf-8",
      flag: "w",
    });
    await new Promise<void>((resolve, reject) => {
      exec("npx prettier ./temp/app.tsx  > ./template-project/src/app/app.tsx", (error, stdout, stderr) => {
        if (error) {
          console.log(`error: ${error.message}`);
          reject(error);
          return;
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
          reject(stderr);
          return;
        }
        resolve();
      });
    });
  } catch (error) {
    console.log(error);
  }

  lock = false;
  if (updateQue.length > 0) {
    const lastItem = updateQue[updateQue.length - 1];
    updateQue = [];
    compileAndFormat(lastItem, false);
  }
}
