import { adminPages, appPages, nestedPages } from "@/constants/pages";

interface PageTitle {
  title: string;
  breadcrumbs: { name: string; path: string }[];
}


const getPageTitle = (pathname: string): PageTitle => { 

const pagetoCheck = pathname.includes('/admin') ? adminPages : [...appPages, ...nestedPages]
   for (const page of pagetoCheck) {
      const matcher = new RegExp(`^${page.path.replace(/:[^\s/]+/g, "[^/]+")}$`);
      if (matcher.test(pathname)) {
        const title = page.title;
        const breadcrumbs = page.breadcrumb;
        return { title, breadcrumbs };
      }
   }
   
   return { title: "Not Found", breadcrumbs: [{ name: "Not Found", path: "/" }] };

}

export default getPageTitle;