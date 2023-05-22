function anagrams(str1, str2) {
  // Your code here
  if (str1.length !== str2.length) {
    return false;
  }

  const chars1 = {};

  for (let i = 0; i < str1.length; i++) {
    let char = str1[i];

    if (chars1[char]) {
      chars1[char]++;
    } else {
      chars1[char] = 1;
    }
  }

  const chars2 = {};

  for (let i = 0; i < str2.length; i++) {
    let char = str2[i];

    if (!chars1[char]) {
      return false;
    } else if(chars2[char]) {
      chars2[char]++;
    } else {
      chars2[char] = 1;
    }
  }

  for (let key in chars1) {
    let val1 = chars1[key];
    let val2 = chars2[key];

    if (val1 !== val2) {
      return false;
    }
  }

  return true;
}


function commonElements(arr1, arr2) {
  // Your code here
  let larger;
  let smaller;

  if (arr1.length >= arr2.length) {
    larger = arr1;
    smaller = arr2;
  } else {
    larger = arr2;
    smaller = arr1;
  }

  const largeSet = new Set(larger);
  const common = new Set();

  for (let i = 0; i < smaller.length; i++) {
    let el = smaller[i];
    if ( largeSet.has(el) ) {
      common.add(el);
    }
  }

  return Array.from(common);
}


function duplicate(arr) {
  // Your code here
  const obj = {};

  for (let i = 0; i < arr.length; i++) {
    let num = arr[i];

    if (obj[num]) {
      return num;
    } else {
      obj[num] = 1;
    }
  }
}


function twoSum(nums, target) {
  // Your code here
  const numsSet = new Set(nums);

  for (let num of numsSet) {
    let factor = target - num;

    if ( numsSet.has(factor) && factor !== num ) {
      return true;
    }
  };

  return false;
}


function wordPattern(pattern, strings) {
  // Your code here
  const model = {};
  const assigned = new Set()

  for (let i = 0; i < strings.length; i++) {
    let str = strings[i];
    let key = pattern[i];

    if ( !model[key] && !assigned.has(str) ) {
      model[key] = str;
      assigned.add(str);
    } else if (model[key] !== str) {
      return false;
    }
  }

  return true;
}


module.exports = [anagrams, commonElements, duplicate, twoSum, wordPattern];