import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { getScrapeUrls } from '../../scrapper/main';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { secret } = req.query;
    if(!secret) {
      throw new Error('Required params are missing');
    }
    if(secret !== process.env.SCRAPPER_SECRET) {
      throw new Error('Required params are missing');
    }
    const urls = await getScrapeUrls();
    urls.map(({_id, url}) => {
      const scraperApi = `${process.env.API_URL}/scrape/${_id}`;
      const data = { url };
      axios({
        url:scraperApi,
        method: 'POST',
        data,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    });
    res.status(200).json(urls);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler
