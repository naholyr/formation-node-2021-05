const fetchArray = () => Promise.resolve([1, 2, 3, 4]);
const fetchSum = (array: Array<number>) => Promise.resolve(42);

///// Promise: variables

const arrayP = fetchArray()

const sumP = arrayP.then((array) => {
  return fetchSum(array); // Promise<number>
}); // Promise<number>

sumP.then(sum => {
  console.log(sum);
});

sumP.catch(err => {
  console.error(err);
})

////// Promise: chained

fetchArray() // Promise<Array<number>>
  .then((array) => fetchSum(array)) // Promise<number>
  .then(sum => console.log(sum)) // Promise<undefined>
  .catch(err => console.error(err)) // Promise<undefined>

///// async/await

const main = async () => {
  try {
    const array = await fetchArray();
    const sum = await fetchSum(array);
    console.log(sum);
  } catch (err) {
    console.error(err);
  }
};
