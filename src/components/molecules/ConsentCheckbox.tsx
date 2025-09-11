import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';

interface ConsentCheckboxProps {
  isChecked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hasError: boolean;
  text?: string;
}

const ConsentCheckbox: React.FC<ConsentCheckboxProps> = ({ isChecked, onChange, hasError, text }) => {
  const { t } = useLanguage();
  const consentText = text || t('consent.text');

  return (
    <div className="mt-6">
      <label className="flex items-start text-sm text-gray-600">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={onChange}
          className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <span className="ml-2">
          {text ? consentText : (
            <>
              {consentText}
              <Link to="/politica-de-privacidad" className="font-semibold text-blue-600 hover:underline" target="_blank">
                {t('consent.privacyPolicy')}
              </Link>
              .
            </>
          )}
        </span>
      </label>
      {hasError && <p className="text-red-500 text-xs mt-1">{t('consent.error')}</p>}
    </div>
  );
};

export default ConsentCheckbox;