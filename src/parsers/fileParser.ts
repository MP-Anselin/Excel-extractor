import * as fs from "fs";
import readXlsxFile from "read-excel-file/node";

export const fileParser = async <T>(fileInPath: string, fileOutPath: string, callback: (rows: string[])=>T | null): Promise<T[]> => {
    if (!fs.existsSync(fileInPath)) {
        console.log("The file ", fileInPath, " doesn't exist please add it");
        process.exit(1);
    }

    const content = await readXlsxFile(fileInPath);
    const tableList: T[] = [];

    content.forEach((rows: any[]) => {
        const fieldData: T | null = callback(rows);
        if (fieldData)
            tableList.push(fieldData);
    });
    fs.writeFile(fileOutPath, JSON.stringify(tableList), function (err) {
        if (err) {
            console.log(err);
        }
    });
    return tableList;
}