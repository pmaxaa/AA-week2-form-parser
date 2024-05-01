import './App.scss'
import Button from './UI/Button'

function App() {
	return (
		<>
			<h1>Form Parser</h1>
			<div className='buttons'>
				<Button styles='primary label' text='Кнопка' isDisabled={false} />
				<Button styles='primary label' text='Кнопка' isDisabled={true} />
				{/* <Button styles='primary circle' text='+' /> */}
				<Button styles='secondary label' text='Кнопка' isDisabled={false} />
				<Button styles='secondary label' text='Кнопка' isDisabled={true} />
			</div>
		</>
	)
}

export default App
