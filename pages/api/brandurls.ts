import { NextApiRequest, NextApiResponse } from 'next'
import { getVariants } from '../../scrapper/main';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { modelUrl } = req.body;
    if(!modelUrl) {
      throw new Error('Required params are missing');
    }
    const variantUrls = await getVariants(modelUrl);
    // Array - loop and Save in DB
    res.status(200).json(variantUrls);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler
