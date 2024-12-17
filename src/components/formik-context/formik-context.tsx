import { FC, Children, cloneElement, createContext, ReactElement } from 'react'
import { Formik, Form } from 'formik'
import { Flex } from '@chakra-ui/react'
import { Button } from '../ui/button'
import useFormikContext from './useFormikContext'

export const FormikContext = createContext({})
export type ChildrenProps = ReactElement
export interface FormContextProps {
	children: ChildrenProps[]
}

const FormContext: FC<FormContextProps> = ({ children }) => {
	const { fieldRef } = useFormikContext({ children })
	return (
		<FormikContext.Provider value={{}}>
			<Formik
				initialValues={fieldRef.current}
				onSubmit={values => {
					alert(JSON.stringify(values, null, 4))
				}}
			>
				{({ handleChange }) => (
					<Form>
						<Flex gap="8" direction="column">
							{Children.map(children, child => {
								if (
									typeof children !==
									'object'
								)
									return child
								const props = {
									onChange: handleChange,
								}
								return cloneElement(
									child,
									props,
								)
							})}
							<Button
								size="xs"
								variant="outline"
								type="submit"
							>
								Submit
							</Button>
						</Flex>
					</Form>
				)}
			</Formik>
		</FormikContext.Provider>
	)
}

export default FormContext
