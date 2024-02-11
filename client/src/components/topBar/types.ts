import { User } from "../../dto";

interface Props {
  title: string;
  user: User | null;
  setUser(user: User | null): void;
}

export type { Props };
