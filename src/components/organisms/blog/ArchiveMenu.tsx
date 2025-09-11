import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { BlogArticle } from '../../../types/blog';
import { useLanguage } from '../../../contexts/LanguageContext';
import { translations } from '../../../translations';

interface ArchiveMenuProps {
  articles: BlogArticle[];
  basePath: '/blog' | '/noticias';
}

const ArchiveMenu: React.FC<ArchiveMenuProps> = ({ articles, basePath }) => {
  const { language } = useLanguage();
  const [searchParams] = useSearchParams();
  const activeArchive = searchParams.get('archive');

  const archives = articles.reduce((acc, article) => {
    const month = article.date.substring(0, 7); // YYYY-MM
    if (!acc[month]) {
      acc[month] = 0;
    }
    acc[month]++;
    return acc;
  }, {} as Record<string, number>);

  const sortedArchives = Object.entries(archives).sort((a, b) => b[0].localeCompare(a[0]));

  return (
    <aside className="w-full md:w-1/4 lg:w-1/5 p-4 bg-white shadow-md rounded-lg md:ml-6">
      <h3 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">{translations.news.archive[language]}</h3>
      <ul className="space-y-2">
        {sortedArchives.map(([month, count]) => {
          const [year, monthNum] = month.split('-');
          const monthName = new Date(parseInt(year), parseInt(monthNum) - 1, 1).toLocaleString('es-ES', { month: 'long' });
          const formattedMonth = `${monthName.charAt(0).toUpperCase() + monthName.slice(1)} ${year}`;
          const isActive = activeArchive === month;
          
          return (
            <li key={month}>
              <Link
                to={`${basePath}?archive=${month}`}
                className={`flex justify-between items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <span>{formattedMonth}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs ${isActive ? 'bg-blue-500' : 'bg-gray-200 text-gray-700'}`}>
                  {count}
                </span>
              </Link>
            </li>
          );
        })}
         <li>
            <Link
              to={basePath}
              className={`flex justify-between items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 mt-4 ${
                !activeArchive ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <span>{translations.common.viewAll[language]}</span>
            </Link>
          </li>
      </ul>
    </aside>
  );
};

export default ArchiveMenu;