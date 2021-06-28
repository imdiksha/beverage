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

const date = new Date();
const [input,firstOpt, beverage ,secondOpt, qty, thirdOpt, empId,FourthOpt,inputDate] = process.argv.slice(2);
if (input=="--save")
{
    if (
        Number.isInteger(Number(qty)) &&
        Number.isInteger(Number(empId)) &&
        typeof beverage == "string"
      ) {
        const newRecord = [
          { empId: empId, beverage: beverage, qty: qty, date: date },
        ];
        writeRecords(updateRecords(newRecord));
      } else {
        console.log("Oops! Invalid Input");
      }     
}
else if (input =="--query")
{
   
  let allRecords = getRecords();

  const checkOptions = function(Option,value)
  {
    let list;
   if (Option  == "--beverage")
   {
   allRecords= allRecords.filter(record =>record.beverage == value);
   }
   if (Option =="--empId")
   {
    allRecords= allRecords.filter(record =>record.empId== value);
   }
   if (Option =="--date")
   {
    allRecords= allRecords.filter(record =>record.date== value);
   }
   if (Option =="--qty")
   {
    allRecords= allRecords.filter(record =>record.qty== value);
   }
   return allRecords ;
   };

   checkOptions(firstOpt,beverage);
   checkOptions(secondOpt,qty);
   checkOptions(thirdOpt,empId);
   checkOptions(FourthOpt,inputDate);
   console.log(allRecords);
 }
 