# 飞书群机器人

## Usage

简单推送文本消息

```yaml
uses: wangsijie/feishu-bot@v1
with:
  uuid: f305ea10-6bfe-4a09-a560-a263d41cde6d
  text: hello github actions
```

推送复杂json

```yaml
uses: wangsijie/feishu-bot@v1
with:
  uuid: f305ea10-6bfe-4a09-a560-a263d41cde6d
  data: |
    {"msg_type":"text","content":{"text":"test data from test runs"}}
```

v1版本的机器人：

```yaml
uses: wangsijie/feishu-bot@v1
with:
  version: 1
  uuid: 9b88071886854e669d3771dab2018ccc
  text: hello github actions
```
