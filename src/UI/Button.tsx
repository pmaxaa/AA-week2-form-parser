import './Button.scss'

export default function Button({
	styles,
	text,
	isDisabled,
}: {
	styles: string
	text: string
	isDisabled: boolean
}) {
	return (
		<button type='button' className={styles} disabled={isDisabled}>
			{text}
		</button>
	)
}
