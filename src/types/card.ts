export interface Card {
  idCard?: number;
  name: string;
  description: string;
  attack: number;
  defense: number;
  lifePoints: number;
  pictureUrl: string;
  attributes: {
    tipo: string;
    numero: string;
    customType?: string;
    customColor?: string;
  };
  userSecret?: string;
  createdAt?: string;
  updatedAt?: string;
}
