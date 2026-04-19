import books from "../assets/books.jpg";
import classroom from "../assets/classroom.jpg";
import fruits from "../assets/fruits.jpg";
import hearth from "../assets/Heath.jpg";
import saferSpaces from "../assets/SaferSpaces.jpg";
import tpf from "../assets/TPF.png";

export type ProjectLink = {
  label: string;
  url: string;
};

export type Collaborator = {
  name: string;
  url: string;
};

export type Project = {
  name: string;
  dateRange: string;
  category: string;
  award?: string;
  why: string;
  description: string;
  collaborators: Collaborator[];
  stack: string[];
  links?: ProjectLink[];
  image: string;
};

export const PROJECTS: Project[] = [
  {
    name: "Hearth",
    dateRange: "Jan 2026 – Present",
    category: "Startup",
    why: "When a health crisis hits, families face two problems at once — the crisis itself, and making enormous decisions with almost no information about what their loved one actually wanted.",
    description:
      "A platform helping adult children have end-of-life conversations with aging parents before a crisis forces it. Users move through guided interactive conversations at their own pace, with progress saved so they can return, reflect, and share with family. Built through Cornell Tech's Startup Studio, grounded in real customer discovery with families navigating exactly this.",
    collaborators: [
      {
        name: "Imran Isa-Dutse",
        url: "https://www.linkedin.com/in/imran-isa-dutse/",
      },
      {
        name: "Claudia Davila Rios",
        url: "https://www.linkedin.com/in/claudavilarios/",
      },
    ],
    stack: ["React", "Next.js", "TypeScript", "Supabase", "Twine"],
    links: [{ label: "Website", url: "https://ourhearth.co" }],
    image: hearth,
  },
  {
    name: "FruitGAN",
    dateRange: "Sep 2021 – May 2022",
    category: "Undergraduate Thesis",
    award:
      "Outstanding Project Submission awarded by Department of Informatics at The University of Edinburgh",
    why: "GANs were state-of-the-art image generation at the time, and I wanted to use them to explore something stranger — what fruit looks like inside someone's head.",
    description:
      "A web app that used a GAN-generated image space to map how people mentally categorise fruit. Participants interacted with a slider that morphed photorealistic fruit images along a continuous visual spectrum, nudging each image until it matched their mental picture of a category. Their responses were used to reconstruct their internal concept representations. Built with Flask and Svelte, with a StyleGAN2 model trained on fruit images under the hood.",
    collaborators: [],
    stack: ["Python", "Flask", "Svelte", "StyleGAN2", "SQLite"],
    links: [
      { label: "Demo video", url: "https://media.ed.ac.uk/media/t/1_w0eynkue" },
    ],
    image: fruits,
  },
  {
    name: "Safer Spaces",
    dateRange: "Oct 2021",
    category: "Hackathon",
    award:
      "Winner of the Bloomberg Social Responsibility Challenge for Best Social Responsibility Application — AdaHack 2021",
    why: "In 2021, Edinburgh nightclubs saw a wave of drink and needle spiking — people being drugged without their knowledge or consent. My friend and I challenged ourselves to build something that would provide transparency around incidents, allowing women to still go out, dance, and have a good time without having to choose between fun and feeling safe.",
    description:
      "An anonymous incident reporting platform for bars, clubs and other organisations. Visitors can report harassment or assault without losing anonymity, and organisations can register to give their members a safe place to do so. Anyone can browse registered organisations and see their reported incident counts, making it easier to choose the spaces you inhabit. Built and fully deployed in a single hackathon.",
    collaborators: [
      { name: "Sandra Tu", url: "https://www.linkedin.com/in/sandra-tu/" },
    ],
    stack: ["Python", "Django", "Bootstrap", "SQLite", "PythonAnywhere"],
    links: [
      { label: "Submission", url: "https://devpost.com/software/safer-spaces" },
    ],
    image: saferSpaces,
  },
  {
    name: "The Photography Foundation",
    dateRange: "Jun 2023 – Aug 2024",
    category: "Volunteering",
    why: "A charity opening doors into photography careers for young people deserved a website that reflected the quality of what they do.",
    description:
      "A year-long volunteer engagement redesigning and migrating The Photography Foundation's website from WordPress to Webflow. TPF creates pathways into photography and the creative industries for 18–25 year olds through education, workshops, and real-world opportunities. The redesign improved the experience for around 2,000 users. Beyond the build, we ran training workshops for the team covering Webflow development, CMS management, and product thinking.",
    collaborators: [
      {
        name: "Michael (Min-Su) Kim",
        url: "https://www.linkedin.com/in/michael-minsu-kim/",
      },
    ],
    stack: ["Webflow"],
    links: [
      {
        label: "Website",
        url: "https://www.thephotographyfoundation.org/",
      },
    ],
    image: tpf,
  },
  {
    name: "Recommenda",
    dateRange: "Nov 2022 – Dec 2022",
    category: "Personal Project",
    why: "Friends recommend things all the time. Most of it gets forgotten. I wanted to fix that.",
    description:
      "A social recommendation app for books, films, music, and podcasts. You follow friends, they send you picks, everything lives in one place. Built with Flask and connected to real APIs — Google Books, TMDB, Spotify. A work in progress, but it works.",
    collaborators: [],
    stack: [
      "Python",
      "Flask",
      "Bootstrap",
      "SQLAlchemy",
      "Google Books API",
      "TMDB API",
      "Spotify API",
    ],
    image: books,
  },
  {
    name: "Covid and the Classroom",
    dateRange: "Apr 2020",
    category: "Hackathon",
    award: "Most Creative Topic — DataFest @ EDI Hackathon",
    why: "Stuck and isolated in the middle of the COVID pandemic, my friends and I decided to put our skills to use to visualise the impact of COVID, specifically on education, as the world moved to remote learning on mass for the first time.",
    description:
      "As part of the DataFest hackathon, we built an interactive R Shiny app exploring student access to devices and internet across the US during the first weeks of COVID-19. Built on US Census Bureau Household Pulse Survey data, it lets you explore how income, food sufficiency, and other household factors shaped whether kids could actually learn online.",
    collaborators: [
      {
        name: "Kaori Shimizu",
        url: "https://www.linkedin.com/in/kaori-shimizu-752706192/",
      },
      {
        name: "Jaden Kimura",
        url: "https://www.linkedin.com/in/jaden-kimura-9381a7188/",
      },
    ],
    stack: ["R", "R Shiny"],
    links: [
      {
        label: "Live app",
        url: "https://datafest2020.shinyapps.io/TheDataQuails/",
      },
    ],
    image: classroom,
  },
];
