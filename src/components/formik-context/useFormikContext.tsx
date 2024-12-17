import { Children, useRef } from 'react'
import { ChildrenProps, FormContextProps } from './formik-context'

const useFormikContext = ({ children }: FormContextProps) => {
	const fieldRef = useRef<{ [key: string]: string | number | boolean }>({})
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
		if (!child.props && child.props.children) return
		Children.forEach(child.props.children, child => {
			if (typeof children !== 'object') return
			if (!child.props) return
			if (!child.props.name) return getVulue(child)
			const name = child.props.name as string
			const value = getVulue(child)
			fieldRef.current[name] = value
		})
	}
	Children.forEach(children, child => {
		if (typeof children !== 'object') return
		const name = child.props.name as string
		const value = getVulue(child)
		if (!value) return
		fieldRef.current[name] = value
	})
	return {
		fieldRef,
	}
}

export default useFormikContext
