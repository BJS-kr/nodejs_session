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

change(number_1, number_2, arr);

console.log('after function called(stack):', {number_1, number_2}); // not changed
console.log('after function called(heap):', {arr}); // changed!





