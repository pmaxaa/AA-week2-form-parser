import React, { useState } from 'react'
import './FileUpload.scss'

type FileUploadProps = {
	files: File[]
	onChange: (files: File[]) => void
	accept: string
	id: string
	maxSize: number
}

const FileUpload = ({
	onChange,
	files,
	accept,
	id,
	maxSize,
}: FileUploadProps) => {
	const [drag, setDrag] = useState(false)

	const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
		event.preventDefault()
	}

	const handleDragEnter = () => {
		setDrag(true)
	}

	const handleDragLeave = (event: React.DragEvent<HTMLLabelElement>) => {
		const rect = event.currentTarget.getBoundingClientRect()

		if (
			event.clientX < rect.left ||
			event.clientX > rect.right ||
			event.clientY < rect.top ||
			event.clientY > rect.bottom
		) {
			setDrag(false)
		}
	}

	const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
		event.preventDefault()
		onChange([...files, ...event.dataTransfer.files])
		setDrag(false)
	}

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		onChange([...files, ...event.target.files!])
	}

	const handleDelete = (fileName: string) => {
		onChange(files.filter(file => file.name !== fileName))
	}

	return (
		<div className={`file-upload-wrapper ${drag ? 'drag' : ''}`}>
			<input
				type='file'
				name={id}
				id={id}
				multiple
				onChange={handleFileChange}
				hidden
				accept={accept}
			/>
			<label
				htmlFor={id}
				className='file-drag-drop'
				onDragOver={handleDragOver}
				onDragEnter={handleDragEnter}
				onDragLeave={handleDragLeave}
				onDrop={handleDrop}
			>
				<p className='title'>
					<span>Выберите файл</span> или перетащите его в форму
				</p>
				<p className='require'>
					{accept} files up to {maxSize / 1024 / 1024} MB in size are available
					for download
				</p>
			</label>
			<ul className='file-list'>
				{files &&
					files.map(file => (
						<li key={file.name}>
							<p>{file.name}</p>
							<button onClick={() => handleDelete(file.name)}>Удалить</button>
						</li>
					))}
			</ul>
		</div>
	)
}

export default FileUpload
