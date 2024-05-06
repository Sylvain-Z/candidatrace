/* export interface Users {
    id: number;
    pseudo?: string;
    firstname?: string;
    lastname?: string;
    city?: string;
    phone?: string;
    email?: string;
    password?: string;
    profil_pic?: string;
    registration_date?: string;
} */

export interface Users {  // test API ozes
    id: string,
    pseudo?: string,
    firstname?: string,
    lastname?: string,
    email?: string,
    password?: string,
    registration_date?: string,
    number: number,
    street?: string,
    complement?: string,
    postal_code: number,
    city?: string,
    phone?: string
}