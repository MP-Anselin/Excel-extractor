import * as fs from "fs";
import * as path from "path";

import {getMappingFileContent} from "./parsers/modules/mapping-parser";
import {getDictionaryContent} from "./parsers/modules/dictionary-parser";
import {getMapContent} from "./parsers/modules/map-parser";
import {convertJsonFileToExcelFile} from "./convertors/excel-converter";
import {convertExcelFileToCSVFile} from "./convertors/csv-convert";

const fileOutPath = path.resolve(__dirname + '/../data/json/dataToMigrate.json');

// the column that will be inside the database
type DataList = {
    source_table_name: string;
    source_field: string;
    destination_table_name: string;
    destination_field: string;
};

export const migrationData = async () => {
    const mappingFileContent = await getMappingFileContent();
    const dictionaryContent = await getDictionaryContent();
    const mapContent = await getMapContent();
    const dataToMigrate: DataList[] = [];

    // the information we extract from the file mappingVision we insert same inside correct column name
    mappingFileContent.forEach((table) => {
        const dataList: DataList = {
            source_table_name: "",
            source_field: "",
            destination_table_name: "",
            destination_field: "",
        };
        dataList.source_table_name = table.tableName;
        dataList.source_field = table.column;
        dataList.destination_field = table.fieldAlias;

        // the information we extract from the file dictionnaire file we insert same inside correct column name
        dictionaryContent.forEach((dictionary) => {
            if (table.tableName === dictionary.table) {
                dataList.destination_table_name = dictionary.dictionary;
                return;
            }
        })

        // the information we extract from the file map_donnee file we insert same inside correct column name
        mapContent.forEach((map) => {
            if (table.fieldAlias === map.nomDonneeZem &&
                dataList.destination_table_name === map.dictionaryZeu) {
                dataList.destination_field = map.nomDonneeZeufe;
                return;
            }
        })

        if (dataList.destination_table_name)
            dataToMigrate.push(dataList);
    });

    // create the json file
    fs.writeFile(fileOutPath, JSON.stringify(dataToMigrate), function (err) {
        if (err) {
            console.log(err);
        } else {
            // function will convert the json file to xlsx file
            convertJsonFileToExcelFile();
            // function will convert the excel file to csv file to be able to upload in the database.
            convertExcelFileToCSVFile();
        }
    });

    return dataToMigrate;
}