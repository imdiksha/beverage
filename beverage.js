const fs = require ("fs");

const getRecords = () =>{
    const recordedData = fs.readFileSync("sales.json","utf-8");
    return recordedData.length ? JSON.parse(recordedData) : [];
};

const writeRecords = function (recordToAdd) {
    fs.writeFileSync("sales.json",recordToAdd);
};

const updateRecords = function (newEntry) {
    const feededRecords = getRecords();
    feededRecords.push(newEntry);
    return JSON.stringify(feededRecords);
   };

const curDate = new Date();
const [,beverage,,qty,,empId] =process.argv.slice(2);
 if (Number.isInteger(Number(qty)) && Number.isInteger(Number(empId)) && typeof(beverage)=="string")
 {
    const newRecord = [{empId:empId,beverage:beverage,qty:qty,date : curDate}];
    writeRecords(updateRecords(newRecord));
}
else
{
    console.log("Oops! Invalid Input")
}

