/* ===========================================================
   topics.js — 雅思 Part 2 简易事物话题库
   选题原则：以「一个具体的人 / 物 / 地 / 事」为主，
   不做 Some people think... 这类议论文题，方便直接展开描述。
   cues 格式： "英文线索 · 中文提示"
   =========================================================== */

const CATEGORIES = [
  { id: 'all',     label: 'ALL',      cn: '全部',   ico: '◈' },
  { id: 'people',  label: 'PEOPLE',   cn: '人物',   ico: '👤' },
  { id: 'places',  label: 'PLACES',   cn: '地点',   ico: '📍' },
  { id: 'objects', label: 'OBJECTS',  cn: '物品',   ico: '🎁' },
  { id: 'events',  label: 'EVENTS',   cn: '事件',   ico: '🎉' },
  { id: 'hobbies', label: 'HOBBIES',  cn: '爱好',   ico: '🎯' },
  { id: 'media',   label: 'MEDIA',    cn: '媒体',   ico: '📱' },
  { id: 'nature',  label: 'FOOD & NATURE', cn: '食物自然', ico: '🍜' },
  { id: 'viral',   label: 'SURFING', cn: '冲浪60秒', ico: '🏄' }
];

const TOPICS = [
  /* ---------------- PEOPLE ---------------- */
  { c:'people', en:'Describe a friend you really like', cn:'描述一个你很喜欢的朋友',
    cues:['how you met · 怎么认识的','what they look like · 长什么样','what you do together · 一起做什么','why you like them · 为什么喜欢'] },
  { c:'people', en:'Describe a family member you spend most time with', cn:'描述一位你相处最多的家人',
    cues:['who they are · 是谁','daily life together · 日常相处','a memory with them · 一段回忆','what you learned · 学到什么'] },
  { c:'people', en:'Describe a teacher who influenced you', cn:'描述一位影响过你的老师',
    cues:['what they taught · 教什么科目','their style · 上课风格','one story · 一个小故事','the influence · 对你的影响'] },
  { c:'people', en:'Describe a child you know', cn:'描述一个你认识的小孩',
    cues:['who the child is · 是谁','their personality · 性格','what they love · 喜欢什么','why they are special · 特别之处'] },
  { c:'people', en:'Describe an old person you admire', cn:'描述一位你敬佩的长辈',
    cues:['who they are · 是谁','their life · 他们的经历','their habits · 生活习惯','what you admire · 敬佩什么'] },
  { c:'people', en:'Describe a neighbour you have', cn:'描述一位你的邻居',
    cues:['who they are · 是谁','where they live · 住在哪','how you interact · 怎么打交道','your impression · 你的印象'] },
  { c:'people', en:'Describe someone who helped you recently', cn:'描述最近帮助过你的人',
    cues:['the situation · 当时什么情况','what they did · 做了什么','how you felt · 你的感受','how you thanked · 怎么道谢'] },
  { c:'people', en:'Describe a person who is always fashionable', cn:'描述一个穿着时髦的人',
    cues:['who they are · 是谁','their style · 穿衣风格','where they shop · 在哪买','your opinion · 你怎么看'] },
  { c:'people', en:'Describe a person who loves cooking', cn:'描述一个热爱做饭的人',
    cues:['who they are · 是谁','their best dish · 拿手菜','when they cook · 什么时候做','why it matters · 为什么重要'] },
  { c:'people', en:'Describe a famous person you would like to meet', cn:'描述你想见的一位名人',
    cues:['who they are · 是谁','why famous · 为什么有名','what you would ask · 想问什么','what you admire · 欣赏什么'] },
  { c:'people', en:'Describe a person who talks a lot', cn:'描述一个话很多的人',
    cues:['who they are · 是谁','when they talk · 什么时候话多','what they say · 通常说什么','your reaction · 你的反应'] },
  { c:'people', en:'Describe someone in your family you admire most', cn:'描述家里你最佩服的人',
    cues:['who they are · 是谁','their quality · 什么品质','one example · 举个例子','the effect on you · 对你的影响'] },

  /* ---------------- PLACES ---------------- */
  { c:'places', en:'Describe a park you like', cn:'描述一个你喜欢的公园',
    cues:['where it is · 在哪','what is inside · 里面有什么','what you do there · 你去做什么','why you like it · 为什么喜欢'] },
  { c:'places', en:'Describe a café you often go to', cn:'描述一家你常去的咖啡馆',
    cues:['where it is · 在哪','the atmosphere · 氛围','the drinks · 喝什么','why you go back · 为什么常去'] },
  { c:'places', en:'Describe your favourite room in your home', cn:'描述家里你最喜欢的房间',
    cues:['which room · 哪个房间','what is in it · 里面有什么','what you do there · 在里面做什么','why you love it · 为什么喜欢'] },
  { c:'places', en:'Describe a city you want to visit', cn:'描述一座你想去的城市',
    cues:['which city · 哪座城市','what to see · 想看什么','what to eat · 想吃什么','why you want to go · 为什么想去'] },
  { c:'places', en:'Describe a market you have been to', cn:'描述你去过的一个市场',
    cues:['where it is · 在哪','what they sell · 卖什么','the people there · 那里的人','your experience · 你的体验'] },
  { c:'places', en:'Describe a quiet place you like', cn:'描述一个你喜欢的安静地方',
    cues:['where it is · 在哪','when you go · 什么时候去','what you do · 做什么','why it is special · 为什么特别'] },
  { c:'places', en:'Describe a place in your hometown', cn:'描述家乡的一个地方',
    cues:['where it is · 在哪','what it looks like · 什么样','your memory · 你的记忆','why it matters · 为什么重要'] },
  { c:'places', en:'Describe a library you have visited', cn:'描述你去过的一个图书馆',
    cues:['where it is · 在哪','the space · 空间什么样','what you read · 读什么','how you felt · 感受如何'] },
  { c:'places', en:'Describe a beach or mountain you visited', cn:'描述你去过的海边或山',
    cues:['where it is · 在哪','the view · 风景如何','what you did · 做了什么','why you remember · 为什么记得'] },
  { c:'places', en:'Describe a small shop you like', cn:'描述一家你喜欢的小店',
    cues:['where it is · 在哪','what it sells · 卖什么','the owner · 店主','why you like it · 为什么喜欢'] },
  { c:'places', en:'Describe a place where you can study or work', cn:'描述一个你能学习工作的地方',
    cues:['where it is · 在哪','the environment · 环境','your routine · 你的习惯','why it works · 为什么高效'] },
  { c:'places', en:'Describe a crowded place you have been to', cn:'描述你去过的一个拥挤的地方',
    cues:['where it is · 在哪','when you went · 什么时候去','the people · 人多到什么程度','how you felt · 你的感受'] },

  /* ---------------- OBJECTS ---------------- */
  { c:'objects', en:'Describe a gift you received', cn:'描述你收到的一份礼物',
    cues:['what it was · 是什么','who gave it · 谁送的','when you got it · 什么时候收到','why you like it · 为什么喜欢'] },
  { c:'objects', en:'Describe a photo you like', cn:'描述一张你喜欢的照片',
    cues:['what is in it · 拍了什么','when taken · 什么时候拍的','who took it · 谁拍的','why you keep it · 为什么留着'] },
  { c:'objects', en:'Describe a book you enjoyed', cn:'描述一本你喜欢的书',
    cues:['what it is about · 讲什么','who recommended · 谁推荐','your favourite part · 最喜欢的部分','what you learned · 学到什么'] },
  { c:'objects', en:'Describe a piece of clothing you like', cn:'描述一件你喜欢的衣服',
    cues:['what it is · 是什么','where you bought · 在哪买的','when you wear it · 什么时候穿','why you like it · 为什么喜欢'] },
  { c:'objects', en:'Describe an object you use every day', cn:'描述一件你每天用的东西',
    cues:['what it is · 是什么','how you use it · 怎么用','where you keep it · 放在哪','life without it · 没有它会怎样'] },
  { c:'objects', en:'Describe something old you keep at home', cn:'描述一件你留在家里的旧物',
    cues:['what it is · 是什么','how old · 多旧了','the story · 背后的故事','why you keep it · 为什么留着'] },
  { c:'objects', en:'Describe a toy you had as a child', cn:'描述你小时候的一个玩具',
    cues:['what it was · 是什么','who gave it · 谁给的','how you played · 怎么玩','your memory · 你的记忆'] },
  { c:'objects', en:'Describe your favourite app on your phone', cn:'描述你手机里最喜欢的 App',
    cues:['what it does · 干什么用','how often · 用得多频繁','best feature · 最好用的功能','why you love it · 为什么喜欢'] },
  { c:'objects', en:'Describe a piece of furniture in your home', cn:'描述家里的一件家具',
    cues:['what it is · 是什么','where it is · 放在哪','its story · 它的来历','why it matters · 为什么重要'] },
  { c:'objects', en:'Describe something you bought online', cn:'描述你在网上买过的一件东西',
    cues:['what it was · 是什么','why you bought · 为什么买','the delivery · 收货体验','was it worth it · 值不值'] },
  { c:'objects', en:'Describe a souvenir from a trip', cn:'描述一件旅行纪念品',
    cues:['what it is · 是什么','where from · 从哪带回','when you bought · 什么时候买','why you keep it · 为什么留着'] },
  { c:'objects', en:'Describe something you lost before', cn:'描述你曾经弄丢的一件东西',
    cues:['what it was · 是什么','how you lost it · 怎么丢的','how you felt · 当时心情','did you find it · 找到了吗'] },

  /* ---------------- EVENTS ---------------- */
  { c:'events', en:'Describe a birthday you remember', cn:'描述一个你记得的生日',
    cues:['whose birthday · 谁的生日','where it was · 在哪过的','what happened · 发生了什么','why you remember · 为什么记得'] },
  { c:'events', en:'Describe a trip you took recently', cn:'描述你最近的一次旅行',
    cues:['where you went · 去了哪','who with · 和谁一起','what you did · 做了什么','the best moment · 最好的瞬间'] },
  { c:'events', en:'Describe a festival you celebrated', cn:'描述你庆祝过的一个节日',
    cues:['which festival · 什么节日','how you celebrate · 怎么过','the food · 吃什么','why it is special · 为什么特别'] },
  { c:'events', en:'Describe a wedding you attended', cn:'描述你参加过的一场婚礼',
    cues:['whose wedding · 谁的婚礼','where it was · 在哪办','what happened · 有什么环节','your impression · 你的印象'] },
  { c:'events', en:'Describe an exam you took', cn:'描述你参加过的一场考试',
    cues:['what exam · 什么考试','how you prepared · 怎么准备','how it went · 考得怎样','what you learned · 有什么收获'] },
  { c:'events', en:'Describe a sports event you watched', cn:'描述你看过的一场体育比赛',
    cues:['what event · 什么比赛','who played · 谁参加','the ending · 结果如何','how you felt · 你的感受'] },
  { c:'events', en:'Describe a concert or show you went to', cn:'描述你看过的一场演出',
    cues:['what it was · 什么演出','who you went with · 和谁去','the atmosphere · 现场氛围','your favourite part · 最喜欢的部分'] },
  { c:'events', en:'Describe a time you were late', cn:'描述你迟到的一次经历',
    cues:['when it was · 什么时候','why you were late · 为什么迟到','what happened · 结果怎样','how you felt · 你的心情'] },
  { c:'events', en:'Describe a time you helped someone', cn:'描述你帮助别人的一次经历',
    cues:['who you helped · 帮了谁','the situation · 什么情况','what you did · 做了什么','how it felt · 感觉如何'] },
  { c:'events', en:'Describe a celebration in your family', cn:'描述家里的一次庆祝',
    cues:['what it was for · 庆祝什么','who came · 谁来了','what you ate · 吃了什么','why it was fun · 为什么开心'] },
  { c:'events', en:'Describe a morning you remember well', cn:'描述你记得很清楚的一个早晨',
    cues:['what happened · 发生了什么','the weather · 天气如何','how you felt · 你的状态','why it stuck · 为什么记得'] },
  { c:'events', en:'Describe a time you got lost', cn:'描述你迷路的一次经历',
    cues:['where you were · 在哪','how it happened · 怎么迷路的','what you did · 怎么解决','how it ended · 结果如何'] },

  /* ---------------- HOBBIES ---------------- */
  { c:'hobbies', en:'Describe a hobby you enjoy', cn:'描述一个你喜欢的爱好',
    cues:['what it is · 是什么','how often · 多久一次','how you started · 怎么开始的','why you enjoy it · 为什么喜欢'] },
  { c:'hobbies', en:'Describe a sport you like', cn:'描述一项你喜欢的运动',
    cues:['what it is · 什么运动','where you do it · 在哪做','how often · 多久一次','why you like it · 为什么喜欢'] },
  { c:'hobbies', en:'Describe a skill you want to learn', cn:'描述你想学的一项技能',
    cues:['what skill · 什么技能','why you want it · 为什么想学','how to learn · 怎么学','what it would change · 会带来什么改变'] },
  { c:'hobbies', en:'Describe something you do to relax', cn:'描述你放松的一种方式',
    cues:['what you do · 做什么','when you do it · 什么时候做','where you do it · 在哪做','why it works · 为什么有用'] },
  { c:'hobbies', en:'Describe your morning routine', cn:'描述你早上的日常',
    cues:['what time · 几点起','the first thing · 第一件事','breakfast · 早餐吃什么','why you like it · 为什么喜欢'] },
  { c:'hobbies', en:'Describe a game you played as a child', cn:'描述你小时候玩的一个游戏',
    cues:['what it was · 是什么','who you played with · 和谁玩','the rules · 怎么玩','your memory · 你的记忆'] },
  { c:'hobbies', en:'Describe a way you keep healthy', cn:'描述你保持健康的一个方式',
    cues:['what you do · 做什么','how often · 多久一次','when you started · 什么时候开始','the effect · 有什么效果'] },
  { c:'hobbies', en:'Describe something you are good at', cn:'描述一件你擅长的事',
    cues:['what it is · 是什么','how you learned · 怎么学会的','when you show it · 什么时候展示','why it matters · 为什么重要'] },
  { c:'hobbies', en:'Describe a collection someone has', cn:'描述一个收藏',
    cues:['what is collected · 收藏什么','who collects it · 谁收藏','how it started · 怎么开始的','why it is interesting · 为什么有趣'] },
  { c:'hobbies', en:'Describe an activity you do with friends', cn:'描述你和朋友一起做的活动',
    cues:['what it is · 是什么','where you go · 去哪','how often · 多久一次','why it is fun · 为什么好玩'] },
  { c:'hobbies', en:'Describe a subject you enjoyed at school', cn:'描述你上学时喜欢的一门课',
    cues:['what subject · 什么课','the teacher · 老师如何','why you liked it · 为什么喜欢','does it help now · 现在有用吗'] },
  { c:'hobbies', en:'Describe a habit you want to change', cn:'描述你想改掉的一个习惯',
    cues:['what habit · 什么习惯','why you want to change · 为什么想改','the difficulty · 难在哪','your plan · 你的计划'] },

  /* ---------------- MEDIA ---------------- */
  { c:'media', en:'Describe a movie you like', cn:'描述一部你喜欢的电影',
    cues:['the plot · 讲什么','the characters · 角色','why you like it · 为什么喜欢','who you would recommend · 想推荐给谁'] },
  { c:'media', en:'Describe a song you love', cn:'描述一首你喜欢的歌',
    cues:['who sings it · 谁唱的','the melody · 旋律如何','when you listen · 什么时候听','why it moves you · 为什么打动你'] },
  { c:'media', en:'Describe a TV programme you enjoy', cn:'描述你喜欢的一个电视节目',
    cues:['what it is · 是什么','what happens · 讲什么','how often you watch · 看得多频繁','why you enjoy it · 为什么喜欢'] },
  { c:'media', en:'Describe a website you often visit', cn:'描述你常逛的一个网站',
    cues:['what it is · 是什么','what you do there · 在上面做什么','how you found it · 怎么发现的','why it is useful · 为什么有用'] },
  { c:'media', en:'Describe a video game you played', cn:'描述你玩过的一个电子游戏',
    cues:['what it is · 是什么','how to play · 怎么玩','who you play with · 和谁玩','why it is fun · 为什么好玩'] },
  { c:'media', en:'Describe a podcast or channel you follow', cn:'描述你关注的一个播客/频道',
    cues:['what it is about · 关于什么','the host · 主播是谁','when you listen · 什么时候听','what you learned · 学到什么'] },
  { c:'media', en:'Describe an advertisement you remember', cn:'描述一个你记得的广告',
    cues:['what it advertises · 卖什么','where you saw it · 在哪看到','what happens · 广告内容','why you remember · 为什么记得'] },
  { c:'media', en:'Describe something you posted online', cn:'描述你在网上发过的一条内容',
    cues:['what it was · 发的是什么','when you posted · 什么时候','the reaction · 大家的反应','why you posted it · 为什么发'] },
  { c:'media', en:'Describe a piece of news you remember', cn:'描述你记得的一条新闻',
    cues:['what happened · 发生了什么','where you saw it · 在哪看到','why it mattered · 为什么重要','how you felt · 你的感受'] },
  { c:'media', en:'Describe an article you read online', cn:'描述你在网上读过的一篇文章',
    cues:['what it was about · 讲什么','where you found it · 在哪看到','the main point · 主要观点','why it stuck · 为什么印象深刻'] },
  { c:'media', en:'Describe a social media account you follow', cn:'描述你关注的一个社交账号',
    cues:['who they are · 是谁','what they post · 发什么内容','how often you check · 看得多频繁','why you follow · 为什么关注'] },

  /* ---------------- FOOD & NATURE ---------------- */
  { c:'nature', en:'Describe your favourite food', cn:'描述你最喜欢的食物',
    cues:['what it is · 是什么','how it tastes · 什么味道','when you eat it · 什么时候吃','why you love it · 为什么喜欢'] },
  { c:'nature', en:'Describe a dish you can cook', cn:'描述一道你会做的菜',
    cues:['what it is · 什么菜','the ingredients · 用什么材料','how you cook it · 怎么做','who taught you · 谁教的'] },
  { c:'nature', en:'Describe a restaurant you like', cn:'描述一家你喜欢的餐厅',
    cues:['where it is · 在哪','the food · 菜怎么样','the atmosphere · 环境如何','why you go back · 为什么常去'] },
  { c:'nature', en:'Describe a drink you like', cn:'描述一种你喜欢的饮品',
    cues:['what it is · 是什么','how it tastes · 口感如何','when you drink it · 什么时候喝','why you like it · 为什么喜欢'] },
  { c:'nature', en:'Describe a fruit you enjoy', cn:'描述一种你喜欢的水果',
    cues:['what it is · 是什么','the taste · 什么味道','when it is in season · 什么季节','why you enjoy it · 为什么喜欢'] },
  { c:'nature', en:'Describe your favourite season', cn:'描述你最喜欢的季节',
    cues:['which season · 哪个季节','the weather · 天气如何','what you do · 会做什么','why you love it · 为什么喜欢'] },
  { c:'nature', en:'Describe a kind of weather you like', cn:'描述你喜欢的一种天气',
    cues:['what weather · 什么天气','what you do then · 那时做什么','how it smells or sounds · 气味声音','why you like it · 为什么喜欢'] },
  { c:'nature', en:'Describe an animal you like', cn:'描述一种你喜欢的动物',
    cues:['what it is · 是什么','what it looks like · 长什么样','where it lives · 生活在哪','why you like it · 为什么喜欢'] },
  { c:'nature', en:'Describe a plant or flower you like', cn:'描述一种你喜欢的植物/花',
    cues:['what it is · 是什么','where you see it · 在哪见到','how it looks · 长什么样','why it is special · 为什么特别'] },
  { c:'nature', en:'Describe a meal you had with friends', cn:'描述你和朋友吃的一顿饭',
    cues:['where you ate · 在哪吃的','what you ordered · 点了什么','what you talked about · 聊了什么','why it was fun · 为什么开心'] },
  { c:'nature', en:'Describe a street food you tried', cn:'描述你吃过的一种街头小吃',
    cues:['what it was · 是什么','where you found it · 在哪吃到的','the taste · 味道如何','would you try again · 还会吃吗'] },
  { c:'nature', en:'Describe a time you tried something new to eat', cn:'描述你尝试新食物的一次经历',
    cues:['what it was · 是什么','who you were with · 和谁一起','the taste · 味道如何','your reaction · 你的反应'] },

  /* ---------------- VIRAL · 冲浪60秒（网感话题） ---------------- */
  /* A. 黑话翻译：把中文互联网讲给世界听，这类最显双语功底 */
  { c:'viral', en:'Explain "内卷" (involution) to a foreigner', cn:'向外国人解释「内卷」',
    cues:['one-line definition · 一句话定义','a real example · 举个真实例子','how it feels · 身处其中什么感受','good or bad · 好还是坏'] },
  { c:'viral', en:'How would you translate "发疯文学" into English?', cn:'「发疯文学」用英语怎么说？',
    cues:['literal or not · 直译还是意译','an example line · 造个句','when people use it · 什么时候用','why it is funny · 为什么好笑'] },
  { c:'viral', en:'Explain "电子榨菜" (digital pickles) to a friend abroad', cn:'给国外朋友解释「电子榨菜」',
    cues:['what it means · 什么意思','your own version · 你的电子榨菜','why we need it · 为什么需要','is it healthy · 这健康吗'] },
  { c:'viral', en:'Explain "社恐" — it is not just being shy', cn:'解释「社恐」——不只是害羞',
    cues:['what it really means · 到底什么意思','a situation · 举个例子','shy vs 社恐 · 有什么不同','do you relate · 你中了几条'] },

  /* B. 网络现象：有观点空间，能显思考深度 */
  { c:'viral', en:'Why do you think short videos are so addictive?', cn:'为什么短视频这么让人上瘾？',
    cues:['the mechanism · 机制是什么','your own habit · 你自己呢','good or bad · 好还是坏','how to control it · 怎么控制'] },
  { c:'viral', en:'Why do internet catchphrases spread so fast?', cn:'为什么网络流行语传得这么快？',
    cues:['an example · 举个例子','who starts them · 谁造的梗','why people repeat · 为什么大家跟着说','how long they last · 能活多久'] },
  { c:'viral', en:'Why do people love watching others eat on camera?', cn:'为什么大家爱看别人吃饭？',
    cues:['the appeal · 吸引力在哪','a creator you like · 你喜欢的主播','the loneliness factor · 孤独感作祟？','is it weird · 这奇怪吗'] },
  { c:'viral', en:'Why do reality shows feel so dramatic?', cn:'为什么真人秀这么抓马？',
    cues:['a famous moment · 一个名场面','real or scripted · 真还是演','why we watch · 我们为什么看','your guilty pleasure · 你的真香现场'] },
  { c:'viral', en:'Why do strangers online argue so easily?', cn:'为什么网上陌生人那么容易吵起来？',
    cues:['an example · 举个例子','the screen effect · 屏幕效应','have you done it · 你吵过吗','what to do · 该怎么办'] },

  /* C. 万能热点题：题目固定，内容填当天热搜 —— 这类永不过时 */
  { c:'viral', en:'Why did this suddenly blow up online?', cn:'这个东西为什么突然火了？',
    cues:['describe it first · 先说清是什么','when you noticed · 你什么时候注意到的','why it clicked · 为什么戳中人','will it last · 能火多久'] },
  { c:'viral', en:'Defend the unpopular side of a trending topic', cn:'为一个热点话题里的少数派辩护',
    cues:['what the topic is · 话题是什么','the popular view · 多数人怎么看','your angle · 你的角度','steelman it · 把对方论证说强'] },
  { c:'viral', en:'Explain a piece of internet slang to someone from 1995', cn:'向一个1995年的人解释一个网络用语',
    cues:['the word · 哪个词','the scene · 什么场景用','translate it · 怎么翻','why it is funny · 笑点在哪'] },

  /* D. 学外语向：既网感又涨精准粉 */
  { c:'viral', en:'Do you think AI will replace language learning?', cn:'AI 会取代语言学习吗？',
    cues:['what AI is good at · AI 擅长什么','what it cannot do · 做不到什么','your experience · 你的体验','five years from now · 五年后'] },
  { c:'viral', en:'What is the hardest thing about speaking a foreign language?', cn:'说外语最难的是什么？',
    cues:['your answer · 你的答案','a time you froze · 你卡壳的一次','how you fixed it · 怎么解决的','advice to beginners · 给新手的建议'] }
];

/* ===========================================================
   TWISTS — 倒计时中的「意外设计」
   kind / head 用英文保持沉浸感，desc 附中文便于反应
   =========================================================== */

const TWIST_WORDS = [
  'nevertheless · 尽管如此', 'gorgeous · 美极了', 'memorize · 记住',
  'embarrassed · 尴尬的', 'convenient · 方便的', 'ancient · 古老的',
  'crowded · 拥挤的', 'delicious · 美味的', 'realize · 意识到',
  'obviously · 显然', 'actually · 其实', 'gradually · 渐渐地',
  'unforgettable · 难忘的', 'affordable · 便宜的', 'terrible · 糟糕的'
];

const TWIST_EMOTIONS = [
  'like you just won the lottery · 像刚中奖',
  'like you are heartbroken · 像刚失恋',
  'like whispering a secret · 像在说悄悄话',
  'like you are super bored · 像无聊到极点',
  'like you are arguing · 像在吵架',
  'like you are on a stage · 像在台上演讲'
];

const TWIST_SENSES = [
  'a smell · 一种气味', 'a sound · 一种声音',
  'a texture · 一种触感', 'a colour · 一种颜色'
];

/* RU 混入词：英语句子里硬塞俄语，制造「语言失控」的喜剧效果 */
const TWIST_RU = [
  'нет · 不', 'да · 对', 'хорошо · 好', 'спасибо · 谢谢',
  'давай · 来吧', 'нормально · 还行', 'конечно · 当然', 'точно · 没错'
];

const TWISTS = [
  {
    id: 'word', ico: '💣', kind: 'WORD BOMB', head: 'Use this word right now',
    desc: () => pick(TWIST_WORDS)
  },
  {
    id: 'speed', ico: '⚡', kind: 'LIGHTNING', head: 'Speed up — double energy',
    desc: () => '更大声，更快，别停 · louder & faster'
  },
  {
    id: 'bonus', ico: '🎁', kind: 'TIME HEIST', head: '+15 seconds for you',
    desc: () => '你赚到了 15 秒 · keep going', delta: +15, cls: 'flash-bonus'
  },
  {
    id: 'steal', ico: '⏳', kind: 'TIME THIEF', head: '-10 seconds stolen',
    desc: () => '时间被偷走 10 秒 · finish faster!', delta: -10, cls: 'flash-warn'
  },
  {
    id: 'emotion', ico: '🎭', kind: 'EMOTION SWAP', head: 'Change your emotion',
    desc: () => 'Say it ' + pick(TWIST_EMOTIONS)
  },
  {
    id: 'kid', ico: '🧒', kind: 'KID MODE', head: 'Explain it to a 5-year-old',
    desc: () => '用最简单的词说 · simplest words only'
  },
  {
    id: 'nofiller', ico: '🚫', kind: 'NO FILLER', head: 'Zero "um", "like", "you know"',
    desc: () => '接下来 15 秒不许卡壳 · clean speech'
  },
  {
    id: 'sense', ico: '👃', kind: 'SENSE SWITCH', head: 'Describe a sense right now',
    desc: () => 'Describe ' + pick(TWIST_SENSES)
  },
  {
    id: 'flip', ico: '🔄', kind: 'OPINION FLIP', head: 'Now argue the opposite',
    desc: () => '说出相反的观点 · say the opposite'
  },
  {
    id: 'tense', ico: '🔒', kind: 'GRAMMAR LOCK', head: 'Use present perfect only',
    desc: () => 'have / has done · 现在完成时'
  },
  {
    id: 'rewind', ico: '🔁', kind: 'REWIND', head: 'Give your story a new ending',
    desc: () => '重新讲一个结局 · new ending now'
  },
  {
    id: 'stage', ico: '🎤', kind: 'BIG STAGE', head: '500 people are watching',
    desc: () => '放大音量，放开说 · project your voice'
  },

  /* ---- 语言失控类 ---- */
  {
    id: 'ruslish', ico: '🇷🇺', kind: 'RUSLISH CHAOS', head: 'Sneak in Russian words',
    desc: () => '每句塞一个俄语词 · ' + pick(TWIST_RU), big: true
  },
  {
    id: 'anchor', ico: '📺', kind: 'NEWS ANCHOR', head: 'Breaking news voice',
    desc: () => '新闻播报腔 · sound dead serious'
  },
  {
    id: 'question', ico: '❓', kind: 'ALL QUESTIONS', head: 'Only questions now',
    desc: () => '接下来全用问句 · everything is a question'
  },
  {
    id: 'superlative', ico: '🏆', kind: 'SUPERLATIVE ONLY', head: 'The most, the best, the worst',
    desc: () => '只能用最高级 · -est / the most only'
  },

  /* ---- 身体挑战类（出片王炸，需真人出镜） ---- */
  {
    id: 'flamingo', ico: '🦩', kind: 'FLAMINGO MODE', head: 'Stand on one leg',
    desc: () => '金鸡独立，不许放下 · one leg, hold it!', body: true, big: true
  },
  {
    id: 'pushup', ico: '💪', kind: 'PUSH-UP TALK', head: 'Push-ups while speaking',
    desc: () => '边做俯卧撑边说 · drop and talk', body: true, big: true
  },
  {
    id: 'squat', ico: '🏋️', kind: 'SQUAT STORM', head: 'Squat and keep talking',
    desc: () => '边深蹲边说 · keep squatting', body: true, big: true
  },
  {
    id: 'plank', ico: '🧱', kind: 'PLANK TALK', head: 'Hold a plank',
    desc: () => '平板撑住别塌 · hold that plank', body: true, big: true
  }
];

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
