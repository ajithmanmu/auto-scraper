import { db } from '../lib/firebase-admin';

export const getAllUids = async():Promise<any[]> => {
    try {
        const snapshot = await db
        .collection('autodata')
        .get();
        const uniqueSpecIdsArray:any = [];
        snapshot.forEach((doc) => {
          uniqueSpecIdsArray.push({ id: doc.id, ...doc.data() });
        });
        const results = [...new Set(uniqueSpecIdsArray.map((item: { uid: any; }) => item.uid))];
        return results;
    } catch (error) {
        return error;
    }
};

export const getSpec = async(uid:any):Promise<string> => {
    try {
        const snapshot = await db
        .collection('autodata')
        .where('uid', '==', uid)
        .get();
        const specsArray:any = [];
        snapshot.forEach((doc) => {
            specsArray.push({ id: doc.id, ...doc.data() });
        });
        return JSON.stringify(specsArray); // Hack for timestamp issue with getStaticProps
    } catch (error) {
        return error;
    }
};
