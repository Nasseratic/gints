import { Clone, Cred, Repository } from "nodegit";
const fse = require("fs-extra");

const authenticationCallbacks = {
  certificateCheck: function skipCertCheck() {
    return 0;
  },
  credentials: onCredentialCheck
};

export const cloneRepo = async (url: string, path: string) => {
  if (fse.pathExists(path)) {
    await fse.remove(path);
    console.log("REPO DELETED");
  }

  console.log("START CLONING");
  let prog = 1;
  try {
    return await Clone.clone(url, path, {
      fetchOpts: {
        callbacks: {
          ...authenticationCallbacks,
          transferProgress(p) {
            console.log(prog + "%");
            prog++;
          }
        }
      }
    });
  } catch (error) {
    throw error;
  }
};

export async function getFilesMap(repo: Repository, path: string) {
  const commit = await repo.getHeadCommit();
  const tree = await (await commit.getEntry(path)).getTree();
  const fileMap: { [key: string]: string } = {};
  for (const file of tree.entries().values()) {
    fileMap[
      file
        .name()
        .split(".")
        .shift()
    ] = (await file.getBlob()).toString();
  }
  return fileMap;
}

function onCredentialCheck() {
  return Cred.sshKeyFromAgent("git");
}
