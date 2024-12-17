import { CheckboxGroup, Fieldset, HStack } from '@chakra-ui/react'
import { Checkbox } from './ui/checkbox'
import { Radio, RadioGroup } from './ui/radio'
import FormikContext from './formik-context'

const Form = () => {
	return (
		<FormikContext>
			<Fieldset.Root>
				<CheckboxGroup defaultValue={['react']} name="framework">
					<Fieldset.Legend fontSize="sm" mb="2">
						Framework (name framework)
					</Fieldset.Legend>
					<Fieldset.Content>
						<HStack gap="6">
							<Checkbox value="react">
								React
							</Checkbox>
							<Checkbox value="svelte">
								Svelte
							</Checkbox>
							<Checkbox value="vue">
								Vue
							</Checkbox>
							<Checkbox value="angular">
								Angular
							</Checkbox>
						</HStack>
					</Fieldset.Content>
				</CheckboxGroup>
			</Fieldset.Root>
			<Fieldset.Root>
				<RadioGroup name="style" defaultValue="1">
					<Fieldset.Legend fontSize="sm" mb="2">
						Style
					</Fieldset.Legend>
					<Fieldset.Content>
						<HStack gap="6">
							<Radio value="1">tailwind</Radio>
							<Radio value="2">scss</Radio>
							<Radio value="3">csss</Radio>
						</HStack>
					</Fieldset.Content>
				</RadioGroup>
			</Fieldset.Root>
			<Fieldset.Root>
				<Fieldset.Legend fontSize="sm" mb="2">
					Type js (No validation in semantics radio)
				</Fieldset.Legend>
				<Fieldset.Content>
					<RadioGroup name="type js" defaultValue="1">
						<HStack gap="6">
							<Radio value="1">ts</Radio>
							<Radio value="2">vanill js</Radio>
						</HStack>
					</RadioGroup>
				</Fieldset.Content>
			</Fieldset.Root>
		</FormikContext>
	)
}

export default Form
