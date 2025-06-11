import React from 'react';
import { ArrowRight } from 'lucide-react';
import * as Icons from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface PreviewProps {
  template: any;
}

function Preview({ template }: PreviewProps) {
  const { colorScheme } = useTheme();

  const renderSection = (section: any) => {
    switch (section.type) {
      case 'header':
        return (
          <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16 items-center">
                <div className="flex-shrink-0">
                  <span className="text-xl font-semibold" style={{ color: colorScheme.primary }}>{section.content.logo}</span>
                </div>
                <nav className="hidden md:flex space-x-8">
                  {section.content.menuItems.map((item: any, index: number) => (
                    <a
                      key={index}
                      href={item.link}
                      className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                      style={{ color: colorScheme.secondary }}
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </header>
        );

      case 'hero':
        return (
          <div 
            className="relative h-[600px] bg-cover bg-center"
            style={{ backgroundImage: `url(${section.content.image})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50" />
            <div className="relative h-full flex items-center justify-center text-center px-4">
              <div className="max-w-3xl">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  {section.content.title}
                </h1>
                <p className="text-xl text-gray-200 mb-8">
                  {section.content.subtitle}
                </p>
                <button 
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white"
                  style={{ backgroundColor: colorScheme.primary }}
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        );

      case 'about':
        return (
          <div className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-6" style={{ color: colorScheme.primary }}>{section.content.title}</h2>
                  <p className="text-lg text-gray-600 mb-8">{section.content.description}</p>
                  <div className="grid grid-cols-2 gap-8">
                    {section.content.stats.map((stat: any, index: number) => (
                      <div key={index} className="text-center">
                        <p className="text-3xl font-bold" style={{ color: colorScheme.secondary }}>{stat.value}</p>
                        <p className="text-gray-600">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <img
                    src={section.content.image}
                    alt="About Us"
                    className="rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'features':
        return (
          <div className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {section.content.map((feature: any, index: number) => {
                  const IconComponent = Icons[feature.icon as keyof typeof Icons] || Icons.Star;
                  return (
                    <div
                      key={index}
                      className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
                    >
                      <IconComponent className="h-8 w-8 mb-4" style={{ color: colorScheme.primary }} />
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );

      case 'gallery':
        return (
          <div className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {section.content.map((item: any, index: number) => (
                  <div key={index} className="group relative">
                    <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                          <h3 className="text-lg font-semibold">{item.title}</h3>
                          <p className="text-sm">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'pricing':
        return (
          <div className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4" style={{ color: colorScheme.primary }}>{section.content.title}</h2>
                <p className="text-lg text-gray-600">{section.content.description}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {section.content.plans.map((plan: any, index: number) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200"
                  >
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                      <p className="text-gray-600 mb-4">{plan.description}</p>
                      <p className="text-4xl font-bold mb-6" style={{ color: colorScheme.secondary }}>{plan.price}</p>
                      <ul className="space-y-3 mb-6">
                        {plan.features.map((feature: string, featureIndex: number) => (
                          <li key={featureIndex} className="flex items-center text-gray-600">
                            <Icons.Check className="h-5 w-5 text-green-500 mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <button 
                        className="w-full py-3 px-6 text-white rounded-md hover:opacity-90 transition-opacity"
                        style={{ backgroundColor: colorScheme.primary }}
                      >
                        Get Started
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'blank':
        return (
          <div dangerouslySetInnerHTML={{ __html: section.content.content }} />
        );

      case 'footer':
        return (
          <footer className="bg-gray-900 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="col-span-1 md:col-span-2 lg:col-span-1">
                  <h3 className="text-xl font-bold mb-4" style={{ color: colorScheme.accent }}>{section.content.logo}</h3>
                  <p className="text-gray-400 mb-6">{section.content.description}</p>
                  <div className="flex space-x-4">
                    {section.content.socialLinks.map((link: any, index: number) => (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {link.platform}
                      </a>
                    ))}
                  </div>
                </div>
                {section.content.columns.map((column: any, index: number) => (
                  <div key={index}>
                    <h4 className="text-lg font-semibold mb-4" style={{ color: colorScheme.accent }}>{column.title}</h4>
                    <ul className="space-y-2">
                      {column.links.map((link: any, linkIndex: number) => (
                        <li key={linkIndex}>
                          <a
                            href={link.url}
                            className="text-gray-400 hover:text-white transition-colors"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </footer>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {template.sections?.map((section: any) => (
        <div key={section.id}>
          {renderSection(section)}
        </div>
      ))}
    </div>
  );
}

export default Preview;