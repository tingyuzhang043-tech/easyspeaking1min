# EasySpeaking1Min

一分钟即兴演讲训练器 · 雅思口语 Part 2 抽题 + 60 秒倒计时 + 随机意外事件。

> 抽一张话题卡 → 60 秒开口不停 → 中途被「意外」打断 → 结束拿到回放与分享文案。

🔗 **在线体验：** https://tingyuzhang043-tech.github.io/easyspeaking1min/

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

**在线直接用：** https://tingyuzhang043-tech.github.io/easyspeaking1min/

**本地跑：** 纯静态零依赖，直接双击 `index.html` 就能打开。需要麦克风录音时建议起个本地服务（浏览器的安全策略要求 HTTPS 或 localhost）：

```bash
python -m http.server 5173
# 打开 http://127.0.0.1:5173
```

快捷键：`空格 / Enter` 抽题或开始，`Esc` 退出当前轮次。

## 部署

纯静态站点，走 GitHub Pages 的**分支发布**模式，无构建、无依赖、无需 Node。

**首次开启**：Settings → Pages → Source 选 `Deploy from a branch` → Branch `main` / Folder `/ (root)` → Save。

> ⚠️ 首次配置后构建要 1–2 分钟，期间访问会出现 *"There isn't a GitHub Pages site here."*，这是正常排队，等一会再刷新即可。

> ⚠️ 不要额外添加 Actions 部署工作流（`deploy-pages` 之类）。它会和分支发布同时抢占同一个 Pages 环境，造成重复部署甚至互相覆盖。两种模式二选一，本项目选分支模式。

**后续更新**：

```bash
git add .
git commit -m "描述改动"
git push origin main
```

推送后 30 秒~1 分钟自动上线。

## 结构

```
index.html        三个视图：首页 / 倒计时 / 结算
css/style.css     暗色视觉系统
js/topics.js      话题库 + TWIST 池（想加题直接改这里）
js/app.js         抽题、计时、意外事件、录音、统计
.gitignore        忽略 .workbuddy/ 等本地工作数据
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

## 自媒体用法

- 暗色高对比界面，OBS 窗口捕获或投屏直录即可，没有多余 UI 干扰。
- 建议用 OBS 同时录制「窗口画面 + 麦克风」，演讲画面和人声一次成型。
- 结算页的分享文案自带 `Day N`、话题、Twist 战绩和标签，复制后可直接发。
- 多语种人设：界面语言位已预留 EN / 中 / JP / FR，补充对应语种的话题库即可扩展。

## 隐私

录音仅在本地浏览器内存与下载文件中处理，**不上传任何服务器**；练习记录存 localStorage。
