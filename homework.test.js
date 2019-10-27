class axios{
    static get(){}
    static post(payload){}
}


async function homework(a, b, send, next) {
    try {
        const result = await axios.get('http://homework.pl/unit-tests')

        if (result >= a && result <= b) {
            try {
                const info = await axios.post('http://homework.pl/unit-test', { result: a + b })
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


    test('Should call send once with b as parameter when axios.get returns number bigger than b', () => {
        const a = 5
        const b = 10
        const send = jest.fn(x => x)
        const next = jest.fn(x => x)

        jest.spyOn(axios, 'get').mockResolvedValue(b+4)

        homework(a, b, send, next)
        expect(send.mock.calls.length).toBe(1)
        expect(send.mock.calls[0][0]).toEqual(b)
    })

    test('Should call send once with b as parameter when axios.get returns number smaller than a', () => {
        const a = 5
        const b = 10
        const send = jest.fn(x => x)
        const next = jest.fn(x => x)

        
        jest.spyOn(axios, 'get').mockResolvedValue(a-3)
        homework(a, b, send, next)
        expect(send.mock.calls.length).toBe(1)
        expect(send.mock.calls[0][0]).toEqual(b)
    })

    test('Should map get request error to custom error and throw it', () => {
        const a = 5
        const b = 10
        const send = jest.fn(x => x)
        const next = jest.fn(x => x)

        jest.spyOn(axios, 'get').mockRejectedValue('Getting error')
        return expect(homework(a, b, send, next)).rejects.toEqual({ msg: 'Error during fetching homework', error: 'Getting error' })
    })

    test('Should call next once with b as parameter when a is bigger or equal than result and b is bigger than result and posting is not succesful', () => {
        const a = 5
        const b = 10
        const send = jest.fn(x => x)
        const next = jest.fn(x => x)

        jest.spyOn(axios, 'post').mockRejectedValue("ERROR!")
        jest.spyOn(axios, 'get').mockResolvedValue(b)

        homework(a, b, send, next)

        expect(send.mock.calls.length).toBe(1)
        expect(send.mock.calls[0][0]).toEqual(b)
    })


    test('Should call next once with post return statement as parameter when a is bigger or equal than result and b is smaller or equal than result and posting is succesful', () => {
        const a = 5
        const b = 10
        const send = jest.fn(x => x)
        const next = jest.fn(x => x)

        jest.spyOn(axios, 'get').mockResolvedValue(7)
        const rtrnStmnt = jest.spyOn(axios, 'post').mockResolvedValue(a+b)
        homework(a, b, send, next)
        
        expect(next.mock.calls.length).toBe(1)
        expect(next.mock.calls[0][0]).toEqual(rtrnStmnt)
    })

    test('Should call next once with result as parameter when a is bigger or equal than result and b is smaller than result and posting is not succesful', () => {
        const a = 5
        const b = 10
        const send = jest.fn(x => x)
        const next = jest.fn(x => x)

        jest.spyOn(axios, 'get').mockResolvedValue(7)
        jest.spyOn(axios, 'post').mockResolvedValue(a+b)

        homework(a, b, send, next)
        
        expect(next.mock.calls.length).toBe(1)
        expect(next.mock.calls[0][0]).toEqual(7)
    })

    test('Should map post request error to custom error and throw it', () => {
        const a = 5
        const b = 10
        const send = jest.fn(x => x)
        const next = jest.fn(x => x)

        jest.spyOn(axios, 'get').mockResolvedValue(7)
        jest.spyOn(axios, 'post').mockRejectedValue('Posting error')
        return expect(homework(a, b, send, next)).rejects.toEqual({ msg: 'Error during posting homework result', error: 'Posting error' })
    })

    test('Should return a+b when posting homework results', () => {
        const a = 5
        const b = 10
        const send = jest.fn(x => x)
        const next = jest.fn(x => x)

        jest.spyOn(axios, 'get').mockResolvedValue(7)
        jest.spyOn(axios, 'post').mockResolvedValue(a+b)

        homework(a, b, send, next)

        expect(next.mock.calls.length).toBe(1)
        expect(send.mock.calls[0][0]).toEqual(a+b)
    })

})
