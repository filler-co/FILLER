/* All the helper functions shared between components*/
/* Sort all the questions */

  // sorting helper function
  export default function sortResults(array, criteria, cb) {
    console.log('sorting')

    function compare(a, b) {
      if (a[criteria] < b[criteria]) {
        return 1;
      }
      if (a[criteria] > b[criteria]) {
        return -1;
      }
      return 0;
    }

    array.sort(compare);
    console.log('sort result is : ', array);
    cb(array);
  }


