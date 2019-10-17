
/**
         _   _       _   _              __ _               
        | \ | |     | | (_)            / _| |              
        |  \| | __ _| |_ ___   _____  | |_| | _____      __
        | . ` |/ _` | __| \ \ / / _ \ |  _| |/ _ \ \ /\ / /
        | |\  | (_| | |_| |\ V /  __/ | | | | (_) \ V  V / 
        \_| \_/\__,_|\__|_| \_/ \___| |_| |_|\___/ \_/\_/  

        UNIT TESTING WITH JEST
 */

/**
 * 
 *               ------
 *               |    |
 * input ---->   |    |  ----> output
 *               ------
 *             black box
 * 
 */

// PROSTA FUNKCJA I PRZYKŁADOWY TEST JEDNOSTKOWY

function sum(a, b) {
  return a + b
}

test('The sum of 1 and 2 should be 3', () => {
  expect(sum(1, 2)).toBe(3)
})








// FUNKCJA ZWRACAJĄCA RÓŻNE WYNIKI W ZALEŻNOŚCI OD WIELKOŚCI JEJ PARAMETRÓW

function complexSum(a, b) {
  return a > b
    ? a + b - 10
    : b + a + 69
}

test('The sum should be -5 when a is more than b', () => {
  const a = 3
  const b = 2
  expect(complexSum(a, b)).toBe(-5)
})

test('The sum should be 75 when a is less than b', () => {
  const a = 1
  const b = 5
  expect(complexSum(a, b)).toBe(75)
})













// PRZYKŁADOWA FUNKCJA MAPUJĄCA

function mapping(one, two) {
  const { x, y, z } = one
  const { a, b, c } = two
  return {
    m: x + y - a,
    n: { result: b + c },
    z
  }
}

test('Should properly map one and two objects into result', () => {
  const one = { x: 1, y: 2, z: 10 }
  const two = { a: 4, b: 'msg', c: 'xdxd' }

  expect(mapping(one, two)).toEqual(
    {
      m: -1,
      n: { result: 'msgxdxd' },
      z: 10
    }
  )
})






















/**
 *   TESTOWANIE FUNKCJI KORZYSTAJĄCYCH z ZEWNĘTRZNEGO API / INNYCH MODUŁÓW
 * 
 *    external api / other modules
 *                 |
 *                 |
 *                 v
 *               ------
 *               |    |
 * input ---->   |    |  ----> output
 *               ------
 *
*/


class axios {
  static get(url) { /* here some external api is called or data base is asked for data */ }
}

function advancedFunc() {
  const result = axios.get('http://example.com')
  return result > 0
    ? result + 5
    : result - 69
}

test('Should return 15 when axios.get returns 10', () => {
  jest.spyOn(axios, 'get').mockReturnValue(10)
  expect(advancedFunc()).toBe(15)
})

test('Should return -70 when axios.get method returns -1', () => {
  jest.spyOn(axios, 'get').mockReturnValue(-1)
  expect(advancedFunc()).toBe(-70)
})



















// ROZWINIĘCIE O PROMISE

async function promiseFunc() {
  const result = await axios.get('http://example.com')
  return result > 0
    ? result + 5
    : result - 69
}

test('Should return 15 when axios.get returns 10 .', async () => {
  jest.spyOn(axios, 'get').mockResolvedValue(10)

  // expect( await promiseFunc()).toBe(15)
  return expect(promiseFunc()).resolves.toBe(15)
})

test('Should return -70 when axios.get method returns -1 .', () => {
  jest.spyOn(axios, 'get').mockResolvedValue(-1)
  return expect(promiseFunc()).resolves.toBe(-70)
})












// ROZWINIĘCIE O OBŁSUGĘ BŁĘDÓW (https://jestjs.io/docs/en/tutorial-async)

async function errorFunc() {
  try {
    const result = await axios.get('http://example.com')
    return result + 5
  } catch (error) {

    throw { msg: 'Oh no error!', error }
  }
}

test('Should return 15 when axios.get rewwwturns 10 ..', () => {
  jest.spyOn(axios, 'get').mockResolvedValue(10)
  return expect(errorFunc()).resolves.toBe(15)
})

test('Should map request error to custom error and throw it', () => {
  jest.spyOn(axios, 'get').mockRejectedValue('HURDUR ERROR!')
  return expect(errorFunc()).rejects.toEqual({ msg: 'Oh no error!', error: 'HURDUR ERROR!' })
})
















// MOCKOWANIE FUNKCJI

function funMock(res, next) {
  if (res.arg === 1) {
    next(true)
  } else {
    res.send('error')
  }
}

test('Should call next with true as parameter when res arg is 1', () => {
  const res = {
    arg: 1,
    send: jest.fn(x => x)
  }
  const next = jest.fn(x => x)

  funMock(res, next)

  expect(res.send.mock.calls.length).toBe(0)
  expect(next.mock.calls.length).toBe(1)
  //first argument of the first call
  expect(next.mock.calls[0][0]).toEqual(true)
})

test('Should call res.send with error as parameter when res arg is different than 1', () => {
  const res = {
    arg: 2,
    send: jest.fn(x => x)
  }
  const next = jest.fn(x => x)

  funMock(res, next)

  expect(res.send.mock.calls.length).toBe(1)
  expect(next.mock.calls.length).toBe(0)
  //first argument of the first call
  expect(res.send.mock.calls[0][0]).toEqual('error')
})










// KONSTRUKCJA TESTU

/**
 *  GIVEN -> WHEN -> THEN
 */

function secondMapping(one, two) {
  return {
    a: {
      x: one.a,
      y: two.c,
    },
    b: {
      x: one.b,
      y: two.d,
    }
  }
}

test('Previous: Should properly map one and two objects into result', () => {
 
 expect(secondMapping({ a: 2, b: 4 }, { c: 4, d: 1 }))
    .toEqual(
      {
        a: {
          x: 2,
          y: 4
        },
        b: {
          x: 4,
          y: 1
        }
      }
    )
})


describe('OfferService', () => {
  test('Correct: Should properly map one and two objects into result', () => {
    //given
    const a = 2, b = 4, c = 4, d = 1
    const one = { a, b }
    const two = { c, d }
  
    //when
    const result = secondMapping(one, two)
  
    //then result should contains a object w a and c values and b object with b and d values
    expect(result)
      .toEqual(
        {
          a: {
            x: a,
            y: c
          },
          b: {
            x: b,
            y: d
          }
        }
      )
  })
  
  
  
  
  
  
  
  
  
  
  
  
  
  test('Correct: Should call res.send with error as parameter when res arg is different than 1', () => {
    //given
    const res = {
      arg: 2,
      send: jest.fn(x => x)
    }
    const next = jest.fn(x => x)
  
    //when function is called
    funMock(res, next)
  
    //then send() function is called ones, next() function is not called
    expect(res.send.mock.calls.length).toBe(1)
    expect(next.mock.calls.length).toBe(0)
    //and first argument of send() function is error
    expect(res.send.mock.calls[0][0]).toEqual('error')
  })
})





// ZADANKO DOMOWE

