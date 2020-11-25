import { NextApiRequest, NextApiResponse } from 'next'
import { execute } from '../../scrapper/main';

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const cronResult = await execute();
    res.status(200).json(cronResult);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler
