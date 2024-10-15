import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Axel Sanchez",
  initials: "AOSP",
  url: "https://axelo.me",
  location: "Calgary, AB",
  locationLink: "https://www.google.com/maps/place/calgary",
  description:
    "Software Engineer and Entrepreneur. I enjoy football, soccer, playing videogames, lifting weights and muay thai.",
  summary:
    "I’m a Software Engineering student at the University of Calgary with experience across startups and established tech companies. At Aptum, I enhanced cloud systems by migrating monoliths to microservices and adding GPU support for AI workloads. At Sigma, I improved eCommerce operations by integrating APIs and implementing CI/CD pipelines, reducing testing time by 98.75%. I’ve also led development at Rethread and Bandist, two startups, where I built scalable platforms and integrated services for over 10,000 users. As VP Software Development for Student Energy UCalgary, I increased engagement by 70% and led software team recruitment. Currently, I joined an AI-powered personalized skincare venture focused on B2B2C solutions.",
  avatarUrl: "/me.png",
  skills: [
    "AWS",
    "GCP",
    "Azure",
    "Terrform",
    "Jenkins",
    "Spring Boot",
    "React",
    "Flutter",
    "Next.js",
    "Typescript",
    "Express",
    "Node.js",
    "Vue",
    "Dart",
    "Python",
    "MySQL",
    "Docker",
    "Kubernetes",
    "Java",
    "C++/C",
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "axelshz@gmail.com",
    tel: "+14033903596",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/Axeloooo",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/axel-sanchez-a1089b23a/",
        icon: Icons.linkedin,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:axelshz@gmail.com",
        icon: Icons.email,
        navbar: false,
      },
    },
  },
  work: [
    {
      company: "Aptum",
      href: "https://aptum.com/",
      badges: [],
      location: "Remote",
      title: "Cloud Developer Intern",
      logoUrl: "/aptum-logo.png",
      start: "May 2024",
      end: "Present",
      description:
        "Developed and implemented GPU support feature for VM instances within the Google Cloud plugin, improving processing speed by 25% for AI company customers. Migrated a legacy monolithic plugin architecture to a microservices-based system using gRPC, enhancing scalability and improving  performance by 66%. Directed a platform-wide database migration, updating users, roles, environments, and scopes to ensure system integrity and efficiency.",
    },
    {
      company: "ReThread",
      badges: [],
      href: "#",
      location: "Calgary, AB",
      title: "Tech Lead",
      logoUrl: "/rethread-logo.png",
      start: "September 2023",
      end: "April 2024",
      description:
        "Led and mentored the backend team, coordinating and managing tickets, conducting code reviews, and promoting peer development, resulting in a reduction in bug reports. Architected a microservice e-commerce platform, enhancing scalability and performance, which resulted in enhanced system throughput and reduced downtime. Designed and prototyped user interfaces with Figma, ensuring a seamless and intuitive user experience, leading to an increase in user satisfaction scores.",
    },
    {
      company: "Student Energy UCalgary",
      badges: [],
      href: "https://studentenergyuofc.org/",
      location: "Calgary, AB",
      title: "CO-VP Software Development",
      logoUrl: "/seuc-logo.png",
      start: "September 2023",
      end: "April 2024",
      description:
        "Led the development team in creating an interactive and dynamic web application for chapter news, increasing site engagement by 70%. Automated deployment processes, reducing update time and ensuring reliable, timely updates. Coordinated development activities, managed project timelines, and conducted interviews for the software team, improving project completion rates.",
    },
    {
      company: "Sigma",
      href: "https://www.sigma-alimentos.com/en/",
      badges: [],
      location: "Remote",
      title: "Software Developer Intern",
      logoUrl: "/sigma-logo.png",
      start: "May 2023",
      end: "August 2023",
      description:
        "Integrated Copomex API at an enterprise-level, ensuring pinpoint accuracy for over 10,000 locations, enhancing data precision by 50%. Conducted presentations at 5 sprint reviews, effectively aligning progress with business and marketing objectives, leading to an improvement in team collaboration. Implemented a CI/CD pipeline for the eCommerce’s UI, enhancing test speed and report generation, reducing QA testing time by 98.75%, and increasing deployment frequency.",
    },
    {
      company: "Bandist",
      href: "#",
      badges: [],
      location: "Calgary, AB",
      title: "Full-Stack Developer",
      logoUrl: "/bandist-logo.png",
      start: "September 2022",
      end: "April 2023",
      description:
        "Integrated Django with Ticketmaster & Spotify APIs, achieving a faster registration process and reducing development costs by 20%, while improving user registration experience. Mentored and guided a team of 5 engineers, improving code quality and increasing project delivery. Managed Firebase hosting, ensuring consistent support for over 10,000 active users monthly, and uptime by 99.95%.",
    },
  ],
  education: [
    {
      school: "University of Calgary",
      href: "https://www.ucalgary.ca/",
      degree: "Bachelor's Degree of Software Engineering (BCS)",
      logoUrl: "/uofc-logo.png",
      start: "2021",
      end: "Present",
    },
  ],
  projects: [
    {
      title: "ChoreShare",
      href: "#",
      dates: "January 2024 - April 2024",
      active: true,
      description:
        "A cross-platform application for household roommates to coordinate tasks.",
      technologies: [
        "GCP",
        "Terraform",
        "Kubernetes",
        "Docker",
        "Spring Boot",
        "Java",
        "Expo",
        "React",
        "Redux",
        "TypeScript",
        "JavaScript",
        "Jenkins",
        "PostgreSQL",
        "Netlify",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/Axeloooo/ChoreShare",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/choreshare-logo.png",
      video: "",
    },
    {
      title: "MyNotes",
      href: "#",
      dates: "December 2023 - January 2024",
      active: true,
      description:
        "A simple note-taking mobile app designed for capturing important ideas and reminders.",
      technologies: ["Flutter", "Dart", "Firebase", "SQLite", "Github Actions"],
      links: [
        {
          type: "Source",
          href: "https://github.com/Axeloooo/MyNotes",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/mynotes-logo.png",
      video: "",
    },
    {
      title: "The Last Show",
      href: "#",
      dates: "January 2023 - April 2023",
      active: true,
      description:
        "A serverless web app that automatically generates personalized obituaries for people.",
      technologies: [
        "Terraform",
        "React",
        "Javascript",
        "Cloudinary",
        "DynamoDB",
        "Python",
        "AWS Lambda",
        "AWS Polly",
        "OpenAI",
        "Netlify",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/Axeloooo/The-Last-Show",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/the-last-show-logo.png",
      video: "",
    },
    {
      title: "Game Heaven",
      href: "#",
      dates: "January 2023 - August 2023",
      active: true,
      description:
        "Developed an AI Customer Support Chatbot which automatically responds to customer support tickets using the latest GPT models.",
      technologies: [
        "Vite",
        "React",
        "TypeScript",
        "TailwindCSS",
        "Express",
        "Node.js",
        "Javascript",
        "MongoDB",
        "Github Actions",
        "Stripe",
        "Netlify",
        "Railway",
      ],
      links: [
        {
          type: "Website",
          href: "https://automatic.chat",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/game-heaven-logo.png",
      video: "",
    },
  ],
  certificates: [
    {
      title: "AWS Certified Cloud Practitioner",
      dates: "May 2024 - May 2027",
      image: "aws-ccp-logo.png",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
      links: [
        {
          title: "View Certificate",
          href: "https://www.credly.com/badges/6f786f17-4bd1-48f9-b804-138c8d752e70/linked_in?t=scu7wq",
          icon: <Icons.globe className="size-3" />,
        },
      ],
    },
  ],
} as const;