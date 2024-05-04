import { useState } from 'react'
import { FormDescription } from '../../types'
import Button from '../UI/Button/Button'
import Checkbox from '../UI/Checkbox/Checkbox'
import FileUpload from '../UI/FileUpload/FileUpload'
import Input from '../UI/Input/Input'
import TextArea from '../UI/TextArea/TextArea'
import './FormConstructor.scss'

export default function FormConstructor({ data }: { data: FormDescription }) {
	const object = data.form_fields.reduce((obj, item) => {
		if (
			item.type === 'text' ||
			item.type === 'textarea' ||
			item.type === 'password'
		)
			return {
				...obj,
				[item.id]: '',
			}
		if (item.type === 'file') {
			return {
				...obj,
				[item.id]: [],
			}
		}
		if (item.type === 'checkbox') {
			return {
				...obj,
				[item.id]: false,
			}
		}
		return {
			...obj,
		}
	}, {})

	const [fieldsData, setFieldsData] =
		useState<Record<string, string | boolean | number | File[]>>(object)
	const [fieldsError, setFieldsError] = useState<Record<string, string>>({})

	const handleChange = (
		id: string,
		value: string | boolean | number | File[]
	) => {
		setFieldsData({
			...fieldsData,
			[id]: value,
		})
	}

	const fields = data.form_fields.map(field => {
		let element
		switch (field.type) {
			case 'text':
			case 'password':
				element = (
					<Input
						id={field.id}
						label={field.label}
						placeholder={field.placeholder}
						type={field.type}
						value={fieldsData[field.id] as string}
						handleChange={handleChange}
						error={fieldsError[field.id]}
					/>
				)
				break
			case 'checkbox':
				element = (
					<Checkbox
						id={field.id}
						label={field.label}
						value={fieldsData[field.id] as boolean}
						error={fieldsError[field.id]}
						handleChange={handleChange}
					/>
				)
				break
			case 'textarea':
				element = (
					<TextArea
						id={field.id}
						label={field.label}
						placeholder={field.placeholder}
						value={fieldsData[field.id] as string}
						handleChange={handleChange}
						error={fieldsError[field.id]}
					/>
				)
				break
			case 'file':
				element = (
					<FileUpload
						files={fieldsData[field.id] as File[]}
						onChange={files => handleChange(field.id, files)}
						accept={field.formats}
						id={field.id}
						maxSize={field.max_size}
					/>
				)
				break
			case 'color':
				break
			case 'select':
				break
			default:
				throw new Error('unknown field type')
		}
		return <div key={field.id}>{element}</div>
	})

	const buttons = data.form_buttons.map(button => (
		<div key={button.name}>
			<Button name={button.name} type={button.type} />
		</div>
	))

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault()
		setFieldsError({})
		let flag = false
		for (const [id, value] of Object.entries(fieldsData)) {
			const field = data.form_fields.find(field => field.id === id)
			if (field) {
				if (field.required && !value) {
					flag = true
					setFieldsError(prev => ({
						...prev,
						[id]: 'Обязательное поле',
					}))
				}
				if (
					(field.type === 'text' ||
						field.type === 'textarea' ||
						field.type === 'password') &&
					field.maxlength &&
					typeof value === 'string' &&
					value.length > field.maxlength
				) {
					flag = true
					setFieldsError(prev => ({
						...prev,
						[id]: `Длина должна быть меньше ${field.maxlength} символов`,
					}))
				}
			}
		}

		if (!flag) {
			const formData = new FormData(event.currentTarget)
			const obj: Record<string, string | File> = {}
			for (const [key, value] of formData) {
				obj[key] = value
			}
			console.log(obj)
		}
	}

	return (
		<form onSubmit={handleSubmit} autoComplete='off' noValidate>
			<div className='close-button'>
				<Button form='circle' type='button' />
			</div>
			<div className='form-title'>
				<h2>{data.form_name}</h2>
				<p>{data.form_description}</p>
			</div>
			<div className='form-fields'>{fields}</div>
			<div className='form-buttons'>{buttons}</div>
		</form>
	)
}
