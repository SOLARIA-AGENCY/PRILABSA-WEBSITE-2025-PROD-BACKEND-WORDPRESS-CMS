import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeholder }) => {
  const { t } = useLanguage();
  const defaultPlaceholder = placeholder || t('common.search.placeholder');
  return (
    <div className="mb-8">
      <input
        type="text"
        onChange={(e) => onSearch(e.target.value)}
        placeholder={defaultPlaceholder}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default SearchBar;
