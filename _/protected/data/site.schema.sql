CREATE TABLE `tbl_categories` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
  `lang` VARCHAR( 30 ) NOT NULL ,
  `alias` VARCHAR( 30 ) NOT NULL ,
  `name` VARCHAR( 30 ) NOT NULL ,
  `price_sum` INT NOT NULL,
  `funders_amount` INT NOT NULL,
  `is_active` INT NOT NULL ,
  `description` VARCHAR( 250 ) NULL,
  `date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_modified` TIMESTAMP NULL,
  INDEX ( `alias`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `tbl_user_category` (
`user_id` INT NOT NULL ,
`category_id` INT NOT  NULL ,
PRIMARY KEY ( `user_id` , `category_id` )
) ENGINE = InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

  CREATE TABLE IF NOT EXISTS tbl_profile (
	`id` int(10) NOT NULL PRIMARY KEY,
	`linkedin_uid` VARCHAR( 250 ) NULL,
	`twitter_uid` VARCHAR( 250 ) NULL,
	`about_me` TEXT NULL,
	`email_me_meessage` BOOLEAN NULL,
	`email_me_startups` BOOLEAN NULL
) ENGINE = InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS tbl_startups
(
	`id` int(10) NOT NULL auto_increment,
	`name` varchar(125) NOT NULL default '',
	`site` varchar(256) NULL default '',
	`request_details` TEXT NULL default '',
	`short_content` TEXT NULL default '',
	`full_content` TEXT NULL default '',
	`comment` TEXT  NULL default '',
    `date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `date_modified` TIMESTAMP NULL,
    `user_created` INT NULL,
    `category_id` INT NULL,
    `is_active` INT NULL,
    PRIMARY KEY (id),
    INDEX ( `name`, `is_active`)
) ENGINE = InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


CREATE TABLE IF NOT EXISTS `tbl_reasons` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reason_type_id` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `content` text COLLATE utf8_unicode_ci,
  `is_active` tinyint(1) NOT NULL,
  `index_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ;