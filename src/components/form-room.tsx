import { Input } from '@chakra-ui/react'
import { Field } from './ui/field'
import FormikContext from './formik-context'
import { NumberSchema } from 'yup'
import { FormContextProps } from './formik-context/formik-context'

const FormRoom = () => {
	const yup: FormContextProps['yup'] = {
		floor: yup =>
			(yup as NumberSchema).test(
				'should-be-greather-than-totalFloors',
				'Значение не может быть больше количества этажей',
				function (value) {
					const totalFloors = this.parent.totalFloors
					if (!value) return false
					if (!totalFloors) {
						return true
					}
					return value <= totalFloors
				},
			),
		square: yup =>
			(yup as NumberSchema).test(
				'should-be-greather-than-livingSquare+kitchenSquare',
				'Общая площадь должна быть больше суммы жилой площади и площади кухни',
				function (value) {
					const livingSquare = this.parent.livingSquare
					const kitchenSquare = this.parent.kitchenSquare
					if (!value) return
					if (!livingSquare && !kitchenSquare) {
						return true
					}
					return value > livingSquare + kitchenSquare
				},
			),
	}
	return (
		<FormikContext yup={yup}>
			<Field label="Название объекта" required>
				<Input type="text" name="name" required />
			</Field>
			<Field label="Адрес" required>
				<Input type="text" name="address" required />
			</Field>
			<Field label="Этаж" required>
				<Input type="number" name="floor" min={-1} required />
			</Field>
			<Field label="Количество этажей в доме" required>
				<Input
					type="number"
					name="totalFloors"
					min={-3}
					max={200}
					required
				/>
			</Field>
			<Field label="Площадь" required>
				<Input
					type="number"
					name="square"
					max={400}
					min={0}
					required
				/>
			</Field>
			<Field label="Жилая площадь" required>
				<Input
					type="number"
					name="livingSquare"
					min={0}
					required
				/>
			</Field>
			<Field label="Площадь кухни" required>
				<Input
					type="number"
					name="kitchenSquare"
					min={0}
					required
				/>
			</Field>
		</FormikContext>
	)
}

export default FormRoom
