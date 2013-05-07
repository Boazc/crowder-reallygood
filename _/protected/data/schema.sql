CREATE TABLE `tbl_codes_types` (
`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
`name`  VARCHAR( 100 ) NOT NULL,
`description` VARCHAR( 100 ) NULL ,
`is_active` INT NULL
) ENGINE = InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS `tbl_sessions` (
  `id` char(32) NOT NULL,
  `expire` int(11) DEFAULT NULL,
  `data` text,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

CREATE TABLE `tbl_name_codes` (
`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
`code_type_id` INT NOT NULL,
`name` VARCHAR( 100 ) NULL ,
`desc` VARCHAR( 200 ) NULL ,
`is_active` INT NULL,
INDEX ( `code_type_id`, `is_active`),
CONSTRAINT uc_name UNIQUE (code_type_id,name)
) ENGINE = InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `tbl_articles` (
`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
`title` VARCHAR( 100 ) NOT NULL ,
`small_content` VARCHAR( 200 ) NOT NULL ,
`full_content` TEXT  NOT NULL ,
`date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
`auther` VARCHAR( 100 ) NULL ,
`is_active` BOOL NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `tbl_apply_list` (
`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
`full_name` VARCHAR( 50 ) NOT NULL ,
`phone` VARCHAR( 15 )  NULL ,
`email` VARCHAR(128) NULL,
`apply_title` TEXT NOT NULL ,
`apply_content` TEXT NOT NULL ,
`ip_address` TEXT NOT NULL ,
`date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
`apply_status` TEXT NULL ,
`apply_closed` bool NULL
) ENGINE = InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `tbl_events` (
`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
`title` VARCHAR( 100 ) NOT NULL ,
`small_content` VARCHAR( 200 ) NOT NULL ,
`full_content` TEXT  NOT NULL ,
`event_date` TIMESTAMP NULL,
`date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
`is_active` BOOL NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `tbl_uploads` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
  `model_id` INT NOT NULL ,
  `model_name` VARCHAR( 20 ) NOT NULL ,
  `real_file_name` VARCHAR( 100 ) NOT NULL ,
  `file_name` VARCHAR( 100 ) NOT NULL ,
  `description` VARCHAR( 150 ) NULL,
  `date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX ( `model_id`, `model_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `tbl_manu_pages` (
`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
`manu_id` INT NOT NULL,
`static_page_id` INT NULL,
`name` VARCHAR( 100 ) NULL ,
`link` TEXT NULL,
`is_active` BOOL NOT NULL,
`index_id` INT NULL
) ENGINE = InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `tbl_metas` (
`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
`obj_name` VARCHAR( 100 ) NOT NULL ,
`obj_id` INT NOT NULL ,
`meta_desc` TEXT NULL ,
`meta_key_words` TEXT NULL ,
INDEX ( `obj_id` , `obj_name` )
) ENGINE = InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `tbl_images` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
  `model_id` INT NOT NULL ,
  `model_name` VARCHAR( 20 ) NOT NULL ,
`is_main_image` BOOL NULL,
`image_path` TEXT NOT NULL ,
`description` VARCHAR( 50 ) NULL,
`is_active` BOOL   NULL,
`index_id` INT NULL,
INDEX ( `model_id`, `model_name`, `is_main_image` )
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS tbl_members
(
	`id` int(10) NOT NULL auto_increment,
	`username` varchar(155) NOT NULL default '',
	`email` varchar(155) NOT NULL default '',
	`password` varchar(40) NOT NULL default '',
	`first_name` varchar(155) NOT NULL default '',
	`last_name` varchar(155) NOT NULL default '',
    `date_modified` TIMESTAMP NULL,
    `date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`passwordreset` varchar(40) NULL,
	`data` TEXT NULL,
	`role` varchar(30) NOT NULL default '',
	`ipaddress` varchar(30) NOT NULL default '',
	`fbuid` bigint(20) NOT NULL default '0',
	`fbtoken` varchar(255) NOT NULL default '',
	PRIMARY KEY (id),
	KEY username (username),
	KEY email (email),
	INDEX (`fbuid`)
) ENGINE = InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


CREATE TABLE `tbl_settingscats` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `title` varchar(125) NOT NULL DEFAULT '',
  `description` varchar(255) DEFAULT NULL,
  `groupkey` varchar(125) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `groupkey` (`groupkey`),
  KEY `title` (`title`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Dumping data for table `settingscats`
--

INSERT INTO `tbl_settingscats` VALUES(2, 'General Settings', 'General settings related to the entire application', 'general');
INSERT INTO `tbl_settingscats` VALUES(3, 'Contact Us Settings', 'Contact Us form and page settings', 'contactus');


CREATE TABLE IF NOT EXISTS tbl_settings
(
	id int(10) NOT NULL auto_increment,
	title varchar(125) NOT NULL default '',
	description text,
	cat_setting_id int(10) NOT NULL default '0',
	type char(30) NOT NULL default 'text',
	settingkey varchar(125) NOT NULL default '',
	default_value text,
	value text null,
	extra text,
	php text,
	PRIMARY KEY (id),
	KEY title (title),
	UNIQUE (settingkey)
) ENGINE = InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


INSERT INTO `tbl_settings` VALUES(13, 'Application (Site) Title', 'This is the default application (site) title.', 2, 'text', 'applicationName', 'My Site', 'Yiiframework.co.il', '', '');
INSERT INTO `tbl_settings` VALUES(14, 'Default Role ', 'Choose the default group for new users registered.', 2, 'dropdown', 'default_group', 'user', 'admin', '#show_roles#', '');
INSERT INTO `tbl_settings` VALUES(15, 'Incoming Email Address', 'Enter the incoming email address', 2, 'text', 'emailin', 'customers@yiiframework.co.il', 'customers@yiiframework.co.il', '', '');
INSERT INTO `tbl_settings` VALUES(16, 'Out Going Email Address', 'Enter the out going email address.', 2, 'text', 'emailout', 'support@yiiframework.co.il', 'support@yiiframework.co.il', '', '');
INSERT INTO `tbl_settings` VALUES(17, 'Subject Topics', 'Enter the subject topics. One per line.', 3, 'textarea', 'contactustopics', 'Support\r\nAffiliate\r\nBug Report\r\nDocumentation Bug Report\r\nBusiness Offers\r\nQuestions\r\nOther... ', NULL, '', '');
INSERT INTO `tbl_settings` VALUES(18, 'Email the submitted forms?', 'Do you wish to email the submitted forms to the support email address of the system?', 3, 'yesno', 'contactusemail', '1', NULL, '', '');
INSERT INTO `tbl_settings` VALUES(19, 'Latest News Category', 'Choose the category to grab the latest news from', 2, 'dropdown', 'latestnewscat', '0', '1', '#show_blogcats#', '');




CREATE TABLE tbl_sourcemessage
(
    id INTEGER PRIMARY KEY auto_increment,
    category VARCHAR(32),
    message TEXT
) ENGINE = InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE tbl_message
(
    id INTEGER auto_increment,
    language VARCHAR(16),
    translation TEXT,
    PRIMARY KEY (id, language)
) ENGINE = InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

drop table if exists `tbl_AuthAssignment`;
drop table if exists `tbl_AuthItemChild`;
drop table if exists `tbl_AuthItem`;

create table `tbl_AuthItem`
(
   `name`                 varchar(64) not null,
   `type`                 integer not null,
   `description`          text,
   `bizrule`              text,
   `data`                 text,
   primary key (`name`)
) ENGINE = InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

create table `tbl_AuthItemChild`
(
   `parent`               varchar(64) not null,
   `child`                varchar(64) not null,
   primary key (`parent`,`child`),
   foreign key (`parent`) references `tbl_AuthItem` (`name`) on delete cascade on update cascade,
   foreign key (`child`) references `tbl_AuthItem` (`name`) on delete cascade on update cascade
) ENGINE = InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

create table `tbl_AuthAssignment`
(
   `itemname`             varchar(64) not null,
   `userid`               varchar(64) not null,
   `bizrule`              text,
   `data`                 text,
   primary key (`itemname`,`userid`),
   foreign key (`itemname`) references `tbl_AuthItem` (`name`) on delete cascade on update cascade
) ENGINE = InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS tbl_settings
(
	id int(10) NOT NULL auto_increment,
	title varchar(125) NOT NULL default '',
	description text,
	cat_setting_id int(10) NOT NULL default '0',
	type char(30) NOT NULL default 'text',
	settingkey varchar(125) NOT NULL default '',
	default_value text,
	value text null,
	extra text,
	php text,
	PRIMARY KEY (id),
	KEY title (title),
	UNIQUE (settingkey)
) ENGINE = InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS tbl_custompages
(
	id int(10) NOT NULL auto_increment,
	title varchar(255) NOT NULL default '',
	alias varchar(250) NOT NULL default '',
	content text NULL,
	dateposted int(10) NOT NULL default '0',
	authorid int(10) NOT NULL default '0',
	last_edited_date int(10) NOT NULL default '0',
	last_edited_author int(10) NOT NULL default '0',
	tags varchar(255) NOT NULL default '',
	language varchar(125) NOT NULL default '',
	metadesc varchar(255) NOT NULL default '',
	metakeys varchar(255) NOT NULL default '',
	visible text NULL,
	status tinyint(1) NOT NULL default '0',
	PRIMARY KEY (id),
	KEY title (title),
	UNIQUE (alias, language)
)  ENGINE = InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `tbl_custompagesMy` (
`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
`name` VARCHAR( 100 ) NOT NULL ,
`alias` VARCHAR( 50 ) NOT NULL ,
 `language` VARCHAR(16),
`content` TEXT  NULL,
`father_page_id` INT NULL,
`subject_id` INT NULL,
`authorid` INT NULL,
`user_modified` INT NULL,
`date_modified` TIMESTAMP NULL,
`visible` text NULL,
`is_active` BOOL NOT NULL
) ENGINE = InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS tbl_contactus
(
	id int(10) NOT NULL auto_increment,
	name varchar(55) NOT NULL default '',
	email varchar(55) NOT NULL default '',
	subject varchar(55) NOT NULL default '',
	content TEXT NULL,
	postdate int(10) NOT NULL default '0',
	sread tinyint(1) NOT NULL default '0',
	PRIMARY KEY (id),
	KEY email (email),
	KEY subject (subject),
	KEY name (name)
) ENGINE = InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS tbl_newsletters
(
	id int(10) NOT NULL auto_increment,
	email varchar(125) NOT NULL default '',
	joined int(10) NOT NULL default '0',
	PRIMARY KEY (id),
	KEY joined (joined),
	KEY email (email)
) ENGINE = InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



