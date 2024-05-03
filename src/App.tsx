import './App.scss'
import Button from './UI/Button'
import Checkbox from './UI/Checkbox'
import Color from './UI/Color'

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
			<div className='color'>
				<Color />
			</div>
			<div className='checkboxes'>
				<Checkbox />
				<Checkbox isSelected />
				<Checkbox isDisabled />
				<Checkbox isSelected isDisabled />
				<Checkbox isError />
			</div>
		</>
	)
}

export default App
