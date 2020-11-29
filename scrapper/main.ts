import axios from 'axios';
import * as cheerio from 'cheerio';
import { overviewValidator } from '../interfaces/auto';
import { queryDOM } from './query';

export const execute = async (brand:string):Promise<object> => {
  const url = `${process.env.HOST_URL}/${brand}`;
  const models = await getModels(url);

  const pendingVariantPromises = models.map(async (url) => {
    const variants = await getVariants(url);
    return variants;
  });
  const variantUrls = await Promise.all(pendingVariantPromises);
  const urlsToCrawl = variantUrls.concat.apply([], variantUrls);

  const pendingPromises = urlsToCrawl.map(async (url:any) => {
    const result = await scraper(url);
    return result;
  });
  const resp = await Promise.all(pendingPromises);
  return resp;
};

export const getModels = async (url: string):Promise<string[]> => {
  const response = await axios({
    url,
    method: 'GET',
    headers: {
      'Accept': '*/*',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
    }
  });
  const $ = cheerio.load(response.data);
  const modelUrls = $('div[class="car-box-sec"]').children('.car-box-sec-wrap').children('.car-box-sec-left').map(function(this: any, _i, _elem) {
    return $(this)?.children('a')?.attr('href')?.trim();
  }).get();
  const result = [... new Set(modelUrls)]; // Remove duplicates
  return result;
};

export const getVariants = async (url: string):Promise<string[]> => {
  const response = await axios({
    url,
    method: 'GET',
    headers: {
      'Accept': '*/*',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
    }
  });
  const $ = cheerio.load(response.data);
  const variantUrls = $('div[class="verdict_fuel"]').children('ul').children('li').map(function(this: any, _i, _elem) {
    return $(this)?.children('.car-name')?.children('span')?.children('a')?.attr('href')?.trim();
  }).get();

  const result = [... new Set(variantUrls)]; // Remove duplicates
  return result;
};

export const getScrapeUrls = async () => {
return [{
  _id: 1,
  url: 'https://www.autocarindia.com/cars/aston-martin/rapide-s/v12'
}]
};

export const scraper = async (url: string) => {
  const response = await axios({
    url,
    method: 'GET',
    headers: {
      'Accept': '*/*',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
    }
  });
  const $ = cheerio.load(response.data);
  const heading =  $('h1[class="car-heading"]').text().trim();
  const price = $('div[class="car-price-sec"]  h3').text().trim();
  const image = $('div[class="model_page_view_left"]  img')?.attr('src')?.trim();

  // Overview
  let overview:overviewValidator = {};
  const overviewValues = queryDOM($, '#overview1', overview);
  overview = {
    ...overviewValues,
    name: heading,
    price,
    image
  };

  // Specs
  let dimensions:any = {};
  dimensions = queryDOM($, '#accordion1_1', dimensions);
  let engineMotor:any = {};
  engineMotor = queryDOM($, '#accordion1_2', engineMotor);
  let transmission:any = {};
  transmission = queryDOM($, '#accordion1_4', transmission);
  let fuelEconomyRange:any = {};
  fuelEconomyRange = queryDOM($, '#accordion1_5', fuelEconomyRange);
  let suspension:any = {};
  suspension = queryDOM($, '#accordion1_6', suspension);
  let steering:any = {};
  steering = queryDOM($, '#accordion1_3', steering);
  let wheels:any = {};
  wheels = queryDOM($, '#accordion1_7', wheels);
  let brakes:any = {};
  brakes = queryDOM($, '#accordion1_8', brakes);

  // Safety and Features
  let safety:any = {};
  safety = queryDOM($, '#features1', safety);
  let exterior:any = {};
  exterior = queryDOM($, '#features2', exterior);
  let upholstery:any = {};
  upholstery = queryDOM($, '#features3', upholstery);
  let infotainment:any = {};
  infotainment = queryDOM($, '#features4', infotainment);
  let comfort:any = {};
  comfort = queryDOM($, '#features5', comfort);
  let instrumentation:any = {};
  instrumentation = queryDOM($, '#features6', instrumentation);


  const auto = {
    overview,
    specifications: {
      dimensions,
      engineMotor,
      transmission,
      fuelEconomyRange,
      suspension,
      steering,
      wheels,
      brakes
    },
    features: {
      safety,
      exterior,
      upholstery,
      infotainment,
      comfort,
      instrumentation
    }
  }
  return auto;
};

// execute();
