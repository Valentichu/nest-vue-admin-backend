import { Injectable } from '@nestjs/common'
import { CommonLoggerService } from 'src/common/log/logger.instance'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Page } from './entities/page.entity'

@Injectable()
export class PageService {
  constructor(
    private readonly commonLoggerService: CommonLoggerService,

    @InjectRepository(Page)
    private repository: Repository<Page>
  ) {}

  async create(entity: Page) {
    await this.repository.insert(entity)
  }

  findAll() {
    return this.repository.find()
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id })
  }

  async update(id: number, entity: Page) {
    await this.repository.save(entity)
  }

  async remove(id: number) {
    await this.repository.delete(id)
  }
}
