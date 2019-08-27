// input is a string
function isPalindrome(input) {
  const len = input.length;
  const midLength = Math.floor(len / 2);
  let result = true;
  let index = 0;
  while (result && index <= midLength) {
    result = input[index] === input[len - 1 - index];
    index = index + 1;
  }
  return result;
}

function isRecursivePalindrome(input) {
  const len = input.length;
  if (len < 2) return true;
  const nextInput = input.slice(1, len - 1);
  return input[0] === input[len - 1] && isRecursivePalindrome(nextInput);
}

function test(input) {
  console.log(input, isPalindrome(input));
  console.log('-------');
  console.log(input, isRecursivePalindrome(input));
  console.log('\n');
}

test('aba');
test('abba');
test('abza');
test('abzba');
test('');
test('s');
