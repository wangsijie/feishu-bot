const core = require('@actions/core');
const bot = require('./bot');


// most @actions toolkit packages have async methods
async function run() {
  try {
    const version = core.getInput('version');
    const uuid = core.getInput('uuid');
    const text = core.getInput('text');
    const data = core.getInput('data');
    const res = await bot(version, uuid, text, data);
    core.info(res.data);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
