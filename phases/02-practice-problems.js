function anagrams(str1, str2) {
  // return false if length are diffrent
  if (str1.length !== str2.length) return false;

    // iterate over one str and check if includes in other string
    for (let i = 0; i < str1.length; i++) {
      let el = str2[i];

      if (!str1.includes(el)) return false;
    }

    return true;
 }


function commonElements(arr1, arr2) {
  // Your code here
}


function duplicate(arr) {
  // Your code here
}


function twoSum(nums, target) {
  // Your code here
}


function wordPattern(pattern, strings) {
  // Your code here
}


module.exports = [anagrams, commonElements, duplicate, twoSum, wordPattern];
