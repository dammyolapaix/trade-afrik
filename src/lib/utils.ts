import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getFormData = (formData: FormData) => {
  const filteredData: Record<string, unknown> = {}

  // Convert the FormData entries to an array for compatibility
  const entries = Array.from(formData.entries())

  for (const [key, value] of entries) {
    // If the key ends with '[]' (indicating checkbox-like input), handle it as an array
    if (key.endsWith('[]')) {
      // Initialize an array if it doesn't exist yet
      if (!filteredData[key]) {
        filteredData[key] = []
      }
      // Push non-empty values to the array
      if (typeof value === 'string' && value.trim() !== '') {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        filteredData[key].push(value)
      }
    }
    // Include NextJs Form action payload
    else if (key.includes('$ACTION')) {
      filteredData[key] = value
    }

    // Handle boolean values
    else if (
      typeof value === 'string' &&
      (value === 'true' || value === 'false')
    ) {
      filteredData[key] = value === 'true'
    }

    // Check if the value is a non-empty string
    else if (typeof value === 'string' && value.trim() !== '') {
      filteredData[key] = value
    }
  }

  return filteredData
}

export const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
