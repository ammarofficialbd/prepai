import { Icon } from "@iconify/react";
import { Link } from "@heroui/react";

interface BreadcrumbsProps {
    title: string;    // Title of the page 
    breadcrumbs: { name: string; path: string }[]; // Breadcrumbs array containing name and path
}

const Breadcrumb = ({ title, breadcrumbs }: BreadcrumbsProps) => {
    return (
        <div>
            <nav className="flex mb-4" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-3 rtl:space-x-reverse">
                    <li className="inline-flex items-center">
                        <Link
                            href="/"
                            className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                        >
                            <Icon icon="tabler:home-filled" fontSize={16} />
                        </Link>
                    </li>

                    {breadcrumbs.map((item, index) => (
                        <li key={index}>
                            <div className="flex items-center">
                                <Icon icon="solar:alt-arrow-right-broken" fontSize={20} />
                                <Link
                                    href={item.path}
                                    className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                                >
                                    {item.name}
                                </Link>
                            </div>
                        </li>
                    ))}

                </ol>
            </nav>
            <h1 className="text-2xl font-bold">{title}</h1>
        </div>
    );
};

export default Breadcrumb;