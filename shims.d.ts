
// Fix: Wrap global augmentations in `export {}` to make the file a module
export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly API_KEY: string;
    }
  }
}