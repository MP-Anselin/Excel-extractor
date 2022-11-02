# Extractor of xlsx data

## Versions 0.1

## How to set up
```
npm install
```

## Command Line

```
npx ts-node .\index.ts
```

### Add mew module to parse

1. Go to modules folder inside src/parsers/modules.
2. Change the file 'example to the name you want + .ts'.
3. Follow the instruction inside example.
4. if you want to test uncomment the line 38 and 43.
5. run the command (example representing the name you gave to your file).
```
npx ts-node .\src\parsers\example.ts
```
7. If you want to insert inside the big algorithm (src\migrationData.ts) after the line 23 add a new variable and call your function like the line above.


### Main algorithm
#### What it does ?

- It extracts the data from the file "mappingVision.xlsx", column "classe (A)", "Alias (B)", "Table (E)", "Colonne (F)" convert as json type.
- It extracts the data from the file "UNIDEV_YKU_ZEU_DICTIONNAIRE.xlsx", convert as json type.
- It extracts the data from the file "UNIDEV_YKU_ZEU_MAP_DONNEE_ZEM.xlsx", convert as json type.
- It browses all json data to cross the data, from different direction, to generate a csv file, with column:
****
  source_table_name, <br>
  source_field,<br>
  destination_table_name,<br>
  destination_field, <br>
****
- It browses mappingVision json data (representing our main loop) to get "source_table_name", "source_field" and destination_field data.
```
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
```
- It browses dictionnaire json data to get "destination_table_name" data, if this one it found inside the dictionnaire data list.
```
  dictionaryContent.forEach((dictionary) => {
            if (table.tableName === dictionary.table) {
                dataList.destination_table_name = dictionary.dictionary;
                return;
            }
        })
```
- It browses "map donnee" json data to get "destination_field" data, if this one has another inside the UNIDEV_YKU_ZEU_MAP_DONNEE_ZEM.xlsx file.
```
 mapContent.forEach((map) => {
            if (table.fieldAlias === map.nomDonneeZem &&
                dataList.destination_table_name === map.dictionaryZeu) {
                dataList.destination_field = map.nomDonneeZeufe;
                return;
            }
        })
```
- At the end of our main loop, It inserts the data gather above to a list.
```
        if (dataList.destination_table_name)
            dataToMigrate.push(dataList);
```
- Outside to our main loop, we create a json file (dataToMigrate) content all the data gather above, and we convert the data to csv file to be able to upload it the database.
```
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
```

#### How it works ?

1. Go to src\migrationData.ts there is the main algorithm.
2. The main algorithm with create a csv file to be able to upload to database.
3. To compile and run main algorithm run this command:
```
npx ts-node .\index.ts
```

#### Upload csv
* Inside of data folder in csv folder you will be able to find a csv file name MAPPING_TABLE_FIELD_NAMES.csv.
* If you want to upload it into the database please delete the first line of the csv file which representing the name of the column for the database. 


### Folders
* Be sure to create "excel" folder which will content all excel files.
* Be sure to create "data" folder with inside "csv", "json" and "xlsx" folder.

1. Inside data folder there is all the data will with generate by the script .
2. Inside excel all data will be parsed byt the script be sure to have these files before to run the script.

