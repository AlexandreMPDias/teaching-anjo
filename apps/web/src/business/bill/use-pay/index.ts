import { IBill } from '@angel-oak/core/models/schemas';
import Swal from 'sweetalert2';
import { useAsyncCall } from '@angel-oak/poseidon';
import { BillRepo as Repo } from '@angel-oak/core/repositories/use-cases/bill';

export const useBillPay = (bill: IBill | null) => {
	const pay = useAsyncCall(
		async () => {
			await new Promise((r) => setTimeout(r, 1000));
			// if (!bill) return;
			// if (bill.status === 'paid') {
			// 	Swal.fire('Oops...', 'This bill is already paid', 'error');
			// 	return;
			// }
			// await Repo.update(bill.uuid, { status: 'paid' });
			Swal.fire('Success', 'This bill was paid', 'success');
		},
		{
			enabled: true, //Boolean(bill && bill.status !== 'paid'),
			initial: false,
		},
		[bill]
	);
	return pay;
};
