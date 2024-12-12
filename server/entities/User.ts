export class User {
  idUser: string;
  email: string;
  role: 'student' | 'admin';
  affiliation: 'student' | 'professor';
  firstName: string;
  lastName: string;

  constructor(
    idUser: string,
    email: string,
    role: 'student' | 'admin',
    affiliation: 'student' | 'professor',
    firstName: string,
    lastName: string
  ) {
    this.idUser = idUser;
    this.email = email;
    this.role = role;
    this.affiliation = affiliation;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  static validate(data: Partial<User>): boolean {
    const validRoles = ['student', 'admin'];
    const validAffiliations = ['student', 'professor'];

    if (!data.idUser || typeof data.idUser !== 'string') {
      throw new Error("Invalid 'idUser'");
    }

    if (!data.email || typeof data.email !== 'string' || !data.email.includes('@')) {
      throw new Error("Invalid 'email'");
    }

    if (!data.role || !validRoles.includes(data.role)) {
      throw new Error("Invalid 'role'");
    }

    if (!data.affiliation || !validAffiliations.includes(data.affiliation)) {
      throw new Error("Invalid 'affiliation'");
    }

    if (!data.firstName || typeof data.firstName !== 'string') {
      throw new Error("Invalid 'firstName'");
    }

    if (!data.lastName || typeof data.lastName !== 'string') {
      throw new Error("Invalid 'lastName'");
    }

    return true;
  }
}
