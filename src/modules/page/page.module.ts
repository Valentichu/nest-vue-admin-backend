import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PageService } from './page.service'
import { PageController } from './page.controller'
import { Page } from './entities/page.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Page])],
  exports: [TypeOrmModule, PageService],
  controllers: [PageController],
  providers: [PageService],
})
export class PageModule {}
