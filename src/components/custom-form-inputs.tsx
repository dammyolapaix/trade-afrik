'use client'

import {
  ChangeEvent,
  HTMLAttributes,
  HTMLInputTypeAttribute,
  useState,
} from 'react'

import { REGEXP_ONLY_DIGITS } from 'input-otp'
import { useDebouncedCallback } from 'use-debounce'

import ComboboxWithQueryParams from '@/components/combobox-with-query-params'
import { Input } from '@/components/ui/input'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { Label } from '@/components/ui/label'
import { PhoneInput } from '@/components/ui/phone-input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import useQueryParams from '@/hooks/use-query-params'

type FormElementType =
  | 'input'
  | 'textarea'
  | 'button'
  | 'fieldset'
  | 'legend'
  | 'datalist'
  | 'output'
  | 'option'
  | 'optgroup'

type ComboboxType = {
  formElement: 'combobox'
  items: { id: string; name: string }[]
  query: string
  defaultValue?: HTMLAttributes<HTMLInputElement>['defaultValue']
}

type SelectFormElementType = {
  formElement: 'select'
  selectItems: string[]
  selectValue?: string
  selectOnValueChange?: (value: string) => void
  isQuery?: true
}

type InputFormElementType = {
  formElement: FormElementType
  inputType: HTMLInputTypeAttribute | 'otp' | 'datetime'
  defaultValue?: HTMLAttributes<HTMLInputElement>['defaultValue']
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  isSearch?: true
}

type CustomFormFieldProps = {
  name: string
  label?: string
  placeholder?: string
  disabled?: boolean
  required?: true
  errors?: string[]
  isSinglePage?: boolean
  description?: string
} & (SelectFormElementType | InputFormElementType | ComboboxType)

function InputField(props: CustomFormFieldProps) {
  const { formElement, name, disabled, placeholder, required, isSinglePage } =
    props

  const { getQueryParam, setQueryParam, deleteQueryParam } = useQueryParams()

  let queryId: string | undefined | null = null

  if (formElement === 'combobox') {
    queryId = getQueryParam(props.query)
  } else {
    queryId = getQueryParam(name)
  }

  const [selectValue, setSelectValue] = useState(queryId || undefined)
  const [otpValue, setOtpValue] = useState('')

  const handleSearch = useDebouncedCallback((term: string) => {
    if (term) {
      setQueryParam(name, term)
    } else {
      deleteQueryParam(name)
    }
  }, 300)

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleSearch(e.target.value)
  }

  const onSelectValueChange = (currentSelectValue: string) => {
    setSelectValue(currentSelectValue === selectValue ? '' : currentSelectValue)

    if (currentSelectValue === selectValue) {
      deleteQueryParam(name)
    } else {
      setQueryParam(name, currentSelectValue)
    }
  }

  switch (formElement) {
    case 'input':
      switch (props.inputType) {
        case 'tel':
          return (
            <PhoneInput
              defaultCountry="GH"
              disabled={disabled}
              id={name}
              placeholder={placeholder}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              value={props.defaultValue || undefined}
              name={name}
              international
              required={required}
            />
          )

        case 'date':
          return (
            <Input
              type="date"
              name={name}
              defaultValue={props.defaultValue as string}
              disabled={disabled}
              required={required}
              placeholder={placeholder}
            />
          )

        case 'datetime':
          return (
            <Input
              type="datetime-local"
              name={name}
              defaultValue={props.defaultValue as string}
              disabled={disabled}
              required={required}
              placeholder={placeholder}
            />
          )

        case 'otp':
          return (
            <InputOTP
              name={name}
              value={otpValue}
              onChange={(otpValue) => setOtpValue(otpValue)}
              maxLength={6}
              pattern={REGEXP_ONLY_DIGITS}
              required={required}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          )

        default:
          break
      }

      return (
        <Input
          type={props.inputType}
          name={name}
          disabled={disabled}
          id={name}
          placeholder={placeholder}
          defaultValue={
            props.isSearch
              ? (queryId as string)?.toString() || undefined
              : props.defaultValue || undefined
          }
          min={props.inputType === 'number' ? 0 : undefined}
          required={required}
          onChange={props.isSearch ? onChange : props.onChange}
        />
      )

    case 'select':
      return (
        <Select
          name={name}
          required={required}
          value={props.isQuery ? selectValue : props.selectValue}
          onValueChange={
            props.isQuery ? onSelectValueChange : props.selectOnValueChange
          }
          disabled={disabled}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {props.selectItems.map((item) => (
              <SelectItem value={item} key={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )

    case 'combobox':
      return (
        <>
          {!isSinglePage && (
            <ComboboxWithQueryParams
              items={props.items}
              query={props.query}
              name={props.name}
              defaultValue={props.defaultValue as string | undefined}
            />
          )}
          <Input
            type="text"
            name={props.query}
            defaultValue={props.defaultValue || queryId || undefined}
            disabled={isSinglePage ? true : undefined}
            className={`${!isSinglePage ? 'hidden' : ''}`}
          />
        </>
      )

    case 'textarea':
      return (
        <Textarea
          name={name}
          disabled={disabled}
          id={name}
          placeholder={placeholder}
          defaultValue={props.defaultValue || undefined}
          required={required}
        />
      )

    default:
      break
  }
}

function ErrorMessage({ errors }: { errors?: CustomFormFieldProps['errors'] }) {
  return (
    <>
      {errors &&
        errors.map((error, index) => (
          <p key={index} className="text-destructive text-sm font-medium">
            {error}
          </p>
        ))}
    </>
  )
}

export default function CustomFormInput(props: CustomFormFieldProps) {
  const { name, required, label, errors, formElement, description } = props

  return (
    <div className="grid w-full items-center gap-1.5">
      {((formElement !== 'select' &&
        formElement !== 'combobox' &&
        props.inputType !== 'checkbox') ||
        formElement === 'select' ||
        formElement === 'combobox') &&
        label && (
          <Label htmlFor={name}>
            {label} {required && '*'}
          </Label>
        )}

      <InputField {...props} />
      {description && (
        <p className="text-muted-foreground text-sm">{description}</p>
      )}

      <ErrorMessage errors={errors} />
    </div>
  )
}
