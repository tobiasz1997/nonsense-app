const routerMocks = vi.hoisted(() => ({
  push: vi.fn(),
  back: vi.fn(),
  on: vi.fn(),
  off: vi.fn(),
}));

export const getRouterMocks = () => routerMocks;

vi.mock("next/router", () => ({
  push: routerMocks.push,
  back: routerMocks.push,
  events: {
    on: routerMocks.on,
    off: routerMocks.off,
  },
  beforePopState: vi.fn(() => null),
  useRouter: () => ({
    push: routerMocks.push,
    back: routerMocks.push,
    events: {
      on: routerMocks.on,
      off: routerMocks.off,
    },
  }),
}));
