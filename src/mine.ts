import { IsNotEmpty } from 'class-validator';

export default class Mine {
  @IsNotEmpty()
  data: any;
}
