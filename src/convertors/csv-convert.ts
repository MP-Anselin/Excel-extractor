import * as path from "path";
import * as fs from "fs";
import XLSX = require("xlsx");

const fileInPath = path.resolve(__dirname + '/../../data/xlsx/mappingTablesFieldsData.xlsx');
const fileOutPath = path.resolve(__dirname + '/../../data/csv/MAPPING_TABLE_FIELD_NAMES.csv');

export const convertExcelFileToCSVFile = () => {
    if (!fs.existsSync(fileInPath)) {
        console.log("The file ", fileInPath, " doesn't please add it");
        process.exit(1);
    }

    const workBook = XLSX.readFile(fileInPath);

    if (!fs.existsSync(fileOutPath))
        fs.writeFile(fileOutPath, "", function (err) {
                if (err) console.log(err);
            }
        );

    XLSX.writeFile(workBook, fileOutPath, {bookType: "csv"});
}