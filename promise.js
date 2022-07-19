const { log, error } = console

Promise.all()

Promise.allSettled()

const 빼내고_싶은_값 = await new Promise((resolve, reject) => {
  resolve()
  reject()
}).catch()

function notAsync() {

}

async function async() {

}

log(notAsync())
log(async())

//top-level await


/**
 * 
 * @param {any[]} t 
 * @returns any
 */

const promiseReduce = (t) => {
  return t.reduce(async (acc, curr) => {
    await acc.catch(error)
    return curr instanceof Promise ? curr : Promise.resolve(curr)
  }, Promise.resolve())
}