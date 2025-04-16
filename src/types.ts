export type SessionUser = {
  id: string
}

export type AuthSeller = SessionUser & {
  storeId: string
}
