import { cloneRepo, getFilesMap } from "./utils/git";
import { config } from "dotenv";
import { uniq } from "./utils/uniq";
const fse = require("fs-extra");

// dotenv
config();

const { GO_REPO } = process.env;
const GO_REPO_LOCAL_PATH = GO_REPO.split("/")
  .pop()
  .split(".")
  .shift();

async function cloneGoRepo() {
  try {
    const repo = await cloneRepo(GO_REPO, GO_REPO_LOCAL_PATH);

    await fse.remove("responses.d.ts");

    const transformers = await getFilesMap(repo, "app/transformers");

    const regex = /u\[\"(.*)\"\]\s\=/g;

    for (const [name, file] of Object.entries(transformers)) {
      if (file) {
        let matches = file.match(regex);
        if (matches) {
          const attributes = uniq(matches.map(match => match.split('"')[1]));

          const attributesString = attributes
            .map(a => `  ${a} : any`)
            .join("\n");

          fse.outputFile(
            "responses.d.ts",
            `\nexport type ${name}Response = {\n${attributesString}\n};\n`,
            { flag: "a" }
          );
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
}

cloneGoRepo();
