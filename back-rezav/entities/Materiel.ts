export class Materiel {
  _id: string;
  name: string;
  picture: string;
  description: string;
  categorie: string;
  isLate: boolean;
  state: 'Libre' | 'Réservé' | 'Indisponible';

  constructor(
    _id: string,
    name: string,
    picture: string,
    description: string,
    categorie: string,
    isLate: boolean,
    state: 'Libre' | 'Réservé' | 'Indisponible'
  ) {
    this._id = _id;
    this.name = name;
    this.picture = picture;
    this.description = description;
    this.categorie = categorie;
    this.isLate = isLate;
    this.state = state;
  }

  static validate(data: Partial<Materiel>): boolean {
    const validStates = ['Libre', 'Réservé', 'Indisponible'];

    if (!data._id || typeof data._id !== 'string') {
      throw new Error("Invalid '_id'");
    }

    if (!data.name || typeof data.name !== 'string') {
      throw new Error("Invalid 'name'");
    }

    if (!data.picture || typeof data.picture !== 'string') {
      throw new Error("Invalid 'picture'");
    }

    if (typeof data.description !== 'string') {
      throw new Error("Invalid 'description'");
    }

    if (!data.categorie || typeof data.categorie !== 'string') {
      throw new Error("Invalid 'categorie'");
    }

    if (typeof data.isLate !== 'boolean') {
      throw new Error("Invalid 'isLate'");
    }

    if (!data.state || !validStates.includes(data.state)) {
      throw new Error("Invalid 'state'");
    }

    return true;
  }
}
