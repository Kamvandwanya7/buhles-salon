const assert = require('assert');
const SalonBooking = require('../salon-booking.js');
const pgPromise = require('pg-promise');

// TODO configure this to work.
const DATABASE_URL = process.env.DATABASE_URL || "postgresql://buhles:b123@localhost:5432/salon_test";
// const DATABASE_URL= process.env.DATABASE_URL || "postgresql://zuggs:suggest123@localhost:5432/spaza_suggest";


const config = {
    connectionString: DATABASE_URL
}

const pgp = pgPromise();
const db = pgp(config);

let booking = SalonBooking(db);

describe("The Booking Salon", function () {

    beforeEach(async function () {

        await db.none(`delete from booking`);

    });

    it("should be able to list treatments", async function () {

        const treatments = await booking.findAllTreatments();

        assert.deepEqual([{
            type: 'Pedicure'
        },
        {
            type: 'Manicure'
        },
        {
            type: 'Make_up'
        },
        {
            type: 'Brows & Lashes'
        }], treatments);
    });

    it("should be able to find a stylist", async function () {

        const stylist = await booking.findStylist("0823234389");
        assert.deepEqual({
            commission_percentage: 0.15,
            first_name: 'Sherry',
            id: 1,
            last_name: 'Gozo',
            phone_number: 823234389
        }, stylist);
    });

    it("should be able to allow a client to make a booking", async function () {
        // const client = await booking.findClient1("0813244389");

        const bookingss = await booking.makeBooking("2022-10-29", "09:00", "2", "2", "2");
        const bookings = await booking.findClientBookings("2");
        // console.log(bookings);
        assert.deepEqual([{
            booking_date: new Date('2022-10-28T22:00:00.000Z'),
            booking_time: '09:00:00',
            client_id: 2,
            id: 162,
            stylist_id: 2,
            treatment_id: 2
        }], bookings);
    });

    it("should be able to get client booking(s)", async function () {

        const client1 = await booking.findClient("0813232449");
        const client2 = await booking.findClient("0893244389");

        const treatment1 = await booking.findTreatment("FGZ");
        const treatment2 = await booking.findTreatment("SZN");

        await booking.makeBooking("2022-11-29", "10:00", "3", "4", "1");
        await booking.makeBooking("2022-11-29", "13:00", "4", "4", "1");
        await booking.makeBooking("2022-12-01", "12:00", "3", "7", "1");

        const clientBooking = await booking.findAllBookings("4");

        assert.deepEqual([{
            booking_date: new Date('2022-11-28T22:00:00.000Z'),
            booking_time: '13:00:00'
        }], clientBooking)
    })

    it("should be able to get bookings for a date", async function () {
        const client1 = await booking.findClient("0813232449");
        const client2 = await booking.findClient("0893244389");

        const treatment1 = await booking.findTreatment("FGZ");
        const treatment2 = await booking.findTreatment("SZN");

        await booking.makeBooking("2022-11-29", "10:00", "3", "4", "1");
        await booking.makeBooking("2022-11-29", "13:00", "4", "4", "1");
        await booking.makeBooking("2022-12-01", "12:00", "3", "7", "1");

        const bookings = await booking.findAllBookings('2022-11-29');

        assert.equal([''], bookings);

    });

    it("should be able to find the total income for a day", function () {
        assert.equal(1, 2);
    })

    it("should be able to find the most valuable client", function () {
        assert.equal(1, 2);
    })
    it("should be able to find the total commission for a given stylist", function () {
        assert.equal(1, 2);
    })


    it("should be able to find a client by phone", async function () {

        const client = await booking.findClient("0712313349");
        assert.deepEqual({
            "first_name": "Phumza",
            "id": 2,
            "last_name": "Kose",
            "phone_number": 712313349
        }, client);
    });



    it("should be able to find a treatment by code", async function () {

        const treatment = await booking.findTreatment("CDO");
        assert.deepEqual({ "type": "Manicure" }, treatment);
    });



    after(function () {
        db.$pool.end()
    });

});