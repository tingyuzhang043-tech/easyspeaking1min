# EasySpeaking1Min

一分钟即兴演讲训练器 · 雅思口语 Part 2 抽题 + 60 秒倒计时 + 随机意外事件。

> 抽一张话题卡 → 60 秒开口不停 → 中途被「意外」打断 → 结束拿到回放与分享文案。

## 功能

**1. 话题抽取**
- 83 张雅思 Part 2 话题卡，全部是「一个人 / 一个物 / 一个地方 / 一件事」，可以直接展开描述，没有 `Some people think...` 这类议论文题。
- 8 个分类筛选：人物 / 地点 / 物品 / 事件 / 爱好 / 媒体 / 食物自然。
- 老虎机式滚动抽题动画，避免连续抽到同一题。
- 每张卡附带 4 条线索词（英文 + 中文），卡壳时抬头看一眼就能接下去。

**2. 倒计时界面**
- SVG 环形进度 + 大字秒数，最后 10 秒转红并加速跳动。
- 可选的 Prep 思考时间（0 / 15 / 30 / 60s），贴合真实雅思流程。
- 滴答、提示、结束和弦全部用 Web Audio 现场合成，不依赖任何音频文件。

**3. TWIST 意外事件（核心玩法）**
倒计时进行中会随机弹出 1–3 次干扰，逼你离开舒适区：

| | 事件 | 要求 |
|---|---|---|
| 💣 | WORD BOMB | 立刻用一个指定单词 |
| ⚡ | LIGHTNING | 提速、加大音量 |
| 🎁 | TIME HEIST | 白赚 +15 秒 |
| ⏳ | TIME THIEF | 被偷走 10 秒 |
| 🎭 | EMOTION SWAP | 换一种情绪重讲 |
| 🧒 | KID MODE | 用 5 岁小孩能懂的话说 |
| 🚫 | NO FILLER | 不许说 um / like / you know |
| 👃 | SENSE SWITCH | 现场描述一种气味 / 声音 / 触感 |
| 🔄 | OPINION FLIP | 立刻反驳自己的观点 |
| 🔒 | GRAMMAR LOCK | 只能用现在完成时 |
| 🔁 | REWIND | 给故事换一个新结局 |
| 🎤 | BIG STAGE | 当成台下有 500 人在听 |

强度可调（轻 / 中 / 猛）。

**4. 结束与复盘**
- 可选麦克风录音，结束即可回放、下载（数据只在本机，不上传）。
- 一键生成小红书 / 抖音分享文案（含话题、天数、Twist 战绩、标签）。
- 累计次数、连续打卡天数、今日次数，存 localStorage。

## 使用

直接打开 `index.html` 即可，或起一个本地服务：

```bash
python -m http.server 5173
# 打开 http://127.0.0.1:5173
```

快捷键：`空格 / Enter` 抽题或开始，`Esc` 退出当前轮次。

部署到 GitHub Pages：push 到 `main`，Settings → Pages → 选 `main` 根目录，纯静态无需构建。

## 结构

```
index.html        三个视图：首页 / 倒计时 / 结算
css/style.css     暗色视觉系统
js/topics.js      话题库 + TWIST 池（想加题直接改这里）
js/app.js         抽题、计时、意外事件、录音、统计
```

## 加话题

在 `js/topics.js` 的 `TOPICS` 数组里加一条：

```js
{ c:'objects',
  en:'Describe a bag you use every day',
  cn:'描述你每天背的一个包',
  cues:['what it looks like · 什么样','what is inside · 里面装什么',
        'where you got it · 哪来的','why you like it · 为什么喜欢'] }
```

想加新的意外事件，往 `TWISTS` 里加，支持 `delta` 字段（正数为加时，负数为扣时）。
