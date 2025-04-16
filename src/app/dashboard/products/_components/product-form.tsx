'use client'

import { useActionState } from 'react'

import CustomFormInput from '@/components/custom-form-inputs'
import SubmitButton from '@/components/submit-button'
import SuccessErrorMessage from '@/components/success-error-message'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { FileUpload } from '@/components/ui/file-upload'
import { createProductAction } from '@/features/products/actions'
import { Category } from '@/features/products/types'

type ProductFormProps = {
  categories: Category[]
}

export default function ProductForm({ categories }: ProductFormProps) {
  const [state, formAction] = useActionState(createProductAction, {})

  return (
    <div className="container mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Create Product</CardTitle>
          <CardDescription>
            Enter product&apos;s information below
          </CardDescription>
        </CardHeader>
        <CardContent>
          {state.error && (
            <SuccessErrorMessage message={state.error} messageType="error" />
          )}
          <form action={formAction}>
            <div className="grid gap-4">
              <FileUpload name="image[]" />

              <CustomFormInput
                name="name"
                label="Name"
                formElement="input"
                inputType="text"
                required
                defaultValue={state?.form?.name}
                errors={state?.errors?.name}
              />
              <CustomFormInput
                name="description"
                label="Description"
                formElement="textarea"
                inputType="text"
                required
                defaultValue={state?.form?.description}
                errors={state?.errors?.description}
              />
              <CustomFormInput
                name="Category"
                label="Category"
                formElement="combobox"
                items={categories.map(({ id, name }) => ({
                  id,
                  name,
                }))}
                query="categoryId"
                required
                errors={state?.errors?.categoryId}
              />

              <CustomFormInput
                name="quantity"
                label="Quantity"
                formElement="input"
                inputType="number"
                required
                defaultValue={state?.form?.quantity}
                errors={state?.errors?.quantity}
              />

              <CustomFormInput
                name="price"
                label="Price"
                formElement="input"
                inputType="text"
                defaultValue={state?.form?.price}
                errors={state?.errors?.price}
                required
              />

              <CustomFormInput
                name="salePrice"
                label="Sale Price"
                formElement="input"
                inputType="text"
                defaultValue={state?.form?.salePrice}
                errors={state?.errors?.salePrice}
                required
              />
            </div>

            <SubmitButton cta="Create Product" className="my-5" />
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
