import * as Yup from 'yup'

const string = (input: JSX.Element) => {
	let yup = Yup.string()
	if ('required' in input.props) {
		yup = yup.required('Поле обязательно для заполнения')
	}

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
	if ('required' in input.props) {
		yup = yup.required('Поле обязательно для заполнения')
	}
	return yup
}

const generateValidate = (input: JSX.Element) => {
	if (input.props.type === 'text') {
		return string(input)
	}
	if (input.props.type === 'number') {
		return integer(input)
	}
}

export default generateValidate
