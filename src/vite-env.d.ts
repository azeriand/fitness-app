/// <reference types="vite/client" />

declare module '*.mp4' {
  const src: string;
  export default src;
}

declare module '*.webm' {
  const content: string;
  export default content;
}

declare module '*.ogg' {
  const video: string;
  export default video;
}
