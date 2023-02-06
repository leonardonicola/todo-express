import { Entity, Column, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity('todolist')
export class Tasks {
  @PrimaryColumn()
  id: string

  @Column()
  name: string

  @Column()
  done: boolean

  constructor() {
    if(!this.id) this.id = uuid()
  }
}
