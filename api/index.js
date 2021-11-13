module.exports = async function (context, req) {
    context.log('HTTP trigger function processed a request.');
    context.log({
        query: req.query
    });
    const key = req.query.key;
    const quantity = parseInt(req.query.quantity, 10);

    if ( key !== '123' || !quantity || isNaN(quantity) || quantity < 0) {

        context.res = {
            status: 500, /* Defaults to 200 */
            body: "Ooops",
        };
        return;
    }

    const tmpArr = new Array(quantity).fill('');

    const dataArr = tmpArr.map((_, indx) => {
        const value = Math.floor(Math.random() * 10000) / 10;

        return {
            id: `id_${indx}`,
            name: `name_${indx}`,
            betaId: uuidv4(),
            value,
            currency: (value % 2 === 0) ? "USD" : "EURO",
            timestamp: Date.now()
        }
    })


    context.res = {
        // status: 200, /* Defaults to 200 */
        body: { data: dataArr, quantity },

    };
    return;
}