import { NextApiRequest, NextApiResponse } from 'next'
import { getVariants } from '../../scrapper/main';
import { db } from '../../lib/firebase-admin';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
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
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler
