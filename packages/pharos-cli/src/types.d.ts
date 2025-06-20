export type ComponentName = string;
export type TitleCaseName = string;
export type CamelCaseName = string;
export type TemplatePath = string;
export type FilePath = string;

export interface OutputProperties {
  path: string;
  template: string;
}

export type ComponentNameOptions = {
  componentName: ComponentName;
  titleCaseName: TitleCaseName;
  camelCaseName: CamelCaseName;
};

export type FileProperties = {
  path: string;
  template: string;
};

export type OutputFiles = {
  unitTest: OutputProperties;
  wcStorybook: OutputProperties;
  reactStorybook: OutputProperties;
  storyArgs: OutputProperties;
  component: OutputProperties;
  styling: OutputProperties;
  css: OutputProperties;
};
