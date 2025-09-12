export interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation?: string
}

export interface QCM {
  id: number
  title: string
  description: string
  duration: number
  questions: Question[]
  attempts: number
  avgScore: number
  status: "active" | "draft" | "archived"
  createdAt: string
  lastModified: string
  category: string
}

export const mockQCMs: QCM[] = [
  {
    id: 1,
    title: "TCP/IP Protocol Fundamentals",
    description: "Understanding the basics of TCP/IP networking protocols",
    duration: 30,
    category: "Network Protocols",
    attempts: 42,
    avgScore: 78,
    status: "active",
    createdAt: "2024-01-15",
    lastModified: "2024-01-16",
    questions: [
      {
        id: 1,
        question: "Which layer of the TCP/IP model is responsible for routing packets?",
        options: ["Application Layer", "Transport Layer", "Internet Layer", "Network Access Layer"],
        correctAnswer: 2,
        explanation:
          "The Internet Layer (Layer 3) is responsible for routing packets between networks using IP addresses.",
      },
      {
        id: 2,
        question: "What is the default port number for HTTP?",
        options: ["21", "23", "80", "443"],
        correctAnswer: 2,
        explanation: "HTTP uses port 80 by default, while HTTPS uses port 443.",
      },
      {
        id: 3,
        question: "Which protocol provides reliable, connection-oriented communication?",
        options: ["UDP", "TCP", "ICMP", "ARP"],
        correctAnswer: 1,
        explanation:
          "TCP (Transmission Control Protocol) provides reliable, connection-oriented communication with error checking and flow control.",
      },
    ],
  },
  {
    id: 2,
    title: "Network Security Basics",
    description: "Fundamental concepts in network security and protection",
    duration: 45,
    category: "Security",
    attempts: 38,
    avgScore: 82,
    status: "active",
    createdAt: "2024-01-12",
    lastModified: "2024-01-13",
    questions: [
      {
        id: 1,
        question: "Which encryption algorithm is considered most secure for modern network communications?",
        options: ["DES", "AES", "RC4", "MD5"],
        correctAnswer: 1,
        explanation:
          "AES (Advanced Encryption Standard) is the current standard for symmetric encryption and is considered highly secure.",
      },
      {
        id: 2,
        question: "What is the primary purpose of a firewall?",
        options: ["Encrypt data", "Filter network traffic", "Compress data", "Increase speed"],
        correctAnswer: 1,
        explanation: "A firewall's primary purpose is to filter network traffic based on predetermined security rules.",
      },
    ],
  },
  {
    id: 3,
    title: "OSI Model Layers",
    description: "Understanding the seven layers of the OSI reference model",
    duration: 25,
    category: "Network Theory",
    attempts: 55,
    avgScore: 75,
    status: "draft",
    createdAt: "2024-01-10",
    lastModified: "2024-01-11",
    questions: [
      {
        id: 1,
        question: "Which OSI layer is responsible for data encryption?",
        options: ["Physical", "Data Link", "Network", "Presentation"],
        correctAnswer: 3,
        explanation: "The Presentation Layer (Layer 6) handles data encryption, compression, and translation.",
      },
    ],
  },
]

export function getQCMById(id: number): QCM | undefined {
  return mockQCMs.find((qcm) => qcm.id === id)
}
