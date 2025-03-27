import 'server-only'

import { env } from '@/env/server'

import {
  CreateSubAccount,
  CreateSubAccountResponse,
  InitializeTransaction,
  InitializeTransactionResponse,
  ListBanks,
  ListBanksQuery,
  MakePaystackRequest,
  PaystackErrorResponse,
  PaystackResponse,
  PaystackSuccessResponse,
} from './types'

class Paystack {
  private readonly PAYSTACK_SECRET_KEY = env.PAYSTACK_SECRET_KEY
  private readonly BASE_URL = 'https://api.paystack.co'

  private makePaystackRequest = async <
    Body,
    ResponseMessage extends string,
    ResponseData extends object,
  >(
    request: MakePaystackRequest<Body>
  ): Promise<PaystackResponse<ResponseMessage, ResponseData>> => {
    try {
      const { method } = request
      let endPoint = request.endPoint

      const fetchOptions: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.PAYSTACK_SECRET_KEY}`,
        },
      }

      // If the method is POST, include the body in the request
      if (method === 'POST' && request.body) {
        fetchOptions.body = JSON.stringify(request.body)
      }

      if (method === 'GET' && request.query) {
        const queryParams = new URLSearchParams(request.query)
        endPoint += `?${queryParams.toString()}`
      }

      const response = await fetch(`${this.BASE_URL}${endPoint}`, fetchOptions)

      if (!response.ok) {
        const errorData = (await response.json()) as PaystackErrorResponse

        return {
          status: false,
          message: errorData.message,
        }
      }

      const data = (await response.json()) as PaystackSuccessResponse<
        ResponseMessage,
        ResponseData
      >

      return data
    } catch (error) {
      return {
        status: false,
        message: (error as PaystackErrorResponse).message,
      }
    }
  }

  initializeTransaction = async (body: InitializeTransaction) =>
    await this.makePaystackRequest<
      InitializeTransaction,
      'Authorization URL created',
      InitializeTransactionResponse
    >({
      endPoint: '/transaction/initialize',
      method: 'POST',
      body,
    })

  listBanks = async (query?: ListBanksQuery) =>
    await this.makePaystackRequest<
      ListBanksQuery,
      'Banks retrieved',
      ListBanks
    >({
      endPoint: '/bank',
      method: 'GET',
      query,
    })

  createSubAccount = async (body: CreateSubAccount) =>
    await this.makePaystackRequest<
      CreateSubAccount,
      'Subaccount created',
      CreateSubAccountResponse
    >({
      endPoint: '/subaccount',
      method: 'POST',
      body,
    })
}

const paystack = new Paystack()

export default paystack
