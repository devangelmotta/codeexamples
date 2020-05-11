import { PrismaClient } from '@prisma/client';
import * as faker from 'faker';
import { createArray } from './utils';

const prisma = new PrismaClient();

async function main() {
  enum CompanyStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    DECLINED = 'DECLINED',
    OLD = 'OLD',
  }

  enum CompanyType {
    GC = 'GC',
    GOVERNMENT = 'GOVERNMENT',
    REMODELING = 'REMODELING',
    DESIGNER = 'DESIGNER',
  }

  // --- User ---

  const user = await prisma.user.create({
    data: {
      userName: faker.internet.userName(),
      profileImg: faker.image.imageUrl(),
      profileThumb: faker.image.imageUrl(),
      socialSignIn: '',
      lastLogin: faker.date.past(),
    },
  });
  console.log('User created');
  console.log(user);

  // --- Countries, States, Cities ---

  const countries = await Promise.all(
    createArray(10)
      .map(() => {
        return { data: { name: faker.address.country() } };
      })
      .map(country => {
        return prisma.country.create(country);
      })
  );

  const states = await Promise.all(
    countries
      .map(country => {
        return createArray(5).map(() => {
          return {
            data: {
              name: faker.address.state(),
              country: { connect: { id: country.id } },
            },
          };
        });
      })
      .reduce((acum, curr) => {
        return [...acum, ...curr];
      })
      .map(state => {
        return prisma.state.create(state);
      })
  );

  const cities = await Promise.all(
    states
      .map(state => {
        return createArray(5).map(() => {
          return {
            data: {
              name: faker.address.city(),
              state: { connect: { id: state.id } },
            },
          };
        });
      })
      .reduce((acum, curr) => {
        return [...acum, ...curr];
      })
      .map(city => {
        return prisma.city.create(city);
      })
  );

  // --- Companies ---

  const company = await prisma.company.create({
    data: {
      name: faker.company.companyName() + ' ' + faker.company.companySuffix(),
      logo: faker.image.imageUrl(),
      logoThumb: faker.image.imageUrl(),
      status: CompanyStatus.PENDING,
      companyType: CompanyType.GOVERNMENT,
      userId: { connect: { id: user.id } },
    },
  });

  // TODO => Create Address
  /*
    addresses: {
      create: [
        {
            addressOne: faker.address.streetAddress(),
            addressTwo: faker.address.secondaryAddress(),
            type: addressTypes[Math.floor(Math.random() * 2)],
            cityId: { connect: { id: cityId } },
            stateId: { connect: { id: stateId } },
            countryId: { connect: { id: countryId } },
            postalCode: faker.address.address(),
        },{
        }
      ],
    },
  */
}

main().finally(async () => {
  await prisma.disconnect();
});
