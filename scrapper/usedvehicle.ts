import axios from 'axios';
import * as cheerio from 'cheerio';
import { createObjectCsvWriter } from 'csv-writer';

export const usedVehicleScraper_passenger = async (url: string): Promise<any> => {
  try {
    const response = await axios({
      url,
      method: 'GET',
    });
    const $: any = cheerio.load(response.data);
    const makeModelArray: any = [];
    $('#mmvFilterList')
      .children()
      .each(function (this: any, _i: any, _elem: any) {
        const make = $(this).find('label[class="gs_control gs_checkbox searchcheck"]').attr('title');
        const modelElem = $(this).find('ul[class="modelsList gsc_thin_scroll brandListSearch"]').children();
        modelElem.each(function (this: any, _i: any, _elem: any) {
          const model = $(this).find('label[class="gs_control gs_checkbox"]').attr('title');
          makeModelArray.push({
            make,
            model,
          });
        });
      });
    const csvWriter = createObjectCsvWriter({
      path: 'usedvehicle_passenger.csv',
      header: [
        { id: 'make', title: 'Make' },
        { id: 'model', title: 'Model' },
      ],
    });
    await csvWriter.writeRecords(makeModelArray);
    return makeModelArray;
  } catch (err) {
    console.log('err', err);
    return err;
  }
};

export const usedVehicleScraper_commercial = async (): Promise<any> => {
  try {
    const brandArray = [
      'AMW',
      'ASHOK-LEYLAND',
      'ATUL',
      'BAJAJ',
      'BHARATBENZ',
      'EICHER',
      'FORCE-MOTORS',
      'ISUZU',
      'MAHINDRA',
      'MAN',
      'MERECEDES-BENZ',
      'PIAGGIO',
      'SCANIA',
      'SWARAJ-MAZDA',
      'TATA',
      'VOLVO',
    ];
    const promise = brandArray.map(async (brand) => {
      const url = `https://app.indotrux.com/api/v2/mysql/_table/tb_categories_dtls?fields=cat_model&filter=cat_brand=${brand}+and+cat_type=TRUCK-TRAILER&group=cat_model`;
      const response = await axios({
        url,
        method: 'GET',
        headers: {
          'X-Dreamfactory-API-Key': 'f2a6157d4e648b49789b669d09e7fceea9b8d50bf43c6b6be5e31b88ab57b022',
        },
      });
      const modelArray = response?.data?.resource;
      const respObj = modelArray.map((item: any) => {
        return {
          make: brand,
          model: item?.cat_model,
        };
      });
      return respObj;
    });
    const makeModelArrayRaw: any = await Promise.all(promise);
    const makeModelArray = makeModelArrayRaw.flat();
    const csvWriter = createObjectCsvWriter({
      path: 'usedvehicle_commercial.csv',
      header: [
        { id: 'make', title: 'Make' },
        { id: 'model', title: 'Model' },
      ],
    });
    await csvWriter.writeRecords(makeModelArray);
    return makeModelArray;
  } catch (err) {
    console.log('err', err);
    return err;
  }
};
