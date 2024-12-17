import { FC, createContext, ReactElement } from 'react'
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
	const { fieldRef, getChildren } = useFormikContext({ children })
	return (
		<FormikContext.Provider value={{}}>
			<Formik
				initialValues={fieldRef.current}
				onSubmit={values => {
					console.log(fieldRef.current)
					console.log(values)
					alert(JSON.stringify(values, null, 4))
				}}
			>
				{(action) => (
					<Form>
						<Flex gap="8" direction="column">
							{getChildren(children, action)}
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
