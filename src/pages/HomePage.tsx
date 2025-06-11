import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { templates } from '../data/templates';
import { Template } from '../types/template';

function HomePage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', ...new Set(templates.map(template => template.category))];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-theme-primary mb-4">Landing Page Templates</h1>
        <p className="text-lg text-theme-secondary mb-6">
          Choose from our collection of professional templates and customize them to match your brand.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-theme-secondary h-5 w-5" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-theme rounded-md focus:ring-primary focus:border-primary bg-theme-surface text-theme-primary"
            />
          </div>
          <div className="flex gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-theme-surface text-theme-secondary hover:bg-gray-100 dark:hover:bg-dark-surface border border-theme'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template: Template) => (
          <div
            key={template.id}
            className="bg-theme-surface rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer border border-theme"
            onClick={() => navigate(`/editor/${template.id}`)}
          >
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={template.preview}
                alt={template.title}
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-theme-primary mb-2">{template.title}</h3>
              <p className="text-theme-secondary">{template.description}</p>
              <div className="mt-4">
                <span className="inline-block px-3 py-1 text-sm font-medium text-primary bg-primary/10 rounded-full capitalize">
                  {template.category}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;