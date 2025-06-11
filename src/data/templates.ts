import { Template } from '../types/template';

export const templates: Template[] = [
  {
    id: 'modern-business',
    title: 'Modern Business',
    description: 'A clean and professional landing page for modern businesses',
    category: 'business',
    preview: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=2070',
    content: {
      header: {
        logo: 'BusinessPro',
        menuItems: [
          { label: 'Home', link: '#home' },
          { label: 'About', link: '#about' },
          { label: 'Services', link: '#services' },
          { label: 'Gallery', link: '#gallery' },
          { label: 'Contact', link: '#contact' }
        ]
      },
      hero: {
        title: 'Transform Your Business',
        subtitle: 'Launch your brand with our professional landing page',
        image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=2070'
      },
      about: {
        title: 'About Our Company',
        description: 'We are a team of passionate professionals dedicated to delivering exceptional results for our clients. With years of experience and a commitment to excellence, we help businesses grow and succeed in the digital age.',
        image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2070',
        stats: [
          { label: 'Happy Clients', value: '500+' },
          { label: 'Projects Completed', value: '1000+' },
          { label: 'Team Members', value: '50+' },
          { label: 'Years Experience', value: '10+' }
        ]
      },
      features: [
        {
          title: 'Innovative Solutions',
          description: 'Cutting-edge technology for your business needs',
          icon: 'Lightbulb'
        },
        {
          title: 'Expert Support',
          description: '24/7 dedicated customer service',
          icon: 'Headphones'
        },
        {
          title: 'Scalable Platform',
          description: 'Grow your business with our flexible solutions',
          icon: 'TrendingUp'
        }
      ],
      gallery: [
        {
          title: 'Modern Workspace',
          image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2069',
          description: 'State-of-the-art office facilities'
        },
        {
          title: 'Team Collaboration',
          image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=2070',
          description: 'Working together for success'
        },
        {
          title: 'Client Meetings',
          image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=2070',
          description: 'Professional client consultations'
        }
      ],
      services: [
        {
          title: 'Basic Plan',
          description: 'Perfect for small businesses',
          price: '$99/mo',
          features: [
            'Basic Analytics',
            '24/7 Support',
            'Up to 10 Users',
            '5GB Storage'
          ]
        },
        {
          title: 'Pro Plan',
          description: 'Ideal for growing companies',
          price: '$199/mo',
          features: [
            'Advanced Analytics',
            'Priority Support',
            'Up to 50 Users',
            '25GB Storage'
          ]
        },
        {
          title: 'Enterprise Plan',
          description: 'For large organizations',
          price: '$399/mo',
          features: [
            'Custom Analytics',
            'Dedicated Support',
            'Unlimited Users',
            'Unlimited Storage'
          ]
        }
      ],
      footer: {
        logo: 'BusinessPro',
        description: 'Empowering businesses with innovative solutions',
        socialLinks: [
          { platform: 'Twitter', url: 'https://twitter.com' },
          { platform: 'LinkedIn', url: 'https://linkedin.com' },
          { platform: 'Facebook', url: 'https://facebook.com' }
        ],
        columns: [
          {
            title: 'Company',
            links: [
              { label: 'About Us', url: '#about' },
              { label: 'Careers', url: '#careers' },
              { label: 'Contact', url: '#contact' }
            ]
          },
          {
            title: 'Services',
            links: [
              { label: 'Consulting', url: '#consulting' },
              { label: 'Development', url: '#development' },
              { label: 'Marketing', url: '#marketing' }
            ]
          },
          {
            title: 'Legal',
            links: [
              { label: 'Privacy Policy', url: '#privacy' },
              { label: 'Terms of Service', url: '#terms' },
              { label: 'Cookie Policy', url: '#cookies' }
            ]
          }
        ]
      }
    }
  },
  {
    id: 'creative-agency',
    title: 'Creative Agency',
    description: 'A vibrant and dynamic template for creative agencies and studios',
    category: 'creative',
    preview: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=2070',
    content: {
      header: {
        logo: 'CreativeFlow',
        menuItems: [
          { label: 'Home', link: '#home' },
          { label: 'Work', link: '#work' },
          { label: 'Services', link: '#services' },
          { label: 'Team', link: '#team' },
          { label: 'Contact', link: '#contact' }
        ]
      },
      hero: {
        title: 'We Create Digital Experiences',
        subtitle: 'Transforming ideas into captivating digital realities',
        image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=2070'
      },
      about: {
        title: 'Crafting Digital Excellence',
        description: 'We are a collective of creative minds, designers, and developers passionate about crafting exceptional digital experiences that leave lasting impressions.',
        image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&q=80&w=2070',
        stats: [
          { label: 'Projects Delivered', value: '200+' },
          { label: 'Awards Won', value: '50+' },
          { label: 'Happy Clients', value: '150+' },
          { label: 'Team Members', value: '25+' }
        ]
      },
      features: [
        {
          title: 'UI/UX Design',
          description: 'Creating intuitive and engaging user experiences',
          icon: 'Palette'
        },
        {
          title: 'Web Development',
          description: 'Building robust and scalable web applications',
          icon: 'Code'
        },
        {
          title: 'Brand Strategy',
          description: 'Developing compelling brand identities',
          icon: 'Target'
        }
      ],
      gallery: [
        {
          title: 'Digital Design',
          image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=2070',
          description: 'Award-winning digital designs'
        },
        {
          title: 'Creative Process',
          image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&q=80&w=2070',
          description: 'Our creative workflow'
        },
        {
          title: 'Team Collaboration',
          image: 'https://images.unsplash.com/photo-1531498860502-7c67cf02f657?auto=format&fit=crop&q=80&w=2070',
          description: 'Collaborative design sessions'
        }
      ],
      services: [
        {
          title: 'Design Package',
          description: 'Complete design solutions',
          price: '$2,999',
          features: [
            'UI/UX Design',
            'Brand Identity',
            'Design System',
            'Prototype'
          ]
        },
        {
          title: 'Development Package',
          description: 'Full-stack development',
          price: '$5,999',
          features: [
            'Frontend Development',
            'Backend Integration',
            'CMS Setup',
            'Performance Optimization'
          ]
        },
        {
          title: 'Full Service',
          description: 'End-to-end digital solution',
          price: '$8,999',
          features: [
            'Design + Development',
            'SEO Optimization',
            'Content Strategy',
            'Analytics Setup'
          ]
        }
      ],
      footer: {
        logo: 'CreativeFlow',
        description: 'Creating digital experiences that inspire',
        socialLinks: [
          { platform: 'Instagram', url: 'https://instagram.com' },
          { platform: 'Dribbble', url: 'https://dribbble.com' },
          { platform: 'Behance', url: 'https://behance.net' }
        ],
        columns: [
          {
            title: 'Work',
            links: [
              { label: 'Portfolio', url: '#portfolio' },
              { label: 'Case Studies', url: '#cases' },
              { label: 'Clients', url: '#clients' }
            ]
          },
          {
            title: 'Company',
            links: [
              { label: 'About', url: '#about' },
              { label: 'Team', url: '#team' },
              { label: 'Careers', url: '#careers' }
            ]
          },
          {
            title: 'Resources',
            links: [
              { label: 'Blog', url: '#blog' },
              { label: 'Press Kit', url: '#press' },
              { label: 'Contact', url: '#contact' }
            ]
          }
        ]
      }
    }
  },
  {
    id: 'startup-saas',
    title: 'SaaS Startup',
    description: 'Modern and sleek template for SaaS products and startups',
    category: 'technology',
    preview: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=2070',
    content: {
      header: {
        logo: 'SaasFlow',
        menuItems: [
          { label: 'Home', link: '#home' },
          { label: 'Features', link: '#features' },
          { label: 'Pricing', link: '#pricing' },
          { label: 'Resources', link: '#resources' },
          { label: 'Contact', link: '#contact' }
        ]
      },
      hero: {
        title: 'Simplify Your Workflow',
        subtitle: 'The all-in-one platform for modern teams',
        image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=2070'
      },
      about: {
        title: 'Built for Modern Teams',
        description: 'Our platform helps teams collaborate, manage projects, and deliver results faster than ever before. Experience the future of work with our innovative solutions.',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2070',
        stats: [
          { label: 'Active Users', value: '100K+' },
          { label: 'Data Processed', value: '1M+' },
          { label: 'Uptime', value: '99.9%' },
          { label: 'Countries', value: '150+' }
        ]
      },
      features: [
        {
          title: 'Smart Automation',
          description: 'Automate repetitive tasks and workflows',
          icon: 'Zap'
        },
        {
          title: 'Real-time Analytics',
          description: 'Get insights with powerful analytics',
          icon: 'BarChart'
        },
        {
          title: 'Team Collaboration',
          description: 'Work together seamlessly',
          icon: 'Users'
        }
      ],
      gallery: [
        {
          title: 'Dashboard',
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2070',
          description: 'Intuitive dashboard interface'
        },
        {
          title: 'Analytics',
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070',
          description: 'Powerful analytics tools'
        },
        {
          title: 'Mobile App',
          image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=2070',
          description: 'Mobile-first experience'
        }
      ],
      services: [
        {
          title: 'Starter',
          description: 'Perfect for small teams',
          price: '$29/mo',
          features: [
            'Up to 5 team members',
            'Basic automation',
            '5GB storage',
            'Email support'
          ]
        },
        {
          title: 'Professional',
          description: 'For growing businesses',
          price: '$79/mo',
          features: [
            'Up to 20 team members',
            'Advanced automation',
            '50GB storage',
            'Priority support'
          ]
        },
        {
          title: 'Enterprise',
          description: 'For large organizations',
          price: 'Custom',
          features: [
            'Unlimited team members',
            'Custom automation',
            'Unlimited storage',
            'Dedicated support'
          ]
        }
      ],
      footer: {
        logo: 'SaasFlow',
        description: 'Empowering teams to achieve more',
        socialLinks: [
          { platform: 'Twitter', url: 'https://twitter.com' },
          { platform: 'LinkedIn', url: 'https://linkedin.com' },
          { platform: 'GitHub', url: 'https://github.com' }
        ],
        columns: [
          {
            title: 'Product',
            links: [
              { label: 'Features', url: '#features' },
              { label: 'Pricing', url: '#pricing' },
              { label: 'Security', url: '#security' }
            ]
          },
          {
            title: 'Resources',
            links: [
              { label: 'Documentation', url: '#docs' },
              { label: 'API', url: '#api' },
              { label: 'Status', url: '#status' }
            ]
          },
          {
            title: 'Company',
            links: [
              { label: 'About', url: '#about' },
              { label: 'Blog', url: '#blog' },
              { label: 'Careers', url: '#careers' }
            ]
          }
        ]
      }
    }
  }
];