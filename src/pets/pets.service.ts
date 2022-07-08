import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Owner } from 'src/owners/entities/owner.entity';
import { OwnersService } from 'src/owners/owners.service';
import { Repository } from 'typeorm';
import { CreatePetInput } from './dto/create-pet.input';
import { Pet } from './pets.entity';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet) private petsRepositary: Repository<Pet>,
    private ownerService: OwnersService,
  ) {}

  createPet(createPetInput: CreatePetInput): Promise<Pet> {
    const newPet = this.petsRepositary.create(createPetInput); // newPet = new Pet(); new.name = input.name
    return this.petsRepositary.save(newPet); // insert new pet
  }

  async findAll(): Promise<Pet[]> {
    // const pet = new Pet();

    // pet.id = 1;
    // pet.name = 'Jack';

    // return [pet];

    return this.petsRepositary.find(); // SELECT * pet
  }

  async findOne(id: number): Promise<Pet> {
    return await this.petsRepositary.findOneOrFail({
      where: {
        id: id,
      },
    });
  }

  getOwner(ownerId: number): Promise<Owner> {
    return this.ownerService.findOne(ownerId);
  }
}
