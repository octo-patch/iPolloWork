import type { Language } from "@/i18n";

type TemplateMetadata = {
  id: string;
  title: string;
  description: string;
  tags: readonly string[];
};

type LocalizedTemplateMetadata = {
  title?: string;
  description?: string;
};

const ZH_TEMPLATE_METADATA: Record<string, LocalizedTemplateMetadata> = {
  "ipollowork.pptx-clinical-handoff": {
    title: "临床交接",
    description: "用于患者背景、风险分诊、护理计划和班次责任交接的沉稳临床交接幻灯片。",
  },
  "ipollowork.pptx-impact-report": {
    title: "社区影响案例",
    description: "用于连接需求、干预方式、参与者旅程、成效指标和下一轮投入的非营利影响力幻灯片。",
  },
  "ipollowork.pptx-exhibition-curation": {
    title: "展览策展说明",
    description: "用于展览主张、艺术家关系、空间动线和开幕计划的高对比策展幻灯片。",
  },
  "ipollowork.pptx-annual-review": {
    title: "年度回顾纪要",
    description: "用于平衡成果、经验、客户故事和下一年重点的编辑风年度回顾幻灯片。",
  },
  "ipollowork.pptx-film-treatment": {
    title: "影视提案",
    description: "用于故事梗概、视觉语法、角色弧线、段落地图和制作调性的电影感提案幻灯片。",
  },
  "ipollowork.pptx-learning-journey": {
    title: "学习旅程",
    description: "用于学习承诺、模块路径、练习闭环、评估方式和讲师计划的课程设计幻灯片。",
  },
  "ipollowork.pptx-match-analysis": {
    title: "比赛分析",
    description: "用于比赛态势、区域控制、阶段模式、关键对位和下场调整的运动表现幻灯片。",
  },
  "ipollowork.pptx-merger-integration": {
    title: "并购整合地图",
    description: "用于交易逻辑、运营模型、决策权、价值捕获和前 100 天计划的并购整合幻灯片。",
  },
  "ipollowork.pptx-brand-narrative": {
    title: "品牌叙事",
    description: "用于文化张力、受众、定位、原则和表达方式的精致品牌叙事幻灯片。",
  },
  "ipollowork.pptx-northstar-strategy": {
    title: "北极星战略",
    description: "一套精致的战略幻灯片，包含编辑式网格、清晰论证流、原生图表、优先级和路线图页面。",
  },
  "ipollowork.pptx-restaurant-opening": {
    title: "餐厅开业手册",
    description: "用于顾客承诺、菜单结构、空间节奏、单店经济模型和开业夜安排的餐厅概念幻灯片。",
  },
  "ipollowork.pptx-research-signals": {
    title: "研究信号简报",
    description: "用于界定问题、呈现证据、提炼模式并提出行动建议的研究综合幻灯片。",
  },
  "ipollowork.pptx-supply-continuity": {
    title: "供应连续性战情室",
    description: "用于中断信号、网络暴露、情景推演和响应责任的运营韧性幻灯片。",
  },
  "ipollowork.pptx-urban-mobility": {
    title: "城市出行方案",
    description: "用于街道层级、出行证据、干预区域和落地节奏的城市交通提案。",
  },
  "ipollowork.pptx-product-launch": {
    title: "产品发布",
    description: "一套高能量产品发布幻灯片，覆盖定位、功能支柱、证明材料、发布节奏和行动请求。",
  },
  "ipollowork.pptx-venture-blueprint": {
    title: "创业蓝图",
    description: "用于市场判断、切入点、经济模型、运营模式、里程碑和融资计划的创业规划幻灯片。",
  },
};

const ZH_TAGS: Record<string, string> = {
  annual: "年度",
  bold: "醒目",
  brand: "品牌",
  brutalist: "粗野主义",
  business: "商业",
  "city-planning": "城市规划",
  cinematic: "电影感",
  culture: "文化",
  data: "数据专业",
  editable: "可编辑",
  editorial: "编辑风",
  education: "教育",
  healthcare: "医疗",
  hospitality: "餐饮酒店",
  identity: "身份识别",
  insight: "洞察",
  launch: "发布",
  media: "媒体",
  metrics: "指标",
  minimal: "极简",
  nonprofit: "非营利",
  operations: "运营",
  plan: "计划",
  product: "产品",
  "pptx-compatible": "兼容 PPTX",
  playful: "活泼",
  report: "报告",
  research: "研究",
  roadmap: "路线图",
  sports: "体育",
  story: "叙事",
  strategy: "战略",
  swiss: "瑞士风",
  technical: "技术",
  themeable: "可换主题",
  venture: "创业",
};

function shouldLocalize(locale: Language | string): locale is "zh" {
  return locale === "zh";
}

export function localizedTemplateTitle(template: Pick<TemplateMetadata, "id" | "title">, locale: Language | string): string {
  if (!shouldLocalize(locale)) return template.title;
  return ZH_TEMPLATE_METADATA[template.id]?.title ?? template.title;
}

export function localizedTemplateDescription(template: Pick<TemplateMetadata, "id" | "description">, locale: Language | string): string {
  if (!shouldLocalize(locale)) return template.description;
  return ZH_TEMPLATE_METADATA[template.id]?.description ?? template.description;
}

export function localizedTemplateTags(template: Pick<TemplateMetadata, "tags">, locale: Language | string): string[] {
  if (!shouldLocalize(locale)) return [...template.tags];
  return template.tags.map((tag) => ZH_TAGS[tag] ?? tag);
}
