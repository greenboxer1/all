create table product_type (
product_type_id serial primary key,
product_type_prduct TEXT unique NOT NULL,
coeficent numeric (5,2)
);
create table products (
products_id serial primary key,
products_type TEXT NOT null,
foreign key (products_type) references product_type(product_type_prduct),
products_name TEXT NOT NULL unique,
products_articul INT,
products_min_price numeric(10,2)
);

create table partners (
partners serial primary key,
partners_type TEXT NOT NULL,
partners_name TEXT NOT nULL unique,
partners_name_director TEXT NOT NULL,
partners_email TEXT NOT NULL,
partners_namber TEXT NOT NULL,
partners_adress text NOT NULL,
partners_inn INT NOT NULL,
partners_reiting INT NOT NULL
);

create table partner_products (
partner_products serial primary key,
partner_products_product TEXT not null,
foreign key (partner_products_product) references products(products_name),
partner_products_name TEXT NOT nULL,
foreign key (partner_products_name) references partners(partners_name),
partner_products_sum INT,
partner_products_sale DATE
);


INSERT INTO product_type(product_type_prduct, coeficent ) VALUES
('Ламинат','2.35'),
('Массивная доска','5.15'),
('Паркетная доска','4.34'),
('Пробковое покрытие','1.5');

INSERT INTO products(products_type, products_name, products_articul, products_min_price)VALUES
('Паркетная доска','Паркетная доска Ясень темный однополосная 14 мм','8758385','4456.90'),
('Паркетная доска','Инженерная доска Дуб Французская елка однополосная 12 мм','8858958','7330.99'),
('Ламинат','Ламинат Дуб дымчато-белый 33 класс 12 мм','7750282','1799.33'),
('Ламинат','Ламинат Дуб серый 32 класс 8 мм с фаской','7028748','3890.41'),
('Пробковое покрытие','Пробковое напольное клеевое покрытие 32 класс 4 мм','5012543','5450.59');

INSERT INTO partners(partners_type, partners_name, partners_name_director, partners_email, partners_namber, partners_adress, partners_inn, partners_reiting)  VALUES
('ЗАО','База Строитель','Иванова Александра Ивановна','aleksandraivanova@ml.ru','493 123 45 67','652050, Кемеровская область, город Юрга, ул. Лесная, 15',2222455179,7),
('ООО','Паркет 29','Петров Василий Петрович','vppetrov@vl.ru','987 123 56 78','164500, Архангельская область, город Северодвинск, ул. Строителей, 18',3333888520,7),
('ПАО','Стройсервис','Соловьев Андрей Николаевич','ansolovev@st.ru','812 223 32 00','188910, Ленинградская область, город Приморск, ул. Парковая, 21',4440391035,7),
('ОАО','Ремонт и отделка','Воробьева Екатерина Валерьевна','ekaterina.vorobeva@ml.ru','444 222 33 11','143960, Московская область, город Реутов, ул. Свободы, 51',1111520857,5),
('ЗАО','МонтажПро','Степанов Степан Сергеевич','stepanov@stepan.ru','912 888 33 33','309500, Белгородская область, город Старый Оскол, ул. Рабочая, 122',5552431140,10);

INSERT INTO partner_products(partner_products_product, partner_products_name,partner_products_sum, partner_products_sale) VALUES
('Паркетная доска Ясень темный однополосная 14 мм','База Строитель',15500,'23-03-2023'),
('Ламинат Дуб дымчато-белый 33 класс 12 мм','База Строитель',12350,'18-12-2023'),
('Ламинат Дуб серый 32 класс 8 мм с фаской','База Строитель',37400,'07-06-2024'),
('Инженерная доска Дуб Французская елка однополосная 12 мм','Паркет 29',35000,'02-12-2022'),
('Пробковое напольное клеевое покрытие 32 класс 4 мм','Паркет 29',1250,'17-05-2023'),
('Ламинат Дуб дымчато-белый 33 класс 12 мм','Паркет 29',1000,'07-06-2024'),
('Паркетная доска Ясень темный однополосная 14 мм','Паркет 29',7550,'01-07-2024'),
('Паркетная доска Ясень темный однополосная 14 мм','Стройсервис',7250,'22-01-2023'),
('Инженерная доска Дуб Французская елка однополосная 12 мм','Стройсервис',2500,'05-07-2024'),
('Ламинат Дуб серый 32 класс 8 мм с фаской','Ремонт и отделка',59050,'20-03-2023'),
('Ламинат Дуб дымчато-белый 33 класс 12 мм','Ремонт и отделка',37200,'12-03-2024'),
('Пробковое напольное клеевое покрытие 32 класс 4 мм','Ремонт и отделка',4500,'14-05-2024'),
('Ламинат Дуб дымчато-белый 33 класс 12 мм','МонтажПро',50000,'19-09-2023'),
('Ламинат Дуб серый 32 класс 8 мм с фаской','МонтажПро',670000,'10-11-2023'),
('Паркетная доска Ясень темный однополосная 14 мм','МонтажПро',35000,'15-04-2024'),
('Инженерная доска Дуб Французская елка однополосная 12 мм','МонтажПро',25000,'12-06-2024');