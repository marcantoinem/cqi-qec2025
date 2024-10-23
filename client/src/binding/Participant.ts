// This file was generated by [ts-rs](https://github.com/Aleph-Alpha/ts-rs). Do not edit this file manually.
import type { Competition } from "./Competition";
import type { Role } from "./Role";
import type { University } from "./University";

export type Participant = {
  id: string;
  role: Role;
  email: string;
  first_name: string;
  last_name: string;
  competition: Competition | null;
  university: University;
  medical_conditions: string | null;
  allergies: string | null;
  pronouns: string | null;
  supper: string | null;
  is_vegetarian: boolean | null;
  phone_number: string | null;
  tshirt_size: string | null;
  comments: string | null;
  emergency_contact: string | null;
  has_monthly_opus_card: boolean | null;
  reduced_mobility: string | null;
  study_proof: string;
  photo: string;
  cv: string;
};
