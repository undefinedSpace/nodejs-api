DROP TABLE IF EXISTS `events`;
CREATE TABLE `events` (
  `id`          INT(11) NOT NULL,
  `description` TEXT    NOT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO events (`id`, `description`) VALUES ('0', 'IS_EMPTY');
INSERT INTO events (`id`, `description`) VALUES ('1', 'INPUT_IS_EMPTY');
INSERT INTO events (`id`, `description`) VALUES ('2', 'OUTPUT_IS_EMPTY');
INSERT INTO events (`id`, `description`) VALUES ('3', 'IS_CREATED');
INSERT INTO events (`id`, `description`) VALUES ('4', 'IS_DELETED');
INSERT INTO events (`id`, `description`) VALUES ('5', 'NEW_NAME');
INSERT INTO events (`id`, `description`) VALUES ('6', 'NEW_TIME');
INSERT INTO events (`id`, `description`) VALUES ('7', 'IS_EQUAL');

DROP TABLE IF EXISTS `file_changes`;
CREATE TABLE `file_changes` (
  `id`       BIGINT(22) NOT NULL AUTO_INCREMENT,
  `id_file`  BIGINT(22) NOT NULL, /*id файла, который изменился*/
  `id_event` BIGINT(22) NOT NULL DEFAULT 0, /*тип изменения (создан/удалён/изменён)*/
  `time`     TIMESTAMP  NOT NULL, /*время изменения в тиках*/
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `folder_changes`;
CREATE TABLE `folder_changes` (
  `id`        BIGINT(22) NOT NULL AUTO_INCREMENT,
  `id_folder` BIGINT(22) NOT NULL, /*id папки, которая изменилась*/
  `id_event`  BIGINT(22) NOT NULL DEFAULT 0, /*тип изменения (создана/удалена/переименована)*/
  `time`      TIMESTAMP  NOT NULL, /*время изменения в тиках*/
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `files`;
CREATE TABLE `files` (
  `id`        BIGINT(22) NOT NULL AUTO_INCREMENT,
  `id_server` INT(11)    NOT NULL,
  `inode`     BIGINT(22), /*inode меняется на NULL при удалении файла*/
  `name`      TEXT       NOT NULL,
  `id_parent` BIGINT(22) NOT NULL, /*id папки-владельца файла*/
  `hash`      BIGINT(22) NOT NULL, /* hash сумма */
  `deleted`   BOOL       NOT NULL DEFAULT FALSE,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `folders`;
CREATE TABLE `folders` (
  `id`        BIGINT(22) NOT NULL AUTO_INCREMENT,
  `id_server` INT(11)    NOT NULL,
  `inode`     BIGINT(22), /*inode меняется на NULL при удалении папки*/
  `name`      TEXT       NOT NULL,
  `id_parent` BIGINT(22) NOT NULL, /*id папки-владельца файла*/
  `hash`      BIGINT(22) NOT NULL, /* hash сумма */
  `deleted`   BOOL       NOT NULL DEFAULT FALSE,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `projects`;
CREATE TABLE `projects` (
  `id`         INT(11)   NOT NULL AUTO_INCREMENT,
  `id_folder`  INT(11)   NOT NULL, /*id папки отслеживаемого проекта*/
  `id_server`  INT(11)   NOT NULL,
  `path`       TEXT      NOT NULL, /*полный путь к отслеживаемому проекту (без названия папки)*/
  `time_start` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, /*время начала наблюдения за папкой*/
  `time_stop`  TIMESTAMP, /*время окончания наблюдения (когда наблюдение полностью отменяется)*/
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `servers`;
CREATE TABLE `servers` (
  `id`       INT(11) NOT NULL AUTO_INCREMENT,
  `ip`       TEXT    NOT NULL,
  `hostname` TEXT    NOT NULL,
  `token`    TEXT    NOT NULL,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `accord_folders`;
CREATE TABLE `accord_folders` (
  `id_folder`  BIGINT(22) NOT NULL,
  `id_project` INT(11)    NOT NULL,
  PRIMARY KEY (`id_folder`, `id_project`)
);

DROP TABLE IF EXISTS `accord_files`;
CREATE TABLE `accord_files` (
  `id_file`    BIGINT(22) NOT NULL,
  `id_project` INT(11)    NOT NULL,
  PRIMARY KEY (`id_file`, `id_project`)
);
