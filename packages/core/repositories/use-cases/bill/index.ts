import { getFirestore } from 'firebase/firestore';
import { Bill } from '../../../models/use-cases/bill';
import { FirestoreRepo } from '../../helpers/firebase';
import { LoadBillRepo } from './load';

const firebaseRepo = new FirestoreRepo(getFirestore(), 'bills', Bill.init.one);
export const BillRepo = new LoadBillRepo(firebaseRepo);
