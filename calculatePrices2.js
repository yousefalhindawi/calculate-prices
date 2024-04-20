const moment = require('moment');

function getPriceForDay(day, arr) {
  let maxIndex = -1;
  let price = null;

//   const targetDate = moment(day, 'D/M/YYYY');
  const targetDate = moment(day, ['D/M/YYYY', 'DD/MM/YYYY'], true);

  for (let i = 0; i < arr.length; i++) {
    const period = arr[i];

    // const startDate = moment(period.start_date, 'D/M/YYYY');
    const startDate = moment(period.start_date, ['D/M/YYYY', 'DD/MM/YYYY'], true);
    // const endDate = moment(period.end_date, 'D/M/YYYY');
    const endDate = moment(period.end_date, ['D/M/YYYY', 'DD/MM/YYYY'], true);

    if (targetDate.isSameOrAfter(startDate) && targetDate.isSameOrBefore(endDate) && i > maxIndex) {
      maxIndex = i;
      price = period.price;
    }
  }

  return price;
}

function calculatePrices(startDate, endDate, arr) {
  let totalPrice = 0;

//   const start = moment(startDate, 'D/M/YYYY');
  const start = moment(startDate, ['D/M/YYYY', 'DD/MM/YYYY'], true);
//   const end = moment(endDate, 'D/M/YYYY');
  const end = moment(endDate, ['D/M/YYYY', 'DD/MM/YYYY'], true);

  for (let currentDate = start.clone(); currentDate.isSameOrBefore(end); currentDate.add(1, 'days')) {
    // const dayString = currentDate.format('D/M/YYYY');
    const dayString = moment(currentDate, ['D/M/YYYY', 'DD/MM/YYYY'], true);
    const price = getPriceForDay(dayString, arr);

    console.log(dayString, price);
    totalPrice += price;
  }

  return `${totalPrice}`;
}

// Test cases
const arr1 = [
  { start_date: "5/1/2022", end_date: "15/1/2022", price: 5 },
  { start_date: "1/1/2022", end_date: "11/1/2022", price: 3 },
  { start_date: "3/1/2022", end_date: "13/1/2022", price: 10 },
  { start_date: "2/1/2022", end_date: "11/1/2022", price: 4 },
];

const searchStart1 = "1/1/2022";
const searchEnd1 = "15/1/2022";

console.log(calculatePrices(searchStart1, searchEnd1, arr1));
const total1 = calculatePrices(searchStart1, searchEnd1, arr1);
console.log(`The total price for the period from ${searchStart1} to ${searchEnd1} is: $${total1}`);

const arr2 = [
  { start_date: "1/1/2022", end_date: "19/1/2022", price: 5 },
  { start_date: "4/1/2022", end_date: "11/1/2022", price: 10 },
  { start_date: "15/1/2022", end_date: "22/1/2022", price: 7 },
  { start_date: "3/1/2022", end_date: "12/1/2022", price: 3 },
];

const searchStart2 = "1/1/2022";
const searchEnd2 = "13/1/2022";

console.log(calculatePrices(searchStart2, searchEnd2, arr2));

const total2 = calculatePrices(searchStart2, searchEnd2, arr2);
console.log(`The total price for the period from ${searchStart2} to ${searchEnd2} is: $${total2}`);
