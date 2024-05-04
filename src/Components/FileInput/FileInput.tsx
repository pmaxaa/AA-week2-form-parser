import { useState } from 'react'
import { FormDescription } from '../../types'
import FormConstructor from '../FormConstructor/FormConstructor'
import FileUpload from '../UI/FileUpload/FileUpload'

const readJsonFile = (file: Blob) =>
	new Promise((resolve, reject) => {
		const fileReader = new FileReader()

		fileReader.onload = event => {
			if (event.target) {
				try {
					const result = JSON.parse(event.target.result as string)
					resolve(result)
				} catch (error) {
					reject(error)
				}
			}
		}
		fileReader.onerror = error => reject(error)
		fileReader.readAsText(file)
	})

const FileInput = () => {
	const [data, setData] = useState<FormDescription[]>([])
	const [files, setFiles] = useState<File[]>([])

	const handleChange = async (files: File[]) => {
		setFiles(files)
		const newData = []
		for (let index = 0; index < files.length; index++) {
			const parsedData = (await readJsonFile(files[index])) as FormDescription
			newData[index] = parsedData
		}
		setData(newData)
	}

	const forms = data.map(data => (
		<div key={data.form_name}>
			<FormConstructor data={data} />
		</div>
	))

	return (
		<>
			<FileUpload
				files={files}
				onChange={handleChange}
				accept='.json,application/json'
				id='jsonLoader'
				maxSize={10 * 1024 * 1024}
			/>
			{forms}
		</>
	)
}

export default FileInput
