USE tjk_db;

CREATE TABLE legal_desc(ldid INT, snum INT, lot CHAR(10), block CHAR(10), subdivision VARCHAR(50), plat CHAR(10), page CHAR(10), county CHAR(20), PRIMARY KEY(ldid), FOREIGN KEY(snum) REFERENCES survey(snum));

CREATE TABLE lender (lid SMALLINT NOT NULL AUTO_INCREMENT, name VARCHAR(50), PRIMARY KEY (lid));

CREATE TABLE underwriter (uid SMALLINT NOT NULL AUTO_INCREMENT, name VARCHAR(50), PRIMARY KEY (uid));

CREATE TABLE elevation(elev_id INT, snum INT, flood_zone CHAR(2), baseflood CHAR(4), community INT, panel CHAR(5), firm_date CHAR(10), PRIMARY KEY(elev_id), FOREIGN KEY(snum) REFERENCES survey(snum));

CREATE TABLE company(cid SMALLINT NOT NULL AUTO_INCREMENT, name VARCHAR(50), address VARCHAR(100), city VARCHAR(30), state CHAR(2), phone CHAR(12), attention char(20), PRIMARY KEY(cid));

CREATE TABLE survey(snum INT NOT NULL auto_increment, elev_id INT, ldid INT, buyer VARCHAR(100), address VARCHAR(100), city VARCHAR(30), state CHAR(2), 
date_ordered DATE, date_needed DATE, date_completed DATE, date_paid DATE, date_delivered DATE, comment VARCHAR(255), canceled BOOL, PRIMARY KEY(snum));


CREATE TABLE user(uuid VARCHAR(30) NOT NULL, cid SMALLINT, name VARCHAR(30), email VARCHAR(50), admin BOOL, PRIMARY KEY(uuid), FOREIGN KEY (cid) REFERENCES company(cid));

CREATE TABLE employee(ssn SMALLINT NOT NULL, name VARCHAR(30) NOT NULL, hourly_rate float, phone CHAR(12), PRIMARY KEY(ssn));

CREATE TABLE ordered (cid SMALLINT NOT NULL, snum INT NOT NULL, PRIMARY KEY(cid, snum), foreign key(cid)references company(cid),
foreign key(snum) references survey(snum));

UPDATE `tjk_db`.`survey` SET `buyer`='Jim Tester' WHERE `snum`='180032';