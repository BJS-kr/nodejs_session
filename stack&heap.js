// https://blog.bitsrc.io/master-javascript-call-by-sharing-parameter-passing-7049d65163ed
// 우리가 함수에 인자를 넘길때, primitive들은 복사된 값이 넘어가고 참조형 타입들은 참조가 넘어간다.
// 그러니까 위 글은 아래의 동작이 힙이 공용공간이라서 생기는 현상이라고 설명하지는 않고 있다.
var number_1 = 1;
var number_2 = 5;

var arr = [1, 2, 3, 4, 5];

console.log('before function called(stack):', {number_1, number_2})
console.log('before function called(heap):', {arr})

function change(number1, number2, arr) {
  number1 = 11;
  number2 = 12;
  arr[0] = 99;

  arr = [99, 100, 101, 102, 103]; // 왜 이 할당은 함수가 종료된 후 효력이 없었을까 생각해보세요
  console.log('in the function(stack):',{number1, number2});
  console.log('in the function(heap):', {arr});
}

// 복사된 값, 복사된 값, 참조값
change(number_1, number_2, arr);

console.log('after function called(stack):', {number_1, number_2}); // not changed
console.log('after function called(heap):', {arr}); // changed!

/**
 * 이해 안가는 것
 * 대부분의 인터넷 글에선 콜 스택은 primitive type들을 저장하고 heap은 reference type들을 저장한다고 한다.
 * 그래서 스택에 있는 데이터는 건드려도 함수가 끝나면 사라지니 영향이 없는 것이고 heap에 있는 데이터는 공용이라서 수정이 외부에도
 * 영향을 미치는 것이라고 설명하고 있다. 그러니까 primitive type들의 변수는 그 값 자체를 가지고 있고, 참조형 데이터가 할당된 변수는 콜스택 안에서 참조형 데이터의 힙 내 주솟값을 가진다고 설명하고 있다. 
 * 또한 가비지 컬렉터가 힙을 관리하는 이유도 그 때문이라고 한다.
 * 
 * 근데 좀 이상한게, 코어 자바스크립트에서는 설명이 다르다. 일단 변수에 primitive type을 할당하더라도 js는 모든 변수 식별자에 변수의 메모리 주솟값을 할당한다.
 * 참조형 타입의 식별자에 할당된 주솟값은 원시형 타입들의 데이터의 집합 주소가 할당된다는 점이 다를 뿐이다.
 * 그러니까, 변수에는 원래부터 무조건 메모리 주소만 할당된다는 것이다.
 * 
 * 이렇게 생각하면 첫 문단의 설명이 없어도 설명이 된다.
 * number들: 
 * 값 자체를 재할당한다(새로운 값을 메모리에 저장하고 그 주솟값으로 대체)
 * array:
 * 메모리 주솟값을 넘긴다 ->  array의 주솟값에 할당된 값은 원시 타입들의 주솟값들의 집합이다.
 * -> 99를 메모리에 저장하고 그 주솟값을 array의 0번 메모리가 가리키고 있던 메모리 주솟값을 교체한다.
 * -> 즉, 콜스택이고 힙이고 상관없이 그냥 참조형 데이터(메모리 주소값 집합)에 접근해서 그중 하나의 값을 바꿔버렸으니 함수가 끝나도 값이 바뀌어있다는 것
 * 
 * 그러니까, 콜스택과 힙에 어떤 데이터가 저장되는지에 관계없이 그냥 js가 데이터에 접근하는 특성때문에
 * 이런 일이 벌어지는것 아니냐는 것임
 * 
 */
// https://charming-kyu.tistory.com/19
// https://blog.bitsrc.io/memory-leaks-in-nodejs-54ac7bbd4173

var arr = [1, 2, 3, 4, 5];
var arr2 = arr;

arr2[0] = 99;
console.log({arr, arr2})
arr2 = [1, 2, 3, 4, 5];
console.log({arr, arr2})
