export class ReservationStatus {
  idStatus: string;
  status: 'pending' | 'accepted' | 'rejected';

  constructor(idStatus: string, status: 'pending' | 'accepted' | 'rejected') {
    this.idStatus = idStatus;
    this.status = status;
  }

  static validate(data: Partial<ReservationStatus>): boolean {
    const validStatuses = ['pending', 'accepted', 'rejected'];

    if (!data.idStatus || typeof data.idStatus !== 'string') {
      throw new Error("Invalid 'idStatus'");
    }

    if (!data.status || !validStatuses.includes(data.status)) {
      throw new Error("Invalid 'status'");
    }

    return true;
  }
}
