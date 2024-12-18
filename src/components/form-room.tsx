import { Input } from '@chakra-ui/react'
import { Field } from './ui/field'
import FormikContext from './formik-context'

const FormRoom = () => {
	return (
		<FormikContext>
			<Field label="Название объекта" required>
				<Input type='text' name="name" required/>
			</Field>
			<Field label="Адрес" required>
				<Input type='text' name="address" required/>
			</Field>
			<Field label="Этаж" required>
				<Input
					type='number'
					name="floor"
					min={-1}
					required
				/>
			</Field>
			<Field label="Количество этажей в доме" required>
				<Input
					type='number'
					name="totalFloors"
					min={-3}
					max={200}
					required
				/>
			</Field>
			<Field label="Площадь" required>
				<Input
					type='number'
					name="square"
					max={400}
					min={0}
					required
				/>
			</Field>
			<Field label="Жилая площадь" required>
				<Input
					type='number'
					name="livingSquare"
					min={0}
					required
				/>
			</Field>
			<Field label="Площадь кухни" required>
				<Input
					type='number'
					name="kitchenSquare"
					min={0}
					required
				/>
			</Field>
		</FormikContext>
	)
}

export default FormRoom
