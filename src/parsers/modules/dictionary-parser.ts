import * as path from "path";

import {fileParser} from "../fileParser";

const fileInPath = path.resolve(__dirname + '/../../../excel/UNIDEV_YKU_ZEU_DICTIONNAIRE.xlsx');
const fileOutPath = path.resolve(__dirname + '/../../../data/json/dictionary.json');

type Fields = {
    table: string;
    retenu: string;
    dictionary: string;
};

const sortRows = (rows: string[]): Fields | null => {
    const fieldData: Fields = {
        table: rows[0],
        retenu: rows[1],
        dictionary: rows[2]
    }
    if (fieldData.dictionary == null)
        fieldData.dictionary = 'DIC_' + fieldData.table[0].toUpperCase();
    return fieldData;
}

export const getDictionaryContent = async (): Promise<Fields[]> => {
    return fileParser<Fields>(fileInPath, fileOutPath, sortRows)
}
