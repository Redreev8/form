import * as Yup from 'yup'

const string = () => {
	let yup = Yup.string()

	return yup
}

const integer = (input: JSX.Element) => {
	let yup = Yup.number().integer()
	if ('min' in input.props) {
		yup = yup.min(
			input.props.min,
			`Значение не может быть меньше ${input.props.min}`,
		)
	}
	if ('max' in input.props) {
		yup = yup.max(
			input.props.max,
			`Значение не может быть меньше ${input.props.max}`,
		)
	}	
	return yup
}

export type YupType = Yup.StringSchema | Yup.NumberSchema

const generateValidate = (input: JSX.Element, yupProps: undefined | ((yup: YupType) => YupType)) => {
	let yup
	if (input.props.type === 'text') {
		yup = string()
	}
	if (input.props.type === 'number') {
		yup = integer(input)
	}

	if (yup && 'required' in input.props) {
		yup = yup.required('Поле обязательно для заполнения')
	}
	
	if (yup && yupProps) {
		yup = yupProps(yup)
	}

	return yup
}

export default generateValidate
