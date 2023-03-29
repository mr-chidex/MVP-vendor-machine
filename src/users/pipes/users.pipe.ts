import { PipeTransform, ArgumentMetadata, Injectable } from '@nestjs/common';

@Injectable()
export class UserPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    // make sure username is saved in lowercase
    if (value.username) {
      value.username = value.username?.toLowerCase();
    }

    return value;
  }
}
