type MakePaystackGetRequest<Query> = {
  endPoint: string
  method: 'GET'
  query?: Query
}

type MakePaystackPostRequest<Body> = {
  endPoint: string
  method: 'POST'
  body: Body
}

export type PaystackSuccessResponse<
  Message extends string,
  Data extends object,
> = {
  status: true
  message: Message
  data: Data
}

export type PaystackErrorResponse = {
  status: false
  message: string
}

export type PaystackResponse<Message extends string, Data extends object> =
  | PaystackSuccessResponse<Message, Data>
  | PaystackErrorResponse

export type MakePaystackRequest<T> = {
  endPoint: string
} & (MakePaystackGetRequest<T> | MakePaystackPostRequest<T>)

export type PaystackCurrency = 'GHS' | 'USD' | 'NGN'

export type PaystackCountry = 'ghana' | 'kenya' | 'nigeria' | 'south africa'

export type InitializeTransaction = {
  email: string
  amount: string
  currency: PaystackCurrency
  callback_url: string
  subaccount?: string
}

export type InitializeTransactionResponse = {
  authorization_url: string
  access_code: string
  reference: string
}

export type TransactionSuccessResponse = {
  id: number
  domain: 'test' | 'live'
  status: 'success' | 'abandoned' | 'failed'
  reference: string
  amount: number
  message: unknown | null
  gateway_response:
    | 'Successful'
    | 'The transaction was not completed'
    | 'Declined'
  paid_at: string | null
  created_at: string
  currency: PaystackCurrency
  fees: number | null
  plan: unknown | null
  split: Record<string, unknown>
  order_id: string | null
  createdAt: string
  transaction_date: string
}

export type ChargeSuccessEvent = {
  event: 'charge.success'
  data: TransactionSuccessResponse
}

export type CreateSubAccount = {
  business_name: string
  bank_code: string
  account_number: string
  percentage_charge: number
  //   settlement_bank: string
  description?: string
  primary_contact_email?: string
  primary_contact_name?: string
  primary_contact_phone?: string
}

export type ListBanks = {
  name: string
  slug: string
  code: string
  longcode: string
  gateway: string | null
  pay_with_bank: boolean
  active: boolean
  is_deleted: boolean
  country: PaystackCountry
  currency: PaystackCurrency
  type: string
  id: number
  createdAt: string
  updatedAt: string
}

export type ListBanksQuery = {
  country?: PaystackCountry
  currency?: PaystackCurrency
}

export type CreateSubAccountResponse = {
  business_name: string
  account_number: string
  percentage_charge: number
  settlement_bank: string
  currency: PaystackCurrency
  bank: number
  integration: number
  domain: 'test' | 'live'
  account_name: string
  product: string
  managed_by_integration: number
  subaccount_code: string
  is_verified: boolean
  settlement_schedule: 'AUTO' | 'MANUAL'
  active: boolean
  migrate: boolean
  id: number
  createdAt: string
  updatedAt: string
}
