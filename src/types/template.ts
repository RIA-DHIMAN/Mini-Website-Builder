export interface Template {
  id: string;
  title: string;
  description: string;
  category: string;
  preview: string;
  content: {
    header: {
      logo: string;
      menuItems: Array<{
        label: string;
        link: string;
      }>;
    };
    hero: {
      title: string;
      subtitle: string;
      image: string;
    };
    about: {
      title: string;
      description: string;
      image: string;
      stats: Array<{
        label: string;
        value: string;
      }>;
    };
    features: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
    gallery: Array<{
      title: string;
      image: string;
      description: string;
    }>;
    services: Array<{
      title: string;
      description: string;
      price: string;
      features: string[];
    }>;
    footer: {
      logo: string;
      description: string;
      socialLinks: Array<{
        platform: string;
        url: string;
      }>;
      columns: Array<{
        title: string;
        links: Array<{
          label: string;
          url: string;
        }>;
      }>;
    };
  };
}