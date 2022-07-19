function a() {
  setTimeout(()=>{console.log('a')}, 1500)
}

function b() {
  setTimeout(()=>{console.log('b')}, 1000)
}

function c() {
  setTimeout(()=>{console.log('c')}, 500)
}

a();
b();
c();

function a2(cb) {
  setTimeout(()=>{console.log('a'), cb()}, 1500)
}

function b2(cb) {
  return function () {
    setTimeout(()=>{console.log('b'), cb()}, 1000)
  }
}

a2(b2(c))