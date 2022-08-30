import {
	Slider as ChakraSlider,
	SliderTrack,
	SliderThumb,
	Tooltip,
	Box,
	SliderMark,
	IconButton,
	FormLabel,
	IconButtonProps,
} from '@chakra-ui/react';
import { useCallback, useMemo, useState } from 'react';
import { UpDownIcon } from '@chakra-ui/icons';
import { addDefaultProps } from '@angel-oak/ui/helpers/add-default-props';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

export interface ISliderProps {
	id: string;
	onChange: (value: number) => void;
	value: number;
	min: number;
	max: number;
	label: string;
	tooltip: (value: number) => string | number;
	marks: (string | number)[];
}

const Arrow: React.FC<IconButtonProps> = (props) => {
	return null;
	return <IconButton {...props} size="sm" variant="secondary" />;
};

const SliderComponent: React.FC<ISliderProps> = (props) => {
	const [showTooltip, setShowTooltip] = useState<boolean>(false);

	const sliderValue = props.value;

	const tooltip = useCallback(
		(value: number) => {
			return props.tooltip ? props.tooltip(value) : value;
		},
		[props.tooltip]
	);

	const initial = useMemo(() => props.value, []);

	return (
		<>
			<FormLabel>{props.label}</FormLabel>
			<Box px="20px" pb="10px">
				<Arrow
					aria-label="Decrease"
					icon={<ChevronLeftIcon />}
					onClick={() => {
						props.onChange(props.value - 1);
					}}
				/>
				<ChakraSlider
					id={'slider-start-' + props.id}
					aria-label={'slider-' + props.id}
					defaultValue={initial}
					min={props.min}
					max={props.max}
					value={props.value}
					colorScheme="teal"
					onChange={(v) => props.onChange(v)}
					onMouseEnter={() => setShowTooltip(true)}
					onMouseLeave={() => setShowTooltip(false)}
					variant="light"
				>
					{props.marks.map((mark, index) => (
						<SliderMark
							key={`mark_${mark}_${index}`}
							value={typeof mark === 'string' ? index : mark}
							mt="1"
							ml={props.max > 20 ? '-5' : '-2.5'}
							fontSize="sm"
						>
							{mark}
						</SliderMark>
					))}{' '}
					<SliderTrack></SliderTrack>
					<Tooltip
						hasArrow
						bg="secondary.700"
						color="white"
						placement="top"
						isOpen={showTooltip}
						label={tooltip(sliderValue)}
					>
						<SliderThumb>
							<Box as={UpDownIcon} transform={'rotate(90deg)'} />
						</SliderThumb>
					</Tooltip>
				</ChakraSlider>
				<Arrow
					aria-label="Increase"
					icon={<ChevronRightIcon />}
					onClick={() => {
						props.onChange(props.value + 1);
					}}
				/>
			</Box>
		</>
	);
};

export const Slider = addDefaultProps(SliderComponent, {
	tooltip: (value: number) => value,
});
