'use client'

import { useActionState, useState } from 'react'

import { toast } from 'sonner'

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
import { createProductVariantAction } from '@/features/products/actions'
import { PRODUCT_VARIANT_COLORS, PRODUCT_VARIANT_SIZES } from '@/lib/constants'

type Props = {
  productId: string
}

export default function ProductVariantForm({ productId }: Props) {
  const [state, formAction] = useActionState(createProductVariantAction, {})
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])

  const handleFileChange = (files: File[]) => {
    setSelectedFiles(files)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    selectedFiles.forEach((file) => formData.append('images[]', file))

    console.log(formData)
    formAction(formData)
  }

  if (state.success) {
    toast.success(state.success)
  }

  return (
    <div className="container mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Add Product Variant</CardTitle>
          <CardDescription>
            Enter product variant&apos;s information below
          </CardDescription>
        </CardHeader>
        <CardContent>
          {state.error && (
            <SuccessErrorMessage message={state.error} messageType="error" />
          )}
          <form onSubmit={handleSubmit}>
            <FileUpload onChange={handleFileChange} />

            <div className="grid gap-4">
              <input
                type="text"
                name="productId"
                defaultValue={productId}
                className="hidden"
              />

              <CustomFormInput
                name="sku"
                label="SKU"
                formElement="input"
                inputType="text"
                required
                defaultValue={state?.form?.sku}
                errors={state?.errors?.sku}
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
                name="size"
                label="Size"
                formElement="select"
                selectItems={PRODUCT_VARIANT_SIZES as unknown as string[]}
                required
              />

              <CustomFormInput
                name="color"
                label="Color"
                formElement="select"
                selectItems={PRODUCT_VARIANT_COLORS as unknown as string[]}
                required
              />

              <CustomFormInput
                name="weight"
                label="Weight"
                formElement="input"
                inputType="number"
                defaultValue={state?.form?.weight}
                errors={state?.errors?.weight}
                required
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

            <SubmitButton cta="Create Product Variant" className="my-5" />
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
