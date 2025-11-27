import CalenoteLayout from './Layouts/CalenoteLayout';
import '../css/app.css';
import './bootstrap';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { ComponentType, ReactElement } from 'react';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// 다크모드
function initializeDarkMode(): void {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    if (prefersDark.matches) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }

    prefersDark.addEventListener('change', (e) => {
        if (e.matches) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    });
}

interface AliasMap {
    [key: string]: string;
}

interface PageModule {
default: ComponentType<any> & {
        layout?: (page: ReactElement) => ReactElement;
    };
}

// 이동
createInertiaApp({
    title: (title: string) => `${title} - ${appName}`,
    resolve: async (name: string) => {
        const aliasMap: AliasMap = {
            LifeBot: 'LifeBot/LifeBot',
        };

        const normalizedName = aliasMap[name] ?? name;

        const pages = import.meta.glob<PageModule>('./Pages/**/*.tsx', { eager: false });
        const page = await resolvePageComponent<PageModule>(
            `./Pages/${normalizedName}.tsx`,
                pages,
        );

        if (normalizedName.startsWith('Calenote/')) {
            page.default.layout = (pageProps: any) => (
                <CalenoteLayout {...pageProps.props}>
                    {pageProps}
                </CalenoteLayout>
            );
        } else {
            page.default.layout = (pageProps: any) => <>{pageProps}</>;
        }

        return page;
    },
    setup({ el, App, props }) {
        initializeDarkMode();

        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: '#ffffff',
    },
});
