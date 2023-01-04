import { Inject } from '@nestjs/common';

export const EXAMPLE_TOKEN = 'EXAMPLE_SERVICE';
export const InjectExample = () => Inject(EXAMPLE_TOKEN);
