
export type User = {
  id: string;
  phone: string;
  phone_formatted: string;
  password: string;
  av_verified: boolean;
};

export type Payload = {
  error?: boolean;
  message?: string;
  user: User | undefined;
}
