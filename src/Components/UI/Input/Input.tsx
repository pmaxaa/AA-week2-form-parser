import { InputText } from '../../../types'
import './Input.scss'

export default function Input({
	id,
	type,
	label,
	placeholder,
	// mask,
	handleChange,
	value,
	error,
}: InputText & {
	error: string
	value: string
	handleChange: (id: string, value: string) => void
}) {
	return (
		<>
			<div className={`input-wrapper ${error ? 'error' : ''}`}>
				<label>
					<input
						type={type}
						name={id}
						id={id}
						value={value}
						placeholder={placeholder ? placeholder : ''}
						onChange={event => handleChange(id, event.target.value)}
						autoComplete='off'
						autoSave='off'
					/>
					<span>{label}</span>
				</label>
			</div>
			<p className='error-text'>{error}</p>
		</>
	)
}
