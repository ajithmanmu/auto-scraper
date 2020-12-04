import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { getScrapeUrls } from '../../scrapper/main';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { secret, limit=100, completed=false } = req.query;
    const isCompleted = (completed == 'true');
    if(!secret) {
      throw new Error('Required params are missing');
    }
    if(secret !== process.env.SCRAPPER_SECRET) {
      throw new Error('Required params are missing');
    }
    const urls = await getScrapeUrls(Number(limit), Boolean(isCompleted));
    urls.map(({id, url}) => {
      const scraperApi = `${process.env.API_URL}/scrape/${id}`;
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
    res.status(200).json({urls:urls.length});
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler
