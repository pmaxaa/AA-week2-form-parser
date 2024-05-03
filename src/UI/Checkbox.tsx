import { useState } from 'react'
import './Checkbox.scss'

export default function Checkbox({
	isError,
	isDisabled,
	isSelected,
}: {
	isError?: boolean
	isDisabled?: boolean
	isSelected?: boolean
}) {
	const [isChecked, setIsChecked] = useState(isSelected)

	return (
		<div className={`checkbox-wrapper`}>
			<label
				className={`${isDisabled ? 'disabled' : ''} ${isError ? 'error' : ''}`}
			>
				<input
					type='checkbox'
					checked={isChecked}
					disabled={isDisabled}
					onChange={() => setIsChecked(prev => !prev)}
				/>
				<span>text</span>
			</label>
		</div>
	)
}
