module.exports = function SalonBooking(db) {

    async function findStylist(phone_number) {
        let result = await db.oneOrNone('SELECT * FROM stylist WHERE phone_number= $1', [phone_number])
        return result
    }

    // async function findCLient1(phone_number) {
    //     let result = await db.oneOrNone('SELECT first_name, last_name, phone_number FROM client WHERE phone_number= $1', [phone_number])
    //     return result
    // }

    async function findClient(phone_number) {
        let result = await db.oneOrNone('SELECT * FROM client WHERE phone_number=$1', [phone_number])
        return result
    }

    async function findTreatment(code) {
        let result = await db.oneOrNone('SELECT type FROM treatment WHERE code=$1', [code])
        return result;
    }

    async function findAllTreatments() {
        let result = await db.manyOrNone('SELECT type FROM treatment')
        return result;
    }


    async function makeBooking(clientId, treatmentId, stylistId, date, time) {
       await db.oneOrNone('INSERT INTO booking (booking_date, booking_time, client_id, treatment_id, stylist_id) VALUES ($1, $2, $3, $4, $5)',[clientId, treatmentId, stylistId, date, time]) 
    }

    async function findAllBookings(date) {
        let result = await db.oneOrNone('SELECT * FROM booking WHERE booking_date=$1', [date])
        return result;
    }

    async function findClientBookings(clientId) {
        let result = await db.oneOrNone('SELECT * FROM booking WHERE client_id=$1', [clientId])
        return result;
    }


    async function findStylistsForTreatment(treatmentId) {
        let result = await db.oneOrNone('SELECT stylist_id FROM booking WHERE treatment_id=$1', [treatmentId])
        // SELECT stylist_id, treatment_id FROM booking join stylist.id on treatmentId.id = day_id where user_id = $1
        
        return result;
    }

    async function findAllBookings(date, time) {
            let result = await db.oneOrNone('SELECT booking_date, booking_time FROM booking WHERE client_id=$1', [date, time])
            return result;
        }


    async function totalIncomeForDay() {

    }

    async function mostValuebleClient() {

    }

    async function totalCommission() {

    }

    return {
        findStylist,
        findClient,
        findTreatment,
        findAllTreatments,
        findAllBookings,
        findClientBookings,
        findStylistsForTreatment,
        findAllBookings,
        totalIncomeForDay,
        mostValuebleClient,
        totalCommission,
        makeBooking,
        // findCLient1

    }
}  