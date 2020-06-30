create database parkinglot default character set utf8;

create table member (
    `memberId` INT AUTO_INCREMENT,
    `carNumber` VARCHAR(7) NOT NULL,
    `name` VARCHAR(10) NOT NULL,
    `mobile` VARCHAR(15) NOT NULL,
    `startDate` DATE NOT NULL,
    `expireDate` DATE NOT NULL,
    PRIMARY KEY (`memberId`)
)

create table user (
    `userId` INT AUTO_INCREMENT,
    `carNumber` VARCHAR(7) NOT NULL,
    `entryTime` datetime,
    `exitTime` timestamp NULL,
    `paid` INT NULL,
    `memberId` INT NULL,
    PRIMARY KEY (`userId`),
    FOREIGN KEY (`memberId`) references member (`memberId`)
)

insert into member (carNumber, name, mobile, startDate, expireDate) values ('00영0000', '비회원', '010-0000-0000', '2020-06-01', '2020-12-31')
delete from member where carNumber = '12가1234'
alter table member auto_increment = 1;


ALTER TABLE `user` CHANGE `startTime` `startTime` TIMESTAMP ON UPDATE CURRENT_TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL

alter table `user` change `startTime` `entryTime` TIMESTAMP ON UPDATE CURRENT_TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL 

select * from user where entryTime between '2020-06-13 00:00:00' and '2020-06-13 23:59:59' 

UPDATE user SET exitTime=NOW() WHERE carNumber = '23라2222' and entryTime = '2020-06-13 13:07:31'

insert into user (carNumber, entryTime, paid, memberId) values ('11일1111', '2020-06-25 01:30:01', 0, 1)

ALTER TABLE `user` CHANGE `exitTime` `exitTime` TIMESTAMP ON UPDATE CURRENT_TIMESTAMP DEFAULT CURRENT_TIMESTAMP NULL
ALTER TABLE `user` CHANGE `entryTime` `entryTime` datetime not NULL
ALTER TABLE `user` CHANGE `entryTime` `entryTime` timestamp default CURRENT_TIMESTAMP not NULL
alter table 'user' modify `entryTime` `datetime` not null


ALTER TABLE `user` CHANGE `entryTime` `entryTime` timestamp default CURRENT_TIMESTAMP not NULL
ALTER TABLE `user` CHANGE `exitTime` `exitTime` timestamp default CURRENT_TIMESTAMP NULL