class axios{
    static get(){}
    static post(payload){}
}


async function homework(a, b, send, next) {
    try {
        const result = await axios.get('http://homework.pl/unit-tests')

        if (result >= a && result <= b) {
            try {
                const info = await axios.post('http://homwork.pl/unit-test', { result: a + b })
                return next(info)
            } catch (error) {
                throw { msg: 'Error during posting homework result', error }
            }
        }

        if (result >= a && result < b)
            return next(result)

        return send(b)

    } catch (error) {
        throw { msg: 'Error during fetching homework', error }
    }
}

describe('Homework unit tests', () => {
    //TODO: Implement unit tests that covers every edge case
})