import axios from 'axios';
import * as cheerio from 'cheerio';
import { 
  overviewValidator, 
  urlType, 
  dimensionsValidator, 
  engineMotorValidator, 
  transmissionValidator, 
  fuelEconomyRangeValidator, 
  suspensionValidator,
  steeringValidator,
  wheelsValidator,
  brakesValidator,
  safetyValidator,
  exteriorValidator,
  upholsteryValidator,
  infotainmentValidator,
  comfortValidator,
  instrumentationValidator,
  autoDataValidator,
 } from '../interfaces/auto';
import { queryDOM } from './query';
import { db } from '../lib/firebase-admin';

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

export const getScrapeUrls = async (limit:number, completed: Boolean):Promise<urlType[]> => {
  try {
    const snapshot = await db.collection('urls')
      .where('completed', '==', completed)
      .limit(limit)
      .get();
      const urls:any = [];
      snapshot.forEach((doc) => {
        urls.push({ id: doc.id, ...doc.data() });
      });
      return urls;
  } catch (error) {
      throw error;
  }
};

export const scraper = async (url: string):Promise<{uid:string, data:autoDataValidator}| undefined> => {
  try {
    const response = await axios({
      url,
      method: 'GET',
      headers: {
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
      }
    });
    const $:any = cheerio.load(response.data);
    const heading:string =  $('h1[class="car-heading"]').text().trim();
    const price:string = $('div[class="car-price-sec"]  h3').text().trim();
    const image:string = $('div[class="model_page_view_left"]  img')?.attr('src')?.trim();
    const make:string = $('#HdnMakeForAD')?.attr('value')?.trim();
    const model:string = $('#HdnModel')?.attr('value')?.trim();
    const variant:string = $('#HdncarvariantAD')?.attr('value')?.trim();
    const type:string = $('#HdncartypeAD')?.attr('value')?.trim();

    // Overview
    let overview:overviewValidator = {};
    const overviewValues = queryDOM($, '#overview1', overview);
    overview = {
      ...overviewValues,
      name: heading,
    };

    // Specs
    let dimensions:dimensionsValidator = {};
    dimensions = queryDOM($, '#accordion1_1', dimensions);
    let engineMotor:engineMotorValidator = {};
    engineMotor = queryDOM($, '#accordion1_2', engineMotor);
    let transmission:transmissionValidator = {};
    transmission = queryDOM($, '#accordion1_4', transmission);
    let fuelEconomyRange:fuelEconomyRangeValidator = {};
    fuelEconomyRange = queryDOM($, '#accordion1_5', fuelEconomyRange);
    let suspension:suspensionValidator = {};
    suspension = queryDOM($, '#accordion1_6', suspension);
    let steering:steeringValidator = {};
    steering = queryDOM($, '#accordion1_3', steering);
    let wheels:wheelsValidator = {};
    wheels = queryDOM($, '#accordion1_7', wheels);
    let brakes:brakesValidator = {};
    brakes = queryDOM($, '#accordion1_8', brakes);

    // Safety and Features
    let safety:safetyValidator = {};
    safety = queryDOM($, '#features1', safety);
    let exterior:exteriorValidator = {};
    exterior = queryDOM($, '#features2', exterior);
    let upholstery:upholsteryValidator = {};
    upholstery = queryDOM($, '#features3', upholstery);
    let infotainment:infotainmentValidator = {};
    infotainment = queryDOM($, '#features4', infotainment);
    let comfort:comfortValidator = {};
    comfort = queryDOM($, '#features5', comfort);
    let instrumentation:instrumentationValidator = {};
    instrumentation = queryDOM($, '#features6', instrumentation);

    const uid = `${heading}-${variant}`
    const data: autoDataValidator = {
      make,
      model,
      variant,
      type,
      price,
      image,
      name: heading,
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
      },
      metadata: {
        refUrl: url,
        createdAt: new Date(),
      }
    }
    // Save to DB
    await db
    .collection('autodata')
    .doc(uid)
    .set(
      {
        uid,
        ...data
      },
      {
        merge: true
      }
    );
    return {uid, data};
}
  catch (err) {
    console.log('err', err);
    return err;
  }
};

// execute();
