import { faker } from '@faker-js/faker';
import { UserModel } from '../../domain/models/user.model';

export const mockUser = (data?: Partial<UserModel>): UserModel => {
  const mock: UserModel = {
    id: faker.number.int(),
    name: faker.internet.displayName(),
    email: faker.internet.email(),
    photoUrl: faker.image.url(),
    password: faker.internet.password(),
    createdAt: faker.date.anytime(),
    updatedAt: faker.date.anytime(),
    deletedAt: faker.date.anytime(),
  };

  if (data) {
    Object.assign(mock, data);
  }

  return mock;
};
