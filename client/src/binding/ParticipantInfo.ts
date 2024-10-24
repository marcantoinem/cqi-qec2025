// This file was generated by [ts-rs](https://github.com/Aleph-Alpha/ts-rs). Do not edit this file manually.
import type { TshirtSize } from "./TshirtSize";

export type ParticipantInfo = {
  medical_conditions: string | null;
  allergies: string | null;
  pronouns: string | null;
  supper: string | null;
  is_vegetarian: boolean | null;
  phone_number: string | null;
  tshirt_size: TshirtSize | null;
  comments: string | null;
  emergency_contact: string | null;
  has_monthly_opus_card: boolean | null;
  reduced_mobility: string | null;
  study_proof: File;
  photo: File;
  cv: File;
};