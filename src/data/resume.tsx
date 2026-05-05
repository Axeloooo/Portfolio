import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Axel Sanchez Portfolio",
  initials: "AOSP",
  url: "https://axelsanchez.me",
  location: "Calgary, Alberta",
  locationLink: "https://www.google.com/maps/place/calgary",
  description:
    "Software Engineer, Researcher, and Entrepreneur. In my free time I enjoy football, lifting weights and muay thai.",
  summary:
    "Hi, I’m Axel Sanchez, a Software Engineer graduate of the University of Calgary. I specialize in high-performance systems ranging from GPU computing and cloud microservices to Agentic AI and blockchain applications. I’ve had the privilege of working across recognized companies like Microsoft, Aptum and Sigma. Take a look around, and if something resonates, I’d love to connect.",
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
    "LLM",

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
      company: "Microsoft",
      href: "https://www.microsoft.com/en-ca/",
      badges: [],
      location: "Vancouver, British Columbia",
      title: "Software Engineer Intern",
      logoUrl: "/microsoft-logo.jpeg",
      start: "May 2025",
      end: "Aug. 2025",
      description:
        "I spent this internship deep in the GPU stack, building custom CUDA kernels for tensor-parallel LLM inference on NVIDIA H200 clusters. I implemented one-shot, two-shot, and user-buffers All-Reduce variants integrated as TensorRT-LLM plugins in C++, and developed BLAS primitives benchmarked head-to-head against NCCL and cuBLAS across FP16 and FP32. The highlight was an IPC-based AllReduce that hit 2x speedup over NCCL on sub-2 MB payloads by fusing reduction directly with matrix multiplication, eliminating a full round-trip across the memory hierarchy.",
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
        "I owned cloud infrastructure and service modernization for enterprise clients running workloads across AWS, Azure, and GCP. On the infrastructure side, I managed production Kubernetes with Terraform and Helm and doubled Jenkins CI/CD throughput by redesigning the pipeline stages. The bigger challenge was refactoring a legacy monolith into gRPC-based microservices using Spring Boot and MySQL, which cut request latency by 66% and made each service independently deployable. I also wrote the DevOps runbooks and onboarding guides that three intern cohorts after me used to get up to speed.",
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
        "I joined Sigma to improve data quality and developer velocity across one of Mexico's largest food distribution networks. My first project was integrating the Copomex geolocation API into C#/.NET services across 10,000+ retail locations, which pushed address-resolution accuracy up by 80%. I then built out full end-to-end regression coverage using Playwright and Jenkins, cutting manual QA effort by 98.75% and giving the team the confidence to ship faster. Throughout the term I worked closely with product stakeholders in Agile sprint reviews to keep engineering scope and delivery timelines aligned.",
    },
  ],
  research: [
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
        "I am building BridgeMart, a cross-chain data marketplace on Ethereum and Solana where anyone can list, discover, and purchase encrypted datasets without trusting a third party. The core of the system is a privacy-preserving vending pipeline: datasets are encrypted client-side, integrity hashes are stored on-chain, and a smart-contract-gated decryption-key release ensures buyers only decrypt what they have paid for. On top of that, I shipped a RAG-style discovery service that uses LLM embeddings to match natural-language queries against tabular dataset signatures, backed by a FastAPI/Pydantic API and consumed by React and React Native frontends.",
    },
  ],
  leadership: [
    {
      company: "Agrivanna",
      href: "https://www.agrivanna.com/",
      badges: [],
      location: "Calgary, Alberta",
      title: "Founding Engineer",
      logoUrl: "/agrivanna-logo.jpeg",
      start: "Sep. 2024",
      end: "Apr. 2025",
      description:
        "Shipped Go/Java microservices and ML features (scikit-learn + PyTorch) for personalized health; deployed FastAPI on Kubernetes and mentored teammates on Docker/K8s.",
    },
    {
      company: "Student Energy UCalgary",
      badges: [],
      href: "https://studentenergyuofc.org/",
      location: "Calgary, Alberta",
      title: "VP Software Development",
      logoUrl: "/seuc-logo.png",
      start: "Sep. 2023",
      end: "Apr. 2024",
      description:
        "Launched a Next.js/TypeScript news app (+70% engagement) and automated AWS infra with Terraform + GitHub Actions; led hiring and set engineering standards.",
    },
    // {
    //   company: "ReThread",
    //   badges: [],
    //   href: "#",
    //   location: "Calgary, Alberta",
    //   title: "Backend Engineer Part-Time",
    //   logoUrl: "/rethread-logo.png",
    //   start: "Sep. 2023",
    //   end: "Apr. 2024",
    //   description:
    //     "Designed TypeScript/Express microservices with Redis caching on AWS/Kubernetes; prototyped a PyTorch CNN for fabric classification and set CI/code-review practices.",
    // },
    // {
    //   company: "Bandist",
    //   href: "#",
    //   badges: [],
    //   location: "Calgary, AB",
    //   title: "Frontend Engineer Part-Time",
    //   logoUrl: "/bandist-logo.png",
    //   start: "Sep. 2022",
    //   end: "Apr. 2023",
    //   description:
    //     "Connected Django app to Ticketmaster/Spotify, cut costs 20%, and managed PostgreSQL/GCP for 10k+ MAU; shipped a Flutter mobile app with 99.95% uptime on Firebase.",
    // },
  ],
  education: [
    // {
    //   school: "Schulich School of Engineering, University of Calgary",
    //   href: "https://schulich.ucalgary.ca/",
    //   degree: "Master of Science in Electrical Engineering",
    //   logoUrl: "/ucalgary-logo.jpeg",
    //   start: "Sep. 2026",
    //   end: "Apr. 2028",
    // },
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
      title:
        "ChiselWare IP Factory Platform by Rocksavage Technology, Inc. (Capstone)",
      href: "#",
      dates: "Sep. 2025 - Apr. 2026",
      active: true,
      description:
        "A full-stack semiconductor IP marketplace co-built with a 6-engineer team, enabling verified submission, certification, and monetized distribution of Chisel-based IP cores, complete with Stripe payments, OIDC auth, and automated Chisel-to-Verilog compilation.",
      technologies: [
        "React",
        "TypeScript",
        "FastAPI",
        "Python",
        "GitHub Actions",
        "MySQL",
        "Docker",
        "Kubernetes",
        "Azure",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/chiselWare",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/ip-factory.png",
      video: "",
    },
    {
      title: "Cross-Chain Rebase Token",
      href: "#",
      dates: "Feb. 2025 - Mar. 2025",
      active: true,
      description:
        "A cross-chain rebase token protocol that mints yield-bearing balances from vault deposits and bridges preserved interest rates across networks using Chainlink CCIP.",
      technologies: [
        "Foundry",
        "Solidity",
        "OpenZeppelin",
        "Chainlink CCIP",
        "GitHub Actions",
      ],
      links: [
        {
          type: "Source",
          href: "https://github.com/Axeloooo/Cross-Chain-Rebase-Token",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/cross-chain-rebase-token.png",
      video: "",
    },
    {
      title: "DeFi Stablecoin",
      href: "#",
      dates: "Aug. 2025 - Sep. 2025",
      active: true,
      description:
        "A decentralized stablecoin protocol backed by exogenous collateral (ETH and BTC), featuring algorithmic minting and a USD peg, inspired by the MakerDAO model.",
      technologies: ["Foundry", "Solidity", "OpenZeppelin", "GitHub Actions"],
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
        "A full-stack ride-sharing platform where users request rides, match with drivers, and manage trips end to end; built on a scalable microservice architecture designed to handle real-world traffic patterns.",
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
        "A collection of ERC-721 NFT smart contracts built with OpenZeppelin, supporting both static and dynamic on-chain traits with fully verifiable metadata.",
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
        "An ERC-20 token smart contract built with OpenZeppelin, deploying Axel Token (AXL) with full test coverage and an automated deployment pipeline.",
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
        "A full-stack video game store where users browse, search, and purchase titles through a responsive interface; secured with Keycloak authentication and backed by a .NET/C# API.",
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
      title:
        "Deep Learning Fundamentals, CNN, Transfer Learning, and ViT Replication",
      href: "#",
      dates: "Mar. 2025 - May. 2025",
      active: true,
      description:
        "A hands-on collection of PyTorch deep learning workflows covering fundamentals, image classification with CNNs, transfer learning with experiment tracking, and a paper replication of the Vision Transformer (ViT).",
      technologies: [
        "Python",
        "PyTorch",
        "CNN",
        "Transformers",
        "Matplotlib",
        "NumPy",
      ],
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
        "A cross-platform app for roommates to organize and assign household chores together; built on a Spring Boot microservice backend with a React/Redux frontend and deployed on GCP Kubernetes.",
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
        "A minimal, offline-first note-taking mobile app built with Flutter and Dart, designed for capturing ideas and reminders with local SQLite storage and Firebase sync.",
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
        "A full-stack e-commerce storefront for video games, featuring an AI customer support chatbot that automatically handles support tickets using the latest GPT models.",
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
        "A serverless web app that generates personalized AI-written obituaries from user input; powered by OpenAI for text generation, AWS Polly for speech synthesis, and Cloudinary for media storage.",
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
      description:
        "A serverless notes app deployed on AWS Lambda and DynamoDB with infrastructure managed via Terraform and automated deployments through GitHub Actions.",
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
      description:
        "A Python library of data structures and algorithms published to PyPI, with comprehensive unit tests and an automated release pipeline through GitHub Actions.",
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
