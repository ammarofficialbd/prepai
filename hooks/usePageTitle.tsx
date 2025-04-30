"use client"
import getPageTitle from "@/helpers/pageTitle";
import { usePathname } from "next/navigation";
import React from "react";

const usePageTitle= () => { 
    const [title, setTitle] = React.useState<string>('');
    const [breadcrumbs, setBreadcrumbs] = React.useState<{ name: string; path: string }[]>([]);

    const pathname = usePathname();
    React.useEffect(() => {
        const {title, breadcrumbs} = getPageTitle(pathname);
        setTitle(title);
        setBreadcrumbs(breadcrumbs || [{ name: 'Home', path: '/' }]);
    }, [pathname]);

    return {title, breadcrumbs}
}

export default usePageTitle;