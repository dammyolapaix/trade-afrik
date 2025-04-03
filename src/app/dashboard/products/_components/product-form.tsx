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
import { createProductAction } from '@/features/products/actions'
import { ListSubCategory } from '@/features/products/types'

type ProductFormProps = {
  subCategories: ListSubCategory
}

export default function ProductForm({ subCategories }: ProductFormProps) {
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
                items={subCategories.map((subCategory) => ({
                  id: subCategory.id,
                  name: `${subCategory.category.name} > ${subCategory.name}`,
                }))}
                query="subCategoryId"
                required
                errors={state?.errors?.subCategoryId}
              />
            </div>

            <SubmitButton cta="Create Product" className="my-5" />
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
