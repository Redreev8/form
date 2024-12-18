import { FC, createContext, ReactElement } from 'react'
import { Formik, Form } from 'formik'
import { Flex } from '@chakra-ui/react'
import { Button } from '../ui/button'
import useFormikContext from './useFormikContext'
import * as Yup from 'yup'

export const FormikContext = createContext({})
export type ChildrenProps = ReactElement
export interface FormContextProps {
	children: ChildrenProps[]
}

const FormContext: FC<FormContextProps> = ({ children }) => {
	const { shemadRef, fieldRef, getChildren } = useFormikContext({ children })
	return (
		<FormikContext.Provider value={{}}>
			<Formik
				initialValues={fieldRef.current}
				validationSchema={() => {
					return Yup.object({
						...shemadRef.current,
					})
				}}
				onSubmit={async (values, { validateForm }) => {
					console.log(await validateForm(values))
					alert(JSON.stringify(values, null, 4))
				}}
			>
				{action => (
					<Form>
						<Flex gap="8" direction="column">
							{getChildren(children, action)}
							<Button
								disabled={
									action.isSubmitting ||
									!action.isValid
								}
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
