import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface BreadcrumbPath {
  name: string;
  path: string;
}

interface BreadcrumbsProps {
  paths?: BreadcrumbPath[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ paths }) => {
  const location = useLocation();
  const { t } = useLanguage();

  let pathnames: { name: string; routeTo: string }[] = [];

  if (paths) {
    pathnames = paths.map(p => ({ name: p.name, routeTo: p.path }));
  } else {
    const pathSegments = location.pathname.split('/').filter((x) => x);
    pathnames = pathSegments.map((name, index) => ({
      name: name.replace(/-/g, ' '),
      routeTo: `/${pathSegments.slice(0, index + 1).join('/')}`,
    }));
  }

  // Prepend the Home breadcrumb if not already on the home page
  let allPaths = pathnames;
    if (location.pathname !== '/' && (!allPaths.length || allPaths[0].routeTo !== '/')) {
    allPaths = [{ name: t('breadcrumbs.home'), routeTo: '/' }, ...pathnames];
  }

  // Don't render if it's just the home page with no other segments
  if (allPaths.length <= 1) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="container mx-auto px-4 my-6">
      <ol className="flex items-center space-x-2 text-sm uppercase" style={{ color: '#3759C1' }}>
        {allPaths.map((path, index) => {
          const isLast = index === allPaths.length - 1;
          return (
            <li key={`${path.routeTo}-${index}`} className="flex items-center">
              {index > 0 && <ChevronRight className="h-4 w-4 mx-2" />}
              {isLast ? (
                <span className="font-semibold">{path.name}</span>
              ) : (
                <Link to={path.routeTo} className="hover:underline">
                  {path.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
