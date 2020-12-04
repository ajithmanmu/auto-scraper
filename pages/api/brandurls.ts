import { NextApiRequest, NextApiResponse } from 'next'
import { getVariants, getScrapeUrls } from '../../scrapper/main';
import { db } from '../../lib/firebase-admin';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {
      method
    } = req;
    switch (method) {
      case 'POST':
        const { modelUrl } = req.body;
        if(!modelUrl) {
          throw new Error('Required params are missing');
        }
        const variantUrls = await getVariants(modelUrl);
        variantUrls.map(async (url)=>{
        // Save to DB
        const uid = url.substring(url.lastIndexOf('/') + 1)
        await db
        .collection('urls')
        .doc(uid)
        .set(
          {
            url,
            completed:  false,
          },
        );
        });
        res.status(200).json(variantUrls);
        break;
      case 'GET':
        const { limit=100, completed=false } = req.query;
        const isCompleted = (completed == 'true');
        const urls = await getScrapeUrls(Number(limit), Boolean(isCompleted));
        res.status(200).json({count:urls.length, isCompleted});
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
