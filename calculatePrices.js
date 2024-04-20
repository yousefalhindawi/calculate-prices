const { DateTime } = require("luxon");
function calculatePrices(search_start, search_end, arr) {
  // convert dates to "luxon" DateTime objects for easier comparison
  const searchStart = DateTime.fromFormat(search_start, "d/M/yyyy");
  const searchEnd = DateTime.fromFormat(search_end, "d/M/yyyy");
  let final_price = 0;

  // filtering out prices that are outside the search range
  const relevantPrices = arr.filter((price) => {
    const priceStart = DateTime.fromFormat(price.start_date, "d/M/yyyy");
    const priceEnd = DateTime.fromFormat(price.end_date, "d/M/yyyy");
    return priceStart <= searchEnd && priceEnd >= searchStart;
  });

  // calculating the total price for the user search range
  for (let day = searchStart; day <= searchEnd; day = day.plus({ days: 1 })) {
    // finding the price that covers the current day from the relevant prices
    const priceForDay = relevantPrices
      .slice()
      .reverse()
      .find((price) => {
        const priceStart = DateTime.fromFormat(price.start_date, "d/M/yyyy");
        const priceEnd = DateTime.fromFormat(price.end_date, "d/M/yyyy");
        return day >= priceStart && day <= priceEnd;
      });

    // If a price is found add it to the final price
    if (priceForDay) {
      final_price += priceForDay.price;
    }
  }

  return final_price;
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
console.log(
  `The total price for the period from ${searchStart1} to ${searchEnd1} is: $${total1}`
);

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
console.log(
  `The total price for the period from ${searchStart2} to ${searchEnd2} is: $${total2}`
);
