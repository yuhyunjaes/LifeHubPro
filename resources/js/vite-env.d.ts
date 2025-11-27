/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_NAME: string;
    // 다른 VITE_ 환경변수들도 여기 추가
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
