import { User } from "../../dto";

interface Props {
  user: User | null;
  setUser(user: User | null): void;
}

export type { Props };
