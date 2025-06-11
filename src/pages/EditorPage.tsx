import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { templates } from '../data/templates';
import Editor from '../components/Editor';
import Preview from '../components/Preview';
import ThemeSelector from '../components/ThemeSelector';
import { Template } from '../types/template';
import { useTheme } from '../context/ThemeContext';

function EditorPage() {
  const { templateId } = useParams();
  const [activeTemplate, setActiveTemplate] = useState<Template | null>(null);
  const [showPreview, setShowPreview] = useState(true);
  const { colorScheme } = useTheme();

  useEffect(() => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      // Convert template content into sections array
      const sections = [];
      
      if (template.content.header) {
        sections.push({
          id: `section-${Date.now()}-header`,
          type: 'header',
          content: template.content.header
        });
      }
      
      if (template.content.hero) {
        sections.push({
          id: `section-${Date.now()}-hero`,
          type: 'hero',
          content: template.content.hero
        });
      }
      
      if (template.content.features) {
        sections.push({
          id: `section-${Date.now()}-features`,
          type: 'features',
          content: template.content.features
        });
      }
      
      if (template.content.about) {
        sections.push({
          id: `section-${Date.now()}-about`,
          type: 'about',
          content: template.content.about
        });
      }

      if (template.content.gallery) {
        sections.push({
          id: `section-${Date.now()}-gallery`,
          type: 'gallery',
          content: template.content.gallery
        });
      }
      
      if (template.content.services) {
        sections.push({
          id: `section-${Date.now()}-pricing`,
          type: 'pricing',
          content: {
            title: 'Our Services',
            description: 'Choose the perfect plan for your needs',
            plans: template.content.services
          }
        });
      }
      
      if (template.content.footer) {
        sections.push({
          id: `section-${Date.now()}-footer`,
          type: 'footer',
          content: template.content.footer
        });
      }

      setActiveTemplate({ 
        ...template,
        sections,
        colorScheme 
      });
    }
  }, [templateId, colorScheme]);

  if (!activeTemplate) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-theme-bg">
        <p className="text-xl text-theme-secondary">Loading template...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-theme-bg flex">
      {/* Sidebar */}
      <div className="w-80 bg-theme-surface border-r border-theme flex flex-col">
        <div className="p-4 border-b border-theme">
          <Link 
            to="/" 
            className="inline-flex items-center text-theme-secondary hover:text-theme-primary transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Templates
          </Link>
        </div>
        <div className="p-4 border-b border-theme">
          <ThemeSelector template={activeTemplate} />
        </div>
        <div className="flex-1 overflow-y-auto">
          <Editor template={activeTemplate} onUpdate={setActiveTemplate} />
        </div>
      </div>

      {/* Preview */}
      <div className="flex-1 overflow-y-auto">
        <div className="sticky top-0 z-10 bg-theme-surface border-b border-theme p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-theme-primary">{activeTemplate.title}</h1>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="px-4 py-2 text-sm font-medium text-theme-secondary bg-theme-bg border border-theme rounded-md hover:bg-theme-surface transition-colors"
          >
            {showPreview ? 'Hide Preview' : 'Show Preview'}
          </button>
        </div>
        <div className={`p-6 ${showPreview ? 'block' : 'hidden'}`}>
          <Preview template={activeTemplate} />
        </div>
      </div>
    </div>
  );
}

export default EditorPage;