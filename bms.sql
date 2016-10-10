-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2016-09-28 05:24:40
-- 服务器版本： 10.1.13-MariaDB
-- PHP Version: 5.6.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bms`
--

-- --------------------------------------------------------

--
-- 表的结构 `addbooktb`
--

CREATE TABLE `addbooktb` (
  `id` int(11) NOT NULL,
  `book_number` varchar(32) NOT NULL,
  `book_img` varchar(64) NOT NULL,
  `book_title` varchar(32) NOT NULL,
  `book_category` varchar(32) NOT NULL,
  `book_author` varchar(32) NOT NULL,
  `book_addtime` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `addbooktb`
--

INSERT INTO `addbooktb` (`id`, `book_number`, `book_img`, `book_title`, `book_category`, `book_author`, `book_addtime`) VALUES
(2, '00000001', './libs/upload/see.jpg', '看见', '文学', '柴静', '2016-09-10'),
(3, '00000002', './libs/upload/wethree.jpg', '我们仨', '文学', '杨绛', '2016-09-11'),
(4, '00000003', './libs/upload/haomahaode.jpg', '好吗好的', '小说', '大冰', '2016-09-13'),
(5, '00000004', './libs/upload/tolive.jpg', '活着', '小说', '余华', '2016-09-14'),
(6, '00000005', './libs/upload/passyourworld.jpg', '从你的全世界路过', '小说', '张嘉佳', '2016-09-16'),
(7, '00000006', './libs/upload/timebrief.jpg', '时间简史(插图本)', '科普', '史蒂芬•霍金 (Stephen Hawking)', '2016-09-17'),
(8, '00000007', './libs/upload/whatisscience.jpg', '什么是科学', '科普', '吴国盛', '2016-09-20'),
(9, '00000008', './libs/upload/humanweakness.jpg', '人性的弱点', '励志', '戴尔·卡耐基 (Dale Carnegie)', '2016-09-22'),
(10, '11', '', 'test4', '文学', 'admin', '2016-09-24');

-- --------------------------------------------------------

--
-- 表的结构 `admintb`
--

CREATE TABLE `admintb` (
  `id` int(11) NOT NULL,
  `username` varchar(32) NOT NULL,
  `password` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `admintb`
--

INSERT INTO `admintb` (`id`, `username`, `password`) VALUES
(1, 'admin', '21232f297a57a5a743894a0e4a801fc3');

-- --------------------------------------------------------

--
-- 表的结构 `applytb`
--

CREATE TABLE `applytb` (
  `id` int(11) NOT NULL,
  `borrow_number` varchar(32) NOT NULL,
  `borrow_title` varchar(32) NOT NULL,
  `uid` varchar(32) NOT NULL,
  `name` varchar(32) NOT NULL,
  `borrow_starttime` varchar(32) NOT NULL,
  `borrow_length` int(11) NOT NULL,
  `apply_time` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `applytb`
--

INSERT INTO `applytb` (`id`, `borrow_number`, `borrow_title`, `uid`, `name`, `borrow_starttime`, `borrow_length`, `apply_time`) VALUES
(3, '00000004', '活着', '00000007', '杨琢', '2016-09-22', 15, '2016-09-28');

-- --------------------------------------------------------

--
-- 表的结构 `booktb`
--

CREATE TABLE `booktb` (
  `id` int(11) NOT NULL,
  `book_number` varchar(32) NOT NULL,
  `book_title` varchar(32) NOT NULL,
  `book_author` varchar(32) NOT NULL,
  `book_category` varchar(32) NOT NULL,
  `book_publisher` varchar(64) NOT NULL,
  `book_img` varchar(64) NOT NULL,
  `book_count` int(11) NOT NULL,
  `book_content` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `booktb`
--

INSERT INTO `booktb` (`id`, `book_number`, `book_title`, `book_author`, `book_category`, `book_publisher`, `book_img`, `book_count`, `book_content`) VALUES
(1, '00000001', '看见', '柴静', '文学', '广西师范大学出版社', './libs/upload/see.jpg', 94, '《看见》是知名记者和主持人柴静讲述央视十年历程的自传性作品，既是柴静个人的成长告白书，某种程度上亦可视作中国社会十年变迁的备忘录。十年前她被选择成为国家电视台新闻主播，却因毫无经验而遭遇挫败，非典时期成为现场记者后，现实生活犬牙交错的切肤之感，让她一点一滴脱离外在与自我的束缚，对生活与人性有了更为宽广与深厚的理解。十年之间，非典、汶川地震、两会报道、北京奥运……在每个重大事件现场，几乎都能发现柴静的身影，而如华南虎照、征地等刚性的调查报道她也多有制作。在书中，她记录下淹没在宏大叙事中的动人细节，为时代留下私人的注脚。一如既往，柴静看见并记录下新闻中给她留下强烈生命印象的个人，每个人都深嵌在世界之中，没有人可以只是一个旁观者，他人经受的，我必经受。书中记录下的人与事，是他们的生活，也是你和我的生活。 《看见》中，我没有刻意选择标志性事件，也没有描绘历史的雄心，在大量的新闻报道里，我只选择了留给我强烈生命印象的人，因为工作原因，我恰好与这些人相遇。他们是流淌的，从我心腹深处的石坝上漫溢出来，坚硬的成见和模式被一遍遍冲刷，摇摇欲坠，土崩瓦解。这种摇晃是危险的，但思想的本质就是不安。 我试着尽可能诚实地写下这不断犯错、不断推翻、不断疑问、不断重建的事实和因果，一个国家由人构成，一个人也由无数他人构成，你想如何报道一个国家，就要如何报道自已。——柴静'),
(2, '00000002', '我们仨', '杨绛', '文学', '生活•读书•新知三联书店', './libs/upload/wethree.jpg', 96, '《我们仨》讲述了九十二岁的杨绛以简洁而沉重的语言，回忆先她而去的女儿钱媛、丈夫钱钟书，回忆一家三口那些快乐而艰难、爱与痛的日子。这个三口之家的动人故事证明：家庭是人生很好的庇护所。'),
(3, '00000003', '好吗好的', '大冰', '小说', '湖南文艺出版社', './libs/upload/haomahaode.jpg', 9, '善良是一种天性，善意是一种选择。\r\n善意能消戾，善意能得缘，善意能带业往生，善意能回头是岸。\r\n善意能够帮人捕捉并建立起独特的幸福感。\r\n好吗好的，是一句自度度人的自问自答，也是一份坦然随缘的善意。\r\n《好吗好的》——百万级销量作家大冰2016年新书。“在*冷的地方，写就暖心的、真实的、善意的、舍不得读完的江湖故事”。\r\n《好吗好的》中的江湖故事，铺满牵引你踏上归程的乡愁、给你盔甲也给你软肋的爱意，有回头是岸的浪子，有深沉执着的兄弟，有既做事又做梦还做自己的男人和兰之猗猗、幽幽其香、五“毒”俱全的美少女壮士。\r\n他们的故事是生活，他们真实存在于这个世界上。用能量强大的小宇宙为你冲破刻板冰冷的生活壁垒，让你看到那些你永远无法去体会的生活，见识那些可能你永远都无法结交的人。他们用行动教会你善意对待世界、对待生活、对待他人，同时也善意地对待自己。\r\n他们走在你的前面，为你指路，为你鼓气，也为你照亮前进的方向。'),
(4, '00000004', '活着', '余华', '小说', '作家出版社', './libs/upload/tolive.jpg', 1, '《活着(新版)》讲述了农村人福贵悲惨的人生遭遇。福贵本是个阔少爷，可他嗜赌如命，终于赌光了家业，一贫如洗。他的父亲被他活活气死，母亲则在穷困中患了重病，福贵前去求药，却在途中被国民党抓去当壮丁。经过几番波折回到家里，才知道母亲早已去世，妻子家珍含辛茹苦地养大两个儿女。此后更加悲惨的命运一次又一次降临到福贵身上，他的妻子、儿女和孙子相继死去，最后只剩福贵和一头老牛相依为命，但老人依旧活着，仿佛比往日更加洒脱与坚强。\r\n《活着(新版)》荣获意大利格林扎纳•卡佛文学奖奖项（1998年）、台湾《中国时报》10本好书奖（1994年）、香港“博益”15本好书奖（1994年）、第三届世界华文“冰心文学奖”（2002年），入选香港《亚洲周刊》评选的“20世纪中文小说百年百强”、中国百位批评家和文学编辑评选的“20世纪90年代最有影响的10部作品”。'),
(5, '00000005', '从你的全世界路过', '张嘉佳', '小说', '湖南文艺出版社', './libs/upload/passyourworld.jpg', 15, '《从你的全世界路过》是微博上最会写故事的人张嘉佳献给你的心动故事。最初以“睡前故事”系列的名义在网上疯狂流传，几天内达到1,500,000 次转发，超4亿次阅读，引来电影投资方的巨资抢购，转瞬便签下其中5个故事的电影版权。每1分钟，都有人在张嘉佳的故事里看到自己。\r\n读过睡前故事的人会知道，这是一本纷杂凌乱的书。像朋友在深夜跟你在叙述，叙述他走过的千山万水。那么多篇章，有温暖的，有明亮的，有落单的，有疯狂的，有无聊的，有胡说八道的。当你辗转失眠时，当你需要安慰时，当你等待列车时，当你赖床慵懒时，当你饭后困顿时，应该都能找到一章合适的。\r\n我希望写一本书，你可以留在枕边、放进书架，或者送给最重要的那个人。\r\n从你的全世界路过，随便打开一篇就可以了。——张嘉佳'),
(6, '00000006', '时间简史(插图本)', '史蒂芬•霍金 (Stephen Hawking)', '科普', '湖南科学技术出版社', './libs/upload/timebrief.jpg', 65, '《时间简史(插图本)》尽管霍金教授的著述极为清晰而机智，有些读者仍然觉得难以掌握复杂的概念。为了使读者加深理解，《时间简史》还增加了240多幅彩色插图，包括卫星图像和照片。这些都应归功于诸如哈勃空间望远镜和电脑三维和四维实体成像等技术进步之赐。详细的插图说明使读者能体验到星系际太空的广漠、黑洞的奇妙性质以及物质和反物质碰撞的粒子物理的微观世界。作为一本飨以读者宇宙学的最新理解的经典著作，《时间简史》插图本是探索时间和空间核心秘密的引人入胜的故事。'),
(7, '00000007', '什么是科学', '吴国盛', '科普', '广东人民出版社', './libs/upload/whatisscience.jpg', 132, '《什么是科学》内容简介：本书直面现今国人科学概念的误区，即要么把科学等同于技术，等同于促进生产力发展的工具，要么把科学看成一种普遍存在的人类智力成就。作者指出：科学成为推动历史发展的强大动力只是十九世纪以后的现象，科学根源于希腊人对于自由人性的追求，因而是一种十分罕见的文化现象。现代科学起源于希腊科学的复兴以及基督教内在的思想运动，对力量的追求、对自然的控制和征服成为现代科学的主导动机。在数理实验科学的意义上，中国古代并无科学。在博物学的意义上，中国古代有独特且强大的科学传统。'),
(8, '00000008', '人性的弱点', '戴尔·卡耐基 (Dale Carnegie)', '励志', '中国友谊出版公司', './libs/upload/humanweakness.jpg', 55, '这本书没有解决任何深奥的宇宙问题，但他却实实在在地影响和改变了无数普通人的命运，让他们获得了他人的尊重。\r\n虽然它已经出版了将近一个世纪，但是这些饱含理性光辉的生命智慧，仍然可以帮你走出困境、解决问题。\r\n对于任何人来说，这份来自于人类思想深处的礼物，都可以滋润你的修养，让你的阅历丰盈。 ');

-- --------------------------------------------------------

--
-- 表的结构 `borrowtb`
--

CREATE TABLE `borrowtb` (
  `id` int(11) NOT NULL,
  `borrow_number` varchar(32) NOT NULL,
  `borrow_title` varchar(32) NOT NULL,
  `borrow_user` varchar(32) NOT NULL,
  `borrow_uid` varchar(32) NOT NULL,
  `borrow_phone` varchar(32) NOT NULL,
  `borrow_starttime` varchar(32) NOT NULL,
  `borrow_length` int(11) NOT NULL,
  `borrow_status` varchar(32) NOT NULL,
  `borrow_returntime` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `borrowtb`
--

INSERT INTO `borrowtb` (`id`, `borrow_number`, `borrow_title`, `borrow_user`, `borrow_uid`, `borrow_phone`, `borrow_starttime`, `borrow_length`, `borrow_status`, `borrow_returntime`) VALUES
(12, '00000004', '活着', '杨琢', '00000007', '13633333333', '2016-09-10', 15, '已归还', '2016-09-22'),
(13, '00000002', '我们仨', '杨琢', '00000007', '13633333333', '2016-09-11', 30, '已归还', '2016-09-21'),
(14, '00000003', '好吗好的', '杨琢', '00000007', '13633333333', '2016-09-11', 60, '已归还', '2016-09-22'),
(15, '00000006', '时间简史(插图本)', '杨琢', '00000007', '13633333333', '2016-09-12', 15, '已归还', '2016-09-22'),
(16, '00000002', '我们仨', '杨琢', '00000007', '13633333333', '2016-09-21', 15, '已归还', '2016-09-24'),
(20, '00000001', '看见', '杨琢', '00000007', '13633333333', '2016-09-22', 15, '已归还', '2016-09-28'),
(21, '00000004', '活着', '杨琢', '00000007', '13633333333', '2016-09-22', 15, '借阅中', ''),
(25, '00000002', '我们仨', '杨琢之', '00000008', '13233333333', '2016-09-24', 30, '借阅中', ''),
(26, '00000007', '什么是科学', '杨琢之', '00000008', '13233333333', '2016-09-24', 60, '借阅中', ''),
(27, '00000008', '人性的弱点', '杨琢', '00000007', '13633333333', '2016-09-28', 30, '借阅中', ''),
(28, '00000005', '从你的全世界路过', 'yz', '00000001', '13333333333', '2016-09-28', 15, '借阅中', '');

-- --------------------------------------------------------

--
-- 表的结构 `usertb`
--

CREATE TABLE `usertb` (
  `id` int(11) NOT NULL,
  `uid` varchar(16) NOT NULL,
  `username` varchar(32) NOT NULL,
  `password` varchar(32) NOT NULL,
  `name` varchar(32) NOT NULL,
  `phone` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `usertb`
--

INSERT INTO `usertb` (`id`, `uid`, `username`, `password`, `name`, `phone`) VALUES
(1, '00000001', 'yz', 'e10adc3949ba59abbe56e057f20f883e', 'yz', '13333333333'),
(7, '00000007', 'yzyz', 'e10adc3949ba59abbe56e057f20f883e', '杨琢', '13633333333'),
(8, '00000008', 'yzyzyz', 'e10adc3949ba59abbe56e057f20f883e', '杨琢之', '13233333333');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `addbooktb`
--
ALTER TABLE `addbooktb`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `admintb`
--
ALTER TABLE `admintb`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `applytb`
--
ALTER TABLE `applytb`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `booktb`
--
ALTER TABLE `booktb`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `borrowtb`
--
ALTER TABLE `borrowtb`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `usertb`
--
ALTER TABLE `usertb`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uid` (`uid`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `phone` (`phone`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `addbooktb`
--
ALTER TABLE `addbooktb`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- 使用表AUTO_INCREMENT `admintb`
--
ALTER TABLE `admintb`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- 使用表AUTO_INCREMENT `applytb`
--
ALTER TABLE `applytb`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- 使用表AUTO_INCREMENT `booktb`
--
ALTER TABLE `booktb`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- 使用表AUTO_INCREMENT `borrowtb`
--
ALTER TABLE `borrowtb`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
--
-- 使用表AUTO_INCREMENT `usertb`
--
ALTER TABLE `usertb`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
