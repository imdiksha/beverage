const fs = require("fs");

const getRecords = () => {
  const recordedData = fs.readFileSync("sales.json", "utf-8");
  return recordedData.length ? JSON.parse(recordedData) : [];
};

const writeRecords = function (recordToAdd) {
  fs.writeFileSync("sales.json", recordToAdd);
};

const updateRecords = function (newEntry) {
  const feededRecords = getRecords();
  feededRecords.push(newEntry);
  return JSON.stringify(feededRecords);
};

const getIndex = function (option) {
  return process.argv.indexOf(option);
};

const getIndexValue = function (index) {
  return index > -1 ? process.argv[index + 1] : "";
};

const command = process.argv[2];

const curDate = new Date();
const beverageName = getIndexValue(getIndex("--beverage"));
const quantity = getIndexValue(getIndex("--qty"));
const employeeID = getIndexValue(getIndex("--empId"));
const date = getIndexValue(getIndex("--date"));

const FilteredList = function (records) {
  if (employeeID.length) {
    return records.filter((record) => record.empId == employeeID);
  } else if (quantity.length) {
    return records.filter((record) => record.qty== quantity);
  } else if (beverageName.length) {
    return records.filter((record) => record.beverage == beverageName);
  } else if (date.length) {
    return records.filter((record) => record.date == date);
  }
  return records;
};

if (command == "--save") {
  if (
    Number.isInteger(Number(quantity)) &&
    Number.isInteger(Number(employeeID)) &&
    typeof beverageName == "string"
  ) {
    const newRecord = [
      {
        empId: employeeID,
        beverage: beverageName,
        qty: quantity,
        date: curDate,
      },
    ];
    writeRecords(updateRecords(newRecord));
  } else {
    console.log("Oops! Invalid Input");
  }
} else if (command == "--query") {
  console.log(FilteredList(getRecords()));
}
