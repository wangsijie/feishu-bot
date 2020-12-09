const axios = require('axios');

let bot = async function (version, uuid, text, data) {
  if (!version) {
    version = 2;
  } else {
    version = Number(version);
    if (version !== 2 && version !== 1) {
      throw new Error('invalid version, only support v1 and v2')
    }
  }
  if (!uuid) {
    throw new Error('invalid webhook uuid');
  }
  uuid = String(uuid);
  if (version === 1 && uuid.length !== 32) {
    throw new Error('uuid length should be 32 in v1')
  }
  if (version === 2 && uuid.length !== 36) {
    throw new Error('uuid length should be 36 in v2')
  }
  const url = version === 1 ? `https://open-hl.feishu.cn/open-apis/bot/hook/${uuid}` : `https://open.feishu.cn/open-apis/bot/v2/hook/${uuid}`;
  if (text) {
    if (version === 1) {
      return axios.post(url, { text });
    } else {
      return axios.post(url, { msg_type: 'text', content: { text } });
    }
  }
  if (!data) {
    throw new Error('invalid data');
  }
  try {
    data = JSON.parse(data);
  } catch (e) {
    throw new Error('data should be json');
  }
  return axios.post(url, data);
};

module.exports = bot;
