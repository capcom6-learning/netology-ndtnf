export interface BookDto {
  id: string;
  title: string;
  description: string;
  authors: string;
  favorite: boolean;
  fileCover?: string;
  fileName?: string;
  fileBook?: string;
}
