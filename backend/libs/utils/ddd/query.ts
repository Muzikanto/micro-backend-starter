import { TransformInt } from '../validate';
import { Max, Min } from 'class-validator';

export type IPaginatedQuery = {
  limit: number;
  offset?: number;
};

export class PaginatedQueryDto implements IPaginatedQuery {
  @TransformInt()
  @Min(0)
  @Max(10_000)
  limit!: number;

  @TransformInt()
  @Min(0)
  offset?: number;
}
