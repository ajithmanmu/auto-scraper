import { NextApiRequest, NextApiResponse } from 'next';
import * as _ from "lodash";
import { db } from '../../lib/firebase-admin';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { make, model } = req.query;
    if(!make || !model) {
      throw new Error('Required params are missing');
    }
    const snapshot = await db
      .collection('autodata')
      .where('make', '==', make)
      .where('model', '==', model)
      .get();
    const specsArray:any = [];
    snapshot.forEach((doc) => {
      specsArray.push({ id: doc.id, ...doc.data() });
    });
    // const result = [...new Set(modelArray.map((item: { model: any; }) => item.model))];
    res.status(200).json(specsArray);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler
