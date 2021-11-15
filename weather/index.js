const { v4: uuidv4 } = require('uuid');
const fetch = require('node-fetch');

module.exports = async function (context, req) {
    context.log('HTTP trigger function processed a request.');
    context.log({
        query: req.query,
        key: process.env.key
    });

    const secret = process.env.key;
    const key = req.query.key;
    const country = req.query.country;
    const city = req.query.city;

    if (key !== '123' || !country || !city) {

        context.res = {
            status: 500, /* Defaults to 200 */
            body: { success: false, error: "Ooops" },
        };
        return;
    }


    const response = await fetch(`https://api.weatherbit.io/v2.0/current?city=${city}&country=${country}&key=${secret}`);
    const data = await response.json();

    console.log(data);

    context.res = {
        body: { success: true, data: data },
    };
    return;
}