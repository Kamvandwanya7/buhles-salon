-- Table create scripts here


salon_test
sudo -u postgres createdb salon_test;
sudo -u postgres createdb buhle_salon;
sudo -u postgres createuser buhles -P;
password 'buhle123';



create table client(
id serial not null primary key,
first_name text not null,
last_name text not null,
phone_number int not null
);

create table treatment (
id serial not null primary key,
type text not null,
code text not null,
price int not null

);


create table stylist(
id serial not null primary key,
first_name text not null,
last_name text not null,
phone_number int not null,
commission_percentage float not null
);

create table booking(
id serial not null primary key,
booking_date  date not null,
booking_time  time not null,
client_id int not null,
treatment_id int not null,
stylist_id int not null

client_id -> this is a fk (foreign key)
treatment_id -> this is a fk
stylist_id -> this is a fk
)

create table date_test ( the_date date,  slot time  );

insert into date_test (the_date, slot) values ('2022-02-27', '07:00');

INSERT INTO treatment (type,code, price) values ('Pedicure', 'ZRQ','175');
INSERT INTO treatment (type,code, price) values ('Manicure',  'CDO','215');
INSERT INTO treatment (type,code, price) values ('Make_up',  'FGZ', '185');
INSERT INTO treatment (type,code, price) values ('Brows & Lashes', 'SZN','240');



INSERT INTO client (first_name, last_name, phone_number) values ('Zinwe', 'Nano', '0813244389');
INSERT INTO client (first_name, last_name, phone_number) values ('Phumza', 'Kose', '0712313349');
INSERT INTO client (first_name, last_name, phone_number) values ('Zamo', 'Muleka', '082317449');
INSERT INTO client (first_name, last_name, phone_number) values ('Zinzile', 'Nkosi', '0613311389');
INSERT INTO client (first_name, last_name, phone_number) values ('Siphe', 'Genu', '0813232449');
INSERT INTO client (first_name, last_name, phone_number) values ('Zizo', 'Peter', '0613214389');
INSERT INTO client (first_name, last_name, phone_number) values ('Nela', 'Green', '0843244389');
INSERT INTO client (first_name, last_name, phone_number) values ('Oyisa', 'Green', '0893244389');


INSERT INTO stylist (first_name, last_name, phone_number, commission_percentage) values ('Sherry', 'Gozo', '0823234389', '.15');
INSERT INTO stylist (first_name, last_name, phone_number, commission_percentage) values ('Nazo', 'Dayeni', '0833264389', '.19');
INSERT INTO stylist (first_name, last_name, phone_number, commission_percentage) values ('Libo', 'Khuzo', '0713243210', '.21');


INSERT INTO booking (booking_date, booking_time, client_id, treatment_id, stylist_id) VALUES ('2022-11-29', '09:00', '2', '3', '2')
