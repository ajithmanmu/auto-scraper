import { NextApiRequest, NextApiResponse } from 'next'
import { scraper } from '../../../scrapper/main';
import { db } from '../../../lib/firebase-admin';
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {
      query: { id },
      method
    } = req;
    switch (method) {
      case 'POST':
        const { url } = req.body;
        if(!url || !id) {
          throw new Error('Required params are missing');
        }
        const { uid, data } = await scraper(url);
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
        await db
        .collection('urls')
        .doc(id.toString())
        .set(
          {
            url,
            completed:  true,
          },
          {
            merge: true
          }
        );
        res.status(200).json(uid);
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
