CREATE TABLE schedule (
  id int NOT NULL AUTO_INCREMENT,
  user_id int NOT NULL,
  year int NOT NULL,
  month tinyint NOT NULL,
  day tinyint NOT NULL,
  contents varchar(255) NOT NULL DEFAULT '',
  created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Schedule';

INSERT INTO schedule (user_id, year, month, day, contents) VALUES
(1, 2021, 1, 21, '仕事'),
(1, 2021, 1, 22, '仕事2'),
(1, 2021, 1, 23, '仕事3錬金');


-- 予定オブジェクト
-- ・ID（データベース側でUUIDやオートインクリメント）
-- ・入力ユーザー
-- ・年
-- ・月
-- ・日
-- ・予定内容