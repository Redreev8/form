import { Container, Flex } from '@chakra-ui/react'
import Form from './components/form'
import FormRoom from './components/form-room'

const App = () => {
	return (
		<Container maxW="sm" px="2" py="4">
			<Flex direction="column" gap="20">
				<Form />
				<FormRoom />
			</Flex>
		</Container>
	)
}

export default App
