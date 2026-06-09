export interface SoilTypeInfo {
  id: string;
  name: string;
  scientificName?: string;
  particleSize: string;
  texture: string;
  waterRetention: "Very High" | "High" | "Medium" | "Low" | "Very Low";
  permeability: string;
  strength: string;
  constructionUses: string[];
  description: string;
  compactability: string;
  colorName: string;
  colorHex: string;
  voidRatioRange: string;
}

export interface RockWeatheringInfo {
  id: string;
  title: string;
  type: "Physical" | "Chemical" | "Biological";
  mechanisms: string[];
  description: string;
  iconName: string;
  example: string;
}

export interface GeotechEngineer {
  name: string;
  title: string;
  lifespan: string;
  photoUrl?: string;
  contributions: string[];
  quote: string;
  iconName: string;
  historyText: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  location: string;
  problem: string;
  cause: string;
  soilBehavior: string;
  solution: string;
  lesson: string;
  accent: string;
  illustrationType: "foundation" | "embankment" | "slope" | "highway";
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
  category: string;
}

export interface SoilFormula {
  name: string;
  latex: string;
  displayEq: string;
  description: string;
  variables: { symbol: string; meaning: string; unit: string }[];
}

export interface SoilLayerModel {
  name: string;
  horizon: string;
  depthRange: string;
  colorHex: string;
  textColor: string;
  composition: string;
  geotechnicalStatus: string;
  stiffness: string;
}
