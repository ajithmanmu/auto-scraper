import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { getModels } from '../../scrapper/main';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { brand } = req.query;
    if(!brand) {
      throw new Error('Required params are missing');
    }
    const url = `${process.env.HOST_URL}/${brand}`;
    const variantsApi = `${process.env.API_URL}/brandurls`;
    const models = await getModels(url);
    models.map((modelUrl) => {
      const data = { modelUrl };
      axios({
        url:variantsApi,
        method: 'POST',
        data,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    });
    res.status(200).json(models);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler
