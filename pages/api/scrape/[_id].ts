import { NextApiRequest, NextApiResponse } from 'next'
import { scraper } from '../../../scrapper/main';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {
      query: { _id},
      method
    } = req;
    switch (method) {
      case 'POST':
        const { url } = req.body;
        if(!url || !_id) {
          throw new Error('Required params are missing');
        }
        const result = await scraper(url);
        console.log('result', result); // Save to DB
        res.status(200).json(result);
        break;
      default:
        res.setHeader('Allow', ['GET', 'POST'])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
    
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler
