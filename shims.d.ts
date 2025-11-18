// Fix: Wrap global augmentations in `export {}` to make the file a module
export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly API_KEY: string;
    }
  }
  // This declares 'process' globally, making process.env accessible for TypeScript.
  // This is a common workaround for client-side applications that expect process.env
  // to be defined by the build system or runtime environment.
  const process: {
    env: NodeJS.ProcessEnv;
  };
}