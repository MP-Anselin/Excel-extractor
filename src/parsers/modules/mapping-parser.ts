import * as path from "path";

import {fileParser} from "../fileParser";

const fileInPath = path.resolve(__dirname + '/../../../excel/mappingVision.xlsx');
const fileOutPath = path.resolve(__dirname + '/../../../data/json/mappingFile.json');

type Fields = {
    class: string;
    fieldAlias: string;
    tableName: string;
    column: string;
};

const sortRows = (rows: string[]): Fields | null => {
    const fieldData: Fields = {
        class: rows[0],
        fieldAlias: rows[1],
        tableName: rows[4],
        column: rows[5]
    }
    if (fieldData.tableName == "WORK")
        return null;
    return fieldData;
}

export const getMappingFileContent = async (): Promise<Fields[]> => {
    return fileParser<Fields>(fileInPath, fileOutPath, sortRows)
}