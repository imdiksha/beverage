const fs = require ("fs");

const [beverage,bevval,qty,qtyval,empid,empval] =process.argv.slice(2);
const newRecord = [beverage,bevval,qty,qtyval,empid,empval];
fs.writeFileSync("sales.json",JSON.stringify(newRecord));

