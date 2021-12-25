import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { User } from "./user.entity";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

describe("UsersController", () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUsersService = {
      findOne: (id: number) => {
        return Promise.resolve({
          id,
          email: "aaaaaa@aaaaa.com",
          password: "asdf",
        } as User);
      },
      find: (email: string) => {
        return Promise.resolve([{ id: 1, email, password: "aa" } as User]);
      },
      // remove: () => {},
      // update: () => {},
    };
    fakeAuthService = {
      // signup: () => {},
      signin: (email: string, password: string) => {
        return Promise.resolve({ id: 1, email, password } as User);
      },
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("findllUsers return a list of users with the given email", async () => {
    const users = await controller.findAllUsers("aaa@aaa.com");
    expect(users.length).toBe(1);
    expect(users[0].email).toEqual("aaa@aaa.com");
  });

  it("findUser returns a single user with the given id", async () => {
    const user = await controller.findUser("1");
    expect(user).toBeDefined();
  });
  it("findUser throws an error if user with given id is not found", async (done) => {
    fakeUsersService.findOne = null;
    try {
      await controller.findUser("1");
    } catch (err) {
      done();
    }
  });

  it("sigin updates session object and returns user", async () => {
    const session = { userId: -10 };
    const user = await controller.signin(
      { email: "aaa@aaa.com", password: "aaa" },
      session
    );
    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1);
  });
});
