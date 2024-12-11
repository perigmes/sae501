export class Reservation {
  _id: string;
  idUser: string;
  reservationDate: string;
  returnDate: string;
  projectName: string;
  projectDescription: string;
  materialJustification: string;
  groupMembers: { firstName: string; lastName: string; TD: string }[];
  audiovisualPlan: string;
  items: string[];
  idStatus: string;
  professor: string;

  constructor(
    _id: string,
    idUser: string,
    reservationDate: string,
    returnDate: string,
    projectName: string,
    projectDescription: string,
    materialJustification: string,
    groupMembers: { firstName: string; lastName: string; TD: string }[],
    audiovisualPlan: string,
    items: string[],
    idStatus: string,
    professor: string
  ) {
    this._id = _id;
    this.idUser = idUser;
    this.reservationDate = reservationDate;
    this.returnDate = returnDate;
    this.projectName = projectName;
    this.projectDescription = projectDescription;
    this.materialJustification = materialJustification;
    this.groupMembers = groupMembers;
    this.audiovisualPlan = audiovisualPlan;
    this.items = items;
    this.idStatus = idStatus;
    this.professor = professor;
  }

  static validate(data: Partial<Reservation>): boolean {
    if (!data._id || typeof data._id !== 'string') {
      throw new Error("Invalid '_id'");
    }

    if (!data.idUser || typeof data.idUser !== 'string') {
      throw new Error("Invalid 'idUser'");
    }

    if (!data.reservationDate || isNaN(Date.parse(data.reservationDate))) {
      throw new Error("Invalid 'reservationDate'");
    }

    if (!data.returnDate || isNaN(Date.parse(data.returnDate))) {
      throw new Error("Invalid 'returnDate'");
    }

    if (!data.projectName || typeof data.projectName !== 'string') {
      throw new Error("Invalid 'projectName'");
    }

    if (!data.projectDescription || typeof data.projectDescription !== 'string') {
      throw new Error("Invalid 'projectDescription'");
    }

    if (!data.materialJustification || typeof data.materialJustification !== 'string') {
      throw new Error("Invalid 'materialJustification'");
    }

    if (
      !data.groupMembers ||
      !Array.isArray(data.groupMembers) ||
      !data.groupMembers.every(
        (member) =>
          typeof member.firstName === 'string' &&
          typeof member.lastName === 'string' &&
          typeof member.TD === 'string'
      )
    ) {
      throw new Error("Invalid 'groupMembers'");
    }

    if (!data.audiovisualPlan || typeof data.audiovisualPlan !== 'string') {
      throw new Error("Invalid 'audiovisualPlan'");
    }

    if (!data.items || !Array.isArray(data.items)) {
      throw new Error("Invalid 'items'");
    }

    if (!data.idStatus || typeof data.idStatus !== 'string') {
      throw new Error("Invalid 'idStatus'");
    }

    if (!data.professor || typeof data.professor !== 'string') {
      throw new Error("Invalid 'professor'");
    }

    return true;
  }
}
