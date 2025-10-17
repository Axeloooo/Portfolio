import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Axel Sanchez Portfolio",
  initials: "AOSP",
  url: "https://axelsanchez.me",
  location: "Calgary, Alberta",
  locationLink: "https://www.google.com/maps/place/calgary",
  description:
    "Software Engineer, Researcher, and Entrepreneur. On my free time I enjoy football, lifting weights and muay thai.",
  summary:
    "I’m Axel Sanchez, a Software Engineer from Mexico. Welcome to my portfolio website, where you’ll find my latest work, research, blogs, and projects. I specialize in building high-performance systems, from GPU computing and cloud microservices to dApps and DeFi solutions on blockchain.",
  avatarUrl: "/me.png",
  skills: [
    // Programming Languages
    "C",
    "C++",
    "C#",
    "Java",
    "JavaScript",
    "TypeScript",
    "Python",
    "Go",
    "Rust",
    "Dart",
    "SQL",
    "Solidity",

    // Cloud & Infrastructure
    "Azure",
    "AWS",
    "GCP",
    "Blockchain",
    "Kubernetes",
    "Docker",
    "Helm",
    "Terraform",
    "Kafka",
    "RabbitMQ",

    // Databases
    "MySQL",
    "PostgreSQL",

    // Frameworks & Platforms
    ".NET",
    "Spring Boot",
    "Express",
    "Django",

    // Frontend
    "React",
    "Next.js",
    "Vue.js",
    "Redux",
    "Expo",
    "Flutter",
    "Vite",
    "Tailwind",

    // APIs & Tools
    "gRPC",

    // Machine Learning / HPC
    "PyTorch",
    "CUDA",

    // CI/CD
    "Jenkins",
    "GitHub Actions",
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
      resume: {
        name: "Download Resume",
        url: "/Resume.pdf",
        icon: Icons.download,
        navbar: true,
      },
    },
  },
  work: [
    {
      company: "University of Calgary",
      href: "https://schulich.ucalgary.ca/",
      badges: [],
      location: "Calgary, Alberta",
      title: "Undergraduate Researcher",
      logoUrl: "/ucalgary-logo.jpeg",
      start: "Sep. 2025",
      end: "Present",
      description:
        "Research on cross-chain AIoT data marketplace enabling autonomous IoT data tokenization, privacy-preserving trading, and multi-asset settlement via Ethereum, Solana, LayerZero, IPFS, and cryptographic verification mechanisms.",
    },
    {
      company: "Microsoft",
      href: "https://www.microsoft.com/en-ca/",
      badges: [],
      location: "Vancouver, British Columbia",
      title: "Software Engineer Intern",
      logoUrl: "/microsoft-logo.jpeg",
      start: "May 2025",
      end: "Aug. 2025",
      description:
        "Built a custom CUDA all-reduce (TRT plugin) on H200s with NVLink/P2P fallback; optimized GPU comms/GEMM and integrated research into production experiments.",
    },
    {
      company: "Agrivanna",
      href: "https://www.agrivanna.com/",
      badges: [],
      location: "Calgary, Alberta",
      title: "Full Stack Engineer Part-Time",
      logoUrl: "/agrivanna-logo.jpeg",
      start: "Sep. 2024",
      end: "Apr. 2025",
      description:
        "Shipped Go/Java microservices and ML features (scikit-learn + PyTorch) for personalized health; deployed FastAPI on Kubernetes and mentored teammates on Docker/K8s.",
    },
    {
      company: "Aptum",
      href: "https://aptum.com/",
      badges: [],
      location: "Calgary, Alberta",
      title: "Cloud Developer Intern",
      logoUrl: "/aptum-logo.png",
      start: "May 2024",
      end: "Apr. 2025",
      description:
        "Scaled Kubernetes infra with Terraform/Helm and Jenkins CI, doubling throughput; migrated a monolith to gRPC microservices (Java/Spring/MySQL) with a 66% perf lift.",
    },
    {
      company: "Student Energy UCalgary",
      badges: [],
      href: "https://studentenergyuofc.org/",
      location: "Calgary, Alberta",
      title: "Vice-President Software Development",
      logoUrl: "/seuc-logo.png",
      start: "Sep. 2023",
      end: "Apr. 2024",
      description:
        "Launched a Next.js/TypeScript news app (+70% engagement) and automated AWS infra with Terraform + GitHub Actions; led hiring and set engineering standards.",
    },
    {
      company: "ReThread",
      badges: [],
      href: "#",
      location: "Calgary, Alberta",
      title: "Backend Engineer Part-Time",
      logoUrl: "/rethread-logo.png",
      start: "Sep. 2023",
      end: "Apr. 2024",
      description:
        "Designed TypeScript/Express microservices with Redis caching on AWS/Kubernetes; prototyped a PyTorch CNN for fabric classification and set CI/code-review practices.",
    },
    {
      company: "Sigma Foodservice",
      href: "https://www.sigma-alimentos.com/en/",
      badges: [],
      location: "Remote",
      title: "Software Engineer Intern",
      logoUrl: "/sigma-logo.png",
      start: "May 2023",
      end: "Aug. 2023",
      description:
        "Integrated Copomex API in .NET/C# for 10k+ locations (↑ address accuracy 80%); added Playwright E2E + Jenkins to slash QA time and speed deployments.",
    },
    {
      company: "Bandist",
      href: "#",
      badges: [],
      location: "Calgary, AB",
      title: "Frontend Engineer Part-Time",
      logoUrl: "/bandist-logo.png",
      start: "Sep. 2022",
      end: "Apr. 2023",
      description:
        "Connected Django app to Ticketmaster/Spotify, cut costs 20%, and managed PostgreSQL/GCP for 10k+ MAU; shipped a Flutter mobile app with 99.95% uptime on Firebase.",
    },
  ],
  education: [
    {
      school: "Schulich School of Engineering, University of Calgary",
      href: "https://schulich.ucalgary.ca/",
      degree: "Bachelor of Science in Software Engineering",
      logoUrl: "/ucalgary-logo.jpeg",
      start: "Sep. 2021",
      end: "Apr. 2026",
    },
  ],
  projects: [
    {
      title: "DeFi Stablecoin",
      href: "#",
      dates: "Aug. 2025 - Sep. 2025",
      active: true,
      description:
        "An decentralized stablecoin protocol with exogenous collateral (ETH & BTC), algorithmic minting, and USD pegged, inspired by MakerDAO",
      technologies: ["Foundry", "Solidity", "OpenZeppelin", "Github Actions"],
      links: [
        {
          type: "Source",
          href: "https://github.com/Axeloooo/DeFi-Stablecoin",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/defi-stablecoin.png",
      video: "",
    },
    {
      title: "Ride Sharing",
      href: "#",
      dates: "Jul. 2025 - Sep. 2025",
      active: true,
      description:
        "Full-stack ride-sharing platform enabling users to request rides, match with drivers, and manage trips through scalable microservice architecture",
      technologies: [
        "Go",
        "TypeScript",
        "Vite",
        "React",
        "TailwindCSS",
        "RabbitMQ",
        "Docker",
        "Kubernetes",
        "GCP",
        "Tilt",
        "MongoDB",
        "Jaeger",
        "OpenTelemetry",
        "gRPC",
        "Stripe",
        "Github Actions",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/Axeloooo/Ride-Sharing",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/ride-sharing.png",
      video: "",
    },
    {
      title: "NFT Collection",
      href: "#",
      dates: "Jul. 2025 - Aug. 2025",
      active: true,
      description:
        "A collection of ERC-721 NFT smart contracts built with OpenZeppelin, deploying static and dynamic on-chain traits",
      technologies: ["Foundry", "Solidity", "OpenZeppelin", "Github Actions"],
      links: [
        {
          type: "Source",
          href: "https://github.com/Axeloooo/NFT-Collection",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/pug.png",
      video: "",
    },
    {
      title: "ERC20 Token",
      href: "#",
      dates: "Jul. 2025 - Aug. 2025",
      active: true,
      description:
        "An ERC-20 token smart contract built with OpenZeppelin, deploying Axel Token (AXL)",
      technologies: ["Foundry", "Solidity", "OpenZeppelin", "Github Actions"],
      links: [
        {
          type: "Source",
          href: "https://github.com/Axeloooo/ERC20-Token",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/erc20-token.png",
      video: "",
    },
    {
      title: "GameStore",
      href: "#",
      dates: "Mar. 2025 - Jun. 2025",
      active: true,
      description:
        "Full-stack video game store enabling users to browse, search, and purchase titles through a responsive, user-friendly web interface",
      technologies: [
        ".NET",
        "C#",
        "Vite",
        "React",
        "TypeScript",
        "TailwindCSS",
        "Keycloak",
        "MySQL",
        "Docker",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/Axeloooo/GameStore",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/gamestore.png",
      video: "",
    },
    {
      title: "PyTorch",
      href: "#",
      dates: "Mar. 2025 - May. 2025",
      active: true,
      description:
        "Collection of deep learning workflows in PyTorch, from fundamentals and classification to transfer learning and experiment tracking",
      technologies: ["Python", "PyTorch", "Google Colab"],
      links: [
        {
          type: "Source",
          href: "https://github.com/Axeloooo/PyTorch",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/pytorch.webp",
      video: "",
    },
    {
      title: "ChoreShare",
      href: "#",
      dates: "Jan. 2024 - Apr. 2024",
      active: true,
      description:
        "A cross-platform application for household roommates to coordinate tasks",
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
      dates: "Dec. 2023 - Jan. 2024",
      active: true,
      description:
        "A simple note-taking mobile app designed for capturing important ideas and reminders",
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
      title: "Game Heaven",
      href: "#",
      dates: "Jan. 2023 - Aug. 2023",
      active: true,
      description:
        "Developed an AI Customer Support Chatbot which automatically responds to customer support tickets using the latest GPT models",
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
          type: "Source",
          href: "https://github.com/Axeloooo/Ecommerce-Client",
          icon: <Icons.github className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/Axeloooo/Ecommerce-API",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/game-heaven-logo.png",
      video: "",
    },
    {
      title: "The Last Show",
      href: "#",
      dates: "Mar. 2023 - Apr. 2023",
      active: true,
      description:
        "A serverless web app that automatically generates personalized obituaries for people",
      technologies: [
        "Terraform",
        "React",
        "Javascript",
        "Cloudinary",
        "Python",
        "AWS DynamoDB",
        "AWS Lambda",
        "AWS Polly",
        "AWS Secrets Manager",
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
      title: "Lotion Plus",
      href: "#",
      dates: "Feb. 2023 - Mar. 2023",
      active: true,
      description: "A Serverless Notes App",
      technologies: [
        "React",
        "JavaScript",
        "Python",
        "AWS Lambda",
        "AWS DynamoDB",
        "Terraform",
        "GitHub Actions",
        "Netlify",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/Axeloooo/Lotion-Plus",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/lotion.png",
      video: "",
    },
    {
      title: "LibCode",
      href: "#",
      dates: "Mar. 2023 - Apr. 2023",
      active: true,
      description: "A Data Structures and Algorithms Library Published in PyPi",
      technologies: ["Python", "PyTest", "PyPi", "GitHub Actions"],
      links: [
        {
          type: "Source",
          href: "https://github.com/Axeloooo/Ecommerce-Client",
          icon: <Icons.github className="size-3" />,
        },
        {
          type: "PyPi",
          href: "https://pypi.org/project/LibCode/1.3.0/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/dsa.jpg",
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
          title: "View Credential",
          href: "https://www.credly.com/badges/6f786f17-4bd1-48f9-b804-138c8d752e70/linked_in?t=scu7wq",
          icon: <Icons.globe className="size-3" />,
        },
      ],
    },
    {
      title: "Microsoft Certified Azure Fundamentals",
      dates: "Feb. 2025",
      image: "microsoft-az900-logo.png",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
      links: [
        {
          title: "View Credential",
          href: "https://learn.microsoft.com/en-us/users/axelsnchez-2277/credentials/2ee95ece9f3f4cac",
          icon: <Icons.globe className="size-3" />,
        },
      ],
    },
  ],
} as const;
