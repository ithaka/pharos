export interface ImageResult {
  image: string;
  title: string;
}

export interface SearchResult {
  doi: string;
  type: string;
  title: string;
  author: string;
  metadata: string;
  snippet: string;
}

export interface CheckboxGroupItem {
  value: string;
  label: string;
}

export interface RadioGroupItem {
  value: string;
  label: string;
}
