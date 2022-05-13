export class ResultData {
  readonly data: any
  readonly code: number
  readonly msg: string

  constructor(code = 200, msg?: string, data?: any) {
    this.code = code
    this.msg = msg || 'ok'
    this.data = data || null
  }
}
