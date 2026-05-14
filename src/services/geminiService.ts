import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface NewsItem {
  source: string;
  time: string;
  title: string;
  desc: string;
  img: string;
  content?: string;
}

export interface IntelligenceHubItem {
  title: string;
  desc: string;
  source: string;
  time: string;
  img: string;
  content?: string;
}

const NEWS_PROMPT = `
Find the top 5 most important AI and LLM related news stories from the last 24 hours.
For each story, provide:
- source: Organization (OpenAI, Google, etc)
- time: Relative time
- title: Headline
- desc: Short summary
- img: Keyword for image
- content: A 4-paragraph technical deep-dive into the implications of this news.

Respond ONLY with a JSON array of objects.
`;

const HUB_PROMPT = `
Generate 3 deep intelligence dossiers based on the very latest AI breakthroughs.
For each dossier, provide:
- title: Intelligence-style title
- desc: Semi-technical summary
- source: Original source
- time: Relative time
- img: Technical keyword
- content: A detailed 5-paragraph technical breakdown including architecture details, potential benchmarks, and industry impact.

Respond ONLY with a JSON array of objects.
`;

const TECH_IMAGES = [
  'photo-1677442136019-21780ecad995', // Neural network
  'photo-1620712946849-12e036ef5747', // Abstract AI
  'photo-1614728263952-84ea256f9679', // Digital landscape
  'photo-1633356122544-f134324a6cee', // Code/Dev
  'photo-1550751827-4bd374c3f58b', // Server room
  'photo-1639322537228-f710d846310a', // Cryptography
  'photo-1633167606207-d840b5070fc2', // Cyberpunk city
  'photo-1620641788421-7a1c342ea42e', // Humanoid AI
  'photo-1605810230434-7631ac76ec81', // Data center
  'photo-1451187580459-43490279c0fa'  // Global network
];

function getRandomTechImage(seed: string) {
  const index = Math.abs(seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % TECH_IMAGES.length;
  return `https://images.unsplash.com/${TECH_IMAGES[index]}?q=80&w=1200&auto=format&fit=crop`;
}

export async function fetchLiveNews(): Promise<NewsItem[]> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: NEWS_PROMPT,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              source: { type: Type.STRING },
              time: { type: Type.STRING },
              title: { type: Type.STRING },
              desc: { type: Type.STRING },
              img: { type: Type.STRING },
              content: { type: Type.STRING }
            },
            required: ["source", "time", "title", "desc", "img", "content"]
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("Empty AI response");
    
    const items = JSON.parse(text);
    return items.map((item: any) => ({
      ...item,
      img: getRandomTechImage(item.title)
    }));
  } catch (error) {
    console.warn("Using fallback news due to fetch error:", error);
    return [
      {
        source: "OpenAI",
        time: "1h ago",
        title: "GPT-4o fine-tuning now available for developers",
        desc: "Developers can now customize GPT-4o for specific domains with custom datasets.",
        img: getRandomTechImage("GPT-4o fine-tuning"),
        content: "OpenAI has officially launched fine-tuning for GPT-4o, allowing developers to customize the model's behavior and knowledge for specific applications. This feature enables higher accuracy on niche tasks, better adherence to complex formatting requirements, and a more consistent brand voice. Early testers report significant performance gains in medical coding and legal document summarization. The pricing structure remains competitive, based on training tokens and hosted inference costs."
      },
      {
        source: "Anthropic",
        time: "4h ago",
        title: "Claude 3.5 Sonnet dominates new coding benchmark",
        desc: "New evaluations show significant leads in Python and JS engineering tasks.",
        img: getRandomTechImage("Claude 3.5"),
        content: "Anthropic's newest model, Claude 3.5 Sonnet, has set a new high-water mark for AI coding performance. On the SWE-bench, Sonnet achieved a 37% resolution rate, surpassing GPT-4o by 10%. Developers are praising its nuanced understanding of legacy codebases and its ability to suggest refactors that maintain strict architectural patterns. The model also shows marked improvements in vision tasks, particularly in converting UI mockups directly into functional React components."
      }
    ];
  }
}

export async function fetchIntelligenceHub(): Promise<IntelligenceHubItem[]> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: HUB_PROMPT,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              desc: { type: Type.STRING },
              source: { type: Type.STRING },
              time: { type: Type.STRING },
              img: { type: Type.STRING },
              content: { type: Type.STRING }
            },
            required: ["title", "desc", "source", "time", "img", "content"]
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("Empty AI response");
    
    const items = JSON.parse(text);
    return items.map((item: any) => ({
      ...item,
      img: getRandomTechImage(item.title)
    }));
  } catch (error) {
    console.warn("Using fallback hub data:", error);
    return [
      {
        title: "Project Strawberry: Internal Architecture Review",
        desc: "Independent researchers have mapped the potential Q*-based reasoning paths used in OpenAI's latest internal tests.",
        source: "Intelligence Feed",
        time: "3h ago",
        img: getRandomTechImage("Strawberry"),
        content: "New leaks concerning 'Project Strawberry' suggest a shift towards System 2 thinking in large language models. The architecture reportedly utilizes a recursive reasoning loop where the model verifies its own logic before outputting a final answer. This 'test-time compute' approach allows the model to solve complex mathematical proofs that were previously insurmountable for traditional autoregressive transformers. Experts believe this marks the beginning of truly autonomous problem-solving capabilities."
      }
    ];
  }
}

export interface BriefingItem {
  section: string;
  source: string;
  headline: string;
  summary: string;
  whyItMatters: string;
  builderImpact: string;
  investmentSignal: string;
  link: string;
  priority: 'High' | 'Medium' | 'Low';
}

export interface DailyBriefing {
  items: BriefingItem[];
  topActions: string[];
}

const BRIEFING_PROMPT = `
Search today's updates (last 24h) from: Andrew Ng, Fei-Fei Li, Lex Fridman, Andrej Karpathy, Dario Amodei, Chris Olah, Amanda Askell, Anthropic, Matt Shumer, Logan Kilpatrick, Allie K. Miller, DAIR.AI, Stanford HAI, Emerj AI Research.

Create a daily briefing with these sections:
1. Claude / Anthropic
2. AI coding tools
3. Agents
4. Research
5. Business and investing signals
6. Things Vinay should test today

For each important update, provide:
- section: One of the 6 categories above
- source: Account/source
- headline: One-line headline
- summary: Short summary
- whyItMatters: Why it matters
- builderImpact: Builder impact
- investmentSignal: Business/investment signal
- link: Link to original post
- priority: High / Medium / Low

Rules:
- Ignore hype, memes, vague opinions.
- Prioritize Claude, agents, AI coding, AI infrastructure, model releases.
- End with 3 "topActions" specifically for a user named Vinay.

Respond ONLY with a JSON object: { "items": BriefingItem[], "topActions": string[] }
`;

export async function fetchDailyBriefing(): Promise<DailyBriefing> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: BRIEFING_PROMPT,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            items: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  section: { type: Type.STRING },
                  source: { type: Type.STRING },
                  headline: { type: Type.STRING },
                  summary: { type: Type.STRING },
                  whyItMatters: { type: Type.STRING },
                  builderImpact: { type: Type.STRING },
                  investmentSignal: { type: Type.STRING },
                  link: { type: Type.STRING },
                  priority: { type: Type.STRING, enum: ["High", "Medium", "Low"] }
                },
                required: ["section", "source", "headline", "summary", "whyItMatters", "builderImpact", "investmentSignal", "link", "priority"]
              }
            },
            topActions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              minItems: 3,
              maxItems: 3
            }
          },
          required: ["items", "topActions"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("Empty AI response");
    return JSON.parse(text);
  } catch (error) {
    console.warn("Using fallback briefing:", error);
    return {
      items: [
        {
          section: "Claude / Anthropic",
          source: "@AnthropicAI",
          headline: "Claude 3.5 Sonnet Artifacts now support interactive React previews",
          summary: "Anthropic updated the Artifacts UI to allow real-time execution of complex React components.",
          whyItMatters: "Drastically speeds up the prototyping loop for full-stack developers.",
          builderImpact: "No more copying code to local env to test layouts.",
          investmentSignal: "Anthropic closing the gap on 'AI as an OS' UX.",
          link: "https://x.com/AnthropicAI/status/123456",
          priority: "High"
        },
        {
          section: "AI coding tools",
          source: "@karpathy",
          headline: "Thoughts on the 'Cursor' shift in engineering",
          summary: "Andrej Karpathy discusses how IDE-level agents are changing the definition of 'writing' code.",
          whyItMatters: "Suggests a fundamental shift in technical literacy requirements.",
          builderImpact: "Focus more on architectural intent than syntax accuracy.",
          investmentSignal: "Coding agents are the first multi-billion dollar 'Agentic' vertical.",
          link: "https://x.com/karpathy/status/789012",
          priority: "Medium"
        }
      ],
      topActions: [
        "Test interactive Artifacts in Claude with a shadcn project.",
        "Refactor one component using a 'System 2' reasoning prompt.",
        "Verify local inference speeds on the new Llama 3.1 405B quantization."
      ]
    };
  }
}

export interface LabItem {
  type: string;
  label: string;
  status: string;
  desc: string;
  img: string;
}

const LABS_PROMPT = `
Generate 3 advanced AI training "labs" based on technical breakthroughs or research papers from the last 24 hours.
For each lab, provide:
- type: The category (e.g. "Workflow Engine", "Data Synthesis", "Inference Opt")
- label: A catchy but technical name for the lab
- status: Set to "NEW" or "ADVANCED"
- desc: A one-sentence description of what a trainee would build/learn
- img: A technical keyword for an image search

Respond ONLY with a JSON array of objects.
`;

export async function fetchLabs(): Promise<LabItem[]> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: LABS_PROMPT,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              type: { type: Type.STRING },
              label: { type: Type.STRING },
              status: { type: Type.STRING },
              desc: { type: Type.STRING },
              img: { type: Type.STRING },
            },
            required: ["type", "label", "status", "desc", "img"]
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("Empty AI response");
    
    const items = JSON.parse(text);
    return items.map((item: any) => ({
      ...item,
      img: getRandomTechImage(item.label)
    }));
  } catch (error) {
    console.warn("Using fallback labs:", error);
    return [
      {
        type: "Workflow Engine",
        label: "Agentic Reasoning Chains",
        status: "NEW",
        desc: "Build autonomous task-assigning agents using multi-step inference loops.",
        img: getRandomTechImage("Agentic")
      },
      {
        type: "Inference",
        label: "Sparse Attention Mastery",
        status: "ADVANCED",
        desc: "Learn to prune neural pathways for 10x faster local inference snapshots.",
        img: getRandomTechImage("Sparse")
      }
    ];
  }
}

const ANALYZE_PROMPT = `
Based on these news titles, provide a 3-sentence "Signal Analysis":
1. What is the dominant trend?
2. What should a developer focus on today?
3. A "wildcard" prediction based on the overlap of these stories.
`;

export async function analyzePulse(newsItems: NewsItem[]) {
  try {
    const context = newsItems.map(n => n.title).join("\n");
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `${ANALYZE_PROMPT}\n\nTITLES:\n${context}`,
    });
    return response.text;
  } catch (error) {
    return "Intelligence sync interrupted. Dominant frequency: Agentic Workflows and multi-modal reasoning extensions.";
  }
}
