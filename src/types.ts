export type FormDescription = {
	form_name: string
	form_description: string
	form_fields: (
		| InputText
		| TextAreaType
		| FileInput
		| CheckboxType
		| Color
		| Select
	)[]
	form_buttons: Button[]
}

export type InputText = {
	id: string
	type: 'text' | 'password'
	label: string
	required?: boolean
	placeholder: string
	minlength?: number
	maxlength?: number
	mask?: string
	pattern?: RegExp
}

export type TextAreaType = {
	id: string
	type: 'textarea'
	label: string
	required?: boolean
	placeholder: string
	maxlength?: number
}

type FileInput = {
	id: string
	type: 'file'
	label: string
	required: boolean
	formats: string
	max_size: number
	max_count: number
}

export type CheckboxType = {
	id: string
	type: 'checkbox'
	label: string
	required?: boolean
}

type Button = {
	name: string
	type: 'button' | 'submit' | 'reset'
}

type Color = {
	id: string
	type: 'color'
	label: string
	required: boolean
	options: string[]
}

type Select = {
	id: string
	type: 'select'
	label: string
	required: boolean
	multiple: boolean
	options: string[]
}
