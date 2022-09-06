import { ajax } from 'rxjs/internal/ajax/ajax';
import { Config } from '@models/env';
import { map } from 'rxjs';
import { DataModel } from '@models/custom.models';
import { camelCase, find, get } from 'lodash';

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
          .filter((item: { properties: { title: string } }) => item.properties.title !== 'Name / Intro')
          .forEach((item: unknown) => {
            const key = camelCase(get(item, 'properties.title'));
            const rows = get(item, 'data[0].rowData');

            const dataKeys = get(rows.shift(), 'values').map(
              ({ formattedValue }: { formattedValue: string }) => formattedValue
            );

            dataModel[key] = rows.map((row: { values: { formattedValue: unknown }[] }) => {
              return dataKeys.reduce((prev: { [x: string]: unknown }, dataKey: string, index: number) => {
                console.log(prev, dataKey, index);

                prev[dataKey] = row.values[index].formattedValue;
                return prev;
              }, {});
            });
          });

        return dataModel;
      })
    );
  }
}

export const API = new ApiService();
