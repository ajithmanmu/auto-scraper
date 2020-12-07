import { NextApiRequest, NextApiResponse } from 'next';
import * as _ from "lodash";
import { db } from '../../lib/firebase-admin';

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const snapshot = await db
      .collection('autodata')
      .get();
    const makeArray:any = [];
    snapshot.forEach((doc) => {
        makeArray.push({ id: doc.id, ...doc.data() });
    });
    const result = [...new Set(makeArray.map((item: { make: any; }) => item.make))];
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler
