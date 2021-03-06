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
    const users: User[] = [];
    fakeUsersService = {
      find: (email: string) => {
        const filteredUsers = users.filter((user) => user.email === email);
        return Promise.resolve(filteredUsers);
      },
      create: (email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 10000),
          email,
          password,
        } as User;
        users.push(user);
        return Promise.resolve(user);
      },
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
    await service.signup("asdf@asdf.com", "asdf");
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

  it("throws if an invalid password is provided", async (done) => {
    await service.signup("asdf@asdf.com", "asdf");
    try {
      await service.signin("aaaaaa@aaaa.com", "passwrodd");
    } catch (err) {
      done();
    }
  });

  it("returns a user if correct password is provided", async () => {
    await service.signup("asdf@asdf.com", "mypassword");
    const user = await service.signin("asdf@asdf.com", "mypassword");
    expect(user).toBeDefined();
  });
});
