import { Datum } from '@angel-oak/utils/date/datum';
import { DateService } from '@angel-oak/utils/date';

import { makeProtectedInit } from '../../helpers/protect-reinitialization';
import { IDbDate } from './schema';

const datumProtector = makeProtectedInit<Datum>()((input) => input && input instanceof Datum);

const init = datumProtector.protect((date: IDbDate.Api | null | undefined): IDbDate => {
	if (!date) return DateService.now();
	if (date instanceof Date) {
		return new Datum(date);
	}
	return new Datum(date.toDate());
});

const initNonNullable: {
	(date: null): null;
	(date: Datum | IDbDate.Api | undefined): IDbDate;
	(date: Datum | IDbDate.Api | undefined | null): IDbDate | null;
} = (date: any): any => {
	if (date === null) return null;
	return init(date);
};

export const DbDate = {
	init: Object.assign(init, { null: initNonNullable }),
	serialize: (date: Date | Datum): IDbDate.Api => {
		return Datum.init(date).toDate();
	},
};
