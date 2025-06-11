import React, { useState } from 'react';
import { Type, Palette, ImageIcon, GripVertical, Plus, Trash2, X } from 'lucide-react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface EditorProps {
  template: any;
  onUpdate: (template: any) => void;
}

interface SortableSectionProps {
  id: string;
  children: React.ReactNode;
}

const SortableSection = ({ id, children }: SortableSectionProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="relative">
      <div
        {...attributes}
        {...listeners}
        className="absolute left-0 top-0 h-full px-2 cursor-move flex items-center"
      >
        <GripVertical className="h-4 w-4 text-gray-400" />
      </div>
      {children}
    </div>
  );
};

function Editor({ template, onUpdate }: EditorProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = template.sections.findIndex((section: any) => section.id === active.id);
      const newIndex = template.sections.findIndex((section: any) => section.id === over.id);

      const newSections = arrayMove(template.sections, oldIndex, newIndex);
      onUpdate({
        ...template,
        sections: newSections,
      });
    }
  };

  const addSection = (type: string) => {
    const newSection = {
      id: `section-${Date.now()}`,
      type,
      content: getDefaultContentForType(type),
    };

    onUpdate({
      ...template,
      sections: [...template.sections, newSection],
    });
    setActiveSection(newSection.id);
  };

  const removeSection = (sectionId: string) => {
    onUpdate({
      ...template,
      sections: template.sections.filter((section: any) => section.id !== sectionId),
    });
    if (activeSection === sectionId) {
      setActiveSection(null);
    }
  };

  const getDefaultContentForType = (type: string) => {
    switch (type) {
      case 'header':
        return {
          logo: 'Your Logo',
          menuItems: [
            { label: 'Home', link: '#home' },
            { label: 'About', link: '#about' },
            { label: 'Contact', link: '#contact' },
          ],
        };
      case 'hero':
        return {
          title: 'New Hero Section',
          subtitle: 'Add your subtitle here',
          image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=2070',
        };
      case 'features':
        return [{
          title: 'New Feature',
          description: 'Feature description',
          icon: 'Star',
        }];
      case 'about':
        return {
          title: 'About Us',
          description: 'Add your description here',
          image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2070',
          stats: [
            { label: 'Stat 1', value: '100+' },
            { label: 'Stat 2', value: '50+' },
          ],
        };
      case 'gallery':
        return [{
          title: 'New Image',
          description: 'Image description',
          image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2069',
        }];
      case 'pricing':
        return {
          title: 'Our Pricing',
          description: 'Choose the perfect plan for your needs',
          plans: [
            {
              name: 'Basic',
              price: '$9.99/mo',
              description: 'Perfect for starters',
              features: ['Feature 1', 'Feature 2', 'Feature 3'],
            },
          ],
        };
      case 'blank':
        return {
          content: '<div class="py-16"><div class="max-w-7xl mx-auto px-4"><p>Add your content here...</p></div></div>',
        };
      case 'footer':
        return {
          logo: 'Your Logo',
          description: 'Your company description',
          socialLinks: [
            { platform: 'Twitter', url: '#' },
            { platform: 'LinkedIn', url: '#' },
          ],
          columns: [
            {
              title: 'Company',
              links: [
                { label: 'About', url: '#' },
                { label: 'Contact', url: '#' },
              ],
            },
          ],
        };
      default:
        return {};
    }
  };

  const renderSectionEditor = (section: any) => {
    switch (section.type) {
      case 'header':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Logo Text</label>
              <input
                type="text"
                value={section.content.logo}
                onChange={(e) => {
                  const updatedSections = template.sections.map((s: any) =>
                    s.id === section.id
                      ? { ...s, content: { ...s.content, logo: e.target.value } }
                      : s
                  );
                  onUpdate({ ...template, sections: updatedSections });
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Menu Items</label>
              {section.content.menuItems.map((item: any, index: number) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={item.label}
                    onChange={(e) => {
                      const updatedItems = [...section.content.menuItems];
                      updatedItems[index] = { ...item, label: e.target.value };
                      const updatedSections = template.sections.map((s: any) =>
                        s.id === section.id
                          ? { ...s, content: { ...s.content, menuItems: updatedItems } }
                          : s
                      );
                      onUpdate({ ...template, sections: updatedSections });
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Menu label"
                  />
                  <input
                    type="url"
                    value={item.link}
                    onChange={(e) => {
                      const updatedItems = [...section.content.menuItems];
                      updatedItems[index] = { ...item, link: e.target.value };
                      const updatedSections = template.sections.map((s: any) =>
                        s.id === section.id
                          ? { ...s, content: { ...s.content, menuItems: updatedItems } }
                          : s
                      );
                      onUpdate({ ...template, sections: updatedSections });
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Menu link"
                  />
                  <button
                    onClick={() => {
                      const updatedItems = section.content.menuItems.filter((_: any, i: number) => i !== index);
                      const updatedSections = template.sections.map((s: any) =>
                        s.id === section.id
                          ? { ...s, content: { ...s.content, menuItems: updatedItems } }
                          : s
                      );
                      onUpdate({ ...template, sections: updatedSections });
                    }}
                    className="p-2 text-red-500 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => {
                  const updatedItems = [...section.content.menuItems, { label: 'New Item', link: '#' }];
                  const updatedSections = template.sections.map((s: any) =>
                    s.id === section.id
                      ? { ...s, content: { ...s.content, menuItems: updatedItems } }
                      : s
                  );
                  onUpdate({ ...template, sections: updatedSections });
                }}
                className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
              >
                + Add Menu Item
              </button>
            </div>
          </div>
        );

      case 'hero':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={section.content.title}
                onChange={(e) => {
                  const updatedSections = template.sections.map((s: any) =>
                    s.id === section.id
                      ? { ...s, content: { ...s.content, title: e.target.value } }
                      : s
                  );
                  onUpdate({ ...template, sections: updatedSections });
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
              <textarea
                value={section.content.subtitle}
                onChange={(e) => {
                  const updatedSections = template.sections.map((s: any) =>
                    s.id === section.id
                      ? { ...s, content: { ...s.content, subtitle: e.target.value } }
                      : s
                  );
                  onUpdate({ ...template, sections: updatedSections });
                }}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
              <input
                type="url"
                value={section.content.image}
                onChange={(e) => {
                  const updatedSections = template.sections.map((s: any) =>
                    s.id === section.id
                      ? { ...s, content: { ...s.content, image: e.target.value } }
                      : s
                  );
                  onUpdate({ ...template, sections: updatedSections });
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        );

      case 'features':
        return (
          <div className="space-y-4">
            {section.content.map((feature: any, index: number) => (
              <div key={index} className="space-y-2 border border-gray-200 p-4 rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">Feature {index + 1}</h4>
                  <button
                    onClick={() => {
                      const updatedFeatures = section.content.filter((_: any, i: number) => i !== index);
                      const updatedSections = template.sections.map((s: any) =>
                        s.id === section.id
                          ? { ...s, content: updatedFeatures }
                          : s
                      );
                      onUpdate({ ...template, sections: updatedSections });
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <input
                  type="text"
                  value={feature.title}
                  onChange={(e) => {
                    const updatedFeatures = [...section.content];
                    updatedFeatures[index] = { ...feature, title: e.target.value };
                    const updatedSections = template.sections.map((s: any) =>
                      s.id === section.id
                        ? { ...s, content: updatedFeatures }
                        : s
                    );
                    onUpdate({ ...template, sections: updatedSections });
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Feature title"
                />
                <textarea
                  value={feature.description}
                  onChange={(e) => {
                    const updatedFeatures = [...section.content];
                    updatedFeatures[index] = { ...feature, description: e.target.value };
                    const updatedSections = template.sections.map((s: any) =>
                      s.id === section.id
                        ? { ...s, content: updatedFeatures }
                        : s
                    );
                    onUpdate({ ...template, sections: updatedSections });
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Feature description"
                  rows={2}
                />
              </div>
            ))}
            <button
              onClick={() => {
                const updatedSections = template.sections.map((s: any) =>
                  s.id === section.id
                    ? {
                        ...s,
                        content: [
                          ...s.content,
                          { title: 'New Feature', description: 'Feature description', icon: 'Star' },
                        ],
                      }
                    : s
                );
                onUpdate({ ...template, sections: updatedSections });
              }}
              className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
            >
              + Add Feature
            </button>
          </div>
        );

      case 'about':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={section.content.title}
                onChange={(e) => {
                  const updatedSections = template.sections.map((s: any) =>
                    s.id === section.id
                      ? { ...s, content: { ...s.content, title: e.target.value } }
                      : s
                  );
                  onUpdate({ ...template, sections: updatedSections });
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={section.content.description}
                onChange={(e) => {
                  const updatedSections = template.sections.map((s: any) =>
                    s.id === section.id
                      ? { ...s, content: { ...s.content, description: e.target.value } }
                      : s
                  );
                  onUpdate({ ...template, sections: updatedSections });
                }}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
              <input
                type="url"
                value={section.content.image}
                onChange={(e) => {
                  const updatedSections = template.sections.map((s: any) =>
                    s.id === section.id
                      ? { ...s, content: { ...s.content, image: e.target.value } }
                      : s
                  );
                  onUpdate({ ...template, sections: updatedSections });
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Stats</label>
              {section.content.stats.map((stat: any, index: number) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={stat.label}
                    onChange={(e) => {
                      const updatedStats = [...section.content.stats];
                      updatedStats[index] = { ...stat, label: e.target.value };
                      const updatedSections = template.sections.map((s: any) =>
                        s.id === section.id
                          ? { ...s, content: { ...s.content, stats: updatedStats } }
                          : s
                      );
                      onUpdate({ ...template, sections: updatedSections });
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Stat label"
                  />
                  <input
                    type="text"
                    value={stat.value}
                    onChange={(e) => {
                      const updatedStats = [...section.content.stats];
                      updatedStats[index] = { ...stat, value: e.target.value };
                      const updatedSections = template.sections.map((s: any) =>
                        s.id === section.id
                          ? { ...s, content: { ...s.content, stats: updatedStats } }
                          : s
                      );
                      onUpdate({ ...template, sections: updatedSections });
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Stat value"
                  />
                  <button
                    onClick={() => {
                      const updatedStats = section.content.stats.filter((_: any, i: number) => i !== index);
                      const updatedSections = template.sections.map((s: any) =>
                        s.id === section.id
                          ? { ...s, content: { ...s.content, stats: updatedStats } }
                          : s
                      );
                      onUpdate({ ...template, sections: updatedSections });
                    }}
                    className="p-2 text-red-500 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => {
                  const updatedStats = [...section.content.stats, { label: 'New Stat', value: '0+' }];
                  const updatedSections = template.sections.map((s: any) =>
                    s.id === section.id
                      ? { ...s, content: { ...s.content, stats: updatedStats } }
                      : s
                  );
                  onUpdate({ ...template, sections: updatedSections });
                }}
                className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
              >
                + Add Stat
              </button>
            </div>
          </div>
        );

      case 'gallery':
        return (
          <div className="space-y-4">
            {section.content.map((item: any, index: number) => (
              <div key={index} className="space-y-2 border border-gray-200 p-4 rounded-md">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">Image {index + 1}</h4>
                  <button
                    onClick={() => {
                      const updatedGallery = section.content.filter((_: any, i: number) => i !== index);
                      const updatedSections = template.sections.map((s: any) =>
                        s.id === section.id
                          ? { ...s, content: updatedGallery }
                          : s
                      );
                      onUpdate({ ...template, sections: updatedSections });
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => {
                      const updatedGallery = [...section.content];
                      updatedGallery[index] = { ...item, title: e.target.value };
                      const updatedSections = template.sections.map((s: any) =>
                        s.id === section.id
                          ? { ...s, content: updatedGallery }
                          : s
                      );
                      onUpdate({ ...template, sections: updatedSections });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={item.description}
                    onChange={(e) => {
                      const updatedGallery = [...section.content];
                      updatedGallery[index] = { ...item, description: e.target.value };
                      const updatedSections = template.sections.map((s: any) =>
                        s.id === section.id
                          ? { ...s, content: updatedGallery }
                          : s
                      );
                      onUpdate({ ...template, sections: updatedSections });
                    }}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <input
                    type="url"
                    value={item.image}
                    onChange={(e) => {
                      const updatedGallery = [...section.content];
                      updatedGallery[index] = { ...item, image: e.target.value };
                      const updatedSections = template.sections.map((s: any) =>
                        s.id === section.id
                          ? { ...s, content: updatedGallery }
                          : s
                      );
                      onUpdate({ ...template, sections: updatedSections });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            ))}
            <button
              onClick={() => {
                const newImage = {
                  title: 'New Image',
                  description: 'Image description',
                  image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2069',
                };
                const updatedSections = template.sections.map((s: any) =>
                  s.id === section.id
                    ? { ...s, content: [...s.content, newImage] }
                    : s
                );
                onUpdate({ ...template, sections: updatedSections });
              }}
              className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
            >
              + Add Image
            </button>
          </div>
        );

      case 'pricing':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={section.content.title}
                onChange={(e) => {
                  const updatedSections = template.sections.map((s: any) =>
                    s.id === section.id
                      ? { ...s, content: { ...s.content, title: e.target.value } }
                      : s
                  );
                  onUpdate({ ...template, sections: updatedSections });
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={section.content.description}
                onChange={(e) => {
                  const updatedSections = template.sections.map((s: any) =>
                    s.id === section.id
                      ? { ...s, content: { ...s.content, description: e.target.value } }
                      : s
                  );
                  onUpdate({ ...template, sections: updatedSections });
                }}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Pricing Plans</label>
              {section.content.plans.map((plan: any, planIndex: number) => (
                <div key={planIndex} className="border border-gray-200 rounded-md p-4 mb-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium">Plan {planIndex + 1}</h4>
                    <button
                      onClick={() => {
                        const updatedPlans = section.content.plans.filter((_: any, i: number) => i !== planIndex);
                        const updatedSections = template.sections.map((s: any) =>
                          s.id === section.id
                            ? { ...s, content: { ...s.content, plans: updatedPlans } }
                            : s
                        );
                        onUpdate({ ...template, sections: updatedSections });
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={plan.name}
                      onChange={(e) => {
                        const updatedPlans = [...section.content.plans];
                        updatedPlans[planIndex] = { ...plan, name: e.target.value };
                        const updatedSections = template.sections.map((s: any) =>
                          s.id === section.id
                            ? { ...s, content: { ...s.content, plans: updatedPlans } }
                            : s
                        );
                        onUpdate({ ...template, sections: updatedSections });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="Plan name"
                    />
                    <input
                      type="text"
                      value={plan.price}
                      onChange={(e) => {
                        const updatedPlans = [...section.content.plans];
                        updatedPlans[planIndex] = { ...plan, price: e.target.value };
                        const updatedSections = template.sections.map((s: any) =>
                          s.id === section.id
                            ? { ...s, content: { ...s.content, plans: updatedPlans } }
                            : s
                        );
                        onUpdate({ ...template, sections: updatedSections });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="Price"
                    />
                    <textarea
                      value={plan.description}
                      onChange={(e) => {
                        const updatedPlans = [...section.content.plans];
                        updatedPlans[planIndex] = { ...plan, description: e.target.value };
                        const updatedSections = template.sections.map((s: any) =>
                          s.id === section.id
                            ? {
                                ...s,
                                content: { ...s.content, plans: updatedPlans },
                              }
                            : s
                        );
                        onUpdate({ ...template, sections: updatedSections });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="Plan description"
                      rows={2}
                    />
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
                      {plan.features.map((feature: string, featureIndex: number) => (
                        <div key={featureIndex} className="flex gap-2 mb-2">
                          <input
                            type="text"
                            value={feature}
                            onChange={(e) => {
                              const updatedFeatures = [...plan.features];
                              updatedFeatures[featureIndex] = e.target.value;
                              const updatedPlans = [...section.content.plans];
                              updatedPlans[planIndex] = { ...plan, features: updatedFeatures };
                              const updatedSections = template.sections.map((s: any) =>
                                s.id === section.id
                                  ? { ...s, content: { ...s.content, plans: updatedPlans } }
                                  : s
                              );
                              onUpdate({ ...template, sections: updatedSections });
                            }}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                            placeholder="Feature"
                          />
                          <button
                            onClick={() => {
                              const updatedFeatures = plan.features.filter((_: any, i: number) => i !== featureIndex);
                              const updatedPlans = [...section.content.plans];
                              updatedPlans[planIndex] = { ...plan, features: updatedFeatures };
                              const updatedSections = template.sections.map((s: any) =>
                                s.id === section.id
                                  ? { ...s, content: { ...s.content, plans: updatedPlans } }
                                  : s
                              );
                              onUpdate({ ...template, sections: updatedSections });
                            }}
                            className="p-2 text-red-500 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        onClick={() => {
                          const updatedFeatures = [...plan.features, 'New Feature'];
                          const updatedPlans = [...section.content.plans];
                          updatedPlans[planIndex] = { ...plan, features: updatedFeatures };
                          const updatedSections = template.sections.map((s: any) =>
                            s.id === section.id
                              ? { ...s, content: { ...s.content, plans: updatedPlans } }
                              : s
                          );
                          onUpdate({ ...template, sections: updatedSections });
                        }}
                        className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                      >
                        + Add Feature
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={() => {
                  const newPlan = {
                    name: 'New Plan',
                    price: '$0/mo',
                    description: 'Plan description',
                    features: ['Feature 1'],
                  };
                  const updatedPlans = [...section.content.plans, newPlan];
                  const updatedSections = template.sections.map((s: any) =>
                    s.id === section.id
                      ? { ...s, content: { ...s.content, plans: updatedPlans } }
                      : s
                  );
                  onUpdate({ ...template, sections: updatedSections });
                }}
                className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
              >
                + Add Plan
              </button>
            </div>
          </div>
        );

      case 'blank':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <textarea
              value={section.content.content}
              onChange={(e) => {
                const updatedSections = template.sections.map((s: any) =>
                  s.id === section.id
                    ? { ...s, content: { content: e.target.value } }
                    : s
                );
                onUpdate({ ...template, sections: updatedSections });
              }}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md font-mono text-sm"
              placeholder="Enter HTML content..."
            />
          </div>
        );

      case 'footer':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Logo Text</label>
              <input
                type="text"
                value={section.content.logo}
                onChange={(e) => {
                  const updatedSections = template.sections.map((s: any) =>
                    s.id === section.id
                      ? { ...s, content: { ...s.content, logo: e.target.value } }
                      : s
                  );
                  onUpdate({ ...template, sections: updatedSections });
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={section.content.description}
                onChange={(e) => {
                  const updatedSections = template.sections.map((s: any) =>
                    s.id === section.id
                      ? { ...s, content: { ...s.content, description: e.target.value } }
                      : s
                  );
                  onUpdate({ ...template, sections: updatedSections });
                }}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Social Links</label>
              {section.content.socialLinks.map((link: any, index: number) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={link.platform}
                    onChange={(e) => {
                      const updatedLinks = [...section.content.socialLinks];
                      updatedLinks[index] = { ...link, platform: e.target.value };
                      const updatedSections = template.sections.map((s: any) =>
                        s.id === section.id
                          ? { ...s, content: { ...s.content, socialLinks: updatedLinks } }
                          : s
                      );
                      onUpdate({ ...template, sections: updatedSections });
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Platform"
                  />
                  <input
                    type="url"
                    value={link.url}
                    onChange={(e) => {
                      const updatedLinks = [...section.content.socialLinks];
                      updatedLinks[index] = { ...link, url: e.target.value };
                      const updatedSections = template.sections.map((s: any) =>
                        s.id === section.id
                          ? { ...s, content: { ...s.content, socialLinks: updatedLinks } }
                          : s
                      );
                      onUpdate({ ...template, sections: updatedSections });
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="URL"
                  />
                  <button
                    onClick={() => {
                      const updatedLinks = section.content.socialLinks.filter((_: any, i: number) => i !== index);
                      const updatedSections = template.sections.map((s: any) =>
                        s.id === section.id
                          ? { ...s, content: { ...s.content, socialLinks: updatedLinks } }
                          : s
                      );
                      onUpdate({ ...template, sections: updatedSections });
                    }}
                    className="p-2 text-red-500 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => {
                  const updatedLinks = [...section.content.socialLinks, { platform: 'New Platform', url: '#' }];
                  const updatedSections = template.sections.map((s: any) =>
                    s.id === section.id
                      ? { ...s, content: { ...s.content, socialLinks: updatedLinks } }
                      : s
                  );
                  onUpdate({ ...template, sections: updatedSections });
                }}
                className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
              >
                + Add Social Link
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Footer Columns</label>
              {section.content.columns.map((column: any, columnIndex: number) => (
                <div key={columnIndex} className="border border-gray-200 rounded-md p-4 mb-4">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-medium">Column {columnIndex + 1}</h4>
                    <button
                      onClick={() => {
                        const updatedColumns = section.content.columns.filter((_: any, i: number) => i !== columnIndex);
                        const updatedSections = template.sections.map((s: any) =>
                          s.id === section.id
                            ? { ...s, content: { ...s.content, columns: updatedColumns } }
                            : s
                        );
                        onUpdate({ ...template, sections: updatedSections });
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={column.title}
                    onChange={(e) => {
                      const updatedColumns = [...section.content.columns];
                      updatedColumns[columnIndex] = { ...column, title: e.target.value };
                      const updatedSections = template.sections.map((s: any) =>
                        s.id === section.id
                          ? { ...s, content: { ...s.content, columns: updatedColumns } }
                          : s
                      );
                      onUpdate({ ...template, sections: updatedSections });
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2"
                    placeholder="Column title"
                  />
                  {column.links.map((link: any, linkIndex: number) => (
                    <div key={linkIndex} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={link.label}
                        onChange={(e) => {
                          const updatedLinks = [...column.links];
                          updatedLinks[linkIndex] = { ...link, label: e.target.value };
                          const updatedColumns = [...section.content.columns];
                          updatedColumns[columnIndex] = { ...column, links: updatedLinks };
                          const updatedSections = template.sections.map((s: any) =>
                            s.id === section.id
                              ? { ...s, content: { ...s.content, columns: updatedColumns } }
                              : s
                          );
                          onUpdate({ ...template, sections: updatedSections });
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="Link label"
                      />
                      <input
                        type="url"
                        value={link.url}
                        onChange={(e) => {
                          const updatedLinks = [...column.links];
                          updatedLinks[linkIndex] = { ...link, url: e.target.value };
                          const updatedColumns = [...section.content.columns];
                          updatedColumns[columnIndex] = { ...column, links: updatedLinks };
                          const updatedSections = template.sections.map((s: any) =>
                            s.id === section.id
                              ? { ...s, content: { ...s.content, columns: updatedColumns } }
                              : s
                          );
                          onUpdate({ ...template, sections: updatedSections });
                        }}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="URL"
                      />
                      <button
                        onClick={() => {
                          const updatedLinks = column.links.filter((_: any, i: number) => i !== linkIndex);
                          const updatedColumns = [...section.content.columns];
                          updatedColumns[columnIndex] = { ...column, links: updatedLinks };
                          const updatedSections = template.sections.map((s: any) =>
                            s.id === section.id
                              ? { ...s, content: { ...s.content, columns: updatedColumns } }
                              : s
                          );
                          onUpdate({ ...template, sections: updatedSections });
                        }}
                        className="p-2 text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      const updatedLinks = [...column.links, { label: 'New Link', url: '#' }];
                      const updatedColumns = [...section.content.columns];
                      updatedColumns[columnIndex] = { ...column, links: updatedLinks };
                      const updatedSections = template.sections.map((s: any) =>
                        s.id === section.id
                          ? { ...s, content: { ...s.content, columns: updatedColumns } }
                          : s
                      );
                      onUpdate({ ...template, sections: updatedSections });
                    }}
                    className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                  >
                    + Add Link
                  </button>
                </div>
              ))}
              <button
                onClick={() => {
                  const newColumn = {
                    title: 'New Column',
                    links: [{ label: 'New Link', url: '#' }],
                  };
                  const updatedColumns = [...section.content.columns, newColumn];
                  const updatedSections = template.sections.map((s: any) =>
                    s.id === section.id
                      ? { ...s, content: { ...s.content, columns: updatedColumns } }
                      : s
                  );
                  onUpdate({ ...template, sections: updatedSections });
                }}
                className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
              >
                + Add Column
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-4">
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => addSection('header')}
            className="flex items-center px-3 py-2 bg-indigo-50 text-indigo-600 rounded-md hover:bg-indigo-100"
          >
            <Plus className="h-4 w-4 mr-2" />
            Header
          </button>
          <button
            onClick={() => addSection('hero')}
            className="flex items-center px-3 py-2 bg-indigo-50 text-indigo-600 rounded-md hover:bg-indigo-100"
          >
            <Plus className="h-4 w-4 mr-2" />
            Hero
          </button>
          <button
            onClick={() => addSection('features')}
            className="flex items-center px-3 py-2 bg-indigo-50 text-indigo-600 rounded-md hover:bg-indigo-100"
          >
            <Plus className="h-4 w-4 mr-2" />
            Features
          </button>
          <button
            onClick={() => addSection('about')}
            className="flex items-center px-3 py-2 bg-indigo-50 text-indigo-600 rounded-md hover:bg-indigo-100"
          >
            <Plus className="h-4 w-4 mr-2" />
            About
          </button>
          <button
            onClick={() => addSection('gallery')}
            className="flex items-center px-3 py-2 bg-indigo-50 text-indigo-600 rounded-md hover:bg-indigo-100"
          >
            <Plus className="h-4 w-4 mr-2" />
            Gallery
          </button>
          <button
            onClick={() => addSection('pricing')}
            className="flex items-center px-3 py-2 bg-indigo-50 text-indigo-600 rounded-md hover:bg-indigo-100"
          >
            <Plus className="h-4 w-4 mr-2" />
            Pricing
          </button>
          <button
            onClick={() => addSection('blank')}
            className="flex items-center px-3 py-2 bg-indigo-50 text-indigo-600 rounded-md hover:bg-indigo-100"
          >
            <Plus className="h-4 w-4 mr-2" />
            Blank
          </button>
          <button
            onClick={() => addSection('footer')}
            className="flex items-center px-3 py-2 bg-indigo-50 text-indigo-600 rounded-md hover:bg-indigo-100"
          >
            <Plus className="h-4 w-4 mr-2" />
            Footer
          </button>
        </div>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={template.sections.map((section: any) => section.id)}
            strategy={verticalListSortingStrategy}
          >
            {template.sections.map((section: any) => (
              <SortableSection key={section.id} id={section.id}>
                <div className="pl-8 pr-4 py-4 mb-4 border border-gray-200 rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <button
                      onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
                      className="text-sm font-medium text-gray-700 capitalize hover:text-indigo-600 flex items-center"
                    >
                      {section.type} Section
                      <span className="ml-2 text-gray-400">
                        {activeSection === section.id ? '▼' : '▶'}
                      </span>
                    </button>
                    <button
                      onClick={() => removeSection(section.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  {activeSection === section.id && (
                    <div className="mt-4">
                      {renderSectionEditor(section)}
                    </div>
                  )}
                </div>
              </SortableSection>
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}

export default Editor;