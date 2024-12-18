import { Children, cloneElement, useRef } from 'react'
import { ChildrenProps, FormContextProps } from './formik-context'
import { FormikProps } from 'formik'
import generateValidate from './validate'
import { NumberSchema, StringSchema } from 'yup'

const useFormikContext = ({ children }: FormContextProps) => {
	const fieldRef = useRef<{ [key: string]: string | number | boolean }>({})
	const shemadRef = useRef<{ [key: string]: StringSchema | NumberSchema }>({})
	const getVulue = (child: ChildrenProps) => {
		if (typeof children !== 'object') return
		if (child.props.value && !('defaultChecked' in child.props)) {
			return child.props.value
		}
		if (child.props.value && 'defaultChecked' in child.props) {
			return child.props.defaultChecked ? [child.props.value] : []
		}
		if (child.props.defaultChecked) {
			return child.props.defaultChecked
		}
		if (child.props.defaultValue) {
			return child.props.defaultValue
		}
	}
	const getChildren = (
		children: ChildrenProps[],
		action: FormikProps<{
			[key: string]: string | number | boolean
		}>,
	): ChildrenProps[] => {
		return Children.map(children, child => {
			if (typeof child !== 'object') return child
			if (child.props && !child.props.name && child.props.children) {
				return cloneElement(child, {
					...child.props,
					children: getChildren(
						child.props.children,
						action,
					),
				})
			}
			if (!child.props.name && !child.props.children) {
				return child
			}

			const name = child.props.name as string
			const value = getVulue(child)
			const validate = generateValidate(child)
			if (validate && !shemadRef.current[name]) {
				shemadRef.current[name] = validate
			}

			fieldRef.current[name] = value
			const props = {
				onChange: action.handleChange,
				onBlur: action.handleBlur,
				disabled: action.isSubmitting,
			}
			child = cloneElement(child, props)
			return (
				<>
					{child}
					{action.errors[name] && action.touched[name] ? (
						<div>{action.errors[name]}</div>
					) : null}
				</>
			)
		})
	}

	return {
		getChildren,
		fieldRef,
		shemadRef,
	}
}

export default useFormikContext
