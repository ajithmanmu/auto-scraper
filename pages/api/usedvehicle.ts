import { NextApiRequest, NextApiResponse } from 'next';
import { usedVehicleScraper_passenger, usedVehicleScraper_commercial } from '../../scrapper/usedvehicle';

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    await usedVehicleScraper_passenger('https://www.cardekho.com/used-cars+in+kerala');
    await usedVehicleScraper_commercial();
    res.status(200).json({ message: 'success' });
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message });
  }
};

export default handler;
