import { TextAreaType } from '../../../types'
import './TextArea.scss'

export default function TextArea({
	id,
	label,
	placeholder,
	handleChange,
	value,
	error,
}: Omit<TextAreaType, 'type'> & {
	error: string
	value: string
	handleChange: (id: string, value: string) => void
}) {
	return (
		<>
			<div className={`textarea-wrapper ${error ? 'error' : ''}`}>
				<textarea
					name={id}
					id={id}
					value={value}
					placeholder={placeholder ? placeholder : ''}
					onChange={event => handleChange(id, event.target.value)}
					autoComplete='off'
				/>
				<span>{label}</span>
			</div>
			<p className='error-text'>{error}</p>
		</>
	)
}
