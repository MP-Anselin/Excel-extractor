import * as path from "path";
import * as fs from "fs";

const Excel4node = require('excel4node');

const fileInPath = path.resolve(__dirname + '/../../data/json/dataToMigrate.json');
const fileOutPath = path.resolve(__dirname + '/../../data/xlsx/mappingTablesFieldsData.xlsx');

export const convertJsonFileToExcelFile = () => {
    if (!fs.existsSync(fileInPath)) {
        console.log("The file ", fileInPath, " doesn't please add it");
        process.exit(1);
    }

    const fileContent = fs.readFileSync(fileInPath).toString();
    const content = JSON.parse(fileContent.toString());
    const headingColumnNames = Object.keys(content[0]);

    const workbook = new Excel4node.Workbook();
    const worksheet = workbook.addWorksheet('mapping-VISION-UNIDEV');

    let headingColumnIndex = 1;
    headingColumnNames.forEach((heading: any) => {
        worksheet.cell(1, headingColumnIndex++)
            .string(heading)
    });

    let rowIndex = 2;
    content.shift();
    content.forEach((record: any) => {
        let columnIndex = 1;
        Object.keys(record).forEach((columnName: string) => {
            worksheet.cell(rowIndex, columnIndex++)
                .string(record [columnName])
        });
        rowIndex++;
    });

    if (!fs.existsSync(fileOutPath))
        fs.writeFile(fileOutPath, "", (err) => {
                if (err)
                    console.log(err);
            }
        );
    workbook.write(fileOutPath);
}