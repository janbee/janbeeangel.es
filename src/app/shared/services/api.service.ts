import { ajax } from 'rxjs/internal/ajax/ajax';
import { Config } from '@models/env';
import { map } from 'rxjs';
import { DataModel } from '@models/custom.models';
import { camelCase, find } from 'lodash';

class ApiService {
  getDataJson() {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${Config.GoogleSheetId}/?key=${Config.GoogleApi}&fields=sheets.properties,sheets.data.rowData.values.formattedValue`;
    return ajax.getJSON<unknown>(url).pipe(
      map((res) => {
        const dataModel: DataModel = {} as DataModel;
        // @ts-ignore
        const nameAndIntro = find(res.sheets, ['properties.title', 'Name / Intro']);
        dataModel.name = nameAndIntro.data[0].rowData[1].values[0].formattedValue;
        dataModel.intro = nameAndIntro.data[0].rowData[1].values[1].formattedValue;

        // @ts-ignore
        res.sheets
          // @ts-ignore
          .filter((item) => item.properties.title !== 'Name / Intro')
          // @ts-ignore
          .forEach((item) => {
            const key = camelCase(item.properties.title);

            dataModel[key] = [];
            // @ts-ignore
            item.data[0].rowData.forEach((row, rowIndex) => {
              if (rowIndex !== 0) {
                const obj = {};
                // @ts-ignore
                row.values.forEach((val, valIndex) => {
                  obj[item.data[0].rowData[0].values[valIndex].formattedValue] = val.formattedValue;
                });

                dataModel[key].push(obj);
              }
            });
          });

        return dataModel;
      })
    );
  }
}

export const API = new ApiService();
