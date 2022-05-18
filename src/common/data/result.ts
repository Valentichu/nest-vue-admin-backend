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

export class PageResultData {
  readonly list: any[]
  readonly total: number
  constructor(list?: any[], total?: number) {
    this.total = total || 0
    this.list = list || []
  }
}
