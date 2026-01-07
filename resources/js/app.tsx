import CalenoteLayout from './Layouts/CalenoteLayout';
import '../css/app.css';
import './bootstrap';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import {ComponentType, ReactElement, useState} from 'react';
import GlobalProvider from "./Providers/GlobalProvider";
import Root from "./Root";

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

interface PageProps {
    auth: any;
    [key: string]: any;
}

interface PageModule {
default: ComponentType<any> & {
        layout?: (page: ReactElement) => ReactElement;
    };
}

createInertiaApp({
    title: (title: string) => `${title} - ${appName}`,
        resolve: async (name: string) => {
            const pages = import.meta.glob<PageModule>('./Pages/**/*.tsx');
            const page = await resolvePageComponent<PageModule>(`./Pages/${name}.tsx`, pages);

            page.default.layout = (pageElement: ReactElement) => {
                const pProps = pageElement.props as PageProps;

                const content = name.startsWith('Calenote/') ? (
                    <CalenoteLayout {...pProps}>
                        {pageElement}
                    </CalenoteLayout>
                ) : (
                    pageElement
                );

                return <Root {...pProps}>{content}</Root>;
            };

            return page;
        },setup({ el, App, props }) {
        initializeDarkMode();

        const root = createRoot(el);
        root.render(
            <GlobalProvider>
                <App {...props} />
            </GlobalProvider>
        );
    }, progress: {
        color: '#ffffff',
    },
});
