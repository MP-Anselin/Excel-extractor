import * as path from "path";

import {fileParser} from "../fileParser";

const fileInPath = path.resolve(__dirname + '/../../../excel/UNIDEV_YKU_ZEU_MAP_DONNEE_ZEM.xlsx');
const fileOutPath = path.resolve(__dirname + '/../../../data/json/map.json');

type Fields = {
    nomDonneeZem: string;
    nomDonneeZeufe: string;
    dictionaryZeu: string;
};

const sortRows = (rows: string[]): Fields | null => {
    const fieldData: Fields = {
        nomDonneeZem: rows[0],
        nomDonneeZeufe: rows[1],
        dictionaryZeu: rows[2]
    }
    return fieldData;
}

export const getMapContent = async (): Promise<Fields[]> => {
    return fileParser<Fields>(fileInPath, fileOutPath, sortRows)
}