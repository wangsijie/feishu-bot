/**
 * @jest-environment node
 */

const bot = require('./bot');
const process = require('process');
const cp = require('child_process');
const path = require('path');

test('throws invalid version', async () => {
  await expect(bot(3)).rejects.toThrow('invalid version, only support v1 and v2');
});

test('throws invalid uuid(v1)', async () => {
  await expect(bot(1, 'foo')).rejects.toThrow('uuid length should be 32 in v1');
});

test('throws invalid uuid(v2)', async () => {
  await expect(bot(2, 'foo')).rejects.toThrow('uuid length should be 36 in v2');
});

test('no text and no data', async () => {
  await expect(bot(2, 'f305ea10-6bfe-4a09-a560-a263d41cde6d')).rejects.toThrow('invalid data');
});

test('data not json', async () => {
  await expect(bot(2, 'f305ea10-6bfe-4a09-a560-a263d41cde6d', undefined, 'foo')).rejects.toThrow('data should be json');
});

// test('send simple text v1', async () => {
//   const res = await bot(1, '9b88071886854e669d3771dab2018ccc', 'test');
//   expect(res.data.ok).toBeTruthy();
// });

test('send simple text v2', async () => {
  const res = await bot(2, 'f305ea10-6bfe-4a09-a560-a263d41cde6d', 'test');
  expect(res.data.StatusCode).toBe(0);
});

test('send data v2', async () => {
  const res = await bot(2, 'f305ea10-6bfe-4a09-a560-a263d41cde6d', undefined, '{"msg_type":"text","content":{"text":"test data"}}');
  expect(res.data.StatusCode).toBe(0);
});

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
  process.env['INPUT_VERSION'] = 2;
  process.env['INPUT_UUID'] = 'f305ea10-6bfe-4a09-a560-a263d41cde6d';
  process.env['INPUT_DATA'] = '{"msg_type":"text","content":{"text":"test data from test runs"}}';
  const ip = path.join(__dirname, 'index.js');
  console.log(cp.execSync(`node ${ip}`, {env: process.env}).toString());
})
