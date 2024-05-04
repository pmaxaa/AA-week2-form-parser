import { CheckboxType } from '../../../types'
import './Checkbox.scss'

export default function Checkbox({
	id,
	label,
	error,
	value,
	isDisabled,
	handleChange,
}: Omit<CheckboxType, 'type'> & {
	value: boolean
	error: string
	isDisabled?: boolean
	handleChange: (id: string, value: boolean) => void
}) {
	return (
		<div className={`checkbox-wrapper`}>
			<label
				className={`${isDisabled ? 'disabled' : ''} ${error ? 'error' : ''}`}
			>
				<input
					name={id}
					id={id}
					type='checkbox'
					checked={value}
					disabled={isDisabled}
					onChange={event => handleChange(id, event.target.checked)}
				/>
				<span>{label}</span>
			</label>
		</div>
	)
}
