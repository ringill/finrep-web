import commander from "commander";
import { parse } from "./parser";

const program = new commander.Command();
program
  .version("1.0.0")
  .description(".pdf parser module");
program
  .command("parse <file>")
  .description('set path to .pdf need to parse')
  .action(file => {
    console.log("parsing...")
    parse(file);
  });
program.parse(process.argv);