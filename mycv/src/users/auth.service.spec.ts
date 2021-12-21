import { Test, TestingModule } from "@nestjs/testing";
import { Repository } from "typeorm";
import { AuthService } from "./auth.service";
import { User } from "./user.entity";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

describe("AuthService", () => {
  let service: AuthService;
  let fakeUsersService: Partial<UsersService>;

  beforeEach(async () => {
    // create a fake copy of the users serice
    fakeUsersService = {
      find: () => Promise.resolve([]),
      create: (email: string, password: string) =>
        Promise.resolve({ id: 1, email, password } as User),
    };
    const module = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        AuthService,
        // UsersService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    service = module.get(AuthService);
  });
  it("can create an instace of auth service", async () => {
    expect(service).toBeDefined();
  });

  it("creates a new user with a sakted and hashed password", async () => {
    const user = await service.signup("asdf@asdef.com", "asdf");
    expect(user.password).not.toEqual("asdf");
    const [salt, hash] = user.password.split(".");
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it("throws an error if user signs up with email that is in use", async (done) => {
    fakeUsersService.find = () =>
      Promise.resolve([{ id: 1, email: "a", password: "1" } as User]);
    try {
      await service.signup("asdf@asdf.com", "asdf");
    } catch (err) {
      done();
    }
  });

  it("throws if signin is called with an unused email", async (done) => {
    try {
      await service.signin("asdf@asdf.com", "asdf");
    } catch (err) {
      done();
    }
  });
});
