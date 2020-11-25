import { NextApiRequest, NextApiResponse } from 'next'
import { execute } from '../../scrapper/main';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { brand } = req.query;
    console.log('brand', brand);
    if(!brand) {
      throw new Error('Required params are missing');
    }
    const cronResult = await execute(brand.toString());
    res.status(200).json(cronResult);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler
