interface NavigationItem {
  title: string;
  href?: string;
  items?: {
    title: string;
    href: string;
    description: string;
  }[];
}

export const navigationData: NavigationItem[] = [
  {
    title: "Solutions",
    items: [
      {
        title: "Academic Management",
        href: "/academic",
        description: "Streamline curriculum planning, grading, and student performance tracking.",
      },
      {
        title: "Administrative Tools",
        href: "/administrative",
        description: "Simplify administrative tasks with automated workflows.",
      },
      {
        title: "Planning & Scheduling",
        href: "/planning",
        description: "Optimize institutional planning with smart scheduling tools.",
      },
      {
        title: "Accreditation",
        href: "/accreditation",
        description: "Comprehensive solutions for NAAC, NBA, ABET, NIRF & QS accreditation.",
      },
      {
        title: "Features",
        href: "/features",
        description: "Explore our comprehensive suite of ERP features.",
      },
      {
        title: "Pricing",
        href: "/pricing",
        description: "View our pricing plans and packages.",
      },
    ],
  },
  {
    title: "Resources",
    items: [
      {
        title: "Dashboard",
        href: "/dashboard",
        description: "Manage your profile and account settings.",
      },
      {
        title: "About Us",
        href: "/about",
        description: "Learn about our mission and vision.",
      },
      {
        title: "Contact",
        href: "/contact",
        description: "Get in touch with our team.",
      },
      {
        title: "Careers",
        href: "/careers",
        description: "Join our growing team.",
      },
    ],
  },
];
