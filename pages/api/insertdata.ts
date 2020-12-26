import { NextApiRequest, NextApiResponse } from 'next';
import * as _ from "lodash";
import { db } from '../../lib/firebase-admin';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const {
        method
      } = req;
      switch (method) {
        case 'POST':
            const snapshot = await db
            .collection('autodata')
            .get();
            const makeArray:any = [];
            snapshot.forEach((doc) => {
                makeArray.push({ id: doc.id, ...doc.data() });
            });
            const result = [...new Set(makeArray.map((item: { make: any; }) => item.make))];
            result.map(async (make)=>{
                const makeDoc = db.collection('make').doc();
                makeDoc.set({
                    make
                });
            });
            res.status(200).json(result);
        default:
            res.setHeader('Allow', ['GET', 'POST'])
            res.status(405).end(`Method ${method} Not Allowed`)
      }
    
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: err.message })
  }
}

export default handler
