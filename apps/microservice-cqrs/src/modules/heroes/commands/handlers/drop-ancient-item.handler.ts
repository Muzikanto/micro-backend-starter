import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { HeroRepository } from '../../repository/hero.repository';
import { DropAncientItemCommand } from '../impl/drop-ancient-item.command';

@CommandHandler(DropAncientItemCommand)
export class DropAncientItemHandler
  implements ICommandHandler<DropAncientItemCommand>
{
  constructor(
    private readonly repository: HeroRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: DropAncientItemCommand) {
    console.log('Async DropAncientItemCommand...');

    const { heroId, itemId } = command;
    const hero = this.publisher.mergeObjectContext(
      await this.repository.findOneById(+heroId),
    );
    hero.addItem(itemId);
    hero.commit();
  }
}
