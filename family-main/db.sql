drop table if exists family_fio cascade;
drop table if exists fammily_work cascade;
drop table if exists product cascade;
drop table if exists expence_product cascade;

CREATE table family_fio(
family_fio_id  serial primary key,
family_fio_name TEXT,
family_fio_date DATE
);

create table fammily_work(
fammily_work_id  serial primary key,
fammily_work_name_id INT,
foreign key (fammily_work_name_id) references family_fio(family_fio_id),
fammily_work_dolgnost TEXT,
fammily_work_organization TEXT,
fammily_work_salary INT,
fammily_work_date_start DATE
);

create table product(
product_id  serial primary key,
product_name TEXT,
product_categoria TEXT,
product_price INT
);

create table expence_product(
expence_product_id  serial  primary key,
expence_product_date DATE,
expence_product_name_id INT,
foreign key (expence_product_name_id) references family_fio(family_fio_id),
expence_product_prod_id INT,
foreign key (expence_product_prod_id) references product(product_id),
expence_product_number INT
);

insert into family_fio(family_fio_name, family_fio_date)values
('Иванов Иван Петрович','15-06-1985'),
('Иванова Мария Сергеевна','20-09-1987'),
('Иванов Алексей Иванович','05-02-2010'),
('Иванова Елена Викторовна','10-03-1959'),
('Петров Сергей Александрович','05-12-1982');

insert into fammily_work(fammily_work_name_id, fammily_work_dolgnost, fammily_work_organization, fammily_work_salary, fammily_work_date_start)values
(1,'Инженер','"ООО ""ТехноСервис"""',85000,'01-03-2015'),
(2,'Бухгалтер','"АО ""ФинансГрупп"""',75000,'15-04-2012'),
(4,'Репетитор','Частная практика',15000,'10-01-2020'),
(5,'Таксист','Индивидуальная работа',30000,'01-09-2020');

insert into product(product_name, product_categoria, product_price)values
('Хлеб','Продукты',50),
('Молоко','Продукты',80),
('Бензин','Транспорт',80),
('Билет в кино','Развлечения',300),
('Зимнее пальто','Одежда',8500),
('Учебники','Образование',400),
('Лекарства','Здоровье',25000),
('Погашение кредита','Кредиты',89000),
('Смартфон в подарок','Подарки',99900);

insert into expence_product(expence_product_date, expence_product_name_id, expence_product_prod_id, expence_product_number)values
('01-02-2025',1,1,2),
('01-02-2025',1,2,3),
('01-02-2025',1,2,1),
('06-02-2025',2,5,1),
('09-02-2025',5,3,30),
('12-02-2025',4,7,5),
('18-02-2025',1,8,1),
('22-02-2025',2,9,1),
('22-02-2025',3,4,1);