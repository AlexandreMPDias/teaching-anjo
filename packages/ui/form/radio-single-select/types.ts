import { IRadioSliderItemsContainerProps } from './components';

export interface IRadioSelectProps<Value> extends IRadioSelectFormProps {
	readonly ref?: any;
	readonly label: string;
	readonly defaultValue?: Value;
	readonly options: readonly Value[];
	readonly isInvalid?: any;
	readonly isDisabled?: any;
	readonly isFocusable?: any;
	readonly isNative?: any;
	readonly itemsContainerProps?: IRadioSliderItemsContainerProps;
	ItemsContainer?: React.FC<IRadioSliderItemsContainerProps>;
	keyExtractor?(item: Value): string;
	labelExtractor?(item: Value): string;
	onChangeValue?(value: Value): void;
}

export type IRadioSelectBaseOption<Value> = {
	readonly value: Value;
	readonly key: string;
};

export interface IRadioSelectOption<Value> extends IRadioSelectBaseOption<Value> {
	readonly selected: boolean;
	readonly label: string;
}

export type IRadioSelectFormProps = {
	readonly value?: any;
	readonly name: string;
	readonly multiple?: boolean;
	readonly checked?: boolean;
	onChange?: {
		/** Classic React change handler, keyed by input name */
		(e: React.ChangeEvent<any>): void;
		/** Preact-like linkState. Will return a handleChange function.  */
		<T = string | React.ChangeEvent<any>>(field: T): T extends React.ChangeEvent<any>
			? void
			: (e: string | React.ChangeEvent<any>) => void;
	};
	/** Blur event handler */
	onBlur?: {
		/** Classic React blur handler, keyed by input name */
		(e: React.FocusEvent<any>): void;
		/** Preact-like linkState. Will return a handleBlur function. */
		<T = string | any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
	};
};

export type FC = {
	<V>(props: IRadioSelectProps<V>): React.ReactElement;
	defaultProps?: IRadioSelectProps<unknown>;
};
