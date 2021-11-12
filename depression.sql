-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 27, 2021 at 05:56 PM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 7.4.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `depression`
--

-- --------------------------------------------------------

--
-- Table structure for table `faculty`
--

CREATE TABLE `faculty` (
  `faculty_id` int(11) NOT NULL,
  `faculty_name` varchar(180) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `faculty`
--

INSERT INTO `faculty` (`faculty_id`, `faculty_name`) VALUES
(1, 'ผลิตกรรมการเกษตร'),
(2, 'วิศวกรรมและอุตสาหกรรมเกษตร'),
(3, 'วิทยาศาสตร์'),
(4, 'วิทยาลัยบริหารศาสตร์'),
(5, 'บริหารธุรกิจ'),
(6, 'พัฒนาการท่องเที่ยว'),
(7, 'เทคโนโลยีการประมงและทรัพยากรทางน้ำ'),
(8, 'เศรษฐศาสตร์'),
(9, 'ศิลปศาสตร์'),
(10, 'วิทยาลัยพลังงานทดแทน'),
(11, 'สารสนเทศและการสื่อสาร'),
(12, 'สถาปัตยกรรมศาสตร์และการออกแบบสิ่งแวดล้อม'),
(13, 'สัตวศาสตร์และเทคโนโลยี'),
(71, 'พยาบาลศาสตร์');

-- --------------------------------------------------------

--
-- Table structure for table `history`
--

CREATE TABLE `history` (
  `history_id` int(10) NOT NULL,
  `createtime` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `symptom_id` int(10) NOT NULL,
  `sum_question2` int(2) NOT NULL,
  `sum_question9` int(3) NOT NULL,
  `phase_id` int(11) NOT NULL,
  `trace_id` int(10) NOT NULL,
  `ID` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `history`
--

INSERT INTO `history` (`history_id`, `createtime`, `symptom_id`, `sum_question2`, `sum_question9`, `phase_id`, `trace_id`, `ID`) VALUES
(181, '2021-07-20 03:09:49', 2, 1, 9, 23, 1, '6004101392'),
(184, '2021-07-20 02:24:44', 3, 1, 13, 23, 1, '6004101399'),
(185, '2021-07-21 15:22:57', 4, 1, 27, 24, 1, '6004101392'),
(186, '2021-07-21 15:52:26', 3, 1, 18, 24, 1, '6004101392'),
(187, '2021-07-22 17:54:46', 3, 1, 17, 25, 1, '6004101392'),
(188, '2021-07-23 08:00:31', 0, 0, 0, 25, 1, '6004101392');

-- --------------------------------------------------------

--
-- Table structure for table `nametitle`
--

CREATE TABLE `nametitle` (
  `nametitle_id` int(11) NOT NULL,
  `nametitle` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `nametitle`
--

INSERT INTO `nametitle` (`nametitle_id`, `nametitle`) VALUES
(20, 'นาย'),
(21, 'นาง'),
(22, 'นางสาว');

-- --------------------------------------------------------

--
-- Table structure for table `phase`
--

CREATE TABLE `phase` (
  `phase_id` int(11) NOT NULL,
  `phase` varchar(50) NOT NULL,
  `start` date NOT NULL,
  `end` date NOT NULL,
  `created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `phase`
--

INSERT INTO `phase` (`phase_id`, `phase`, `start`, `end`, `created`) VALUES
(23, '1/2564', '2021-07-05', '2021-11-08', '2021-07-20 02:47:49'),
(24, '2/2564', '2021-07-01', '2021-07-31', '2021-07-21 16:52:23'),
(25, '3/2564', '2021-07-21', '2021-07-30', '2021-07-21 16:51:19');

-- --------------------------------------------------------

--
-- Table structure for table `program`
--

CREATE TABLE `program` (
  `program_id` int(11) NOT NULL,
  `program_name` varchar(180) NOT NULL,
  `course` int(11) NOT NULL,
  `faculty_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `program`
--

INSERT INTO `program` (`program_id`, `program_name`, `course`, `faculty_id`) VALUES
(1, 'การส่งเสริมและสื่อสารเกษตร', 4, 1),
(2, 'เกษตรเคมี', 4, 1),
(3, 'พืชไร่', 4, 1),
(4, 'พืชสวน สาขาพืชผัก', 4, 1),
(5, 'พืชสวน สาขาพืชสวนประดับ', 4, 1),
(6, 'พืชสวน สาขาไม้ผล', 4, 1),
(7, 'วิทยาการสมุนไพร', 4, 1),
(8, 'วิทยาศาสตรบัณฑิต สาขาวิชาการพัฒนาส่งเสริมและนิเทศศาสตร์เกษตร', 4, 1),
(9, 'วิทยาศาสตรบัณฑิต (เกษตรศาสตร์) สาขาวิชาปฐพีศาสตร์', 4, 1),
(10, 'อารักขาพืช', 4, 1),
(11, 'การส่งเสริมและสื่อสารเกษตร (2ปี)', 2, 1),
(12, 'พืชไร่ (2ปี)', 2, 1),
(13, 'วิทยาศาสตรบัณฑิต สาขาวิชาการพัฒนาส่งเสริมและนิเทศศาสตร์เกษตร (2ปี)', 2, 1),
(14, 'ปฐพีศาสตร์', 4, 1),
(15, 'เทคโนโลยียางและพอลิเมอร์', 4, 2),
(16, 'เทคโนโลยีหลังการเก็บเกี่ยว', 4, 2),
(17, 'วิทยาศาสตร์และเทคโนโลยีการอาหาร', 4, 2),
(18, 'วิศวกรรมเกษตร', 4, 2),
(19, 'วัสดุศาสตร์', 4, 3),
(20, 'คณิตศาสตร์', 4, 3),
(21, 'เคมีอุตสาหกรรมและเทคโนโลยีสิ่งทอ', 4, 3),
(22, 'เทคโนโลยีชีวภาพ', 4, 3),
(23, 'เทคโนโลยีสารสนเทศ', 4, 3),
(24, 'ฟิสิกส์ประยุกต์', 4, 3),
(25, 'วิทยาการคอมพิวเตอร์', 4, 3),
(26, 'วิทยาศาสตรบัณฑิต สาขาวิชาเคมี', 4, 3),
(27, '	สถิติ', 4, 3),
(28, 'รัฐประศาสนศาสตร์', 4, 4),
(29, '	รัฐประศาสนศาสตรบัณฑิต สาขาวิชาการบริหารท้องถิ่น', 4, 4),
(30, '	รัฐศาสตร์', 4, 4),
(31, '	นวัตกรรมธุรกิจค้าปลีกสมัยใหม่', 4, 5),
(32, '		บริหารธุรกิจ (การเงิน)', 4, 5),
(33, '	บริหารธุรกิจ (การจัดการ)', 4, 5),
(34, '	บริหารธุรกิจ (การตลาด)', 4, 5),
(35, 'บัญชี (2ปี)', 2, 5),
(36, 'ระบบสารสนเทศทางธุรกิจ (2ปี)', 2, 5),
(37, '	การจัดการธุรกิจท่องเที่ยว', 4, 6),
(38, 'พัฒนาการท่องเที่ยว (2ปี)', 2, 6),
(39, 'การประมง', 4, 7),
(40, 'นวัตกรรมการจัดการธุรกิจประมง', 4, 7),
(41, '	วิทยาศาสตรบัณฑิต สาขาวิชาเศรษฐศาสตร์เกษตร ทรัพยากรและสิ่งแวดล้อม', 4, 8),
(42, '	เศรษฐศาสตร์', 4, 8),
(43, 'เศรษฐศาสตร์เกษตรและสิ่งแวดล้อม', 4, 8),
(44, '	เศรษฐศาสตร์ระหว่างประเทศ', 4, 8),
(45, 'เศรษฐศาสตร์สหกรณ์', 4, 8),
(46, '	นิเทศศาสตร์บูรณาการ', 4, 9),
(47, '	ภาษาไทยสำหรับชาวต่างประเทศ', 4, 9),
(48, 'ภาษาอังกฤษ', 4, 9),
(49, '	พลังงานทดแทน', 4, 10),
(50, 'วิศวกรรมการอนุรักษ์พลังงาน (2ปี)', 2, 10),
(51, 'การสื่อสารดิจิทัล (2ปี)', 2, 11),
(52, '	ภูมิสถาปัตยกรรมศาสตรบัณฑิต (ภูมิสถาปัตยกรรม)', 5, 12),
(53, '	สถาปัตยกรรมศาสตรบัณฑิต สาขาวิชาสถาปัตยกรรม', 5, 12),
(54, 'เทคโนโลยีภูมิทัศน์ (2ปี)', 2, 12),
(55, 'สัตวศาสตร์', 4, 13),
(56, '	สัตวศาสตร์ วิชาเอก การผลิตสุกร', 4, 13),
(57, '	สัตวศาสตร์ วิชาเอก โคนมและโคเนื้อ', 4, 13),
(58, '	สัตวศาสตร์ วิชาเอก อาหารสัตว์', 4, 13),
(59, '	สัตวศาสตร์ วิชาเอกสัตว์ปีก', 4, 13),
(60, 'สัตวศาสตร์ วิชาเอกการผลิตสุกร (2ปี)', 2, 13),
(61, 'สัตวศาสตร์ วิชาเอกโคนมและโคเนื้อ (2ปี)', 2, 13),
(108, 'สาขา 1', 0, 71);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `role_id` int(11) NOT NULL,
  `role` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`role_id`, `role`) VALUES
(1, 'user'),
(2, 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `ID` varchar(11) NOT NULL,
  `Username` varchar(180) NOT NULL,
  `Password` varchar(180) NOT NULL,
  `Firstname` varchar(180) NOT NULL,
  `Lastname` varchar(180) NOT NULL,
  `Mobile` varchar(10) NOT NULL,
  `role_id` int(11) NOT NULL,
  `program_id` int(11) NOT NULL,
  `Active` tinyint(1) NOT NULL,
  `Access` tinyint(1) NOT NULL,
  `Years` int(11) NOT NULL,
  `nametitle_id` int(11) NOT NULL,
  `Email` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`ID`, `Username`, `Password`, `Firstname`, `Lastname`, `Mobile`, `role_id`, `program_id`, `Active`, `Access`, `Years`, `nametitle_id`, `Email`) VALUES
('01', 'Admin001', '$2b$08$UC04aDN2xZXCRj6r9.2YWe9YQIhhXDZkJBZmXwDyHjmXzkQt7bSQe', 'Admin', '001', '0989828666', 2, 25, 0, 0, 0, 22, 'Admin001@gmail.com'),
('02', 'Admin002', '$2b$08$n.P3TYxDdOFHMQ5y/ZvY1OpyRuch.qzLD9vL4TS2KLpjy23gWZQQS', 'Admin', '002', '0989828666', 2, 25, 0, 0, 0, 21, 'Admin002@gmail.com'),
('03', 'Admin003', '$2b$08$oZ1cl82rJHD8u2HXGZvYwu8YVMdnD6/ALhE4FQ5eL8E4HPOoaRfba', 'Admin', '003', '0989828666', 2, 25, 0, 0, 0, 20, 'Admin003@gmail.com'),
('04', 'Admin004', '$2b$08$oZ1cl82rJHD8u2HXGZvYwu8YVMdnD6/ALhE4FQ5eL8E4HPOoaRfba', 'Admin', '004', '0989828666', 2, 25, 0, 0, 0, 20, 'Admin004@gmail.com'),
('05', 'Admin005', '$2b$08$sEXo7TkMhZADLqPnPD3kH.xiG869qMcBsobq6/yquFi1LaKImk1jS', 'Admin', '005', '0989828666', 2, 25, 0, 0, 0, 20, 'Admin005@gmail.com'),
('06', 'Admin006', '$2b$08$oZ1cl82rJHD8u2HXGZvYwu8YVMdnD6/ALhE4FQ5eL8E4HPOoaRfba', 'Admin', '006', '0989828666', 2, 25, 0, 0, 0, 20, 'Admin006@gmail.com'),
('07', 'Admin007', '$2b$08$oZ1cl82rJHD8u2HXGZvYwu8YVMdnD6/ALhE4FQ5eL8E4HPOoaRfba', 'Admin', '007', '0989828666', 2, 25, 0, 0, 0, 20, 'Admin007@gmail.com'),
('08', 'Admin008', '$2b$08$oZ1cl82rJHD8u2HXGZvYwu8YVMdnD6/ALhE4FQ5eL8E4HPOoaRfba', 'Admin', '008', '0989828666', 2, 25, 0, 0, 0, 20, 'Admin008@gmail.com'),
('09', 'Admin009', '$2b$08$oZ1cl82rJHD8u2HXGZvYwu8YVMdnD6/ALhE4FQ5eL8E4HPOoaRfba', 'Admin', '009', '0989828666', 2, 25, 0, 0, 0, 20, 'Admin009@gmail.com'),
('6004101381', 'mju6004101381', '$2b$08$JNaULGOKRZvp2985/uRdi.7n7A/5b7iLh.yo9Le5knmhZPxN9y2Wq', 'ศราวุธ', 'กาติ๊บ', '0821547858', 1, 25, 0, 1, 60, 22, 'Anon@gmail.com'),
('6004101388', 'mju6004101388', '$2b$08$foXHhDEZrvpQqn0kmNxBc.YjMyWUu.58tTcdUBThOuFiw4He53jMa', 'สุธิราช', 'บุญเมืองขวา', '0854685898', 1, 10, 0, 1, 60, 20, 'Bas@gmail.com'),
('6004101389', 'mju6004101389', '$2b$08$F61Jk2ee.tau08zmnk.mcO/9wPqbVQ1I1xzI5JETYjsQxp4p35Ju.', 'สุทัศน์', 'สุริยะแก้ว', '0898975865', 1, 46, 0, 1, 60, 20, 'Tor@gmail.com'),
('6004101390', 'mju6004101390', '$2b$08$iGLiQMswn4gxL65yEEIOCesSMDntWmkuS2edih9FRWLLsb/.y1ODa', 'โสรยา', 'บุญหาร', '0897589898', 1, 24, 0, 1, 60, 22, 'new@gmail.com'),
('6004101392', 'mju6004101392', '$2b$08$tAccJG56fqn04BfdWFQifugyHi.3pHT7OutceSDq1pjm8YlCBKrOW', 'หลู่', 'คำแหลง', '0989828333', 1, 46, 1, 1, 60, 21, 'natthaphumingm@gmail.com'),
('6004101393', 'mju6004101393', '$2b$08$JRut1b6QZQBbbKxR185Ff.Su5T4G3aukQdLecl8BLlTUNBo/.Jeym', 'อนุพงษ์', 'อภิวงษ์', '0817830506', 1, 36, 0, 1, 60, 20, 'Bom@gmail.com'),
('6004101397', '6004101397', '$2b$08$qBeMeayXURP93NGI3u/1fuKixUyr6d1aXw4fag6RkugcJkzJdtzu6', 'หลู่', 'คำแหลง', '0989828333', 1, 42, 0, 1, 60, 20, 'teae@gmail.com'),
('6004101399', 'mju6004101399', '$2b$08$bt4ssKoYvIhvpfYkSy4o8OIjoWxl.BPBYHaa.fxmdy7AwQzemQ4l.', 'หลู่', 'คำแหลง', '0989828333', 1, 51, 1, 1, 60, 21, 'lu@gmail.com'),
('6101478589', 'mju6101478589', '$2b$08$YqcYbBFbVP5/hNtLKhvKmuNd/r/H0ODQ8ssJQ.5DzwRIqcuaQOIYS', 'ศักดา', 'ทองดี', '0989858666', 1, 51, 0, 1, 61, 20, 'Tongdee@gmail.com'),
('6104101387', 'mju6104101387', '$2b$08$iq98Lmb2iQbMw2qc5gGm7.2jaP6o6vcuZnHwbkKyc5Nu24UU7AZlS', 'สมศรี', 'มีงาน', '0656585444', 1, 47, 0, 1, 61, 21, 'Som@gmail.com'),
('6204101387', 'mju6204101387', '$2b$08$0WHT0Gd/fLcKCcMJehkFOetHh8Ff9rKRKSwKuLJWtKlCE73iSK2x2', 'ดวงดี', 'เงินหนา', '0987858666', 1, 33, 0, 1, 62, 22, 'Dong@gmail.com'),
('6304101259', 'mju6304101259', '$2b$08$Ise5irJYYhQL.s9QeCsgtONe8KLbUO88M8Qm6PWZ9eFM1orFU9TOm', 'การะเกด', 'แสงดี', '0686598777', 1, 54, 0, 1, 63, 22, 'Karaket@gmail.com'),
('6304101382', 'mju6304101382', '$2b$08$tJzFgSPnlddkfrK7fEogy.3V01gJd/b6wYrUWjoA7l7ztNxzvnq.m', 'นายก', 'บุญมา', '0987858589', 1, 39, 0, 1, 63, 20, 'York@gmail.com'),
('6401587882', 'mju6401587882', '$2b$08$i1vVGBK8fLkggIDj3J/fguOz3eJCNKxBIc3eEN3TkDQB9ZgKfqToi', 'จินดา', 'พาดี', '0686898777', 1, 41, 0, 1, 64, 22, 'Jinda@gmail.com'),
('6404102589', 'mju6404102589', '$2b$08$CVlqjSc/rulpx6/ozrfatODrMgMUyINKWJeVKgX1U08ITZv0fIMOi', 'สินดา', 'การิน', '0687858988', 1, 56, 0, 1, 64, 22, 'Sinda@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `symptom`
--

CREATE TABLE `symptom` (
  `symptom_id` int(10) NOT NULL,
  `symptom_name` varchar(180) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `symptom`
--

INSERT INTO `symptom` (`symptom_id`, `symptom_name`) VALUES
(0, 'ไม่มีอาการ'),
(1, 'คะแนน < 7 ไม่มีอาการของโรคซึมเศร้าหรือมีอาการของซึมเศร้า ระดับน้อยมาก'),
(2, 'คะแนน 7 - 12 มีอาการของโรคซึมเศร้า ระดับน้อย'),
(3, 'คะแนน 13 - 18 มีอาการของโรคซึมเศร้า ระดับปานกลาง'),
(4, 'คะแนน ≥ 19 มีอาการของโรคซึมเศร้า ระดับรุนแรง');

-- --------------------------------------------------------

--
-- Table structure for table `trace`
--

CREATE TABLE `trace` (
  `trace_id` int(10) NOT NULL,
  `trace_name` varchar(180) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `trace`
--

INSERT INTO `trace` (`trace_id`, `trace_name`) VALUES
(1, 'ยังไม่ติดตาม'),
(2, 'กำลังติดตาม'),
(3, 'ติดตามสำเร็จ');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `faculty`
--
ALTER TABLE `faculty`
  ADD PRIMARY KEY (`faculty_id`);

--
-- Indexes for table `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`history_id`),
  ADD KEY `question_id` (`symptom_id`),
  ADD KEY `phase_id` (`phase_id`),
  ADD KEY `trace_id` (`trace_id`),
  ADD KEY `ID` (`ID`);

--
-- Indexes for table `nametitle`
--
ALTER TABLE `nametitle`
  ADD PRIMARY KEY (`nametitle_id`);

--
-- Indexes for table `phase`
--
ALTER TABLE `phase`
  ADD PRIMARY KEY (`phase_id`);

--
-- Indexes for table `program`
--
ALTER TABLE `program`
  ADD PRIMARY KEY (`program_id`),
  ADD KEY `faculty_id` (`faculty_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `role_id` (`role_id`),
  ADD KEY `program_id` (`program_id`),
  ADD KEY `nametitle_id` (`nametitle_id`);

--
-- Indexes for table `symptom`
--
ALTER TABLE `symptom`
  ADD PRIMARY KEY (`symptom_id`);

--
-- Indexes for table `trace`
--
ALTER TABLE `trace`
  ADD PRIMARY KEY (`trace_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `faculty`
--
ALTER TABLE `faculty`
  MODIFY `faculty_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT for table `history`
--
ALTER TABLE `history`
  MODIFY `history_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=189;

--
-- AUTO_INCREMENT for table `nametitle`
--
ALTER TABLE `nametitle`
  MODIFY `nametitle_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `phase`
--
ALTER TABLE `phase`
  MODIFY `phase_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `program`
--
ALTER TABLE `program`
  MODIFY `program_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=109;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `symptom`
--
ALTER TABLE `symptom`
  MODIFY `symptom_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `trace`
--
ALTER TABLE `trace`
  MODIFY `trace_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `history`
--
ALTER TABLE `history`
  ADD CONSTRAINT `history_ibfk_5` FOREIGN KEY (`symptom_id`) REFERENCES `symptom` (`symptom_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `history_ibfk_6` FOREIGN KEY (`phase_id`) REFERENCES `phase` (`phase_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `history_ibfk_7` FOREIGN KEY (`trace_id`) REFERENCES `trace` (`trace_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `history_ibfk_8` FOREIGN KEY (`ID`) REFERENCES `student` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `program`
--
ALTER TABLE `program`
  ADD CONSTRAINT `program_ibfk_1` FOREIGN KEY (`faculty_id`) REFERENCES `faculty` (`faculty_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `student`
--
ALTER TABLE `student`
  ADD CONSTRAINT `student_ibfk_3` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `student_ibfk_4` FOREIGN KEY (`program_id`) REFERENCES `program` (`program_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `student_ibfk_5` FOREIGN KEY (`nametitle_id`) REFERENCES `nametitle` (`nametitle_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
