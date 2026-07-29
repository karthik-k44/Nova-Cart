
interface TruncateParams {
  text: string;
  max: number;
}

interface UniqueValuesParams<T> {
  values: T[];
}

export const CN = (...classes: (string | boolean | undefined | null)[]): string => {
  return classes.filter(Boolean).join(' ');
};

export const Truncate = (params: TruncateParams): string => {
  return params.text.length > params.max ? `${params.text.slice(0, params.max)}...` : params.text;
};

export const UniqueValues = <T>(params: UniqueValuesParams<T>): T[] => {
  return Array.from(new Set(params.values));
};